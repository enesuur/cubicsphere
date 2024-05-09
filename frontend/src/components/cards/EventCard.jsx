import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

export default function EventCard({ eventObj }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [organizer, setOrganizer] = useState(eventObj.organizer);
  const strippedText = eventObj.description.replace(/(<([^>]+)>)/gi, "");
  const snippet = strippedText.slice(0, 128);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    const month = date.getMonth();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const year = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/find-user-by-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: organizer,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setMessage(data.message);
          setOrganizer(data.username);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        setMessage(error.message);
      });
  }, []);

  
  function navigateToEvent(event) {
    event.preventDefault();
    navigate(`/event/${eventObj.slug}`);

  }
  const formattedStartDate = formatDate(eventObj.startDate);
  const formattedDueDate = formatDate(eventObj.dueDate);
  return (
    <div className="event-card container">
      <div className="event-card-header">
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
        <p className="event-card-snippet">🧩 Snippet: {snippet}</p>
      </div>
      <div className="event-details">
        <p>
          <span>📅 Start Date:</span>
          {formattedStartDate}
        </p>
        <p>
          <span>📅 Due Date:</span>
          {formattedDueDate}
        </p>
        <p>
          <span>📌 City:24</span>
        </p>
        <p>
          <span>🔢 Quota: {`${eventObj.attendants.length - 1}/${eventObj.quota}`}</span>
        </p>
        <p>
          <span>⭐Organizer:</span>
          {organizer}
        </p>
      </div>
      <div className="btn-navigate-container">
        <button
          className="btn-navigate"
          onClick={(event) => navigateToEvent(event)}
        >
          Go to event
        </button>
      </div>
    </div>
  );
}
