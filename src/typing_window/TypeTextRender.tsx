"use client";
import { useSettingContext } from "../typing_window/SettingsProvider";

interface Setting {
  fontStyle: string;
  wordList: string[]; // Correct text
  duration: number;
  allowedMods: Set<string>;
  allowedKeys: Set<string>;
}

interface TypingSettings {
  focus: Boolean;
  currentWord: string;
  typedList: string[]; // User's typed text
  cursorPosition: number;
}

interface RenderTyped {
  // Store rendered text (and validation)
  actual: string;
  typed: string;
  excess: string;
  isCorrect: boolean;
}

interface PropsForRender {
  typingState: TypingSettings;
  setTypingState: React.Dispatch<React.SetStateAction<TypingSettings>>;
  wordsTyped: RenderTyped[];
  setWordsTyped: React.Dispatch<React.SetStateAction<RenderTyped[]>>;
}
const TypeTextRender = (props: PropTypes): JSX.Element => {
  const { settingContext, setSettingContext } = useSettingContext();
  const { typingState, wordsTyped } = props;

  const textRenderer = () => {
    const lenWordList: number = settingContext.wordList.length;
    const lenWordsTyped: number = wordsTyped.length;

    const wordCursePosition: number =
      typingState.cursorPosition === 0
        ? 0
        : wordsTyped[lenWordsTyped - 1]?.excess
        ? wordsTyped[lenWordsTyped - 1].typed.length -
          wordsTyped[lenWordsTyped - 1].actual.length -
          1
        : wordsTyped[lenWordsTyped - 1]?.actual.length
        ? wordsTyped[lenWordsTyped - 1]?.typed.length - 1
        : 0;

    const cursorRender = (
      position: string,
      index: number,
      charIndex: number
    ): JSX.Element | any => {
      if (position === "body") {
        return (
          cursorPosition.wordIndex === index &&
          !cursorPosition.isExcess &&
          typingState.currentWord &&
          cursorPosition.wordPosition == charIndex && (
            <span className="animate-blink-cursor">|</span>
          )
        );
      } else if (position === "front") {
        return (
          typingState.currentWord.length === 0 &&
          index === 0 && <span className="animate-blink-cursor">|</span>
        );
      }
    };

    let cursorPosition: Cursor = {
      wordIndex: lenWordsTyped ? lenWordsTyped - 1 : 0,
      wordPosition: wordCursePosition,
      isFrontOfWord: wordCursePosition % 2 === 0,
      isExcess: wordsTyped[lenWordsTyped - 1]?.excess ? true : false,
    };

    return (
      <div className="flex flex-row flex-wrap">
        {wordsTyped.map((typedWord: RenderTyped, index: number) => (
          <span key={index} className={`flex flex-row ml-[1vw]`}>
            <span className="flex flex-row">
              {typedWord.actual
                .split("")
                .map((actualChar: string, charIndex: number) => (
                  <span key={index + ":" + charIndex} className="flex flex-row">
                    <p
                      className={` ${
                        wordsTyped[index].isCorrect ||
                        wordsTyped[index].incorrectIndex - 1 >= charIndex
                          ? ""
                          : "text-red-700"
                      }`}
                    >
                      {actualChar}
                    </p>{" "}
                    {/* TYPED CHAR */}
                    {cursorRender("body", index, charIndex)}
                  </span>
                ))}
            </span>
            <span className="flex flex-row text-red-700">
              {typedWord.excess
                .split("")
                .map((excessChar: string, charExIndex: number) => (
                  <span
                    key={index + ":" + charExIndex}
                    className="flex flex-row"
                  >
                    <p>{excessChar}</p> {/* EXCESS CHAR */}
                  </span>
                ))}
            </span>
          </span>
        ))}
        {settingContext.wordList
          .slice(lenWordsTyped, lenWordList + 1)
          .map((correctWord: string, index: number) => (
            <span className="flex flex-row ml-[1vw]" key={index}>
              {cursorRender("front", index, -1)}
              <p>{correctWord}</p> {/* UNTYPED CHAR */}
            </span>
          ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap flex-row max-w-[50vw]">
        {textRenderer()}
      </div>
    </div>
  );
};

export default TypeTextRender;
