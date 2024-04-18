import { useContext, useState } from "react";
import toastNotify from "../../../utils/toastNotify";
import { ToastContainer } from "react-toastify";
import AuthContext from "../../../context/AuthContext";

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    verifyNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(user.username);
    fetch(`http://127.0.0.1:5000/user/${user.username}/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: formData.newPassword,
        verifyNewPassword: formData.verifyNewPassword,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
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
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>Update Password 🔐</h2>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="lastname">
          Confirm Password
          <input
            type="password"
            placeholder="Confirm Password"
            name="verifyNewPassword"
            id="verifyNewPassword"
            value={formData.verifyNewPassword}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
      <ToastContainer />
    </>
  );
}
