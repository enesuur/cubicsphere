import {  toast,Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AttendCard.css";
export default function AttendCard({ attender,message,setMessage }) {
  const [statusState, setStatusState] = useState(attender.status);

  const statusStyle = {
    pending: "#ffc400",
    accepted: "green",
    rejected: "#b71c1c",
  };

  function notify(status, serverMessage) {
    if (status === 201) {
      console.log(serverMessage)
      toast.success(serverMessage, {
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
      console.log(serverMessage)
      toast.warn(serverMessage, {
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
      toast.error("Internal server error.", {
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

  function handleAcceptAttender(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/event/accept-attender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: attender.eventId,
        attenderId: attender.user._id,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          setMessage(data.message);
          notify(response.status, data.message);
          setStatusState("Accepted");
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
          notify(response.status, data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
        notify(500, data.message);
      });
  }

  function handleRejectAttender(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/event/reject-attender", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: attender.eventId,
        attenderId: attender.user._id,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          setMessage(data.message);
          notify(response.status, data.message);
          setStatusState("rejected");
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
          notify(response.status, data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
        notify(500, data.message);
      });
  }

  return (
    <>
      <div className="attend-wrapper">
        <div className="attend-card">
          <figure>
            <picture>
              <img
                src={`http://127.0.0.1:5000/user/${attender.user.username}/avatar`}
                alt="Event Image"
                loading="lazy"
              />
            </picture>
          </figure>
          <div className="attend-card-details">
            <p>
              <span>Requested Event Title: {attender.eventTitle}</span>
            </p>
            <p>
              <span>Event link:</span>
              <Link to={`/event/${attender.eventSlug}`} target="_">
                {" "}
                (Click for event)
              </Link>
            </p>
            <p>
              <span>Username:{attender.user.username}</span>
              <Link to={`/profile/${attender.user.username}`} target="_">
                {" "}
                (Click for Profile)
              </Link>
            </p>
            <p>
              <span>Name: {attender.user.name}</span>
            </p>
            <p>
              <span>Lastname:{attender.user.lastname}</span>
            </p>
            <p>
              <span>Contact Mail:{attender.user.email}</span>
            </p>
            <p>
              <span>Phone:{attender.user.phoneNumber}</span>
            </p>
            <p>
              Request Status:
              <span
                className="attender-status"
                style={{
                  color: `${statusStyle[statusState]}`,
                  transition: "background-color 0.3s ease",
                }}    
              >
                {statusState[0].toUpperCase() + statusState.slice(1)}
              </span>
            </p>
          </div>
        </div>
        <div className="attend-btn-container">
          <button
            onClick={handleAcceptAttender}
            className="btn-request"
            style={{
              backgroundColor: "#2e7d32",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1b5e20")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          >
            Accept
          </button>
          <button onClick={handleRejectAttender} className="btn-request">
            Reject
          </button>
        </div>
      </div>
    </>
  );
}
