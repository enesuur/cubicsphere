import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";

export default function UpdateSocialAccounts() {
    const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    twitter: user?.twitter,
    instagram: user?.instagram,
    snapchat: user?.snapchat
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/user/${user.username}/update-socials`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        twitter:formData.twitter,
        instagram:formData.instagram,
        snapchat:formData.snapchat
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
          user.residency = formData;
        }
        if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          console.log(data.message);
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(error.message);
        setMessage(error.message);
      });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Update Social Accounts 📱</h2>
      <label htmlFor="twitter">
        Twitter
        <input
          type="text"
          placeholder="Twitter username"
          id="twitter"
          name="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="country">
        Snapchat
        <input
          type="text"
          placeholder="Snapchat username"
          name="snapchat"
          id="snapchat"
          value={formData.snapchat}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="instagram">
        Instagram
        <input
          type="text"
          placeholder="Instagram username"
          name="instagram"
          id="instagram"
          value={formData.instagram}
          onChange={handleInputChange}
        />
      </label>
      <span>{message}</span>
      <button type="submit">Update</button>
    </form>
  );
}
