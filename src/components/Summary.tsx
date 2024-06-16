// src/components/Summary.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

interface SummaryProps {
  questions: { question: string; answers: string[] }[];
  answers: string[];
  score: number;
  onStartOver: () => void; // Add onStartOver prop
}

const Summary: React.FC<SummaryProps> = ({ questions, answers, score, onStartOver }) => {
  
  const getEmojiAndMessageToUserForScore = (score: number) => {
    if (score <= 49) return { message: 'נראה שרק התחלתם ויש עוד הרבה עבודה לעשות', emoji: '😕' }; 
    if (score <= 69) return { message: 'רואים שכבר עשיתם עבודה, אבל יש עוד לא מעט עבודה לפניכם', emoji: '😏' };
    if (score <= 90) return { message: 'נראה שמצבכם לא רע בכלל, אבל תמיד יש עוד מה להוסיף ולשפר', emoji: '😊' };
    return { message: 'מושלם! נראה שכבר דאגתם להכל והפרויקט מתקתק', emoji: '😃' };
  };

  const { message, emoji } = getEmojiAndMessageToUserForScore(score);

  return (
    <div>

      <h3 className="h5 mb-4 text-center">סיימנו. תודה על השלמת השאלון!</h3>
      <h3 className="h4 mb-4 text-center">בגרות הפרויקט שלכם: {score}% {emoji}</h3>
      <h3 className="h5 mb-4 text-center">{message}</h3>

      <Button variant="primary" className="mt-3" onClick={onStartOver}>
        רוצה להתחיל מחדש
      </Button>
      <br/><br/>
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