"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ScrollImage({ 
  src, 
  alt, 
  title,
  className = "", 
  containerClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false
}: { 
  src: string; 
  alt: string; 
  title?: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center"]
  });

  // Map scroll progress (0 to 1) into a grayscale filter percentage (100% to 0%)
  const grayscaleFilter = useTransform(scrollYProgress, [0, 1], ["grayscale(100%)", "grayscale(0%)"]);

  return (
    <div ref={ref} className={`relative overflow-hidden border border-muted-border bg-muted-border/20 ${containerClassName}`}>
      <motion.div style={{ filter: grayscaleFilter }} className="w-full h-full relative">
        <Image 
          src={src} 
          alt={alt}
          title={title || alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}

