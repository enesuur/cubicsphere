import { useState } from "react";
import ReactQuill from "react-quill";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-quill/dist/quill.snow.css";

export default function CreateOnlineEvent() {
  const [editorState, setEditorState] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    quota: 0,
    category: "",
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

    fetch(`http://127.0.0.1:5000/event/create-online-event`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          setMessage(data.message);
          notify(response.status, data.message);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          setMessage(data.message);
          notify(response.status, data.message);
        }
      })
      .catch((error) => {
        setMessage(data.message);
        notify(error, data.message);
      });
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <h2 className="event-form-header">🎮 Organize an online event </h2>
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

            <img
              src={fileUrl}
              alt="Preview"
              style={{ maxWidth: "256px", borderRadius: "4px" }}
            />
          </div>
        )}
        <span style={{ textAlign: "center" }}>{message}</span>
        <button type="submit" className="btn-submit">
          Create Event
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
