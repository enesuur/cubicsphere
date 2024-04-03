import React, { useState } from "react";
import "./EventInfoCard.css";

export default function EventInfoCard({
  eventObj,
  handleCardSelect,
  deletionStatus,
}) {
  const [message, setMessage] = useState("");
  const [eventImage, setEventImage] = useState("");

  const strippedText = eventObj.description.replace(/(<([^>]+)>)/gi, "");
  const snippet = strippedText.slice(0, 64);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    const month = date.getMonth();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const year = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  const formattedStartDate = formatDate(eventObj.startDate);
  const formattedDueDate = formatDate(eventObj.dueDate);

  return (
    <div className="event-info-card container">
      <div className="event-info-header">
        <h2>Title: {eventObj.title}</h2>
        <figure>
          <picture>
            <img
              src={`http://127.0.0.1:5000/event/img/${eventObj._id}`}
              alt="Event Image"
              loading="lazy"
            />
          </picture>
        </figure>
      </div>
      <div className="event-info-details">
        <p>
          <span>Category:{eventObj.category}</span>
        </p>
        <p>
          <span>Title: {eventObj.title}</span>
        </p>
        <p>
          <span>Snippet:{snippet}...</span>
        </p>
        <p>
          <span>Start Date:{formattedStartDate}</span>
        </p>
        <p>
          <span>Due Date:{formattedDueDate}</span>
        </p>
        <p>
          <span>Quota:{eventObj.quota}</span>
        </p>
        {!eventObj.isOnline && (
          <>
            <p>
              <span>City:{eventObj.city}</span>
            </p>
            <p>
              <span>Country:{eventObj.country}</span>
            </p>
          </>
        )}
      </div>

      <button className="btn-update" onClick={() => handleCardSelect(eventObj)}>
        {deletionStatus ? "Delete Event" : "Update Event"}
      </button>
    </div>
  );
}
