// src/App.tsx
import React, { useState } from 'react';
import { questions } from './questions';
import QuestionComponent from './components/Question';
import Summary from './components/Summary';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          {isSummary ? (
            <Summary questions={questions} answers={answers} />
          ) : (
            <QuestionComponent
              question={questions[currentQuestion].question}
              answers={questions[currentQuestion].answers}
              handleAnswer={handleAnswer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
