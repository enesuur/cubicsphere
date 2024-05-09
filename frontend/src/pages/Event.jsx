import { ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import toastNotify from "../utils/toastNotify";
import dateConvert from "../utils/dateConvert";
import AuthContext from "../context/AuthContext";
import MapViewer from "../components/MapViewer";
import "./Event.css";
export default function Event() {
  const [eventData, setEventData] = useState({});
  const [organizer, setOrganizer] = useState("");
  const [latestAttendees, setLatestAttendees] = useState([]);
  const [attendCount, setAttendCount] = useState(0);
  const [message, setMessage] = useState("");
  const [btnText, setBtnText] = useState("");
  const [address, setAddress] = useState(null);
  const { slug } = useParams();
  const { user } = useContext(AuthContext);

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
          setAddress(
            `${data.event.address} ` +
              `${data.event.city} ` +
              `${data.event.country}`
          );
          console.log(address);
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
    const result = eventData.attendRequests?.some((item) => {
      return item.user === user._id;
    });

    if (result) {
      setBtnText("Pending");
    } else {
      setBtnText("Attend Event");
    }
  }),
    [eventData];

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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/event/latest-attenders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendList: eventData.attendants,
        eventId: eventData._id,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setMessage(data.message);
          setLatestAttendees(data.latestAttendees);
          console.log(latestAttendees);
          setAttendCount(data.attendarCount);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
        console.log(eventData.attendants);
      });
  }, [eventData]);

  function HTMLRenderer({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  console.log(eventData);

  function handleAttendRequest(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/event/attend-to-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventData._id,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.message, 2324);
          setMessage(data.message);
          toastNotify(response.status, data.message);
          setBtnText("Pending");
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
          toastNotify(response.status, data.message);
        }
      })
      .catch((error) => {
        setMessage(data.message);
        toastNotify(500, data.message);
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
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
              Created At: {dateConvert(eventData.createdAt, true)}
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
                    <span>👉Address: {eventData.address}</span>
                  </p>
                  <p>
                    <span>🏘️City: {eventData.city}</span>
                  </p>
                  <p>
                    <span>📌State: {eventData.state}</span>
                  </p>
                  <p>
                    <span>🌎Country: {eventData.country}</span>
                  </p>
                  <p>
                    <span>🔢Quota: {eventData.quota}</span>
                  </p>
                  <p>
                    <span>
                      📅 Start Date: {dateConvert(eventData.startDate)}
                    </span>
                  </p>
                  <p>
                    <span>📅Due Date: {dateConvert(eventData.dueDate)}</span>
                  </p>
                </article>
              </>
            )}

            <div className="event-attenders">
              <h2
                className="event-page-title"
                style={{ fontSize: "1.5rem", margin: "24px 0 0px 0" }}
              >
                🧑Recent Attenders
              </h2>
              {latestAttendees.length === 0 ? (
                <p>No one has joined yet!</p>
              ) : (
                latestAttendees.map((attender, idx) => (
                  <span 
                  key={idx}
                  style={{color:"blue",textDecoration:"underline"}}
                  >
                    -
                    <Link to={`/profile/${attender.username}`}>
                      {attender.username}
                    </Link>
                  </span>
                ))
              )}
            </div>

            <div className="event-page-organizer">
              <h2
                className="event-page-title"
                style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}
              >
                ⭐Organizer
              </h2>
              <p>
                Organizer:
                <Link
                  to={`/profile/${organizer}`}
                  target="_blank"
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  {organizer}
                </Link>
              </p>
            </div>

            {!eventData.isOnline && (
              <>
                <h2
                  className="event-page-title"
                  style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}
                >
                  📌 Event Location
                </h2>
                {address && <MapViewer eventAddress={address} />}
              </>
            )}
            <button className="btn-attend" onClick={handleAttendRequest}>
              {btnText}
            </button>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
