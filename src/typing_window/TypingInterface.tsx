"use client";
import React, { useState } from "react";
import { useSettingContext } from "../typing_window/SettingsProvider";

interface Setting {
  fontStyle: string;
  wordList: string[];
  typedList: string[];
  duration: Number;
}

function TypingInterface() {
  const { settingContext, setSettingContext } = useSettingContext();

  const renderTypedWords = (useSettings: Setting): JSX.Element => {
    return (
      <div
        className={`flex flex-wrap flex-row max-w-[50vw] font-${useSettings.fontStyle}`}
      >
        {useSettings.wordList.map((word: string, index: number) => (
          <span key={index} className="mr-[1vw]">
            {word}
          </span>
        ))}
      </div>
    );
  };

  return <div>{renderTypedWords(settingContext)}</div>;
}

export default TypingInterface;
