import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePhysicalEvent() {
  const [editorState, setEditorState] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Webinar");
  const [message, setMessage] = useState("");
  const [fileUrl,setFileUrl] = useState("");
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
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("startDate", formData.startDate);
    data.append("dueDate", formData.dueDate);
    data.append("quota", formData.quota);
    data.append("category", formData.category);
    data.append("address", formData.address);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("city", formData.city);
    data.append("eventImage", file);
    
    fetch(`http://127.0.0.1:5000/event/create-physical-event`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
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

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <h2>Create a Physical Event</h2>
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

      <label htmlFor="eventImage">
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
  );
}
