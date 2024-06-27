// src/components/Question.tsx
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import './Question.css';

interface QuestionProps {
  question: string;
  answers: string[];
  handleAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
  handlePrevious: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, answers, handleAnswer, currentQuestion, totalQuestions, handlePrevious }) => {
  
  const progressBarNow = ((currentQuestion+1) / totalQuestions) * 100;
  
  const handleAnswerClick = (answer: string) => {
    handleAnswer(answer);
  };

  return (
    <div className="text-end">
      
      <ProgressBar now={progressBarNow} label={`שאלה ${currentQuestion + 1} מתוך ${totalQuestions}`} className="custom-progress-bar1"/>
      <br/>
      <h1 className="h5 mb-4">{question}</h1>
      <div className="d-grid gap-2">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`btn btn-lg ${index === 0 ? 'btn-success' : 'btn-danger'}`}
            //style={{ height: '3rem' }}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </button>
        ))}
        {currentQuestion > 0 && (
          <button
            className="btn btn-outline-secondary btn-lg mt-2"
            style={{ height: '3rem' }}
            onClick={handlePrevious}
          >
            לשאלה הקודמת
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
