import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./Register.css";
import AuthContext from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "23",
    email: "23@gm.co",
    name: "23",
    lastname: "23",
    password: "123123123",
    confirmPassword: "123123123",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const { username, name, lastname, email, password, confirmPassword } =
      formData;

    if (
      !username ||
      !name ||
      !lastname ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      console.log("Fill all the fields.");
      setMessage("Fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Password mismatched!");
      setMessage("Password mismatched!");
      return;
    }

    if (/\s/.test(username) || !name.trim() || !lastname.trim()) {
      console.log(
        "Username, name, or lastname cannot be empty or contain spaces."
      );
      setMessage(
        "Username, name, or lastname cannot be empty or contain spaces."
      );
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Please enter a valid email address.");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6 || !password.trim()) {
      console.log(
        "Password must be at least 6 characters long and cannot contain empty spaces."
      );
      setMessage(
        "Password must be at least 6 characters length and cannot contain empty spaces."
      );
      return;
    }

    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        lastname,
        email,
        password,
      }),
      credentials: "include",
    }) 
    .then(async (response) => {
      const data = await response.json();
      if (data.user) {
        authContext.setUser(data.user);
        setMessage(data.message);
        navigate("/events");
      } else {
        authContext.setUser(null);
        setMessage(data.message);
      }
    })
  }

  return (
    <section>
      <div className="register container">
        <form onSubmit={handleFormSubmit}>
          <h1>Register an account</h1>
          <p>You look newbie here. C'mon join us!</p>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="lastname">
            Lastname
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              placeholder="Last Name"
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleFormChange}
            />
          </label>
          <span className="register-message">
            {message}
          </span>
          <button type="submit">Register</button>
          <hr />
          <span>
            Do you have an account ? <NavLink to={"/login"}>Login</NavLink>
          </span>
        </form>
      </div>
    </section>
  );
}
