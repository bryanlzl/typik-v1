import { RenderTyped, PropTypes, TypingSettings } from "../types/TypingTypes";

const TypeSummaryModal = ({ propPackage }: { propPackage: PropTypes }) => {
  const { wordsTyped, setTypingState, setWordsTyped, typingStateRef } =
    propPackage;

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

  return (
    <div className="flex flex-col items-center w-[50vw] text-gray-500">
      <h2>Typing test results</h2>
      <p>{`Accuracy : ` + String(typingAccuracy) + "%"} </p>
      <p>{`Correct characters : ` + String(totalCorrectChar)}</p>
      <p>{"Total characters :" + String(totalWrongChar + totalCorrectChar)}</p>
    </div>
  );
};

export default TypeSummaryModal;
