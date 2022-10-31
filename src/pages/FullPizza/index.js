import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./FullPizza.module.scss";
import { Link } from "react-router-dom";

export default function FullPizza() {
  const [pizza, setPizza] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  // TODO: Типы и сантиметры

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://635197659d64d7c71303cc99.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (err) {
        alert("Пицца не найдена");
        navigate("/");
      }
    }

    fetchPizzas();
  }, []);

  const { imageUrl, title, price, types, sizes, rating } = pizza;

  let ArrayOfStars = new Array(rating);
  let ArrayOfNone = [];

  // const typeNames = ["тонкое", "традиционное"];

  for (let i = 0; i < ArrayOfStars.length; i++) {
    ArrayOfStars[i] = (
      <i key={i} className="uil uil-star" style={{ color: "#fe5f1e" }}></i>
    );
  }

  for (let i = 0; i < 10 - rating; i++) {
    ArrayOfNone[i] = (
      <i key={i} className="uil uil-favorite" style={{ color: "#666" }}></i>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <h2>{title}</h2>
        <img src={imageUrl} alt="pizza" />
        <div>от {price} ₽</div>
        <div className={styles.button}>
          <Link to="/" className="button button--black">
            <span>Назад</span>
          </Link>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div>
          Состав:
          <ul>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
          </ul>
        </div>

        {/* <div>Тесто: {typeArrNames.join(", ")}</div> */}
        {/* <div>Размеры: {sizesArrNames.join(", ")}</div> */}
        <div className={styles.rating}>
          <div>{ArrayOfStars}</div>
          <div>{ArrayOfNone}</div>
        </div>
      </div>
    </div>
  );
}
