import React, { useEffect, useRef } from "react";
import Sort, { sortNames } from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaSkeleton";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../Redux/Slices/filterSlice";
import { fetchPizzas } from "../Redux/Slices/pizzaSlice";
import { useAppDispatch, useAppSelector } from "../Redux/store";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const filterInfo = useAppSelector((state) => state.filter);

  const search = useAppSelector((state) => state.search.search);

  const { items, status } = useAppSelector((state) => state.pizza);

  const { category, sort, order } = filterInfo;

  const getPizzas = async () => {
    dispatch(fetchPizzas({ ...filterInfo }));
    window.scrollTo(0, 0);
  };

  // Если еще не было первого рендера, то не вшиваем в адресную строку параметры,
  // иначе вшиваем
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        category,
        order,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;

    // TODO: возможно ошибка
    if (!window.location.search) {
      getPizzas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order, category]);

  // если был первый рендер проверяем URL параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const category = Number(params.category);
      const sort = sortNames.find((obj) => obj.value === params.sort);
      const order = sortNames.find((obj) => obj.order === params.order);

      dispatch(
        setFilters({
          category,
          sort: sort ? sort.value : "rating",
          order: order ? order.order : "desc",
        })
      );

      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // если пришли параметры из URL, тогда ждем их и не фетчим пиццы еще раз
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order, category]);

  const skeletons = [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />);

  const pizzas = items
    .filter((item: any) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    })
    .map((obj: any) => {
      return <PizzaBlock key={obj.id} {...obj} />;
    });

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {status === "error" ? (
        <div className="content__error">
          <h2>
            Пиццы не найдены <span>😕</span>
          </h2>
          <p>
            Вероятней всего, произошла ошибка.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        </>
      )}
    </div>
  );
}
