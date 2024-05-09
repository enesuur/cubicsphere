import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState,useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "test1@gm.co",
    password: "123123123",
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

  useEffect(() => {
    if (authContext?.user?.username) {
      navigate('/events');
    }
  }, [authContext.user]);

  function handleFormSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      .catch((error) => {
        console.error("Login process failed:", error);
        setMessage(error.message);
      });
  }

  return (
    <section>
      <div className="login container">
        <form onSubmit={handleFormSubmit}>
          <h1>Login your account</h1>
          <p>Welcome back to CubicSphere 👋</p>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </label>
          <button type="submit">Login</button>
          <span className="login-message">{message}</span>
          <hr />
          <span>
            Don't you have an account ?
            <NavLink to={"/register"}>Register</NavLink>
          </span>
        </form>
      </div>
    </section>
  );
}
