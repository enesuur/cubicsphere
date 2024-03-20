import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";

export default function DeleteUser() {
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  function handleFormSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/user/delete-user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
          setUser(null);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(data.message);
      });
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>Delete Account</h2>
        <label className="delete-information">
          <h3>
            You agree that the following data will be deleted by processing
            delete operation.
          </h3>
          <ul>
            <li>👤 User profile</li>
            <li>🏠 Residence information</li>
            <li>🔑 Password</li>
            <li>🖼️ Avatar</li>
            <li>📄 Other personal information</li>
            <li>💬 Sent messages</li>
            <li>📝 Created content</li>
            <li>💬 Comments</li>
            <li>🗑️ Associated data</li>
          </ul>
        </label>
        <span className="delete-warning">
          {message == "" ? "Note: ONCE YOU DELETE YOUR ACCOUNT YOU CANNOT RECOVER YOUR ACCOUNT" : message}
        </span>
        <button type="submit">Delete my account</button>
      </form>
    </>
  );
}
