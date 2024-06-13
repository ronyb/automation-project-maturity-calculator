// src/components/Question.tsx
import React from 'react';

interface QuestionProps {
  question: string;
  answers: string[];
  handleAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, answers, handleAnswer }) => (
  <div>
    <h1 className="h5 mb-4">{question}</h1>
    {answers.map((answer, index) => (
      <button
        key={index}
        className="btn btn-primary me-2 mb-2"
        onClick={() => handleAnswer(answer)}
      >
        {answer}
      </button>
    ))}
  </div>
);

export default Question;