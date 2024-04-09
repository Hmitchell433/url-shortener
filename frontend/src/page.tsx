import AllUrls from "../src/components/AllUrls";
import { ShortenUrlForm } from "../src/components/ShortenUrlForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <h2>URL Shortener</h2>
        <p>Enter the URL to shorten</p>
        <div className={styles.spacer} />
        <ShortenUrlForm />
        <div className={styles.spacer} />
      </div>
      <AllUrls />
    </main>
  );
}
