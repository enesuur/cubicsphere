import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EventInfoCard from "../../cards/EventInfoCard";
import "react-quill/dist/quill.snow.css";

export default function UpdateOnlineEvent() {
  const [editorState, setEditorState] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Webinar");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [events,setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    quota: 0,
    category: "Webinar",
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

    fetch(`http://127.0.0.1:5000/event/create-online-event`, {
      method: "GET",
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
    fetch("http://127.0.0.1:5000/event/user-online-events", {
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

  return (
    <>
       <div>
      {events.map((event, key) => (
        <EventInfoCard
        key={key} event={event} />
      ))}
    </div>
    </>
  );
}
