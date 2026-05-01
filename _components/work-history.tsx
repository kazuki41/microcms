"use client";
// import { FaCarAlt } from "react-icons/fa";
// import { MdCorporateFare } from "react-icons/md";
import { useEffect, useState } from "react";
import { client } from "../libs/microcms";
import styles from "../styles/home.module.scss";
import { TypeHistory } from "../types/work-history";

export const WorkHistory = () => {
  const [history, setHistory] = useState<TypeHistory[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await client.get({
          endpoint: "work-history", 
        });
        setHistory(res.contents);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
      }
    };
    fetchStories()
  }, []); 

return (
    <section className={styles.workHistory}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>02</span>
          <h2 className={styles.sectionTitle}>職務経歴</h2>
        </div>

        <div className={styles.timeline}>
          {history.map((item, index) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timeLabel}>{item.year}</div>
              <div className={styles.lineWrapper}>
                {/* <div className={styles.iconCircle}>
                  {ICON_MAP[item.iconType] || <LuCode2 />}
                </div> */}
                {index !== history.length - 1 && <div className={styles.verticalLine} />}
              </div>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};