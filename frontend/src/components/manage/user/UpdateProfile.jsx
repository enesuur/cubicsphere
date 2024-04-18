import ReactQuill from "react-quill";
import toastNotify from "../../../utils/toastNotify";
import { ToastContainer } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../../../context/AuthContext";
export default function UpdateProfile() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name,
    lastname: user?.lastname,
    phoneNumber: user?.phoneNumber,
    biography: user?.biography,
  });
  const [editorState, setEditorState] = useState("");
  const [message, setMessage] = useState("");

  console.log(toastNotify);
  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/user/${user.username}/update-user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        lastname: formData.lastname,
        phoneNumber: formData.phoneNumber,
        biography: formData.biography,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
          user.residency = formData;
          toastNotify(response.status, data.message);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
          toastNotify(response.status, data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        setMessage(error.message);
        toastNotify(500, data.message);
      });
  }
  console.log(formData);
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: user?.name,
      lastname: user?.lastname,
      phone: user?.phone,
      biography: user?.biography,
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
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>Update Profile 😎</h2>
        <label htmlFor="name">
          Name
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
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
            name="phoneNumber"
            id="phone"
            value={formData.phoneNumber}
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
        <button style={{ marginTop: "72px" }} type="submit">Update</button>
      </form>
      <ToastContainer />
    </>
  );
}
