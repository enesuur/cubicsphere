import { NavLink } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section>
      <div className="not-found container">
        <article>
          <h1>
            <span>404</span> NOT FOUND!
          </h1>
          <h2>
            Oops.. Something went <span>wrong</span> :(
          </h2>
          <NavLink to={"/"}>Return Homepage</NavLink>
        </article>
      </div>
    </section>
  );
}
