import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EventInfoCard from "../../cards/EventInfoCard";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";

export default function UpdatePhysicalEvent() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editorState, setEditorState] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Webinar");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    quota: 0,
    category: "Webinar",
    address: "",
    state: "",
    country: "",
    city: "",
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleCardSelect(arg) {
    setSelectedEvent(arg);
    setFormData({
      eventId: arg._id,
      title: arg.title,
      description: arg.description,
      startDate: arg.startDate,
      dueDate: arg.dueDate,
      quota: arg.quota,
      category: arg.category,
      address: arg.address,
      state: arg.state,
      country: arg.country,
      city: arg.city,
    });
  }

  function handleEditorState(des) {
    setFormData((prevData) => ({
      ...prevData,
      description: des,
    }));
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("eventId", formData.eventId);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("startDate", formData.startDate);
    data.append("dueDate", formData.dueDate);
    data.append("quota", formData.quota);
    data.append("category", formData.category);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("eventImage", file);

    fetch(`http://127.0.0.1:5000/event/update-physical-event`, {
      method: "PUT",
      body: data,
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          setMessage(data.message);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        setMessage(error.message);
      });
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/event/user-physical-events", {
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
          console.log(data.message);
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        setMessage(error.message);
      });
  }, []);

  function notify(status, serverMessage) {
    if (status === 201) {
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

  return (
    <>
      <h2 className="event-form-header">Update physical events 📝</h2>
      {events.length === 0 && (
        <h2 className="no-events-header">No physical events to update❕</h2>
      )}

      {selectedEvent == null && (
        <div className="update-online-event">
          {events.map((eventObj, key) => (
            <EventInfoCard
              key={key}
              eventObj={eventObj}
              handleCardSelect={handleCardSelect}
            />
          ))}
        </div>
      )}

      {selectedEvent !== null && (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <label htmlFor="title">
            Event Name
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label htmlFor="description" className="editor">
            Event Description
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleEditorState}
            />
          </label>
          <label htmlFor="startDate">
            Event Date
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label htmlFor="dueDate">
            Due Date
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="quota">
            Quota
            <input
              type="number"
              id="quota"
              name="quota"
              value={formData.quota}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="category">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Webinar">Webinar</option>
              <option value="Conference">Conference</option>
            </select>
          </label>

          <label htmlFor="address">
            Address
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="city">
            City
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="state">
            State
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="country">
            Country
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="eventImage" className="event-file-label">
            Upload Image
            <input
              type="file"
              id="eventImage"
              name="eventImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {file && (
            <div className="preview-image">
              <h2 style={{ textAlign: "center" }}>Preview:</h2>

              <img src={fileUrl} alt="Preview" style={{ maxWidth: "256px" }} />
            </div>
          )}
          {message}
          <button type="submit" className="btn-submit">
            Create Event
          </button>
        </form>
      )}
      <ToastContainer />
    </>
  );
}
