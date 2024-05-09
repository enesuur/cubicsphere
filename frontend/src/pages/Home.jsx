import WorldImg from "../assets/img/world.png";
import ChessImg from "../assets/img/chess.png";
import TrekkingImg from "../assets/img/trekking.png";
import PriceCard from "../components/cards/PriceCard";
import "./Home.css";

export default function Home() {
  return (
    <>
      <section>
        <div className="hero container">
          <article>
            <h1>
              Gather on <span>Cubic Sphere!</span>
            </h1>
            <p>Find, meet, enjoy!</p>
          </article>
        </div>
      </section>

      <section>
        <div className="features container">
          <div className="card-container">
            <div className="card-item">
              <figure>
                <picture>
                  <img src={WorldImg} alt="Explore the world." loading="lazy" />
                </picture>
              </figure>
              <article>
                <h2>Global</h2>
                <p>
                  Introducing Gather on Cubic Sphere: Your global connection hub
                  for spontaneous meetups, cultural exploration, and meaningful
                  encounters. Explore the world, connect with people based on
                  location, and embrace the diversity of our planet. Join us and
                  redefine the way you experience the world.
                </p>
              </article>
            </div>

            <div className="card-item">
              <article>
                <h2>Events</h2>
                <p>
                  Social is a groundbreaking app that enhances social
                  connectivity and enriches interpersonal relationships. With
                  features catering to all social needs, from meeting new
                  friends to organizing gatherings, Social provides a seamless
                  and intuitive user experience. Join today and experience a new
                  level of socialization that enhances your life in countless
                  ways.
                </p>
              </article>
              <figure>
                <picture>
                  <img src={ChessImg} alt="Playing chess." loading="lazy" />
                </picture>
              </figure>
            </div>

            <div className="card-item">
              <figure>
                <picture>
                  <img
                    src={TrekkingImg}
                    alt="Trekking with a friend."
                    loading="lazy"
                  />
                </picture>
              </figure>
              <article>
                <h2>Social</h2>
                <p>
                  Social is a groundbreaking app that enhances social
                  connectivity and enriches interpersonal relationships. With
                  features catering to all social needs, from meeting new
                  friends to organizing gatherings, Social provides a seamless
                  and intuitive user experience. Join today and experience a new
                  level of socialization that enhances your life in countless
                  ways.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="memberships-header">Memberships</h2>
          <div className="membership-plans">
            <PriceCard
              title={"Normal"}
              cost={"0$"}
              texts={[
                "Limited Event Posting",
                "Normal Customization",
                "Limited Attendance",
              ]}
            />
            <PriceCard
              title={"Premium"}
              cost={"10$"}
              texts={[
                "50 Events Posting",
                "Special Customization",
                "Filter Attendance",
              ]}
            />
            <PriceCard
              title={"Commercial"}
              cost={"50$"}
              texts={[
                "Unlimited Event Posting",
                "Accessing analytics",
                "Filter Attendance",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
