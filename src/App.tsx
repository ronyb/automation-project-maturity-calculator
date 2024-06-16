// src/App.tsx
import React, { useState } from 'react';
import { questions } from './questions';
import QuestionComponent from './components/Question';
import Summary from './components/Summary';
import UserForm from './components/UserForm';
import Footer from './components/Footer'; // Import the Footer component
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Import custom CSS

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [score, setScore] = useState<number>(0);
  const [isSummary, setIsSummary] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Update score
    if (answer === questions[currentQuestion].answers[0]) {
      setScore(score + 5); // Assuming the first answer is always 'Yes'
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSummary(true);
      sendEmail(newAnswers); // Call function to send email here
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Decrease score if the user is going back from a 'Yes' answer
      if (answers[currentQuestion - 1] === questions[currentQuestion - 1].answers[0]) {
        setScore(score - 5);
      }
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setScore(0);
    setIsSummary(false);
    setIsFormSubmitted(false);
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

  const handleFormSubmit = (formData: { fullName: string; role: string; company: string; email: string }) => {
    console.log('Form Data:', formData);
    setIsFormSubmitted(true);
  };

  const handleSkip = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 rtl">
      <div className="card w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
          <h1 className="mb-4">מחשבון בגרות פרויקט אוטומציה</h1>
          {isFormSubmitted ? (
            isSummary ? (
              <Summary questions={questions} answers={answers} score={score} onStartOver={handleStartOver} />
            ) : (
              <QuestionComponent
                question={questions[currentQuestion].question}
                answers={questions[currentQuestion].answers}
                handleAnswer={handleAnswer}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                handlePrevious={handlePrevious}
              />
            )
          ) : (
            <UserForm onSubmit={handleFormSubmit} onSkip={handleSkip} />
          )}
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default App;
