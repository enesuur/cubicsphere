import React, { useEffect, useState } from "react";
import "./EventInfoCard.css";

export default function EventInfoCard({ event }) {
  const [message,setMessage] = useState("");
  const [eventImage,setEventImage] = useState("");
  console.log(event)
  return (
    <div className="event-info-card container">
      <div className="event-info-header">
        <h2>{event.title}</h2>
        <img src={`http://127.0.0.1:5000/event/img/${event._id}`} alt="Event Image" loading="lazy" />
        <p>{event.biography}</p>
      </div>
      <div className="event-info-details">
        <p>
          <strong>Category:</strong> {event.category}
        </p>
        <p>
          <strong>Time:</strong> {event.date}
        </p>
        <p>
          <strong>City:</strong> {event.location}
        </p>
      </div>
    </div>
  );
}
