"use client";

import { useEffect, useState } from "react";
import { client } from "../libs/microcms";
import styles from "../styles/home.module.scss";
import { SiReact, SiDjango, SiJavascript, SiHtml5, SiPhp, SiWordpress } from "react-icons/si";

const ICON_MAP = {
  React: <SiReact />,
  Django: <SiDjango />,
  Javascript: <SiJavascript />,
  Html: <SiHtml5 />,
  Php: <SiPhp />,
  Wordpress: <SiWordpress  />,
};

export const Skills = () => {
  const [skill, setSkill] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkill = async () => {
      const res = await client.get({ endpoint: "skill" });
      setSkill(res.contents);
      // console.log(res.contents);
    };
    fetchSkill();
  }, []);

  return (
    <section id="skill" className={styles.skill}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>スキル</h2>
        </div>

        <div className={styles.skillGrid}>
          {skill.map((skill) => (
            <div key={skill.id} className={styles.skillCard}>
              <div
                className={styles.iconWrapper}
                style={{color: skill.color}}
              >
                {ICON_MAP[skill.icon as keyof typeof ICON_MAP]}
              </div>
              <h3 className={styles.skillTitle}>{skill.title}</h3>
              <ul className={styles.skillList}>
                {skill.content?.map((item: any, i: number) => (
                  <li key={i}>{item.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
