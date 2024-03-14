import NormalPlanImg from "../../assets/img/normalMembership.png";
import PremiumPlanImg from "../../assets/img/premiumMembership.png";
import CommercialPlanImg from "../../assets/img/commercialMember.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PriceCard.css";
export default function PriceCard({ title, cost, texts }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  function handleOnClickEvent() {
    navigate("/");
  }

  useEffect(() => {
    if (title === "Normal") {
      setImage(NormalPlanImg);
    } else if (title === "Premium") {
      setImage(PremiumPlanImg);
    } else if (title === "Commercial") {
      setImage(CommercialPlanImg);
    }
  }, [title]);

  return (
    <div className="price-card container">
      <figure>
        <picture>
          <img src={image} alt="Image of price card" loading="lazy" />
        </picture>
      </figure>
      <article>
        <h2>{title}</h2>
        <h3>{cost}</h3>
        {texts.map((text) => (
          <p key={text}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
            >
              <path
                fill="#c8e6c9"
                d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"
              ></path>
              <path
                fill="#4caf50"
                d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"
              ></path>
            </svg>
            {text}
          </p>
        ))}
      </article>
      <button className="btn-pricing" onClick={handleOnClickEvent}>
          See Details
        </button>
    </div>
  );
}
