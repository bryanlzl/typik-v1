"use client";
import React, { useState, useEffect } from "react";
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

const TypeTextRender = (props: PropsForRender): JSX.Element => {
  const { settingContext, setSettingContext } = useSettingContext();
  const { typingState, setTypingState, wordsTyped, setWordsTyped } = props;

  useEffect(() => {
    const rawLenTypedList: number = typingState.typedList.length;
    const actLenTypedList: number =
      rawLenTypedList + (typingState.currentWord ? 1 : 0);
    const lenWordsTyped: number = wordsTyped.length;

    const wordList: string[] = settingContext.wordList;
    const typedList: string[] = typingState.typedList;
    const correctWord: string = wordList[actLenTypedList - 1];
    const currWord: string = typingState.currentWord;

    const prevPrevWordList: RenderTyped[] | [] =
      lenWordsTyped >= 2 ? wordsTyped.slice(0, lenWordsTyped - 1) : [];
    const prevWord: RenderTyped | [] =
      lenWordsTyped >= 1 ? wordsTyped[lenWordsTyped - 1] : [];

    if (lenWordsTyped < actLenTypedList) {
      setWordsTyped(
        prevPrevWordList.concat(prevWord).concat({
          actual: correctWord,
          typed: currWord,
          excess:
            currWord.length > correctWord.length
              ? currWord.substring(correctWord.length, currWord.length + 1)
              : "",
          isCorrect:
            currWord === correctWord.substring(0, currWord.length)
              ? true
              : false,
        })
      );
    } else if (lenWordsTyped > actLenTypedList) {
      setWordsTyped(prevPrevWordList.slice(0, -1));
    } else if (lenWordsTyped === actLenTypedList && lenWordsTyped > 0) {
      const typedWord = currWord
        ? currWord
        : typedList.length > 0
        ? typedList[typedList.length - 1]
        : "";
      setWordsTyped(
        prevPrevWordList.concat({
          ...prevWord,
          typed: typedWord,
          excess:
            typedWord.length > correctWord.length
              ? typedWord.substring(correctWord.length, typedWord.length + 1)
              : "",
          isCorrect:
            typedWord === correctWord.substring(0, typedWord.length)
              ? true
              : false,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingState]);

  console.log(wordsTyped);

  return (
    <div>
      <div>{typingState.currentWord}</div>
      <div className="flex flex-wrap flex-row max-w-[50vw]">
        {typingState.typedList.map((word: string, index: number) => {
          return (
            <span key={index} className="mr-[1vw]">
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypeTextRender;
