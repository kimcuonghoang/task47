import React from "react";
import styles from "./notfound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.glowBox}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Trang bạn tìm không tồn tại.</p>
        <Link to="/" className={styles.homeBtn}>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
