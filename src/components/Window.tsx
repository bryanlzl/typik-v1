'use client';
import React, { useEffect, useRef, useState } from 'react';
import TypingInterface from './Interface';
import { RenderTyped, TypingSettings, ModKeyEvent, TimeType, PropTypes } from '@/types/typing';
import {
  // DEFAULT_MODS,
  // DEFAULT_ALLOWED_KEYS,
  DEFAULT_PUNCTUATIONS,
  handleIncludeAlphaNums,
} from '@/configs/allowedKeys';
import useTestSettingsStore from '@/stores/useTestSettingStore';

const Window = (): JSX.Element => {
  const { testSetting } = useTestSettingsStore();

  // --- Typing test state --- //
  const [typingState, setTypingState] = useState<TypingSettings>({
    focus: false,
    currentWord: '',
    typedList: [],
    cursorPosition: 0,
    isDone: false,
  });
  const typing = useRef<TypingSettings>({
    focus: false,
    currentWord: '',
    typedList: [],
    cursorPosition: 0,
    isDone: false,
  });
  const mod = useRef<ModKeyEvent>({
    mod: 'Control',
    modEvent: 'keyup',
  });
  const [wordsTyped, setWordsTyped] = useState<RenderTyped[]>([]);

  // --- Initial test time --- //
  const [time, setTime] = useState<TimeType>({
    duration: 30,
    status: 'inactive',
  });

  // --- Typing test word list and constraints --- //
  const wordList: string[] = testSetting.wordList;
  const allowedMods: Set<string> = testSetting.allowedMods;
  const punctuationMarks: string[] = DEFAULT_PUNCTUATIONS;

  // --- add alphanumeric chars --- //
  // lower: boolean, upper: boolean, num: boolean //
  const allowedKeys: Set<string> = handleIncludeAlphaNums(testSetting.allowedKeys, true, true, true);

  // --- Initialize props for child components --- //
  const propPackage: PropTypes = {
    wordsTyped: wordsTyped,
    typingState: typingState,
    typingStateRef: typing,
    time: time,
    setWordsTyped: setWordsTyped,
    setTypingState: setTypingState,
    setTime: setTime,
  };

  // --- Handle key inputs and key combos (i.e. ctrl + backspace)
  const handleKeyPress = (event: KeyboardEvent): void => {
    const keyPress: string = event.key;
    const keyType: string = event.type;
    const currWord: string = typing.current.currentWord;
    const prevTypedList: string[] = typing.current.typedList;
    const lenTypedList: number = typing.current.typedList.length;

    if (lenTypedList == testSetting.wordList.length) {
      typing.current.isDone = true;
      setTypingState((prev) => ({ ...prev, isDone: true }));
    } else if (keyType === 'keydown' && allowedKeys.has(keyPress)) {
      if (currWord.length === 0) {
        if (!allowedMods.has(keyPress)) {
          typing.current.currentWord += keyPress;
          typing.current.cursorPosition = 1;
          setTypingState((prev) => ({
            ...prev,
            currentWord: typing.current.currentWord,
            cursorPosition: typing.current.cursorPosition,
          }));
        } else if (keyPress === 'Backspace' && mod.current.mod + mod.current.modEvent !== 'Controlkeydown') {
          typing.current.currentWord = lenTypedList ? prevTypedList[lenTypedList - 1] : '';
          typing.current.typedList = lenTypedList ? prevTypedList.slice(0, -1) : [];
          typing.current.cursorPosition = lenTypedList ? prevTypedList[lenTypedList - 1].length : 0;
          setTypingState((prev) => ({
            ...prev,
            currentWord: typing.current.currentWord,
            typedList: typing.current.typedList,
            cursorPosition: typing.current.cursorPosition,
          }));
        } else if (keyPress === 'Backspace' && mod.current.mod + mod.current.modEvent === 'Controlkeydown') {
          typing.current.currentWord = '';
          typing.current.typedList = lenTypedList ? prevTypedList.slice(0, -1) : [];
          typing.current.cursorPosition = 0;
          setTypingState((prev) => ({
            ...prev,
            currentWord: typing.current.currentWord,
            typedList: typing.current.typedList,
            cursorPosition: typing.current.cursorPosition,
          }));
        }
      } else {
        if (!allowedMods.has(keyPress)) {
          typing.current.currentWord += keyPress;
          typing.current.cursorPosition = currWord.length + 1;
          setTypingState((prev) => ({
            ...prev,
            currentWord: typing.current.currentWord,
            cursorPosition: typing.current.cursorPosition,
          }));
        } else {
          if (keyPress === ' ') {
            typing.current.currentWord = '';
            typing.current.typedList = prevTypedList.concat(currWord);
            typing.current.cursorPosition = 0;
            setTypingState((prev) => ({
              ...prev,
              currentWord: typing.current.currentWord,
              typedList: typing.current.typedList,
              cursorPosition: typing.current.cursorPosition,
            }));
          } else if (keyPress === 'Backspace' && mod.current.mod + mod.current.modEvent !== 'Controlkeydown') {
            typing.current.currentWord = currWord.substring(0, currWord.length - 1);
            typing.current.cursorPosition = currWord.length - 1;
            setTypingState((prev) => ({
              ...prev,
              currentWord: typing.current.currentWord,
              cursorPosition: typing.current.cursorPosition,
            }));
          } else if (keyPress === 'Backspace' && mod.current.mod + mod.current.modEvent === 'Controlkeydown') {
            typing.current.currentWord = '';
            typing.current.cursorPosition = 0;
            setTypingState((prev) => ({
              ...prev,
              currentWord: typing.current.currentWord,
              cursorPosition: typing.current.cursorPosition,
            }));
          }
        }
      }
    }
    // Update control event activated (can be used for other mods) //
    if (keyPress === 'Control') {
      mod.current.modEvent = keyType;
    }
  };

  useEffect(() => {
    if ((time.status === 'waiting' || time.status === 'running') && typing.current.focus === true) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('keyup', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('keyup', handleKeyPress);
      };
    }
  }, [typing.current.focus]);

  useEffect(() => {
    typing.current.focus = typingState.focus;
    setTime((prev: TimeType) => {
      return {
        ...prev,
        status: prev.status === 'completed' ? 'completed' : typingState.focus ? 'waiting' : 'inactive',
      };
    });
  }, [typingState.focus]);

  return (
    <main className="flex flex-col justify-center items-center my-[30px] select-none">
      <div className="flex flex-col justify-center items-center ">
        <TypingInterface propPackage={propPackage} />
      </div>
    </main>
  );
};

export default Window;
