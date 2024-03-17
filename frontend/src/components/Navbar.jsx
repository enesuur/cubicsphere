import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";

export default function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const authContext = useContext(AuthContext);

  
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
      <nav className="navigation container">
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
                <NavLink to={"/login"} onClick={handleMenuClick}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"} onClick={handleMenuClick} >Register</NavLink>
              </li>
            </>
          )}

          {authContext.isAuthConfirmed && (
            <>
              <li>
                <NavLink to={"/events"} onClick={handleMenuClick} >Events</NavLink>
              </li>
              <li style={{ backgroundColor: "var(--background-color)", color:"var(--font-primary-color)", border: "none" }}>
                <NavLink to={"/profile"} onClick={handleMenuClick} >Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/manage-events"} onClick={handleMenuClick} >Manage Events</NavLink>
              </li>
              <li>
                <NavLink to={"/user-settings"} onClick={handleMenuClick} >Settings</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
