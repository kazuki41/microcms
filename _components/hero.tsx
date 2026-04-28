import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../styles/home.module.scss";

export const Hero = () => {
  // 文字を分割して表示する関数（手動でもOK）
  const text = "SAMPLE SITE";
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  // const titleRef = useRef(null);
  // const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  // const loaderRef = useRef(null);
  const loaderPanelsRef = useRef<HTMLDivElement[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(loaderPanelsRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "expo.inOut",
      stagger: 0.1,
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

  return (
    <section ref={heroRef} className={`${styles.hero} hero-visual`}>
      {/* ローディングコンテナ */}
      <div className={styles.loaderContainer}>
        {/* 5枚のパネルを生成 */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if(el)(loaderPanelsRef.current[i] = el)}}
            className={styles.loaderPanel}
          />
        ))}
      </div>
      <h1 className={styles.mainTitle}>
        {text.split("").map((char, i) => (
          <span key={i} className="char" style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
      </h1>
      <div ref={bgRef} className={`${styles.heroBg} hero-big`}></div>
    </section>
  );
};
