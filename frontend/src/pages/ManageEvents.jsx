import { useState } from "react";
import CreateOnlineEvent from "../components/manage/event/CreateOnlineEvent";
import "./ManageEvents.css";

export default function ManageEvents() {
  const [endPoint, setEndpoint] = useState("physical");

  function handleEndpointSelection(endPoint) {
    setEndpoint(endPoint);
  }

  return (
    <>
      <section className="container">
        <h2 className="manage-events-header">⚙️ Settings</h2>
        <div className="manage-events">
          <ul className="manage-events-navigation">
            <li onClick={() => handleEndpointSelection("physical")}>
              Organize an physical event
            </li>
            <li onClick={() => handleEndpointSelection("online")}>
              Organize an Online event
            </li>
            <li onClick={() => handleEndpointSelection("update-physical")}>
              Update an physical Event
            </li>
            <li onClick={() => handleEndpointSelection("update-online")}>
              Update an online Event
            </li>
            <li onClick={() => handleEndpointSelection("attend")}>
              Attend Requests
            </li>
            <li onClick={() => handleEndpointSelection("delete")}>
              Delete an Event
            </li>
          </ul>

          <div className="manage-events-dashboard">

            {endPoint === "online" && (
              <CreateOnlineEvent/>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
