import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCategory } from "../Redux/Slices/filterSlice";

export default function Categories() {
  const currentCategory = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(changeCategory(index))}
              className={currentCategory === index ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
