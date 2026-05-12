import Link from 'next/link';
import styles from '../styles/home.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Link href="/">PORTFOLIO</Link>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="#history">職務経歴</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#skill">スキル</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#projects">制作実績</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;