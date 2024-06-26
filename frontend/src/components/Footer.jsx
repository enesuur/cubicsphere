import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  return (
    <footer>
      <nav className="container">
        <h2 className="navigation-header">Site Navigation</h2>
        <ul className="site-navigation">
          <li>
            <Link to={"/"}>Homepage</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
        <div className="footer-aside">
          <div className="footer-info">
            <h2 className="footer-title">CubicSphere</h2>
            <p className="footer-subtitle">Gathers people on sphere 🌎</p>
          </div>
          <div className="social-links-wrapper">
            <h2>Social Accounts</h2>
            <div className="social-links">
              <a href="#">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83A7.72 7.72 0 0 0 23 3Z"></path>
                </svg>
              </a>

              <a href="#">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              <a href="#">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.75 3.118A2.344 2.344 0 0 0 19.412.797L4.577.75A2.327 2.327 0 0 0 2.25 3.071v15.304c0 1.28 1.044 2.25 2.327 2.25H17.25l-.61-2.063 5.11 4.688V3.118ZM15.218 15.46s-.409-.487-.75-.906c1.488-.419 2.055-1.335 2.055-1.335a6.517 6.517 0 0 1-1.305.668c-.53.22-1.082.383-1.646.487a7.973 7.973 0 0 1-2.94-.011 8.65 8.65 0 0 1-1.668-.488 6.647 6.647 0 0 1-.829-.385c-.034-.022-.068-.034-.102-.057-.023-.01-.034-.022-.047-.022-.204-.114-.318-.193-.318-.193s.545.895 1.987 1.325c-.34.43-.76.929-.76.929-2.51-.08-3.463-1.71-3.463-1.71 0-3.612 1.635-6.545 1.635-6.545C8.7 6.006 10.245 6.04 10.245 6.04l.113.136c-2.043.577-2.973 1.472-2.973 1.472s.25-.136.67-.318c1.214-.532 2.179-.668 2.577-.713.064-.013.128-.02.193-.023a9.64 9.64 0 0 1 2.293-.022 9.451 9.451 0 0 1 3.417 1.076s-.897-.851-2.827-1.428l.159-.18s1.555-.035 3.179 1.179c0 0 1.634 2.932 1.634 6.544 0-.013-.954 1.618-3.462 1.697Z"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M9.94 10.219c-.647 0-1.158.555-1.158 1.245 0 .69.522 1.246 1.158 1.246.647 0 1.158-.555 1.158-1.246.012-.692-.511-1.245-1.158-1.245Z"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M14.083 10.219c-.647 0-1.158.555-1.158 1.245 0 .69.522 1.246 1.158 1.246.647 0 1.157-.555 1.157-1.246 0-.69-.521-1.245-1.157-1.245Z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}
