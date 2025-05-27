import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <h1 className={styles.logo}>Kim Cuong</h1>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/about" className={styles.link}>
            About
          </Link>
          <Link to="/contact" className={styles.link}>
            Contact
          </Link>
          <Link to="/admin" className={styles.link}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
