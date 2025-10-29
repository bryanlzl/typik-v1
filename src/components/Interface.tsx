/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import { RenderTyped, PropTypes, TimeType } from '@/types/typing';
import useTestSettingsStore from '@/stores/useTestSettingStore';
import Timer from '@/components/Timer';
import Canvas from '@/components/Canvas';

const Interface = ({ propPackage }: { propPackage: PropTypes }): JSX.Element => {
  const { wordsTyped, setWordsTyped, typingState, setTypingState, time, setTime } = propPackage;
  const { testSetting } = useTestSettingsStore();

  const focusHandler = (): void => {
    setTypingState((prev) => ({ ...prev, focus: !prev.focus }));
  };

  const firstWrongIndex = (actualWord: string, typedWord: string): number => {
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
  };

  const renderTextPrompt = (): JSX.Element => {
    return (
      <div
        className={`absolute flex flex-row justify-center w-[100%] h-[100%] rounded-lg items-center ${
          (typingState.focus || typingState.isDone) && 'hidden'
        }`}
      >
        <span className="h-min font-[Verdana] text-[1.2vw] align-bottom">Click on text and start typing to begin</span>
      </div>
    );
  };

  useEffect(() => {
    const rawLenTypedList: number = typingState.typedList.length;
    const actLenTypedList: number = rawLenTypedList + 1;
    const lenWordsTyped: number = wordsTyped.length;

    const wordList: string[] = testSetting.wordList;
    const correctWord: string = wordList[actLenTypedList - 1];
    const currWord: string = typingState.currentWord;
    const typedWord = typingState.cursorPosition > 0 ? currWord : '';

    const prevPrevWordList: RenderTyped[] | [] = lenWordsTyped >= 2 ? wordsTyped.slice(0, lenWordsTyped - 1) : [];
    const prevWord: RenderTyped | [] = lenWordsTyped >= 1 ? wordsTyped[lenWordsTyped - 1] : [];

    if (lenWordsTyped === actLenTypedList && lenWordsTyped > 0) {
      // typing => current word //
      let isCorrect = true;
      isCorrect = typedWord === correctWord.substring(0, typedWord.length) ? true : false;
      setWordsTyped(
        prevPrevWordList.concat({
          ...prevWord,
          typed: typedWord,
          excess:
            typedWord.length > correctWord.length ? typedWord.substring(correctWord.length, typedWord.length + 1) : '',
          isCorrect: isCorrect,
          incorrectIndex: firstWrongIndex(correctWord, typedWord),
        })
      );
    } else if (lenWordsTyped < actLenTypedList && wordsTyped.length != testSetting.wordList.length) {
      // spacebar => new word //
      setWordsTyped(
        prevPrevWordList
          .concat(
            Array.isArray(prevWord)
              ? []
              : {
                  ...prevWord,
                  isCorrect: prevWord.actual === prevWord.typed ? true : false,
                }
          )
          .concat({
            actual: correctWord,
            typed: typedWord,
            excess:
              currWord.length > correctWord.length ? currWord.substring(correctWord.length, currWord.length + 1) : '',
            isCorrect: currWord === correctWord.substring(0, currWord.length) && correctWord.length ? true : false,
            incorrectIndex: firstWrongIndex(correctWord, currWord),
          })
      );
    } else if (lenWordsTyped > actLenTypedList) {
      // backspace => deletion //
      if (currWord.length > 0) {
        setWordsTyped(prevPrevWordList);
      } else {
        setWordsTyped(
          prevPrevWordList.slice(0, prevPrevWordList.length - 1).concat({
            ...prevPrevWordList[prevPrevWordList.length - 1],
            typed: '',
            excess: '',
            isCorrect: true,
            incorrectIndex: -1,
          })
        );
      }
    }
  }, [typingState]);

  useEffect(() => {
    if (wordsTyped[0]?.typed.length > 0 && time.status !== 'completed') {
      setTime((prev: TimeType) => {
        return { ...prev, status: 'running' };
      });
    }
  }, [wordsTyped]);

  return (
    <div className={`cursor-pointer py-[10px]`}>
      <Timer propPackage={propPackage} />
      <div className="relative rounded-lg" onClick={focusHandler}>
        {renderTextPrompt()}
        <Canvas propPackage={propPackage} />
      </div>
    </div>
  );
};

export default Interface;
