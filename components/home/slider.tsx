"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

import { images } from "./constants";
import Description from "./Description";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = useCallback(() => {
    setActiveImage((prevActive) =>
      prevActive === images.length - 1 ? 0 : prevActive + 1
    );
  }, []);

  const clickPrev = useCallback(() => {
    setActiveImage((prevActive) =>
      prevActive === 0 ? images.length - 1 : prevActive - 1
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 15000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage, clickNext]);

  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl">
      <div
        className={`w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-1500 md:rounded-2xl p-6 md:p-0`}
      >
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "block w-full object-fill transition-all duration-1500 ease-in-out "
                : "hidden"
            }`}
          >
            <Image
              src={elem.src}
              alt=""
              width={200}
              height={200}
            className="w-full h-full object-fill  md:rounded-tl-3xlmd:rounded-bl-3xl transform scale-85 "

            />
          </div>
        ))}
      </div>
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </main>
  );
};

export default Slider;
