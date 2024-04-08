import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";

export default function UpdateResidency() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    city: "",
    country: "",
  });
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
    console.log(user.username)
    fetch(`http://127.0.0.1:5000/user/${user.username}/update-residency`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city:formData.city,
        country:formData.country
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
      <h2>Update Residency 🏠</h2>
      <label htmlFor="city">
        City
        <input
          type="text"
          placeholder="City"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="country">
        Country
        <input
          type="text"
          placeholder="Country"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleInputChange}
        />
      </label>
      <span>{message}</span>
      <button type="submit">Update</button>
    </form>
  );
}
