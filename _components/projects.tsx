"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "../libs/microcms";
import styles from "../styles/home.module.scss";
import { Footer } from "../_components/footer";

export const Projects = ({ isReady , onDataLoaded } : {isReady: boolean; onDataLoaded: () => void}) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await client.get({ endpoint: "projects" });
      setProjects(res.contents);
      if(onDataLoaded){
        onDataLoaded();
        console.log('Data Set Completa!!');
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className={styles.projectsAndFooter}>
      <section id="projects" className={styles.projects}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>制作実績</h2>
          </div>

          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.image.url}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.tagList}>
                    {project.tags?.map((tag: any, i: number) => (
                      <span key={i} className={styles.tag}>
                        {tag.title || tag}
                      </span>
                    ))}
                  </div>
                  <p className={styles.projectDesc}>{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.linkBtn}
                    >
                      VIEW SITE
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
