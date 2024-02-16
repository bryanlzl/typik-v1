"use client";
import { useSettingContext } from "../typing_window/SettingsProvider";
import { RenderTyped, PropTypes, Cursor } from "../types/TypingTypes";
import TypeSummaryModal from "./TypeSummaryModal";

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
            <span className="absolute xanimate-blink-cursor right-[-5px]">
              |
            </span>
          )
        );
      } else if (position === "front") {
        return (
          wordsTyped[lenWordsTyped - 1].typed.length === 0 &&
          cursorPosition.wordIndex === index && (
            <span className="absolute xanimate-blink-cursor left-[-2px]">
              |
            </span>
          )
        );
      } else if (position === "excess") {
        return (
          cursorPosition.wordIndex === index &&
          cursorPosition.isExcess &&
          typingState.currentWord &&
          cursorPosition.wordPosition == charIndex && (
            <span className="absolute xanimate-blink-cursor text-black right-[-5px]">
              |
            </span>
          )
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
          <span key={index} className={`relative flex flex-row ml-[1vw]`}>
            {cursorRender("front", index, -1)}
            <span className="flex flex-row">
              {typedWord.actual
                .split("")
                .map((actualChar: string, charIndex: number) => (
                  <span
                    key={index + ":" + charIndex}
                    className="relative flex flex-row"
                  >
                    {cursorRender("body", index, charIndex)}
                    <p
                      className={`pl-[2px] ${
                        wordsTyped[index].isCorrect ||
                        wordsTyped[index].incorrectIndex - 1 >= charIndex
                          ? ""
                          : "text-red-700"
                      }`}
                    >
                      {actualChar}
                    </p>{" "}
                    {/* TYPED CHAR */}
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
                    <p className="relative pl-[2px]">
                      {excessChar}
                      {cursorRender("excess", index, charExIndex)}
                    </p>{" "}
                    {/* EXCESS CHAR */}
                  </span>
                ))}
            </span>
          </span>
        ))}
        {settingContext.wordList
          .slice(lenWordsTyped, lenWordList + 1)
          .map((correctWord: string, index: number) => (
            <span className="relative flex flex-row ml-[1vw]" key={index}>
              <span className="flex flex-row">
                {correctWord
                  .split("")
                  .map((actualChar: string, charIndex: number) => (
                    <span
                      key={index + ":" + charIndex}
                      className="flex flex-row"
                    >
                      <p
                        className={`relative pl-[2px]
                      }`}
                      >
                        {actualChar}
                      </p>{" "}
                      {/* UNTYPED CHAR */}
                    </span>
                  ))}
              </span>{" "}
            </span>
          ))}
      </div>
    );
  };

  console.log(typingState.isDone, "done b**ches");

  return (
    <div>
      <div className="flex flex-wrap flex-row max-w-[50vw] text-[1.5vw]">
        {typingState.isDone ? (
          <TypeSummaryModal
            wordsTyped={wordsTyped}
            typingState={props.typingState}
            typingStateRef={props.typingStateRef}
            setWordsTyped={props.setWordsTyped}
            setTypingState={props.setTypingState}
          />
        ) : (
          textRenderer()
        )}
      </div>
    </div>
  );
};

export default TypeTextRender;
