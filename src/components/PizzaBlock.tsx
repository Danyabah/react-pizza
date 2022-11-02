import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, selectCurrentPizza } from "../Redux/Slices/cartSlice";
import { useAppDispatch } from "../Redux/store";

export type propsPizza = {
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export default function PizzaBlock({
  id,
  imageUrl,
  price,
  rating,
  sizes,
  title,
  types,
}: propsPizza) {
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  const typeRef = useRef<HTMLUListElement>(null);
  const sizeRef = useRef<HTMLUListElement>(null);

  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ["тонкое", "традиционное"];

  const currentPizza = useSelector(selectCurrentPizza(id));

  const dispatch = useAppDispatch();

  // TODO разделить разные размеры и типы теста
  function handleAddItem() {
    const arrayOfTypes =
      typeRef.current && Array.from(typeRef.current.children);
    const arrayOfSizes =
      sizeRef.current && Array.from(sizeRef.current.children);
    // eslint-disable-next-line array-callback-return
    arrayOfTypes?.map((type: any) => {
      // eslint-disable-next-line array-callback-return
      arrayOfSizes?.map((size: any) => {
        if (size.className === "active") {
          if (type.className === "active") {
            dispatch(
              addItem({
                id,
                imageUrl,
                price,
                title,
                type: type.innerText,
                size: parseInt(size.innerText),
              })
            );
          }
        }
      });
    });
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul ref={typeRef}>
          {types.map((type, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveTypeIndex(index)}
                className={activeTypeIndex === index ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            );
          })}
        </ul>
        <ul ref={sizeRef}>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          onClick={handleAddItem}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {currentPizza && <i>{currentPizza.count}</i>}
        </div>
      </div>
    </div>
  );
}
