import { useState } from "react";
import "./UserSettings.css";

export default function Settings() {
  const [endpoint, setEndpoint] = useState("profile");

  function handleEndpointSelection(endPoint) {
    setEndpoint(endPoint);
  }
  return (
    <section className="container">
      <h2 className="user-settings-header">⚙️ User Settings</h2>
      <div className="user-settings">
        <ul>
          <li onClick={() => handleEndpointSelection("profile")}>
            Update Profile
          </li>
          <li onClick={() => handleEndpointSelection("residency")}>
            Update Residency
          </li>
          <li onClick={() => handleEndpointSelection("password")}>
            Update Password
          </li>
          <li onClick={() => handleEndpointSelection("avatar")}>
            Update Avatar
          </li>
          <li onClick={() => handleEndpointSelection("delete")}>
            Delete My Account
          </li>
        </ul>

        <div className="user-settings-dashboard">
          <form>
            {endpoint === "profile" && (
              <>
                <h2>Update Profile</h2>
                <label htmlFor="name">
                  Name
                  <input type="text" placeholder="Name" id="name" />
                </label>
                <label htmlFor="lastname">
                  Lastname
                  <input type="text" placeholder="Lastname" id="lastname" />
                </label>
                <label htmlFor="phone">
                  Phone
                  <input type="tel" placeholder="Phone" id="phone" />
                </label>
              </>
            )}
            {endpoint === "residency" && (
              <>
                <h2>Update Residency</h2>
                <label htmlFor="city">
                  Name
                  <input type="text" placeholder="City" id="city" />
                </label>
                <label htmlFor="country">
                  Lastname
                  <input type="text" placeholder="Country" id="country" />
                </label>
              </>
            )}
            {endpoint === "password" && (
              <>
                <h2>Update Password</h2>
                <label htmlFor="password">
                  Password
                  <input type="password" placeholder="Password" id="password" />
                </label>
                <label htmlFor="password">
                  New Password
                  <input
                    type="password"
                    placeholder="New Password"
                    id="password"
                  />
                </label>
                <label htmlFor="password">
                  New Password
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    id="password"
                  />
                </label>
              </>
            )}
            {endpoint === "avatar" && (
              <>
                <h2>Update Avatar</h2>
                <label htmlFor="password">
                  Password
                  <input type="password" placeholder="Password" id="password" />
                </label>
              </>
            )}
            {endpoint === "delete" && (
              <>
                <h2>Delete My Account</h2>
              </>
            )}

            <button>Update</button>
          </form>
        </div>
      </div>
    </section>
  );
}
