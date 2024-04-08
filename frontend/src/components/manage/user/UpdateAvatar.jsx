import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";

export default function UpdateAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(AuthContext);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setAvatar(file);
  }

  useEffect(() => {
    if (avatar) {
      const imgElement = document.getElementById("avatar-photo");
      if (imgElement && avatar) {
        imgElement.src = URL.createObjectURL(avatar);
      }
    }
  }, [avatar]);

  useEffect(() => {
    function getUserAvatar() {
      fetch(`http://127.0.0.1:5000/user/${user.username}/avatar`, {
        method: "GET",
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
    getUserAvatar();
  }, [, user.profileImgUrl]);
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    fetch(`http://127.0.0.1:5000/user/${user.username}/update-avatar`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
          user.profileImgUrl = data.profileImgUrl;
          setUser(user);
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
      <h2>Update Avatar 📸</h2>
      <label className="profile-avatar-container">
        <img
          id="avatar-photo"
          src={`http://127.0.0.1:5000/user/${user.username}/avatar`}
          alt="Profile Avatar"
          loading="lazy"
        />
      </label>
      <label htmlFor="avatar" className="profile-avatar-update">
        Avatar
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      <span>{message}</span>
      <button type="submit">Update Avatar</button>
    </form>
  );
}
