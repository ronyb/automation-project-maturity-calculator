// src/components/Summary.tsx
import React from 'react';

interface SummaryProps {
  questions: { question: string; answers: string[] }[];
  answers: string[];
  score: number;
}

const Summary: React.FC<SummaryProps> = ({ questions, answers, score }) => {
  
  const maxScore = questions.length * 5;
    
  return (
    <div>
      <h3 className="h5 mb-4 text-center">סיימנו. תודה על השלמת השאלון :)</h3>
      <h3 className="h4 mb-4 text-center">בגרות הפרויקט שלכם: {score}%</h3>
      <ul className="list-group">
        {questions.map((q, index) => (
          <li key={index} className="list-group-item">
            <strong>{index+1}. {q.question}</strong>
            <br />
            <span className={answers[index] === q.answers[0] ? 'text-success' : 'text-danger'}>
              {answers[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
