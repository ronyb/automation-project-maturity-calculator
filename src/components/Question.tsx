import React from 'react';

interface QuestionProps {
  question: string;
  answers: string[];
  handleAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, answers, handleAnswer }) => (
  <div>
    <h1>{question}</h1>
    {answers.map((answer, index) => (
      <button key={index} onClick={() => handleAnswer(answer)}>
        {answer}
      </button>
    ))}
  </div>
);

export default Question;
