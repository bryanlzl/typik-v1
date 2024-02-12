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

    const currWord: string = typingState.currentWord;
    const wordList: string[] = settingContext.wordList;
    const typedList: string[] = typingState.typedList;

    if (lenWordsTyped < actLenTypedList) {
    } else if (lenWordsTyped > actLenTypedList) {
      //setTypingState((prev: Setting) => {});
    } else if (lenWordsTyped === actLenTypedList) {
    }
    console.log(wordsTyped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingState.currentWord, typingState.typedList]);

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
