// src/App.tsx
import React, { useState } from 'react';
import { questions, Question } from './questions';
import QuestionComponent from './components/Question';
import Summary from './components/Summary';
import emailjs from 'emailjs-com';

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [isSummary, setIsSummary] = useState<boolean>(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSummary(true);
      sendEmail(newAnswers); // Call function to send email here
    }
  };

  const sendEmail = (answers: string[]) => {
    const templateParams = {
      answers: answers.join(', '),
      to_email: 'your-email@example.com',
    };
  
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });
  };

  return (
    <div>
      {isSummary ? (
        <Summary answers={answers} />
      ) : (
        <QuestionComponent
          question={questions[currentQuestion].question}
          answers={questions[currentQuestion].answers}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default App;
