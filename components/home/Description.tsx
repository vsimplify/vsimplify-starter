import React from "react";
import { images } from "./constants";
// import left from "@/public/img/left.svg";
// import right from "@/public/img/right.svg";
import { motion } from "framer-motion";
// import Image from "next/image";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
 
import { SiHomeadvisor } from "react-icons/si";//Home
import { BsRocketTakeoffFill } from "react-icons/bs";//Enter
type Props = {
  activeImage: number;
  clickNext: React.MouseEventHandler<HTMLButtonElement>;
  clickPrev: React.MouseEventHandler<HTMLButtonElement>;
};
import Link from 'next/link';

const Description = ({ activeImage, clickNext, clickPrev }: Props) => {
  return (
    <div className="grid place-items-start w-full relative md:rounded-tr-3xl md:rounded-br-3xl">
      <div className="uppercase text-md absolute top-2  text-2xl font-extrabold max-w-md items-center left-4">Realize 
      </div>
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[80vh] py-20 md:px-20 px-10 text-left"
              : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 2,
              x: { duration: 1 },
            }}
            className="w-full max-w-ld "
          >
            <div className=" text-2xl font-extrabold max-w-ld"> <p className="sm:whitespace-no-wrap ... whitespace-normal md:whitespace-pre items-left">{elem.title}</p></div>
            <div className="leading-relaxed font-medium text-base tracking-wide h-60 md:h-40 italic text-gray-600 pt-7 max-w-prose ld:h-40 md:text-xl  text-body-color dark:text-dark-5 mb-3">
              <p className="whitespace-normal">
              {elem.desc}
              </p>
            </div>
          </motion.div>

{/*           <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              <Image src={left} alt="" />
            </div>
            <div
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              <Image src={right} alt="" />
            </div>
          </div> */}


<div className="absolute md:bottom-1 bottom-10 left-10 md:left-0 flex justify-left items-left">
            <div className="">
            <div></div>
              <Link href='/' className='btn '>
                <label htmlFor='my-drawer-2' className=''>
                  <SiHomeadvisor className='w-8 h-8 text-primary' />
                </label>
              </Link>
            </div>
            <div className="">
              <Link href='/projects/new-project' className='btn '>
                <label htmlFor='my-drawer-2' className=''>
                  <BsRocketTakeoffFill className='w-8 h-8 text-primary' />
                </label>
              </Link>
            </div>
          </div>

          <div className=" flex justify-center items-center max-w-sm">
              <Link href='/projects/new-project' className='btn btn-secondary'>
                Launch
              </Link>
          </div>
          <div className="absolute md:bottom-1 bottom-10 right-10 md:center-0 flex justify-right items-right ">
            <button onClick={clickPrev}>
              <Link href="/projects" className='btn'>
                <label htmlFor='my-drawer-2' className=''>
                  <FaCircleChevronLeft className='w-8 h-8 text-primary' />
                </label>
              </Link>
            </button>
            <div onClick={(e: React.MouseEvent<HTMLDivElement>) => clickNext(e as unknown as React.MouseEvent<HTMLButtonElement>)}>
              <Link href="/projects" className='btn'>
                <label htmlFor='my-drawer-2' className=''>
                  <FaCircleChevronRight className='w-8 h-8 text-primary' />
                </label>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;