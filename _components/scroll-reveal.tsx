"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ScrollReveal = ({ children }: Props) => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }} // 最初は小さく透明
    whileInView={{ opacity: 1, scale: 1 }} // 画面に入ったら元のサイズ(1)に
    transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};