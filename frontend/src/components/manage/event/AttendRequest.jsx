import { useEffect, useState } from "react";
import AttendCard from "../../cards/AttendCard";
import { ToastContainer } from "react-toastify";

export default function AttendRequests() {
  const [attendersArr, setAttendersArr] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/event/get-event-attenders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setAttendersArr(data.attenders);
          setMessage(data.message);
          setPendingRequests(
            data.attenders.filter((attender) => attender.status === "pending")
          );
          setAcceptedRequests(
            data.attenders.filter((attender) => attender.status === "accepted")
          );
          setRejectedRequests(
            data.attenders.filter((attender) => attender.status === "rejected")
          );
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
      });
  }, [attendersArr, pendingRequests, acceptedRequests, rejectedRequests]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <>
      {attendersArr.length === 0 && (
        <h2 className="event-form-header">{message} 🤕</h2>
      )}
      <div className="event-attenders">
        <h2 className="event-form-header">Attend Requests 🚩</h2>
        <ul className="toggle-requests">
          <li
            onClick={() => handleStatusChange("pending")}
            className="toggle-req-item"
          >
            Pending Requests⏳
          </li>
          <li
            onClick={() => handleStatusChange("accepted")}
            className="toggle-req-item"
          >
            Accepted Requests ✅
          </li>
          <li
            onClick={() => handleStatusChange("rejected")}
            className="toggle-req-item"
          >
            Rejected Requests ❌
          </li>
        </ul>

        {selectedStatus === "pending" && (
          <>
            {pendingRequests.length === 0 ? (
              <h3 className="toggle-request-title">No Pending requests. 🤕</h3>
            ) : (
              pendingRequests.map((attender, idx) => (
                <AttendCard
                  key={idx}
                  attender={attender}
                  message={message}
                  setMessage={setMessage}
                />
              ))
            )}
          </>
        )}

        {selectedStatus === "accepted" && (
          <>
            {acceptedRequests.length === 0 ? (
              <h3 className="toggle-request-title">No Accepted requests. 🤕</h3>
            ) : (
              acceptedRequests.map((attender, idx) => (
                <AttendCard
                  key={idx}
                  attender={attender}
                  message={message}
                  setMessage={setMessage}
                />
              ))
            )}
          </>
        )}

        {selectedStatus === "rejected" && (
          <>
            {rejectedRequests.length === 0 ? (
              <h3 className="toggle-request-title">No Rejected requests. 🤕</h3>
            ) : (
              rejectedRequests.map((attender, idx) => (
                <AttendCard
                  key={idx}
                  attender={attender}
                  message={message}
                  setMessage={setMessage}
                />
              ))
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
