import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../../../context/AuthContext";
export default function UpdateProfile() {
  const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name:user?.name ,
    lastname:user?.lastname ,
    phone: user?.phone,
    biography:user?.biography,
  });
  const [editorState, setEditorState] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  useEffect(() => {

    setFormData(prevData => ({
      ...prevData,
      name:user?.name ,
      lastname:user?.lastname ,
      phone: user?.phone,
      biography:user?.biography,
    }));
  }, [user]);


  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  

  function handleEditorState(args) {
    setFormData((prevData) => ({
      ...prevData,
      biography: args,
    }));
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Update Profile</h2>
      <label htmlFor="name">
        Name
        <input type="text" placeholder="Name" id="name" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label htmlFor="lastname">
        Lastname
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="phone">
        Phone
        <input
          type="tel"
          placeholder="Phone"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="biography" className="editor">
        Biography
        <ReactQuill
          theme="snow"
          value={formData.biography}
          onChange={handleEditorState}
        />
      </label>

      <button type="submit">Update</button>
    </form>
  );
}
