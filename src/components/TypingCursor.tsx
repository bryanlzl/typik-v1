import { Cursor, RenderTyped, TypingSettings } from '@/types/typing';

const TypingCursor = ({
  position,
  index,
  charIndex,
  typingState,
  lenWordsTyped,
  wordsTyped,
  cursorPosition,
}: {
  position: string;
  index: number;
  charIndex: number;
  typingState: TypingSettings;
  lenWordsTyped: number;
  wordsTyped: RenderTyped[];
  cursorPosition: Cursor;
}): JSX.Element => {
  if (position === 'body') {
    const isShown: boolean =
      cursorPosition.wordIndex === index &&
      !cursorPosition.isExcess &&
      !!typingState.currentWord &&
      cursorPosition.wordPosition == charIndex;
    return <span className={`absolute animate-blink-cursor right-[-0.23vw] ${isShown ? 'block' : 'hidden'}`}>|</span>;
  } else if (position === 'front') {
    const isShown: boolean = wordsTyped[lenWordsTyped - 1].typed.length === 0 && cursorPosition.wordIndex === index;
    return <span className={`absolute animate-blink-cursor left-[-0.2vw] ${isShown ? 'block' : 'hidden'}`}>|</span>;
  } else if (position === 'excess') {
    const isShown: boolean =
      cursorPosition.wordIndex === index &&
      cursorPosition.isExcess &&
      !!typingState.currentWord &&
      cursorPosition.wordPosition == charIndex;
    return (
      <span
        className={`absolute top-0 animate-blink-cursor text-black right-[-0.23vw] ${isShown ? 'block' : 'hidden'}`}
      >
        |
      </span>
    );
  } else {
    return <span className="hidden"></span>;
  }
};

export default TypingCursor;
