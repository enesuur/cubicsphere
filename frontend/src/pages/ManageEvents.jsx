import { useState } from "react";
import CreateOnlineEvent from "../components/manage/event/CreateOnlineEvent";
import "./ManageEvents.css";
import CreatePhsyicalEvent from "../components/manage/event/CreatePhysicalEvent";
import UpdateOnlineEvent from "../components/manage/event/UpdateOnlineEvent";
import AttendRequests from "../components/manage/event/AttendRequest";
import UpdatePhysicalEvent from "../components/manage/event/UpdatePhysicalEvent";
import DeleteEvent from "../components/manage/event/DeleteEvent";
import MyEvents from "../components/manage/event/MyEvents";

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
              Manage Requests
            </li>
            <li onClick={() => handleEndpointSelection("events")}>
              Your events
            </li>
            <li onClick={() => handleEndpointSelection("delete-event")}>
              Delete an Event
            </li>
          </ul>

          <div className="manage-events-dashboard">
            {endPoint === "physical" && <CreatePhsyicalEvent />}
            {endPoint === "online" && <CreateOnlineEvent />}
            {endPoint === "update-online" && <UpdateOnlineEvent />}
            {endPoint === "update-physical" && <UpdatePhysicalEvent />}
            {endPoint === "attend" && <AttendRequests />}
            {endPoint === "events" && <MyEvents />}
            {endPoint === "delete-event" && <DeleteEvent />}
          </div>
        </div>
      </section>
    </>
  );
}
