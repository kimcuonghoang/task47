import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.text}>
          Welcome to MyWebsite! We are passionate about delivering the best
          digital experience, combining innovative design with seamless user
          interaction. Whether you're here to game, shop, or just explore, we’ve
          built this platform to amaze and inspire.
        </p>
        <p className={styles.text}>
          Our mission is to make the web more fun, more beautiful, and more
          user-friendly.
        </p>
      </div>
    </main>
  );
}
