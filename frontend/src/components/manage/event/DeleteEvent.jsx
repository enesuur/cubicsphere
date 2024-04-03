import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import EventInfoCard from "../../cards/EventInfoCard";

export default function DeleteEvent() {
  const [message, setMessage] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/event/user-events", {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setEvents(data);
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

  function handleCardSelect(arg) {
    setEventId(arg._id);
    handleDeleteProcess(arg._id);
  }

  function notify(status, serverMessage) {
    if (status === 201) {
      toast.warn(serverMessage, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    if (status === 404 || status === 400) {
      toast.error(serverMessage, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    if (status === 500) {
      toast.error(serverMessage, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
  console.log(events)

  async function handleDeleteProcess(eventId) {
    try {
      const response = await fetch("http://127.0.0.1:5000/event/delete-event", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ eventId: eventId }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setMessage(data.message);
        console.log(data.message);
        console.log(typeof data.message);
        const filteredEvents = events.filter( (event) => event._id !== eventId);
        setEvents(filteredEvents);
        notify(response.status, data.message);
      } else {
        const data = await response.json();
        setMessage(data.message);
        notify(response.status, data.message);
      }
    } catch (error) {
      setMessage(data.message);
      notify(error, data.message);
    }
  }

  return (
    <>
    <h2 className="event-form-header">Delete Events 🗑️</h2>
      {events.length > 0 ? (
        <div className="delete-events">
          {events.map((eventObj, key) => (
            <div key={key}>
              <EventInfoCard
                eventObj={eventObj}
                deletionStatus={true}
                handleCardSelect={handleCardSelect}
                handleDeleteProcess={handleDeleteProcess}
              />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="no-events-header">{"You don't have any event"}❕</h2>
      )}
      <ToastContainer />
    </>
  );
}
