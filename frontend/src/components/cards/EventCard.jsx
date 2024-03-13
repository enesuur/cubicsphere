import React from "react";
import BgImg from "../../assets/img/world.png";
import "./EventCard.css";

export default function EventCard({
  title,
  description,
  date,
  time,
  location,
}) {
  return (
    <div className="event-card container">
      <div className="event-header">
        <h2>{title}</h2>
        <img src={BgImg} alt="Event Image"/>
        <p>{description}
        </p>
      </div>
      <div className="event-details">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>City:</strong> {location}
        </p>
      </div>
      <div className="event-owner">
        <p><span>Owner:</span> <span>K0ntak</span></p>
      </div>
    </div>
  );
}
