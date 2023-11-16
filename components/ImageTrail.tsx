"use client";

import styles from "./ImageTrail.module.css";
import { useRef } from "react";

const ImageTrail = () => {
  let currentIndex = 0;
  let collection: any = [];
  let step = 0;
  let maxImages = 13;
  let nbOfImages = 0;

  const manageMouseMove = (e: any) => {
    const { clientX, clientY, movementX, movementY } = e;
    step += Math.abs(movementX) + Math.abs(movementY);

    if (step >= 150 * currentIndex) {
      mouseMove(clientX, clientY);
      if (nbOfImages === maxImages) {
        removeImage();
      }
    }

    if (currentIndex == collection.length) {
      currentIndex = 0;
      step = -150;
    }
  };

  const removeImage = () => {
    const images = getImages();
    images[0].style.display = "none";
    nbOfImages--;
  };

  const mouseMove = (x: any, y: any) => {
    const targetImage = collection[currentIndex].current;

    targetImage.style.left = x - 300 / 2 + "px";
    targetImage.style.top = y - 300 / 2 + "px";
    targetImage.style.display = "block";

    currentIndex++;
    nbOfImages++;
    resetZIndex();
  };

  const resetZIndex = () => {
    const images = getImages();
    images.forEach((image, index) => {
      image.style.zIndex = index;
    });
  };

  const getImages = () => {
    let images = [];
    const indexOfFirstImage = currentIndex - nbOfImages;
    for (let i = indexOfFirstImage; i < currentIndex; i++) {
      let targetIndex = i;
      if (targetIndex < 0) targetIndex += collection.length;
      images.push(collection[targetIndex].current);
    }
    return images;
  };

  return (
    <div
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className={styles.main}
    >
      {[...Array(13)].map((_, index) => {
        const ref = useRef(null);
        collection.push(ref);
        return (
          <img
            ref={ref}
            key={index}
            src={`/img/${index}.jpg`}
            className="aspect-square object-cover rounded-xl"
            alt="imagesCursor"
            height={300}
          />
        );
      })}
    </div>
  );
};

export default ImageTrail;
