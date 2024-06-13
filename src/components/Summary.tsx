import React from 'react';

interface SummaryProps {
  answers: string[];
}

const Summary: React.FC<SummaryProps> = ({ answers }) => (
  <div>
    <h1>Summary</h1>
    {answers.map((answer, index) => (
      <p key={index}>{`Question ${index + 1}: ${answer}`}</p>
    ))}
  </div>
);

export default Summary;
