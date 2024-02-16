import { RenderTyped, PropTypes, TypingSettings } from "../types/TypingTypes";

const TypeSummaryModal = (props: PropTypes) => {
  const { wordsTyped, setTypingState, setWordsTyped, typingStateRef } = props;

  let totalCorrectChar = 0;
  let totalWrongChar = 0;
  wordsTyped.forEach((word: RenderTyped) => {
    totalCorrectChar += word.isCorrect ? word.actual.length : 0;
    totalWrongChar += !word.isCorrect ? word.actual.length : 0;
  });
  const typingAccuracy = (
    (totalCorrectChar / (totalWrongChar + totalCorrectChar)) *
    100
  ).toFixed(0);

  const resetTestHandler = () => {
    setTypingState({
      focus: false,
      currentWord: "",
      typedList: [],
      cursorPosition: 0,
      isDone: false,
    });
    setWordsTyped([]);

    if (typingStateRef.current) {
      typingStateRef.current.focus = false;
      typingStateRef.current.currentWord = "";
      typingStateRef.current.typedList = [];
      typingStateRef.current.cursorPosition = 0;
      typingStateRef.current.isDone = false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Typing test results</h2>
      <p>{`Accuracy : ` + String(typingAccuracy) + "%"} </p>
      <p>{`Correct characters : ` + String(totalCorrectChar)}</p>
      <p>{"Total characters :" + String(totalWrongChar + totalCorrectChar)}</p>
      <button onClick={resetTestHandler}>Reset</button>
    </div>
  );
};

export default TypeSummaryModal;
