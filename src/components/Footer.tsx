// src/components/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img src={`${process.env.PUBLIC_URL}/matrix_topq.png`} alt="Company Logo" className="footer-logo" />
    </footer>
  );
};

export default Footer;
