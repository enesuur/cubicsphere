import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";

export default function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    
  }, [authContext.user]);

  function handleMenuClick() {
    setOpenMenu(!openMenu);
  }

  function handleLogout(){
    fetch("http://127.0.0.1:5000/logout", {
      method: "GET",
      credentials: "include",
    }) 
    .then(async (response) => {
      if (response.ok) {
        console.log("Successfully logged out");
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Logout failed:", error.message);
    })
    .finally(() => {
      setOpenMenu(!openMenu);
    });
    authContext.setUser(null);
    navigate("/")
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
          {!authContext.user && (
            <>
              <li>
                <NavLink to={"/login"} onClick={handleMenuClick}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"} onClick={handleMenuClick} >Register</NavLink>
              </li>
            </>
          )}

          {authContext.user && (
            <>
              <li>
                <NavLink to={"/events"} onClick={handleMenuClick} >Events</NavLink>
              </li>
              <li style={{ backgroundColor: "var(--background-color)", color:"var(--font-primary-color)", border: "none" }}>
                <NavLink to={`/profile/${authContext.user.username}`} onClick={handleMenuClick} >Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/manage-events"} onClick={handleMenuClick} >Manage Events</NavLink>
              </li>
              <li>
                <NavLink to={"/user-settings"} onClick={handleMenuClick} >Settings</NavLink>
              </li>
              <li>
                <NavLink to={"/"} onClick={handleLogout} >Logout</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
