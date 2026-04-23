"use client";

import { client } from "../libs/microcms";
import type { News } from "../types/news";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from '../styles/home.module.scss'

export default function Home() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);
  const loaderTextRef = useRef(null);
  const [news, setNews] = useState<any[]>([]);
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(loaderRef.current, {
      x: "-100%", // 幕を「上」ではなく「左」へ逃がして右から画像を見せる
      duration: 1.2,
      ease: "expo.inOut",
    })
    .from(".char", { // クラス名 ".char" を持つ要素を順番に
      x: 100,        // 右から
      opacity: 0,
      rotateY: 45,   // 少し角度をつけるとより立体的
      duration: 1,
      stagger: 0.1,  // 0.1秒ずつズレて登場！
      ease: "power3.out",
    }, "-=0.5");     // 幕が開く少し前から開始
  }, []);

  // 文字を分割して表示する関数（手動でもOK）
  const text = "確かな技術で、理想の空間を築く。";

  useEffect(() => {
    
    client.get({ endpoint: "news"}).then((res) => {
      setNews(res.contents);
    });

    const tl = gsap.timeline();

    // ローディングアニメーションの連鎖（Timeline）
    tl.to(loaderTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
    })
    .to(loaderRef.current, {
      y: "-100%", // 幕が上に上がる
      duration: 0.8,
      ease: "power4.inOut",
    })
    .from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.2"); // 幕が上がりきる少し前に開始

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

      {/* ローディングスクリーン */}
      <div ref={loaderRef} className={styles.loader}>
        <div ref={loaderTextRef} className={styles.loaderText}>
          ARCHITECTURE & DESIGN
        </div>
      </div>

      {/* ヒーローエリア */}
      <section ref={heroRef} className={`${styles.hero} hero-visual`}>
      <h1 className={styles.mainTitle}>
            {text.split("").map((char, i) => (
              <span key={i} className="char" style={{ display: "inline-block" }}>
                {char}
              </span>
            ))}
          </h1>
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
