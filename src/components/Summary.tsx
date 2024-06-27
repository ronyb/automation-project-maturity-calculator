// src/components/Summary.tsx
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Summary.css';
import ClientDetails from '../ClientDetails';
import emailjs from 'emailjs-com';

interface SummaryProps {
  questions: { question: string; answers: string[] }[];
  answers: string[];
  score: number;
  clientDetails: ClientDetails;
  onStartOver: () => void;
}

const Summary: React.FC<SummaryProps> = ({ questions, answers, score, clientDetails, onStartOver }) => {
  
  const sendEmail = () => {
    
    let clientDetailsStr = '<div dir="rtl">';
    clientDetailsStr += `שם מלא: ${clientDetails.fullName}<br/>`;
    clientDetailsStr += `תפקיד: ${clientDetails.role}<br/>`;
    clientDetailsStr += `חברה: ${clientDetails.company}<br/>`;
    clientDetailsStr += `מייל: ${clientDetails.email}<br/><br/>`;

    let answersStr = answers.map((str, index) => `${index+1}: ${str}`).join("<br/>");

    let messageBody = clientDetailsStr;
    messageBody += "ציון: " + score + "<br/><br/>";
    messageBody += answersStr;
    messageBody += "</div>"

    console.log(messageBody);
    
    const templateParams = {
      from_name: clientDetails.fullName,
      company: clientDetails.company,
      message: messageBody,
      to_email: 'ronen.byalsky@top-q.co.il; itai.agmon@top-q.co.il;',
    };

    console.log("Going to send email...");
    console.log(templateParams);

    emailjs.send('service_rq9aowp', 'template_clyv9qc', templateParams, 'ApFIQHrCQrTasqTMl')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });
  };

  useEffect(() => {
    sendEmail();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const getEmojiAndMessageToUserForScore = (score: number) => {
    if (score < 50) return { message: 'נראה שרק התחלתם ויש עוד הרבה עבודה לעשות.', emoji: '😕' }; 
    if (score < 70) return { message: 'רואים שכבר עשיתם עבודה, אבל יש עוד לא מעט עבודה לפניכם.', emoji: '😏' };
    if (score < 90) return { message: 'נראה שמצבכם לא רע בכלל. אבל היי, הרי תמיד יש עוד מה להוסיף ולשפר.', emoji: '🙂' };
    return { message: 'מושלם! נראה שכבר דאגתם כמעט להכל והפרויקט מתקתק.', emoji: '🤩' };
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
      <ul className="list-group summary-list">
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
