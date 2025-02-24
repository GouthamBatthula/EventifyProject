import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, user } = location.state || {};

  const generateBarcodeValue = () => {
    // Generate a unique barcode value using event and user details
    return `${event.EventName}-${user.Email}-${new Date().getTime()}`;
  };

  const handlePayment = () => {
    console.log('Event:', event);
    console.log('User:', user);

    const barcodeNumber = generateBarcodeValue();

    const options = {
      key: 'rzp_test_0ma4eogwIsHkeW', // Replace with your Razorpay key
      amount: event.TicketPrice * 100, // Amount in paise
      currency: 'INR',
      name: event.EventName,
      description: event.Description,
      handler: async function (response) {
        console.log('Payment response:', response);
        alert('Payment successful!');
        // Save payment details to the database
        const res = await fetch('http://localhost:5000/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event,
            user,
            paymentId: response.razorpay_payment_id,
            barcodeNumber
          }),
        });
        if (res.ok) {
          // Redirect to the download ticket page
          navigate('/download-ticket', { state: { event, user, barcodeNumber } });
        } else {
          alert('Failed to save payment details');
        }
      },
      prefill: {
        name: user.Name,
        email: user.Email,
        contact: user.MobileNumber,
      },
      theme: {
        color: '#3399cc',
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error('Razorpay script not loaded');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="payment-page">
      <header className="Payment-header">
        <h1>Payment Page</h1>
        {event && user ? (
          <div className="payment-details">
            <>
              <h2>Event Details</h2>
              <p><strong>Event Name:</strong> <span>{event.EventName}</span></p>
              <p><strong>Event Date:</strong> <span>{event.EventDate.split('T')[0]}</span></p>
              <p><strong>Description:</strong> <span>{event.Description}</span></p>
              <p><strong>Ticket Price:</strong> <span>₹{event.TicketPrice}</span></p>
              <h2>User Information</h2>
              <p><strong>Name:</strong> <span>{user.Name}</span></p>
              <p><strong>Mobile Number:</strong> <span>{user.MobileNumber}</span></p>
              <p><strong>Email:</strong> <span>{user.Email}</span></p>
              {/* Add payment form or integration here */}
              <form onSubmit={handleSubmit}>
                <button type="submit" className="navigate-button">Continue for Payment</button>
              </form>
            </>
          </div>
        ) : (
          <p>No event or user information available.</p>
        )}
      </header>
    </div>
  );
}

export default Payment;