import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Checkup from "../tools/marketing-checkup/Checkup";
import styles from "../tools/marketing-checkup/checkup.module.css";

const description = "Work through seven questions about your leads and the work behind them. You’ll leave with a short list of things to ask your marketing agency.";

export const metadata: Metadata = {
  title: "Service Business Marketing Checkup",
  description: `A free marketing checkup for plumbers, HVAC contractors, electricians, and other service businesses. ${description}`,
  alternates: { canonical: "/checkup" },
  openGraph: {
    title: "Service Business Marketing Checkup | True Path Digital",
    description,
    url: "/checkup",
  },
};

export default function CheckupPage() {
  return (
    <div className={styles.page}>
      <a href="#checkup" className={styles.skip}>Skip to worksheet</a>
      <div className={styles.siteChrome}><Header /></div>
      <main id="checkup" className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Free worksheet / Service Business Marketing Checkup</p>
          <h1>Are your leads worth following up on?</h1>
          <p className={styles.audience}>For plumbers, HVAC contractors, electricians, and other service businesses.</p>
          <p className={styles.lede}>{description}</p>
          <p className={styles.note}>This is a first-pass check, not a complete audit or a verdict on an agency.</p>
        </div>
        <Checkup />
      </main>
      <div className={styles.siteChrome}><Footer /></div>
    </div>
  );
}
