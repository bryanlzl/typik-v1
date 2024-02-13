"use client";
import React, { useState, useEffect } from "react";
import TypeTextRender from "./TypeTextRender";
import { useSettingContext } from "../typing_window/SettingsProvider";
import { RenderTyped, PropTypes } from "../types/TypingTypes";

const TypingInterface = (props: PropTypes): JSX.Element => {
  const { wordsTyped, setWordsTyped, typingState, setTypingState } = props;
  const { settingContext, setSettingContext } = useSettingContext();

  const focusHandler = (): void => {
    setTypingState((prev) => ({ ...prev, focus: !prev.focus }));
  };

  function firstWrongIndex(actualWord: string, typedWord: string) {
    const minLength = Math.min(actualWord.length, typedWord.length);
    for (let i = 0; i < minLength; i++) {
      if (actualWord[i] !== typedWord[i]) {
        return i;
      }
    }
    if (actualWord.length === typedWord.length) {
      return -1;
    }
    return minLength;
  }

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
          incorrectIndex: firstWrongIndex(correctWord, currWord),
        })
      );
    } else if (lenWordsTyped > actLenTypedList) {
      setWordsTyped(prevPrevWordList);
    } else if (lenWordsTyped === actLenTypedList && lenWordsTyped > 0) {
      const typedWord = currWord
        ? currWord
        : typedList.length > 0
        ? typedList[typedList.length - 1]
        : "";

      let isCorrect = true;
      if (currWord.length === 0) {
        if (correctWord === typedWord) {
          isCorrect = true;
        } else {
          isCorrect = false;
        }
      } else {
        isCorrect =
          typedWord === correctWord.substring(0, typedWord.length)
            ? true
            : false;
      }

      setWordsTyped(
        prevPrevWordList.concat({
          ...prevWord,
          typed: typedWord,
          excess:
            typedWord.length > correctWord.length
              ? typedWord.substring(correctWord.length, typedWord.length + 1)
              : "",
          isCorrect: isCorrect,

          incorrectIndex: firstWrongIndex(correctWord, typedWord),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingState]);

  console.log(wordsTyped);

  return (
    <div
      onClick={focusHandler}
      className={`cursor-pointer ${typingState.focus && "bg-gray-200"}`}
    >
      <TypeTextRender
        wordsTyped={wordsTyped}
        typingState={props.typingState}
        setWordsTyped={setWordsTyped}
        setTypingState={props.setTypingState}
      />
    </div>
  );
};

export default TypingInterface;
