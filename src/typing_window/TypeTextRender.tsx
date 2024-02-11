"use client";
import React, { useState, useEffect } from "react";
import { useSettingContext } from "../typing_window/SettingsProvider";

interface Setting {
  fontStyle: string;
  wordList: string[]; // correct text
  typedList: string[]; // where u should store rendered text
  duration: Number;
  allowedMods: Set<string>;
  allowedKeys: Set<string>;
}

interface TypingSettings {
  focus: Boolean;
  currentWord: string;
  typedList: string[]; // user's typed text
  cursorPosition: Number;
}

interface PropsForRender {
  typingState: TypingSettings;
}

const TypeTextRender = (props: PropsForRender): JSX.Element => {
  const { settingContext, setSettingContext } = useSettingContext();
  const typingState: TypingSettings = props.typingState;

  const textRenderer = () => {};

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
