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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid dolor ducimus consectetur? At porro modi voluptatum!
                  Quos ullam numquam beatae cumque vitae quia itaque nesciunt
                  adipisci velit nobis officiis eligendi, odio voluptates iusto
                  iste quas obcaecati inventore aliquam veritatis reiciendis!
                </p>
              </article>
            </div>

            <div className="card-item">
              <article>
                <h2>Events</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda odit ut rerum expedita ipsum sunt ratione nemo iusto
                  asperiores nisi aperiam possimus veniam excepturi voluptatum
                  illum quod, impedit tempora quisquam quae earum obcaecati
                  temporibus. Beatae reprehenderit delectus aliquid dignissimos
                  vel.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas dolores ipsam reiciendis assumenda nihil unde
                  voluptatum odit corrupti blanditiis accusamus? Perferendis
                  totam voluptas consequuntur voluptatum sed repudiandae
                  veritatis ex quos necessitatibus laudantium, libero animi ad
                  dignissimos corrupti, error ullam exercitationem?
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
