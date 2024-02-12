"use client";
import React, { useState, useEffect } from "react";
import TypeTextRender from "./TypeTextRender";
import { useSettingContext } from "../typing_window/SettingsProvider";

interface TypingSettings {
  focus: Boolean;
  currentWord: string;
  typedList: string[];
  cursorPosition: number;
}

interface ModKeyEvent {
  mod: string;
  modEvent: string;
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
}

const TypingInterface = (props: PropsType): JSX.Element => {
  const { wordsTyped, setWordsTyped } = props;
  const { settingContext, setSettingContext } = useSettingContext();
  const allowedMods: Set<string> = settingContext.allowedMods;
  const allowedKeys: Set<string> = settingContext.allowedKeys;
  const [typingState, setTypingState] = useState<TypingSettings>({
    focus: false,
    currentWord: "",
    typedList: [],
    cursorPosition: 0,
  });
  const [modTrigger, setModTrigger] = useState<ModKeyEvent>({
    mod: "Control",
    modEvent: "keydown",
  });

  const focusHandler = (): void => {
    setTypingState((prev) => ({ ...prev, focus: !prev.focus }));
  };

  const KeyboardComponent = () => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      const keyPress: string = event.key;
      const keyType: string = event.type;
      const prevTypedList: string[] = typingState.typedList;
      const lenTypedList: number = typingState.typedList.length;
      console.log(keyPress, keyType);
      if (keyType === "keydown" && allowedKeys.has(keyPress)) {
        if (typingState.currentWord.length === 0) {
          if (!allowedMods.has(keyPress)) {
            setTypingState((prev) => ({ ...prev, currentWord: keyPress }));
          } else if (
            keyPress === "Backspace" &&
            modTrigger.mod + modTrigger.modEvent !== "Controlkeydown"
          ) {
            setTypingState((prev) => ({
              ...prev,
              currentWord: lenTypedList ? prevTypedList[lenTypedList - 1] : "",
              typedList: lenTypedList ? prevTypedList.slice(0, -1) : [],
              cursorPosition: lenTypedList ? 1 : 0,
            }));
          } else if (
            keyPress === "Backspace" &&
            modTrigger.mod + modTrigger.modEvent === "Controlkeydown"
          ) {
            setTypingState((prev) => ({
              ...prev,
              currentWord: "",
              typedList: lenTypedList ? prevTypedList.slice(0, -1) : [],
              cursorPosition: 0,
            }));
          }
        } else {
          if (!allowedMods.has(keyPress)) {
            setTypingState((prev) => ({
              ...prev,
              currentWord: prev.currentWord.concat(keyPress.toString()),
              cursorPosition: prev.currentWord.length + 1,
            }));
          } else {
            if (keyPress === " ") {
              setTypingState((prev) => ({
                ...prev,
                currentWord: "",
                typedList: prev.typedList.concat(prev.currentWord),
                cursorPosition: 0,
              }));
            } else if (
              keyPress === "Backspace" &&
              modTrigger.mod + modTrigger.modEvent !== "Controlkeydown"
            ) {
              setTypingState((prev) => ({
                ...prev,
                currentWord: prev.currentWord.substring(
                  0,
                  prev.currentWord.length - 1
                ),
                cursorPosition: prev.currentWord.length - 1,
              }));
            } else if (
              keyPress === "Backspace" &&
              modTrigger.mod + modTrigger.modEvent === "Controlkeydown"
            ) {
              console.log("ctrl backspace triggered");
              setTypingState((prev) => ({
                ...prev,
                currentWord: "",
                cursorPosition: 0,
              }));
            }
          }
        }
      }

      // Update prevKey & prevKeyType //
      setTypingState((prev) => ({
        ...prev,
        prevKey: event.key,
        prevKeyType: event.type,
      }));

      // Update control event activated (can be used for other mods) //
      event.key === "Control" &&
        setModTrigger((prev) => ({ ...prev, modEvent: event.type }));
    };

    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      window.addEventListener("keyup", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
        window.removeEventListener("keyup", handleKeyPress);
      };
    }, []);

    return (
      <div>
        <TypeTextRender
          typingState={typingState}
          wordsTyped={wordsTyped}
          setTypingState={setTypingState}
          setWordsTyped={setWordsTyped}
        />
      </div>
    );
  };

  return (
    <div
      onClick={focusHandler}
      className={`cursor-pointer ${typingState.focus && "bg-gray-200"}`}
    >
      <KeyboardComponent />
    </div>
  );
};

export default TypingInterface;
