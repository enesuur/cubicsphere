import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleMenuClick() {
    setOpenMenu(!openMenu);
  }

  return (
    <>
      <nav className="container">
        <div className="nav-header">
          <NavLink to={"/"}>🌎 Cubic Sphere</NavLink>
          <div className="hamburger-menu" onClick={handleMenuClick}>
            <RxHamburgerMenu />
          </div>
        </div>
        <ul
          className="nav-items"
          style={{ display: openMenu || windowWidth > 768 ? "flex" : "none" }}
        >
          {!authContext.isAuthConfirmed && (
            <>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </>
          )}

          {authContext.isAuthConfirmed && (
            <>
              <li>
                <NavLink to={"/events"}>Events</NavLink>
              </li>
              <li style={{ backgroundColor: "var(--background-color)", color:"var(--font-primary-color)", border: "none" }}>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/manage-events"}>Manage Events</NavLink>
              </li>
              <li>
                <NavLink to={"/user-settings"}>Settings</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
