"use client";

import { Hero } from "../_components/hero";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../styles/home.module.scss";

export default function Home() {
  const loaderPanelsRef = useRef<HTMLDivElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(loaderPanelsRef.current, {  
      //ローディングアニメーション
      y: "-100%",
      duration: 1.2,
      ease: "expo.inOut",
      stagger: 0.1,
      onComplete: () => {
        setIsLoaded(true);
      }
    });
  }, []);

  return (
    <div className={styles.main}>

      {/* ローディングコンテナ */}
      <div className={styles.loaderContainer}>
        {/* 5枚のパネルを生成 */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) loaderPanelsRef.current[i] = el;
            }}
            className={styles.loaderPanel}
          />
        ))}
      </div>

      <Hero startAnim={isLoaded} />
    </div>
  );
}
