import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactUs.css'; // Import the contact form CSS

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_b4drusc', 'template_x6m1lcf', e.target, 'AWwjvyDMWp2BjvDSq')
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          alert('Message sent successfully!');
      }, (error) => {
          console.error('There was an error sending the email:', error);
          alert('Failed to send message, please try again.');
      });
  };

  return (
    <div className="contact-us">
      <div className="contact-container">
        <h2>Contact Us😉</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="glow-input" />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="glow-input" />
          </label>
          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} required className="glow-input" />
          </label>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
