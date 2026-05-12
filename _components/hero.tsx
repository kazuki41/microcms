"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../styles/home.module.scss";

export const Hero = ({ startAnim }: { startAnim: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const text = "KOHAMA PORTFOLIO";

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".char");
    // startAnim が false の間、または要素がない場合は何もしない
    if (!chars || !startAnim) return;
  
    const tl = gsap.timeline();
  
    // 1. テキストの出現アニメーション
    tl.set(containerRef.current, { opacity: 1 })
    .from(chars, {
      opacity: 0, 
      x: 100,
      rotateY: 45,
      duration: 0, 
      stagger: 0.1, 
      ease: "power3.out" ,
    })
    // 2. そのまま左へ流す（無限ループ）
    // .to(対象, {終了状態の設定}, 開始タイミング) と書きます。
    .to(marqueeRef.current, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    }, "-=3"); // 出現が終わる0.4秒前に開始
  
  }, [startAnim]);

  // 関数名を renderLetters に変更して、ライブラリとの衝突を避ける
  const renderLetters = (textString: string) => {
    return textString.split("").map((char, index) => (
      <span key={index} className="char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section className={styles.hero}>
      <div ref={containerRef} className={styles.container} style={{ opacity: 0 }}>
        <div ref={marqueeRef} className={styles.marqueeInner}>
          {/* 1セット目 */}
          <h1 className={styles.mainTitle}>
            {renderLetters(text)}&nbsp;
          </h1>
          {/* 2セット目（ループ用） */}
          <h1 className={styles.mainTitle}>
            {renderLetters(text)}&nbsp;
          </h1>
        </div>
      </div>
    </section>
  );
};