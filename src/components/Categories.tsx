import { changeCategory } from "../Redux/Slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../Redux/store";

export default function Categories() {
  const currentCategory = useAppSelector((state) => state.filter.category);
  const dispatch = useAppDispatch();

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
