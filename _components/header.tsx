import Link from 'next/link';
import styles from '../styles/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Link href="/">SITE NAME</Link>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/about">ABOUT US</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/services">SERVICES</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/works">WORKS</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/news">NEWS</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;