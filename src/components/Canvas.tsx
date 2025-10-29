'use client';
import React from 'react';
import { RenderTyped, PropTypes, Cursor } from '@/types/typing';
import useTestSettingsStore from '@/stores/useTestSettingStore';
import TypingCursor from '@/components/TypingCursor';
import ModalTypeSummary from '@/components/ModalTypeSummary';

const Canvas = ({ propPackage }: { propPackage: PropTypes }): JSX.Element => {
  const { testSetting } = useTestSettingsStore();
  const { typingState, wordsTyped } = propPackage;

  const lenWordList: number = testSetting.wordList.length;
  const lenWordsTyped: number = wordsTyped.length;

  const wordCursePosition: number =
    typingState.cursorPosition === 0
      ? 0
      : wordsTyped[lenWordsTyped - 1]?.excess
      ? wordsTyped[lenWordsTyped - 1].typed.length - wordsTyped[lenWordsTyped - 1].actual.length - 1
      : wordsTyped[lenWordsTyped - 1]?.actual.length
      ? wordsTyped[lenWordsTyped - 1]?.typed.length - 1
      : 0;

  let cursorPosition: Cursor = {
    wordIndex: lenWordsTyped ? lenWordsTyped - 1 : 0,
    wordPosition: wordCursePosition,
    isFrontOfWord: wordCursePosition % 2 === 0,
    isExcess: wordsTyped[lenWordsTyped - 1]?.excess ? true : false,
  };

  return (
    <div>
      <div className="flex flex-wrap flex-row max-w-[50vw] text-[1.5vw]">
        {!typingState.isDone ? (
          <div
            className={`flex flex-row flex-wrap p-[0.7vw] rounded-lg ${
              !(typingState.focus || typingState.isDone) && 'blur-sm'
            }`}
          >
            {wordsTyped.map((typedWord: RenderTyped, index: number) => (
              <span key={index} className={`relative flex flex-row ml-[1vw]`}>
                <TypingCursor
                  position="front"
                  index={index}
                  charIndex={-1}
                  typingState={typingState}
                  lenWordsTyped={lenWordsTyped}
                  wordsTyped={wordsTyped}
                  cursorPosition={cursorPosition}
                />
                <span className="flex flex-row">
                  {typedWord.actual.split('').map((actualChar: string, charIndex: number) => (
                    <span key={index + ':' + charIndex} className="relative flex flex-row">
                      {/* TYPED CHAR */}
                      <TypingCursor
                        position="body"
                        index={index}
                        charIndex={charIndex}
                        typingState={typingState}
                        lenWordsTyped={lenWordsTyped}
                        wordsTyped={wordsTyped}
                        cursorPosition={cursorPosition}
                      />
                      <p
                        className={`pl-[0.05vw] ${
                          !wordsTyped[index].isCorrect &&
                          !(wordsTyped[index].incorrectIndex - 1 >= charIndex) &&
                          'text-red-700'
                        }`}
                      >
                        {actualChar}
                      </p>
                    </span>
                  ))}
                </span>
                <span className="flex flex-row text-red-700">
                  {typedWord.excess.split('').map((excessChar: string, charExIndex: number) => (
                    <span key={index + ':' + charExIndex} className="flex flex-row">
                      {/* EXCESS CHAR */}
                      <p className="relative pl-[0.05vw]">
                        {excessChar}
                        <TypingCursor
                          position="excess"
                          index={index}
                          charIndex={charExIndex}
                          typingState={typingState}
                          lenWordsTyped={lenWordsTyped}
                          wordsTyped={wordsTyped}
                          cursorPosition={cursorPosition}
                        />
                      </p>
                    </span>
                  ))}
                </span>
              </span>
            ))}
            {testSetting.wordList.slice(lenWordsTyped, lenWordList + 1).map((correctWord: string, index: number) => (
              <span className="relative flex flex-row ml-[1vw]" key={index}>
                <span className="flex flex-row">
                  {correctWord.split('').map((actualChar: string, charIndex: number) => (
                    <span key={index + ':' + charIndex} className="flex flex-row">
                      {/* UNTYPED CHAR */}
                      <p
                        className={`relative pl-[0.05vw]
                      }`}
                      >
                        {actualChar}
                      </p>
                    </span>
                  ))}
                </span>{' '}
              </span>
            ))}
          </div>
        ) : (
          <ModalTypeSummary propPackage={propPackage} />
        )}
      </div>
    </div>
  );
};

export default Canvas;
