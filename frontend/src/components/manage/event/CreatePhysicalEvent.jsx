/* Create an online event component.
returns a form to the manageEvent dashbaord.
*/
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
export default function CreatePhsyicalEvent() {
  const [editorState, setEditorState] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Webinar");
  const [onlineEventData, setOnlineEventData] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    quota: "",
    category: "",
    address: "",
    state: "",
    country: "",
    city: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setOnlineEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleEditorState(des) {
    setOnlineEventData((prevData) => ({
      ...prevData,
      description: des,
    }));
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Physical Event</h2>
      {console.log(onlineEventData)}
      {console.log(editorState)}
      <label htmlFor="title">
        Event Name
        <input
          type="text"
          id="title"
          name="title"
          value={onlineEventData.title}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="description">
        Event Description
        <ReactQuill
          theme="snow"
          value={onlineEventData.description}
          onChange={handleEditorState}
        />
      </label>
      <label htmlFor="startDate">
        Event Date
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={onlineEventData.eventDate}
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
          value={onlineEventData.dueDate}
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
          value={onlineEventData.quota}
          onChange={handleInputChange}
          required
        />
      </label>

      <label htmlFor="category">
        <select
          id="category"
          name="category"
          value={onlineEventData.category}
          onChange={handleInputChange}
        >
          <option value={onlineEventData.category}>Webinar</option>
          <option value={onlineEventData.category}>Conference</option>
        </select>
      </label>

      <label htmlFor="address">
        Address
        <input
          type="text"
          id="address"
          name="address"
          value={onlineEventData.address}
          onChange={handleInputChange}
          required
        />
      </label>

      
      <label htmlFor="city">
        Address
        <input
          type="text"
          id="city"
          name="city"
          value={onlineEventData.city}
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
          value={onlineEventData.state}
          onChange={handleInputChange}
          required
        />
      </label>
      
      <label htmlFor="state">
        Country
        <input
          type="text"
          id="country"
          name="country"
          value={onlineEventData.country}
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
      {console.log(file)}
      {file && (
        <div className="preview-image">
          <h2 style={{ textAlign: "center" }}>Preview:</h2>
          <img src={file} alt="Preview" style={{ maxWidth: "256px" }} />
        </div>
      )}
      <button type="submit" className="btn-submit">
        Create Event
      </button>
    </form>
  );
}
