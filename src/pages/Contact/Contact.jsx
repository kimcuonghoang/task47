import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <main className={styles.contact}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Your Name" className={styles.input} />
          <input
            type="email"
            placeholder="Your Email"
            className={styles.input}
          />
          <textarea
            placeholder="Your Message"
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
