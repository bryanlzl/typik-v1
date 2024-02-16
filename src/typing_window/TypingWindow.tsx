"use client";
import React, { useEffect, useRef, useState } from "react";
import { SettingProvider } from "../typing_window/SettingsProvider";
import TypingInterface from "./TypingInterface";
import { top99Words } from "@/typing_sets/WordAssets";
import {
  RenderTyped,
  Setting,
  TypingSettings,
  ModKeyEvent,
} from "../types/TypingTypes";

const wordList: string[] = top99Words;

const allowedMods: Set<string> = new Set([
  "Backspace",
  " ",
  "CapsLock",
  "Control",
  "Shift",
  "Escape",
]);

// Addition of all other characters
const allowedKeys: Set<string> = new Set([
  "Backspace",
  " ",
  "CapsLock",
  "Control",
  "Shift",
  "Escape",
]);
//const allowedChars: Set<string> = new Set([])
// Allow alphanumeric characters (a-z, A-Z, 0-9)
for (let i: number = 48; i <= 57; i++) {
  allowedKeys.add(String.fromCharCode(i)); // Add numeric characters
  //allowedChars.add(String.fromCharCode(i))
}
for (let i: number = 65; i <= 90; i++) {
  allowedKeys.add(String.fromCharCode(i)); // Add uppercase letters
  //allowedChars.add(String.fromCharCode(i))
}
for (let i: number = 97; i <= 122; i++) {
  allowedKeys.add(String.fromCharCode(i)); // Add lowercase letters
  //allowedChars.add(String.fromCharCode(i))
}
// Allow common punctuation marks
const punctuationMarks: string[] = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
];
punctuationMarks.forEach((mark: string) => allowedKeys.add(mark));
//punctuationMarks.forEach((mark: string) => allowedChars.add(mark));

const TypingWindow = (): JSX.Element => {
  const [useSettings, setSettings] = useState<Setting>({
    fontStyle: "verdana",
    wordList: wordList,
    duration: 30,
    allowedMods: allowedMods,
    allowedKeys: allowedKeys,
  });

  const [typingState, setTypingState] = useState<TypingSettings>({
    focus: false,
    currentWord: "",
    typedList: [],
    cursorPosition: 0,
    isDone: false,
  });

  const typing = useRef<TypingSettings>({
    focus: false,
    currentWord: "",
    typedList: [],
    cursorPosition: 0,
    isDone: false,
  });

  const mod = useRef<ModKeyEvent>({
    mod: "Control",
    modEvent: "keyup",
  });

  const [wordsTyped, setWordsTyped] = useState<RenderTyped[]>([]);

  const handleKeyPress = (event: KeyboardEvent): void => {
    const keyPress: string = event.key;
    const keyType: string = event.type;
    const currWord: string = typing.current.currentWord;
    const prevTypedList: string[] = typing.current.typedList;
    const lenTypedList: number = typing.current.typedList.length;

    if (lenTypedList == useSettings.wordList.length) {
      typing.current.isDone = true;
      setTypingState((prev) => ({ ...prev, isDone: true }));
    } else if (keyType === "keydown" && allowedKeys.has(keyPress)) {
      if (currWord.length === 0) {
        if (!allowedMods.has(keyPress)) {
          typing.current.currentWord += keyPress;
          typing.current.cursorPosition = 1;
          setTypingState((prev) => ({
            ...prev,
            currentWord: typing.current.currentWord,
            cursorPosition: typing.current.cursorPosition,
          }));
        } else if (
          keyPress === "Backspace" &&
          mod.current.mod + mod.current.modEvent !== "Controlkeydown"
        ) {
          typing.current.currentWord = lenTypedList
            ? prevTypedList[lenTypedList - 1]
            : "";
          typing.current.typedList = lenTypedList
            ? prevTypedList.slice(0, -1)
            : [];
          typing.current.cursorPosition = lenTypedList
            ? prevTypedList[lenTypedList - 1].length
            : 0;
          setTypingState((prev) => ({
            ...prev,
            currentWord: typing.current.currentWord,
            typedList: typing.current.typedList,
            cursorPosition: typing.current.cursorPosition,
          }));
        } else if (
          keyPress === "Backspace" &&
          mod.current.mod + mod.current.modEvent === "Controlkeydown"
        ) {
          typing.current.currentWord = "";
          typing.current.typedList = lenTypedList
            ? prevTypedList.slice(0, -1)
            : [];
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
          if (keyPress === " ") {
            typing.current.currentWord = "";
            typing.current.typedList = prevTypedList.concat(currWord);
            typing.current.cursorPosition = 0;
            setTypingState((prev) => ({
              ...prev,
              currentWord: typing.current.currentWord,
              typedList: typing.current.typedList,
              cursorPosition: typing.current.cursorPosition,
            }));
          } else if (
            keyPress === "Backspace" &&
            mod.current.mod + mod.current.modEvent !== "Controlkeydown"
          ) {
            typing.current.currentWord = currWord.substring(
              0,
              currWord.length - 1
            );
            typing.current.cursorPosition = currWord.length - 1;
            setTypingState((prev) => ({
              ...prev,
              currentWord: typing.current.currentWord,
              cursorPosition: typing.current.cursorPosition,
            }));
          } else if (
            keyPress === "Backspace" &&
            mod.current.mod + mod.current.modEvent === "Controlkeydown"
          ) {
            typing.current.currentWord = "";
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
    if (keyPress === "Control") {
      mod.current.modEvent = keyType;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, []);

  console.log(typingState);

  return (
    <SettingProvider initialState={useSettings}>
      <main className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          <TypingInterface
            wordsTyped={wordsTyped}
            typingState={typingState}
            typingStateRef={typing}
            setWordsTyped={setWordsTyped}
            setTypingState={setTypingState}
          />
        </div>
      </main>
    </SettingProvider>
  );
};

export default TypingWindow;
