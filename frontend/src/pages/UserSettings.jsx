import { useState } from "react";
import UpdateProfile from "../components/manage/user/UpdateProfile";
import UpdateResidency from "../components/manage/user/UpdateResidency";
import UpdatePassword from "../components/manage/user/UpdatePassword";
import UpdateAvatar from "../components/manage/user/UpdateAvatar";
import UpdateSocialAccounts from "../components/manage/user/UpdateSocialAccounts";
import DeleteUser from "../components/manage/user/DeleteUser";
import "./UserSettings.css";
import UserRequests from "../components/manage/user/UserRequests";

export default function Settings() {
  const [endpoint, setEndpoint] = useState("profile");

  function handleEndpointSelection(endPoint) {
    setEndpoint(endPoint);
  }

  return (
    <section className="container">
      <h2 className="user-settings-header">⚙️ User Settings</h2>
      <div className="user-settings">
        <ul className="user-navigation">
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
          <li onClick={() => handleEndpointSelection("social")}>
            Update Social Accounts
          </li>
          <li onClick={() => handleEndpointSelection("requests")}>
            Attend Requests
          </li>
          <li onClick={() => handleEndpointSelection("delete")}>
            Delete My Account
          </li>
        </ul>

        <div className="user-settings-dashboard">
          {endpoint === "profile" && <UpdateProfile />}
          {endpoint === "residency" && <UpdateResidency />}
          {endpoint === "password" && <UpdatePassword />}
          {endpoint === "avatar" && <UpdateAvatar />}
          {endpoint === "social" && <UpdateSocialAccounts />}
          {endpoint === "requests" && <UserRequests />}
          {endpoint === "delete" && <DeleteUser />}
        </div>
      </div>
    </section>
  );
}
