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
  setWordsTyped: React.Dispatch<React.SetStateAction<RenderTyped[]>>;
  typingState: TypingSettings;
  setTypingState: React.Dispatch<React.SetStateAction<TypingSettings>>;
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
