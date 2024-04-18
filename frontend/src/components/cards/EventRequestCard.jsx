import { useState } from "react";
import { Link } from "react-router-dom";
import "./EventRequestCard.css";
export default function EventRequestCard({ user, eventObj }) {
  const statusStyle = {
    pending: "#ffc400",
    accepted: "green",
    rejected: "#b71c1c",
  };

  let status;
  for (const req of user.eventRequests) {
    if (req.event.toString() === eventObj._id.toString()) {
      status = req.status;
    }
  }

  return (
    <>
      <div className="event-request-card">
        <figure>
          <picture>
            <img
              src={`http://127.0.0.1:5000/event/img/${eventObj._id}`}
              alt="Event Image"
              loading="lazy"
            />
          </picture>
        </figure>
        <div className="event-info">
          <p>
            <span>Event Title:</span>
            <span>{eventObj.title}</span>
          </p>
          <p>
            <span>Event URL:</span>
            <span><Link to={`/event/${eventObj.slug}`} target="_blank">Click for display</Link></span>
          </p>
          <p>
            <span>Event quota:</span>
            <span>{`${eventObj.attendants.length}/${eventObj.quota}`}</span>
          </p>
          <p>
            <span>Request Status:</span>
            <span
              style={{
                color: `${statusStyle[status]}`,
                transition: "background-color 0.3s ease",
              }}
            >
              {status[0].toUpperCase() + status.slice(1)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
