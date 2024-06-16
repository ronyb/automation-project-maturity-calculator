// src/components/UserForm.tsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface UserFormProps {
  onSubmit: (formData: { fullName: string; role: string; company: string; email: string }) => void;
  onSkip: () => void; // Add the onSkip prop
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onSkip }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    company: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="text-end">
      
      <div>
        <p>תוהים איפה אתם עומדים בעבודה על פיתוח פרויקט הבדיקות האוטומטיות שלכם?</p>
        <p>מחשבון זה שפיתחנו על סמך הניסיון שצברנו מעשרות פרויקטי אוטומציה שהובלנו במרוצת השנים, יאפשר לכם לקבל הערכה של מידת הבשלות והבגרות של פרויקט האוטומציה בארגון שלכם.</p>
        <p>נא מלאו את הפרטים שלכם בטופס שלמטה, ונתחיל בשאלון קצר של 20 שאלות שבסופו תקבלו הערכה עבור פרויקט האוטומציה שלכם.</p>
      </div>
      <br/><br/>
      <Form.Group controlId="formFullName">
        <Form.Label>שם מלא</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formRole">
        <Form.Label>תפקיד</Form.Label>
        <Form.Control
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCompany">
        <Form.Label>חברה</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>מייל</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br/>
      <Button variant="primary" type="submit" className="mt-3 ml-3 mr-3">
        בואו נתחיל
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="secondary" className="mt-3 mr-3" onClick={onSkip}>
        לדלג ישר לשאלון
      </Button>
      
    </Form>
  );
};

export default UserForm;