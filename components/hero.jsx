"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import { Button } from './ui/button'
import { useEffect} from "react";
import Image from "next/image";




const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      if (!imageElement) return;

      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
    <div className='space-y-6 text-center w-full'>
      <div className='space-y-6 mx-auto'>
        <h1 className=' text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
        The power of <span>good advice </span> <br />
      
        Reflects a   <br /> <span className="gradient-title-orange">Professional career</span>
        </h1>
        <p className="text-gray-400 ">
        It aims to revolutionize personal coaching by combining cutting-edge AI with human-like guidance, <br />making professional-level coaching accessible, engaging, and data-driven for everyone. 
        </p>
      </div>

      <div className='flex justify-center gap-4'>
        <Link href='/dashboard'> 
            <Button  size="lg" className="px-8 z-10  cursor-pointer">
                Get Started
            </Button>
        </Link>
        <Link href='/dashboard'> 
            <Button variant={"outline"} size="lg" className="px-8 z-10 cursor-pointer">
                Watch Demo
            </Button>
        </Link>
      </div>

      <div>
        <div className='text-center flex justify-center hero-image-wrapper'>
          <div ref={imageRef} className='hero-image'>
            <Image
            src={"/banner-01.png"}
            width={1080}
            height={720}
            alt="Banner Skillsync"
            priority
            />
            </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default HeroSection
