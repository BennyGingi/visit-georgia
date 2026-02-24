'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LightboxProps {
  images: { src: string; caption: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  counter: string; // e.g. "3 / 8"
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  counter,
}: LightboxProps) {
  const directionRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        directionRef.current = -1;
        onPrev();
      }
      if (e.key === 'ArrowRight') {
        directionRef.current = 1;
        onNext();
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    containerRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        tabIndex={-1}
        role="dialog"
        aria-label="Image lightbox"
        className="fixed inset-0 z-[100] flex items-center justify-center outline-none"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-medium tracking-wider">
          {counter}
        </div>

        {/* Prev button */}
        <button
          onClick={() => {
            directionRef.current = -1;
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 md:left-6 z-10 p-2 text-white/50 hover:text-amber-400 transition-colors"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={() => {
            directionRef.current = 1;
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-2 md:right-6 z-10 p-2 text-white/50 hover:text-amber-400 transition-colors"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image + caption area */}
        <div
          className="relative z-[1] flex flex-col items-center w-full max-w-5xl mx-auto px-14 md:px-20"
          onTouchStart={(e) => {
            dragStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - dragStartX.current;
            if (Math.abs(diff) > 60) {
              if (diff > 0) {
                directionRef.current = -1;
                onPrev();
              } else {
                directionRef.current = 1;
                onNext();
              }
            }
          }}
        >
          <AnimatePresence mode="wait" custom={directionRef.current}>
            <motion.div
              key={currentIndex}
              custom={directionRef.current}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[70vh] rounded-lg overflow-hidden"
            >
              <Image
                src={current.src}
                alt={current.caption}
                fill
                sizes="(max-width: 768px) 95vw, 80vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-white/70 text-sm md:text-base text-center max-w-2xl"
            >
              {current.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
