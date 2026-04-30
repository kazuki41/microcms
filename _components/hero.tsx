"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../styles/home.module.scss";

export const Hero = () => {
  // 文字を分割して表示する関数（手動でもOK）
  const text = "SAMPLE SITE";
  const heroRef = useRef(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    linesRef.current,
      {
        // グラデーションの「光の開始位置」を画面外（左側）にセット
        backgroundPosition: "-200% 0%",
      },
      {
        // グラデーションの「光の位置」を右側へ走らせる
        backgroundPosition: "200% 0%",
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.15, // 複数のラインがズレて動く
        // 走った後はフェードアウト
        onComplete: () => {
          gsap.to(linesRef.current, { opacity: 0.2, duration: 1 });
        }
      },
      "-=0.4" // タイトルが出きる少し前から
  });

  return (
    <section ref={heroRef} className={`${styles.hero} hero-visual`}>
      <h1 className={styles.mainTitle}>
        {text.split("").map((char, i) => (
          <span key={i} className="char" style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
      </h1>
      {/* 右側の「光」のアニメーションエリア */}
      <div className={styles.lightWrapper}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) linesRef.current[i] = el;
            }}
            className={styles.lightLine}
          />
        ))}
      </div>
    </section>
  );
};
