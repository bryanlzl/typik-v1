"use client";
import React, { useState } from "react";
import { SettingProvider } from "../typing_window/SettingsProvider";
import TypingInterface from "./TypingInterface";

interface Setting {
  fontStyle: string;
  wordList: string[];
  typedList: string[];
  duration: Number;
}

function TypingWindow() {
  const [useSettings, setSettings] = useState<Setting>({
    fontStyle: "verdana",
    wordList: [
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
    ],
    typedList: [],
    duration: 30,
  });

  return (
    <SettingProvider initialState={useSettings}>
      <main className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          <TypingInterface />
        </div>
      </main>
    </SettingProvider>
  );
}

export default TypingWindow;
