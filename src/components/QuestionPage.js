import { useState, useEffect } from "react";
import { questions } from "../utils/constants";
const QuestionPage = () => {
  const [selectedOption, setSelectedOption] = useState(``);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(``);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    //because the score was not getting updates in the final page changes
    if (questionNumber === questions.length - 1) {
      setMessage(`You've completed the quiz. Your score is ${score}`);
    }
  }, [score]);

  const resetData = () => {
    setMessage(``);
    setQuestionNumber(0);
    setQuizCompleted(false);
    setSelectedOption(``);
    setScore(0);
  };

  const handleSubmit = () => {
    if (selectedOption.includes(questions[questionNumber].answer)) {
      setMessage("Correct answer, update score here");
      setScore((prev) => prev + 1);
    }
    if (questionNumber < questions.length - 1) {
      setQuestionNumber((prev) => prev + 1);
    } else {
      setMessage(`You've completed the quiz. Your score is ${score}`);
      setQuizCompleted(true);
    }
  };

  return (
    <>
      <h4>Q. {questions[questionNumber].question}</h4>
      <div>
        <form>
          {questions[questionNumber].options.map((option, index) => (
            <div key={index} className="radio">
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                />
                {option}
              </label>
            </div>
          ))}
        </form>
        <button disabled={quizCompleted} onClick={() => handleSubmit()}>
          Submit
        </button>
        {quizCompleted && (
          <>
            <hr />
            <h4>{message}</h4>
            <button onClick={() => resetData()}>Retake quiz</button>
          </>
        )}
      </div>
    </>
  );
};

export default QuestionPage;
