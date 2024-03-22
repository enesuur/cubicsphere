import { FiTwitter } from "react-icons/fi";
import { BsSnapchat } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import Avatar from "../assets/img/avatar.jpg";
import Banner from "../assets/img/profilebanner.jpg";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState({
    username: "",
    twitter: "",
    instagram: "",
    snapchat: "",
    joinedAt: 0,
    organized: 0,
    attendance: 0,
    biography: "",
    birthday: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 201) {
          const data = await response.json();
          console.log(data);
          setMessage(data.message);
          setUser({
            username: data.username || "",
            twitter: data.twitter || "",
            instagram: data.instagram || "",
            snapchat: data.snapchat || "",
            biography: data.biography || "",
            birthday: data.birthday || "",
            joinedAt: data.joinedAt || 0,
            organized: data.organized || 0,
            attendance: data.attendance || 0,
          });
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

      fetch();
  }, []);

  return (
    <>
      <>
        <section className="profile container">
          <div className="profile-showcase">
            <div className="profile-banner">
              <img src={Banner} alt="profile banner" />
            </div>
            <div className="profile-avatar">
              <img src={Avatar} alt="avatar" />
              <div className="profile-username">
                <span>Username</span>
                <Link to={"/"}>@{user.username}</Link>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-social">
              <div>
                <FiTwitter />
                <span>{user.twitter}</span>
              </div>
              <div>
                <BsSnapchat />
                <span>{user.snapchat}</span>
              </div>
              <div>
                <AiOutlineInstagram />
                <span>{user.instagram}</span>
              </div>
            </div>
            <div className="profile-stats">
              <div>
                <span>Joined At</span>
                <span>{user.joinedAt}</span>
              </div>
              <div>
                <span>Organized</span>
                <span>{user.organized}</span>
              </div>
              <div>
                <span>Attendance</span>
                <span>{user.attendance}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-biography container">
          <article>
            <h2>Biography</h2>
            <p>{user.biography}</p>
            {message}
          </article>
        </section>
      </>
    </>
  );
}
