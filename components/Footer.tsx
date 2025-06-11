'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Pointer } from './magicui/pointer'

export default function Footer() {
  const circleX = useMotionValue(0);
  const circleY = useMotionValue(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerWidth, setFooterWidth] = React.useState(0);

  React.useEffect(() => {
    if (footerRef.current) {
      setFooterWidth(footerRef.current.offsetWidth);
    }
  }, []);

  // Create radial gradient mask for the text
  const textMask = useTransform(
    [circleX, circleY],
    (values: number[]) => {
      const [x, y] = values;
      return `radial-gradient(200px at ${x - 160}px ${y - 160}px, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`;
    }
  );

  const bgMask = useTransform(
    [circleX, circleY],
    (values: number[]) => {
      const [x, y] = values;
      return `radial-gradient(200px at ${x - 50}px ${y - 50}px, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`;
    }
  );


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!footerRef.current) return;

    const rect = footerRef.current.getBoundingClientRect();
    circleX.set(e.clientX - rect.left);
    circleY.set(e.clientY - rect.top);
  };

  return (
    <footer
      ref={footerRef}
      className='h-dvh bg-black relative overflow-hidden'
      onMouseMove={handleMouseMove}
    >

      {/* Background Image */}
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        whileInView={{ y: 100, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        className='h-full w-full absolute top-0 left-0 z-[9999999999999] overflow-hidden'
      >
        <div className="h-full w-full relative">
          <motion.div
            className="grayscale-[1] z-[99] w-full h-full bg-cover bg-center  opacity-100"
            style={{
              backgroundImage: "url('/everest-rock.png')",
              mask: bgMask,
              WebkitMask: bgMask
            }}
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <div className=" absolute top-0 left-0 p-16 py-40 w-full h-full text-center flex justify-center items-center pointer-events-none">
        <div className='font-bold uppercase relative'>
          {/* Stroked text background */}
          <h2
            style={{ WebkitTextStroke: "2px white" }}
            className="text-center text-transparent text-[14rem] font-bold"
          >
            EVERQUEST
          </h2>

          {/* Gradient masked text overlay */}
          <motion.h2
            className="text-white text-[14rem] font-bold absolute top-0 left-0 w-full h-full"
            style={{
              mask: textMask,
              WebkitMask: textMask
            }}
          >
            EVERQUEST
          </motion.h2>
        </div>
      </div>

      {/* Flashlight Pointer */}
      <Pointer>
        <motion.div>
          <Image
            src={"/flashlight.png"}
            height={50}
            width={100}
            className='-rotate-[80deg]'
            alt='lights'
          />
        </motion.div>
      </Pointer>



      {/* Secondary Background Image */}
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        whileInView={{ y: 100, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        className='h-full w-full absolute top-0 left-0 z-[999] overflow-hidden'
      >
        <div className="h-full w-full relative">
          <img
            src="/everest-rock.png"
            alt="footer"
            className="grayscale-[1] object-cover  opacity-10 w-full h-full"
          />
        </div>
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-end items-end">
        <div className="w-full flex justify-between flex-wrap-reverse items-center p-6">
          <p>© 2025 EVERQUEST. All Rights Reserved.</p>
          <a href='https://www.webxnep.com/logo/logo.svg' className="  gap-3 cursor-pointer flex items-center">
            <h2>Designed and  Developed by</h2>
            <img src="https://www.webxnep.com/logo/logo.svg" width={60} alt="webx nepal" />
          </a>
        </div>
      </div>
    </footer>
  )
}