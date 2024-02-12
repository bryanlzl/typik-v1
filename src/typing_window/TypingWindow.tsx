"use client";
import React, { useState } from "react";
import { SettingProvider } from "../typing_window/SettingsProvider";
import TypingInterface from "./TypingInterface";

interface RenderTyped {
  actual: string;
  typed: string;
  excess: string;
  isCorrect: boolean;
}

interface Setting {
  fontStyle: string;
  wordList: string[];
  duration: number;
  allowedMods: Set<string>;
  allowedKeys: Set<string>;
}

const wordList: string[] = [
  "apple",
  "banana",
  "orange",
  "strawberry",
  "blueberry",
  "raspberry",
  "pineapple",
  "grape",
  "watermelon",
  "kiwi",
  "mango",
  "peach",
  "pear",
  "apricot",
  "cherry",
  "coconut",
  "fig",
  "lemon",
  "lime",
  "plum",
];

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

  const [wordsTyped, setWordsTyped] = useState<RenderTyped[]>([]);

  return (
    <SettingProvider initialState={useSettings}>
      <main className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          <TypingInterface
            wordsTyped={wordsTyped}
            setWordsTyped={setWordsTyped}
          />
        </div>
      </main>
    </SettingProvider>
  );
};

export default TypingWindow;
