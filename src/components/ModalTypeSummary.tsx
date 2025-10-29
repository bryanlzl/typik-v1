import { RenderTyped, PropTypes } from '@/types/typing';

const ModalTypeSummary = ({ propPackage }: { propPackage: PropTypes }): JSX.Element => {
  const { wordsTyped } = propPackage;
  let totalCorrectChar: number = 0;
  let totalWrongChar: number = 0;
  wordsTyped.forEach((word: RenderTyped, index: number) => {
    if (index === wordsTyped.length - 1) {
      totalCorrectChar +=
        word.incorrectIndex == -1 && word.typed.length === word.actual.length ? word.actual.length : 0;
      totalWrongChar += word.incorrectIndex != -1 && word.typed.length === word.actual.length ? word.actual.length : 0;
    } else {
      totalCorrectChar += word.isCorrect ? word.actual.length : 0;
      totalWrongChar += !word.isCorrect ? word.actual.length : 0;
    }
  });
  const totalChar: number = totalWrongChar + totalCorrectChar;
  const typingAccuracy = totalChar > 0 ? ((totalCorrectChar / totalChar) * 100).toFixed(0) : 0;

  return (
    <div className="flex flex-col items-center w-[50vw] text-gray-500">
      <h2>Typing test results</h2>
      <p>{`Accuracy : ` + String(typingAccuracy) + '%'} </p>
      <p>{`Correct characters : ` + String(totalCorrectChar)}</p>
      <p>{'Total characters :' + String(totalWrongChar + totalCorrectChar)}</p>
    </div>
  );
};

export default ModalTypeSummary;
