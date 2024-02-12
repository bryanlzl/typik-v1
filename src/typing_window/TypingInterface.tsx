"use client";
import React, { useState } from "react";
import TypeTextRender from "./TypeTextRender";
import { useSettingContext } from "../typing_window/SettingsProvider";

interface TypingSettings {
  focus: Boolean;
  currentWord: string;
  typedList: string[];
  cursorPosition: number;
}

interface RenderTyped {
  actual: string;
  typed: string;
  excess: string;
  isCorrect: boolean;
}

interface PropsType {
  wordsTyped: RenderTyped[];
  setWordsTyped: React.Dispatch<React.SetStateAction<RenderTyped[]>>;
  typingState: TypingSettings;
  setTypingState: React.Dispatch<React.SetStateAction<TypingSettings>>;
}

const TypingInterface = (props: PropsType): JSX.Element => {
  const [typingState, setTypingState] = useState<TypingSettings>({
    focus: false,
    currentWord: "",
    typedList: [],
    cursorPosition: 0,
  });

  const focusHandler = (): void => {
    setTypingState((prev) => ({ ...prev, focus: !prev.focus }));
  };

  return (
    <div
      onClick={focusHandler}
      className={`cursor-pointer ${typingState.focus && "bg-gray-200"}`}
    >
      <TypeTextRender
        wordsTyped={props.wordsTyped}
        typingState={props.typingState}
        setWordsTyped={props.setWordsTyped}
        setTypingState={props.setTypingState}
      />
    </div>
  );
};

export default TypingInterface;
