"use client";

import { client } from "../libs/microcms";
import type { News } from "../types/news";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from '../styles/home.module.scss'

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    client.get({ endpoint: "news"}).then((res) => {
      setNews(res.contents);
    });
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.to(bgRef.current,{
      y: "20%",
      ease: "none",
      scrollTrigger:{
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  },[]);

  return (
    <div className={styles.main}>
      {/* ヒーローエリア */}
      <section ref={heroRef} className={`${styles.hero} hero-visual`}>
        <div ref={bgRef} className={`${styles.heroBg} hero-big` }></div>

      </section>

      {/* ニュース一覧エリア */}
      <section className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>
          News <small>お知らせ</small>
        </h2>
        
        <ul className={styles.newsList}>
          {news.map((news: any) => (
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
