import { FiTwitter } from "react-icons/fi";
import { BsSnapchat } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import Avatar from "../assets/img/avatar.jpg";
import Banner from "../assets/img/profilebanner.jpg";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";

// HTML içeriğini güvenli bir şekilde render etmek için bileşen
function HTMLRenderer({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState({
    name:"",
    lastname: "",
    username: "",
    twitter: "",
    instagram: "",
    snapchat: "",
    joinedAt: 0,
    organized: 0,
    attendance: 0,
    biography: "",
    birthday: "",
    profileImgUrl: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response ) => {
      const data = await response.json();
      const { user } = data; 
      setUser({
        name: user.name || "",
        lastname: user.lastname || "",
        username: user.username || "",
        twitter: user.twitter || "",
        instagram: user.instagram || "",
        snapchat: user.snapchat || "",
        joinedAt: user.joinedAt || 0,
        organized: user.organized || 0,
        attendance: user.attendance || 0,
        biography: user.biography || "",
        birthday: user.birthday || "",
        profileImgUrl: user.profileImgUrl || "",
      });
    });
  }, []);

  useEffect(() => {
    function getUserAvatar() {
      fetch(`http://127.0.0.1:5000/user/${user.username}/avatar`, {
        method: "GET",
        credentials: "include",
      })
        .then(async (response) => {
          if (response.status === 202) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            console.log(imageUrl);
          }
          if (response.status === 404 || response.status === 400) {
            console.log("Resource was not exist.");
          }
        })
        .catch((error) => {
          console.log(error.message);
          setMessage(error.message);
        });
    }
    getUserAvatar();
  }, []);

  return (
    <>
        <section className="profile container">
          <div className="profile-showcase">
            <div className="profile-banner">
              <img src={Banner} alt="profile banner" />
            </div>
            <div className="profile-avatar">
              <img src={`http://127.0.0.1:5000/user/${user.username}/avatar`} alt="avatar" loading="lazy" />
              <div className="profile-username">
                <span>{user.name} {user.lastname}</span>
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
            <HTMLRenderer htmlContent={user.biography} />
            {message}
          </article>
        </section>
    </>
  );
}
