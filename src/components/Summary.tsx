// src/components/Summary.tsx
import React from 'react';
import { Question } from '../questions';

interface SummaryProps {
  questions: Question[];
  answers: string[];
}

const Summary: React.FC<SummaryProps> = ({ questions, answers }) => (
  <div>
    <h1 className="h5 mb-4">Summary</h1>
    {questions.map((question, index) => (
      <div key={index} className="mb-3">
        <p className="fw-bold mb-1">{question.question}</p>
        <p className="mb-0">{answers[index]}</p>
      </div>
    ))}
  </div>
);

export default Summary;