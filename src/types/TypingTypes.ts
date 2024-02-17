// TypingTypes.ts

export interface Setting {
  fontStyle: string;
  wordList: string[]; // Correct text
  duration: number;
  allowedMods: Set<string>;
  allowedKeys: Set<string>;
}

export interface TypingSettings {
  focus: Boolean;
  currentWord: string;
  typedList: string[]; // User's typed text
  cursorPosition: number;
  isDone: Boolean;
}

export interface RenderTyped {
  // Store rendered text (and validation)
  actual: string;
  typed: string;
  excess: string;
  isCorrect: boolean;
  incorrectIndex: number;
}

export interface PropTypes {
  wordsTyped: RenderTyped[];
  typingState: TypingSettings;
  typingStateRef: React.RefObject<TypingSettings>;
  time: TimeType;
  setTypingState: React.Dispatch<React.SetStateAction<TypingSettings>>;
  setWordsTyped: React.Dispatch<React.SetStateAction<RenderTyped[]>>;
  setTime: React.Dispatch<React.SetStateAction<TimeType>>;
}

export interface Cursor {
  wordIndex: number;
  wordPosition: number;
  isFrontOfWord: boolean;
  isExcess: boolean;
}

export interface ModKeyEvent {
  mod: string;
  modEvent: string;
}

export interface Timer {
  duration: number;
  status: string; // running, completed, waiting, inactive
  isSelectTime: boolean;
}

export interface TimeType {
  duration: number;
  status: string; // running, completed, waiting, inactive
}
