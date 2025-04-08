import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './DownloadTicket.css';

function DownloadTicket() {
  const location = useLocation();
  const { event, user, barcodeNumber } = location.state || {};
  const ticketRef = useRef();

  const handleDownload = async () => {
    const ticketElement = ticketRef.current;
    const canvas = await html2canvas(ticketElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save('ticket.pdf');
  };

  return (
    <div className="download-ticket-page">
      <header className="DownloadTicket-header">
        <h1>Download Ticket</h1>
        {event && user ? (
          <>
            <div className="ticket-details" ref={ticketRef}>
              <img src={require('./assets/eventifylogo.png')} alt="Eventify" className="logo" />
              <h2>Event Details</h2>
              <p><strong>Event Name:</strong> {event.EventName}</p>
              <p><strong>Event Date:</strong> {event.EventDate.split('T')[0]}</p>
              <p><strong>Description:</strong> {event.Description}</p>
              <p><strong>Ticket Price:</strong> ₹{event.TicketPrice}</p>
              <h2>User Information</h2>
              <p><strong>Name:</strong> {user.Name}</p>
              <p><strong>Mobile Number:</strong> {user.MobileNumber}</p>
              <p><strong>Email:</strong> {user.Email}</p>
              <h2>Ticket QR Code</h2>
              <QRCodeCanvas value={barcodeNumber} className="qrcode" />
            </div>
            <button onClick={handleDownload} className="navigate-button">Download Ticket</button>
          </>
        ) : (
          <p>No event or user information available.</p>
        )}
      </header>
    </div>
  );
}

export default DownloadTicket;
