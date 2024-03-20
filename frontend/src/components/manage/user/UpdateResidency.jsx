import { useState } from "react";

export default function UpdateResidency() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Update Password</h2>
      <label htmlFor="name">
        Password
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="lastname">
        Confirm Password
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Update</button>
    </form>
  );
}