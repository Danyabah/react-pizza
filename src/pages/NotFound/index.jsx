import React from "react";
import styles from "./NorFound.module.scss";

export default function NotFound() {
  return (
    <div className="container">
      <div className={styles.root}>
        <span>😕</span>
        <br />
        <h1>Ничего не найдено</h1>
        <p>К сожалению данная страница отсутствует в нашем интрнет-магазине</p>
      </div>
    </div>
  );
}
