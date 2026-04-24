import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../styles/home.module.scss";

export const Hero = () => {
    // 文字を分割して表示する関数（手動でもOK）
    const text = "SAMPLE SITE";
    const heroRef = useRef(null);
    const bgRef = useRef(null);
    const titleRef = useRef(null);
    const titleCharsRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
  
      gsap.registerPlugin(ScrollTrigger);
      const anim = gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });
  
      return () => {
        anim.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, []);

    return (
        
      <section ref={heroRef} className={`${styles.hero} hero-visual`}>
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