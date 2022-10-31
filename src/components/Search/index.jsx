import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";

import { useDispatch } from "react-redux";
import { setSearch } from "../../Redux/Slices/searchSlice";

export default function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 500),
    []
  );

  const clear = () => {
    setValue("");
    dispatch(setSearch(""));
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    memoSearch(e.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
      />
      {value.length ? (
        <i
          className="uil uil-times"
          style={{ cursor: "pointer" }}
          onClick={clear}
        ></i>
      ) : (
        <i className="uil uil-search"></i>
      )}
    </div>
  );
}
