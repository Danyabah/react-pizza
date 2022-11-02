import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";

import { setSearch } from "../../Redux/Slices/searchSlice";
import { useAppDispatch } from "../../Redux/store";

export default function Search() {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

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
    inputRef.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
