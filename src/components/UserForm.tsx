// src/components/UserForm.tsx
import React, { useState } from 'react';

interface UserFormProps {
  onSubmit: (formData: { fullName: string; role: string; company: string; email: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ fullName: '', role: '', company: '', email: '' });
  const [errors, setErrors] = useState({ fullName: '', role: '', company: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { fullName: '', role: '', company: '', email: '' };

    if (!formData.fullName) {
      newErrors.fullName = 'שם מלא נדרש';
      valid = false;
    }
    if (!formData.role) {
      newErrors.role = 'תפקיד נדרש';
      valid = false;
    }
    if (!formData.company) {
      newErrors.company = 'חברה נדרשת';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'אימייל נדרש';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-end">
      <div className="mb-3">
        <label className="form-label">שם מלא</label>
        <input
          type="text"
          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">תפקיד</label>
        <input
          type="text"
          className={`form-control ${errors.role ? 'is-invalid' : ''}`}
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">חברה</label>
        <input
          type="text"
          className={`form-control ${errors.company ? 'is-invalid' : ''}`}
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        {errors.company && <div className="invalid-feedback">{errors.company}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">אימייל</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <button type="submit" className="btn btn-primary">התחל את החידון</button>
    </form>
  );
};

export default UserForm;
