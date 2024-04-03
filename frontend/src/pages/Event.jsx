import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Event.css";
export default function Event() {
  const [eventData, setEventData] = useState({});
  const [organizer, setOrganizer] = useState("");
  const [message, setMessage] = useState("");
  const { slug } = useParams();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    const month = date.getMonth();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const year = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const formattedStartDate = formatDate(eventData.startDate);
  const formattedDueDate = formatDate(eventData.dueDate);
  const publishedDay = formatDate(eventData.createdAt);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/event/${slug}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setEventData(data.event);
          setOrganizer(data.event.organizer);
          setMessage(data.message);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

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
  }, [eventData]);

  function HTMLRenderer({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  return (
    <>
      <section>
        <div className="event-page container">
          <div className="event-header">
            <h2 className="event-page-title">{eventData.title}</h2>
            <span className="event-publish-date">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
                <path d="M3 10h18"></path>
              </svg>
              Created At: {publishedDay}
            </span>

            <figure>
              <picture>
                <img
                  src={`http://127.0.0.1:5000/event/img/${eventData._id}`}
                  alt="Event Image"
                  loading="lazy"
                />
                <figcaption>Caption:{eventData.title} Cover Image</figcaption>
              </picture>
            </figure>
          </div>
          <article className="event-body">
            <h2
              className="event-page-title"
              style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}
            >
              📙Event Description
            </h2>
            <HTMLRenderer htmlContent={eventData.description} />
          </article>

          <div className="event-footer">
            {!eventData.isOnline && (
              <>
                <h2
                  className="event-page-title"
                  style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}
                >
                  📍Event Location
                </h2>
                <article className="event-location">
                  <p>
                    <span>Address: {eventData.address}</span>
                  </p>
                  <p>
                    <span>City: {eventData.address}</span>
                  </p>
                  <p>
                    <span>State: {eventData.address}</span>
                  </p>
                  <p>
                    <span>Country: {eventData.address}</span>
                  </p>
                </article>
              </>
            )}

            <div className="event-attenders">
              <h2
                className="event-page-title"
                style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}
              >
                🧑Attenders
              </h2>
            </div>

            <div className="event-page-organizer">
              <h2
                className="event-page-title"
                style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}
              >
                ⭐Organizer
              </h2>
              <p>Organizer:{organizer}</p>
            </div>
            <button>Attend Event</button>
          </div>
        </div>
      </section>
    </>
  );
}
