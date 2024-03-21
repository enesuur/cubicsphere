import { FiTwitter } from "react-icons/fi";
import { BsSnapchat } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import Avatar from "../assets/img/avatar.jpg";
import Banner from "../assets/img/profilebanner.jpg";
import React , { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
export default function Profile() {

  
  return (
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
            <Link to={"/"}>@0xThorfin</Link>
          </div>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-social">
          <div>
            <FiTwitter />
            <span>0xenes</span>
          </div>
          <div>
            <BsSnapchat />
            <span>0xenes</span>
          </div>
          <div>
            <AiOutlineInstagram />
            <span>0xenes</span>
          </div>
        </div>
        <div className="profile-stats">
          <div>
            <span>Joined At</span>
            <span>34</span>
          </div>
          <div >
            <span>Organized</span>
            <span>31</span>
          </div>
          <div>
            <span>Attendance</span>
            <span>12</span>
          </div>
        </div>
      </div>
    </section>

    <section className="profile-biography container">
      <article>
        <h2>Biography</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio maiores dolores tenetur pariatur ad quas ea asperiores laborum, voluptatem dolore.
        </p>
      </article>
    </section>
    </>
  );
}