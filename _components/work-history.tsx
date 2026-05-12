"use client";
import { FaSchool , FaCarAlt } from "react-icons/fa";
import { MdCorporateFare } from "react-icons/md";

const ICON_MAP = {
  Corporate: <MdCorporateFare />,
  School: <FaSchool />,
  Car: <FaCarAlt />,
};

import { useEffect, useState } from "react";
import { client } from "../libs/microcms";
import styles from "../styles/home.module.scss";
import { TypeHistory } from "../types/work-history";

export const WorkHistory = ({ isReady , onDataLoaded }: {
  isReady: boolean; onDataLoaded: () => void}) => {
  const [history, setHistory] = useState<TypeHistory[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await client.get({
          endpoint: "work-history", 
        });
        setHistory(
          res.contents.sort(
            (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
          )
        );
        if(onDataLoaded){
          onDataLoaded();
          // console.log('Data Set Completa!!');
        }
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
      }
    };
    fetchStories()
  }, []); 

return (
    <section id="history" className={styles.workHistory}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>職務経歴</h2>
        </div>

        <div className={styles.timeline}>
          {history.map((item, index) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timeLabel}>{item.years}</div>
              <div className={styles.lineWrapper}>
                <div className={styles.iconCircle}>
                {ICON_MAP[item.icon as keyof typeof ICON_MAP]}
                </div>
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