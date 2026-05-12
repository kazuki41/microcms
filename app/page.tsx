"use client";

import { Hero } from "../_components/hero";
import { WorkHistory } from "../_components/work-history";
import { Skills } from "../_components/skills";
import { Projects } from "../_components/projects";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/home.module.scss";

// セクションのリスト
const SECTIONS = [
  { id: "hero", component: Hero },
  { id: "work", component: WorkHistory },
  { id: "skills", component: Skills },
  { id: "projects", component: Projects },
  // { id: "footer", component: Footer },
];

export default function Home() {
  const loaderPanelsRef = useRef<HTMLDivElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // ズーム切り替え用のState
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- ローディングアニメーション ---
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(loaderPanelsRef.current, {  
      y: "-100%",
      duration: 1.2,
      ease: "expo.inOut",
      stagger: 0.1,
    }).add(() => {
      setIsLoaded(true);
    }, "-=1");
  }, []);

  // --- ズーム切り替えロジック ---
  useEffect(() => {
    if (!isLoaded) return;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      // 現在表示中のスクロール可能なエリアを取得
      const activeContent = document.querySelector(`.${styles.scrollableContent}`);
      
      if (activeContent) {
        const { scrollTop, scrollHeight, clientHeight } = activeContent;
        // 1px程度の誤差を許容して判定
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const isAtTop = scrollTop <= 0;

        // 下スクロール時にまだ下にコンテンツがあれば切り替えない
        if (e.deltaY > 0 && !isAtBottom) return;
        // 上スクロール時にまだ上にコンテンツがあれば切り替えない
        if (e.deltaY < 0 && !isAtTop) return;
      }

      // ズーム切り替え発火
      if (e.deltaY > 0 && index < SECTIONS.length - 1) {
        changeSection(index + 1);
      } else if (e.deltaY < 0 && index > 0) {
        changeSection(index - 1);
      }
    };

    const changeSection = (newIndex: number) => {
      setIsAnimating(true);
      setIndex(newIndex);
      // アニメーション完了まで入力をロック（Framer Motionのdurationと合わせる）
      setTimeout(() => setIsAnimating(false), 800); 
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLoaded, index, isAnimating]);

  const CurrentComponent = SECTIONS[index].component;

  return (
    
    <div className={styles.mainFixed}> 
      {/* ローディングコンテナ */}
      <div className={styles.loaderContainer}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) loaderPanelsRef.current[i] = el; }}
            className={styles.loaderPanel}
          />
        ))}
      </div>

      {/* メインコンテンツ：isLoaded後に表示 */}
      {isLoaded && (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={ index === 0 ? false : { opacity: 0, scale: 0.8 }} // 奥から登場
            animate={{ opacity: 1, scale: 1 }}   // 定位置
            exit={{ opacity: 0, scale: 1.2 }}    // 手前に消える
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={styles.zoomWrapper}
          >
            <div className={styles.scrollableContent}>
              <CurrentComponent startAnim={index === 0} />
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ナビゲーションインジケーター */}
      {isLoaded && (
        <div className={styles.sideDots}>
          {SECTIONS.map((_, i) => (
            <div key={i} className={index === i ? styles.dotActive : styles.dot} />
          ))}
        </div>
      )}
    </div>
  );
}