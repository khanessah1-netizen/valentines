"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// 18 images
const images = [
  "/valentines/game-photos/1.avif",
  "/valentines/game-photos/2.avif",
  "/valentines/game-photos/3.avif",
  "/valentines/game-photos/4.avif",
  "/valentines/game-photos/5.avif",
  "/valentines/game-photos/6.avif",
  "/valentines/game-photos/7.avif",
  "/valentines/game-photos/8.avif",
  "/valentines/game-photos/9.avif",
  "/valentines/game-photos/10.avif",
  "/valentines/game-photos/11.avif",
  "/valentines/game-photos/12.avif",
  "/valentines/game-photos/13.avif",
  "/valentines/game-photos/14.avif",
  "/valentines/game-photos/15.avif",
  "/valentines/game-photos/16.avif",
  "/valentines/game-photos/17.avif",
  "/valentines/game-photos/18.avif",
];

// Create 18 pairs of images (36 images total)
const imagePairs = images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
 const imagePairs = Array.from(
  { length: 36 },
  (_, i) => `/game-photos/${i + 1}.avif`
);
const [images] = useState(() => shuffleArray([...imagePairs]));
const [images] = useState(() => shuffleArray([...imagePairs]));
  const handleClick = async (index: number) => {
    if (selected.length === 2 || matched.includes(index) || selected.includes(index)) return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setSelected((prev) => [...prev, index]);

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000);
        setTimeout(() => setSelected([]), 1000);
      }
    } else {
      setSelected([index]);
    }
  };

  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

 return (
  <>
    {imagePairs.map((image, i) => (
      <link key={i} rel="preload" as="image" href={image} />
    ))}
    <div className="grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className="w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(index)}
            style={{ perspective: "1000px" }}
          >
            {/* Back */}
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className="w-full h-full bg-gray-300 rounded-sm lg:rounded-md absolute z-10"
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    selected.includes(index) || matched.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              />
            )}

            {/* Front image */}
            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className="w-full h-full absolute"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={images[index]}
                  alt={"Image " + (index + 1)}
                  className="w-full h-full rounded-sm lg:rounded-md object-cover"
                />
              </motion.div>
            )}

            {/* Incorrect animation */}
            {incorrect.includes(index) && (
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-red-500 rounded-sm lg:rounded-md"></div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div key={i} className="w-[11vh] h-[11vh] lg:w-20 lg:h-20" />
        ),
      )}
 </div>
  </>
  );
}
