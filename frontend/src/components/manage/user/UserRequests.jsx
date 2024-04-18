import { useState, useEffect } from "react";
import EventRequestCard from "../../cards/EventRequestCard";

export default function UserRequests() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState();
  const [eventIds, setEventIds] = useState([]);
  const [requestedEvents, setRequestedEvents] = useState([]);

  function handleEventIds(eventRequests) {
    const temp = eventRequests.map((obj) => obj.event);
    setEventIds(temp);
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/retrieve-user`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setUser(data.user);
          handleEventIds(data.user.eventRequests);
          setMessage(data.message);
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

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/event/get-requested-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventIds }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setRequestedEvents(data);
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
  }, [eventIds]);
  console.log(requestedEvents);
  return (
    <div className="requested-events">
      <h2 style={{ textAlign: "center" }}>Requested Events ✉️</h2>
      {requestedEvents.length > 0 ? (
        requestedEvents.map((item, idx) => (
          <EventRequestCard key={idx} eventObj={item} user={user} />
        ))
      ) : (
        <p style={{textAlign:"center"}}>No requested events to show.. 🤕</p>
      )}
    </div>
  );
}
