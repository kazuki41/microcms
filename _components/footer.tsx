"use client";

import styles from "../styles/home.module.scss";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.footerContent}>
          <div className={styles.snsLinks}>
            <a href="https://github.com/kazuki41" target="_blank" rel="noreferrer">
              <FaGithub />
              </a>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Kohama Kazuki . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};