import {Link} from "react-router-dom";
import "./UserCard.css";
export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <figure>
        <picture>
          <img
            src={`http://127.0.0.1:5000/user/${user.username}/avatar`}
            alt="Event Image"
            loading="lazy"
          />
        </picture>
      </figure>
      <div className="user-info">
        <p>
          <span>Username:</span>
          <span>{user.username}</span>
        </p>
        <p>
          <span>Name:</span>
          <span>{user.name}</span>
        </p>
        <p>
          <span>Lastname:</span>
          <span>{user.lastname}</span>
        </p>
        <p>
          <span>Profile:</span>
          <span>
            <Link to={`/user/${user.slug}`}>Click for display</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
