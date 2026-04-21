import { client } from "../libs/microcms";
import type { News } from "../types/news";
import Link from "next/link";
import styles from '../styles/home.module.scss'

export default async function Home() {
  const data = await client.get({ endpoint: "news" });

  return (
    <div className={styles.main}>
      {/* ヒーローエリア */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          確かな技術で、<br />
          理想の空間を築く。
        </h1>
      </section>

      {/* ニュース一覧エリア */}
      <section className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>
          News <small>お知らせ</small>
        </h2>
        
        <ul className={styles.newsList}>
          {data.contents.map((news: any) => (
            <li key={news.id} className={styles.newsItem}>
              <Link href={`/news/${news.id}`}>
                <span className={styles.date}>{new Date(news.publishedAt).toLocaleDateString('ja-JP')}</span>
                <p className={styles.title}>{news.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
