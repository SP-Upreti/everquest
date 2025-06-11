import Button from "@/components/ui/button";
import Title from "@/components/ui/Title";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Training = () => {
  return (
    <main className="lg:w-11/12 w-11/12 3xl:w-8/12 grid lg:grid-cols-2 grid-cols-1 place-items-center mx-auto lg:p-8 p-4 bg-orange-100 shadow-sm rounded-md">
      <div>
        <div>
          <h2 className="uppercase font-bold title lg:text-[2em] leading-[1em] text-[1.5em]">
            Himalayan Mountaineering Courses
          </h2>
          <p className="lg:w-[90%] my-6 lg:text-xl md:text-md font-medium text-sm leading-relaxed">
            Take your passion for adventure to new heights with our
            comprehensive mountaineering courses! Whether you're a beginner
            looking to explore the basics or an experienced climber aiming to
            sharpen your skills, we offer tailored programs to suit all levels.
          </p>
        </div>

        <Link href="/training/himalayan-mountaineering-course">
          <div className="flex flex-col items-start justify-start">
            <Button>Enroll Now</Button>
          </div>
        </Link>
      </div>

      <figure>
        <Image
          src="/courses.jpeg"
          alt="mountaineering"
          width={1000}
          height={1000}
          className="lg:block hidden h-[25em] object-cover rounded-md  brightness-90"
        />
      </figure>
    </main>
  );
};

export default Training;
