"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="hidden md:block flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl  font-semibold text-black dark:text-white">
            Race Your Way to the Top with<br />
              <span className="text-3xl md:text-[6rem] font-bold mt-1 leading-none">
               Type Arena!
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/f1.jpg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
