"use client";

import { client } from "../libs/microcms";
import { Hero } from "../_components/hero"
import type { News } from "../types/news";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../styles/home.module.scss";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(loaderRef.current, {
      x: "-100%", // 幕を「上」ではなく「左」へ逃がして右から画像を見せる
      duration: 1.2,
      ease: "expo.inOut",
    }).from(
      ".char",
      {
        // クラス名 ".char" を持つ要素を順番に
        x: 100, // 右から
        opacity: 0,
        rotateY: 45, // 少し角度をつけるとより立体的
        duration: 1,
        stagger: 0.1, // 0.1秒ずつズレて登場！
        ease: "power3.out",
      },
      "-=0.5",
    ); // 幕が開く少し前から開始
    
  }, []);


  useEffect(() => {
    client.get({ endpoint: "news" }).then((res) => {
      setNews(res.contents);
    });

    const tl = gsap.timeline();

      tl.to(loaderRef.current, {
        y: "-100%", // 幕が上に上がる
        duration: 0.8,
        ease: "power4.inOut",
      })

  }, []);

  return (
    <div className={styles.main}>
      {/* ローディングスクリーン */}
      <div ref={loaderRef} className={styles.loader}/>
      <Hero />
      {/* ニュース一覧エリア */}
      <section className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>
          News <small>お知らせ</small>
        </h2>

        <ul className={styles.newsList}>
          {news.map((news: any) => (
            <li key={news.id} className={styles.newsItem}>
              <Link href={`/news/${news.id}`}>
                <span className={styles.date}>
                  {new Date(news.publishedAt).toLocaleDateString("ja-JP")}
                </span>
                <p className={styles.title}>{news.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
