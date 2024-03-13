import WorldImg from "../assets/img/world.png";
import ChessImg from "../assets/img/chess.png";
import TrekkingImg from "../assets/img/trekking.png";
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
                <h2>Connect to world</h2>
                <p>
                  Kurumlar insanların düşüncelerini öngörmek için topladıkları
                  verilerden grafikler, tablolar oluşturmaya ve analiz yapmaya
                  çalışıyor
                  Kurumlar insanların düşüncelerini öngörmek için topladıkları
                  verilerden grafikler, tablolar oluşturmaya ve analiz yapmaya
                  çalışıyor               Kurumlar insanların düşüncelerini öngörmek için topladıkları
                  verilerden grafikler, tablolar oluşturmaya ve analiz yapmaya
                  çalışıyor
                </p>
              </article>
            </div>

            <div className="card-item">
              <article>
                <h2>Connect to world</h2>
                <p>
                  Kurumlar insanların düşüncelerini öngörmek için topladıkları
                  verilerden grafikler, tablolar oluşturmaya ve analiz yapmaya
                  çalışıyor
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
                  <img src={TrekkingImg} alt="Trekking with a friend." loading="lazy" />
                </picture>
              </figure>
              <article>
                <h2>Connect to world</h2>
                <p>
                  Kurumlar insanların düşüncelerini öngörmek için topladıkları
                  verilerden grafikler, tablolar oluşturmaya ve analiz yapmaya
                  çalışıyor
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
