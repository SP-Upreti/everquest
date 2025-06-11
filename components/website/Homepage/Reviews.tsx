// import { ParallaxText } from "@/components/ParallexText";
// import EmblaCarousel from "../review/carousel";
// import Image from "next/image";

// export default function Reviews() {
//   return (
//     <section className="relative">
//       <div className="absolute top-0 left-0 h-full w-full">
//         <Image src={"/village.jpg"} alt="village of nepal" fill quality={50} className="opacity-10 grayscale-[1]" />
//       </div>
//       <div className="min-h-screen px-16 space-y-10 py-24">
//         <div className="">
//           <h2 className="text-2xl xl:text-5xl font-semibold  space-y-2">
//             <ParallaxText text="What People Says About Us ?" />
//           </h2>
//           <p className="max-w-xl line-clamp-2 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quasi dolor impedit tempora, dolores consequatur repudiandae necessitatibus laboriosam maiores nobis.</p>
//         </div>
//         <div className="">
//           <EmblaCarousel slides={[1, 2, 3, 4, 5]} />
//         </div>

//       </div>
//     </section>
//   )
// }


// App.js
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxText } from "@/components/ParallexText";
import { motion } from "motion/react"
import { once } from "events";

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);


  const testimonials = [
    {
      avatar: "/testimonial/man.jpg",
      name: "Daniel Foster",
      title: "Adventure Blogger",
      quote: "EverQuest Nepal gave me the trip of a lifetime! From trekking the Annapurna Circuit to exploring Pokhara's beauty, their service was flawless. Highly organized and passionate team!"
    },
    {
      avatar: "/testimonial/man.jpg",
      name: "Emily Zhang",
      title: "Photographer",
      quote: "The Everest Base Camp trek arranged by EverQuest was breathtaking. The guides were experienced and incredibly helpful, making every moment safe and magical."
    },
    {
      avatar: "/testimonial/one.jpg",
      name: "Carlos Mendes",
      title: "Travel Enthusiast",
      quote: "I’ve traveled to many countries, but Nepal with EverQuest was unforgettable. Their attention to detail and genuine hospitality made me feel like family."
    },
    {
      avatar: "https://cdn.pixabay.com/photo/2024/01/04/21/55/mountain-8488489_1280.jpg",
      name: "Nina Patel",
      title: "Content Creator",
      quote: "EverQuest planned our entire honeymoon trek in the Langtang region, and it was pure bliss! The lodges, meals, and pace were perfect for us. Can’t wait to book another trip!"
    },
    {
      avatar: "https://cdn.pixabay.com/photo/2019/09/08/09/35/man-4460522_1280.jpg",
      name: "Thomas Eriksson",
      title: "Expedition Leader",
      quote: "As someone who leads teams into extreme terrains, I was impressed by EverQuest's logistics and guide training. They are a top-tier Nepalese operator with a global mindset."
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/38.jpg",
      name: "Lisa-Marie Jensen",
      title: "Backpacker",
      quote: "I joined a group trek to Mustang through EverQuest Nepal. The culture, the views, the people—beyond words! The agency made everything smooth and exciting."
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      name: "Rajiv Sharma",
      title: "Corporate Manager",
      quote: "For our company retreat, EverQuest crafted a tailored travel experience blending business and adventure. The team’s professionalism and creativity were outstanding."
    }
  ];


  useEffect(() => {
    const testimonials = testimonialRefs.current;
    const section = sectionRef.current;

    // Set initial position
    gsap.set(testimonials, { x: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${testimonials.length * 100}%`,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * testimonials.length),
            testimonials.length - 1
          );
          setCurrentTestimonial(index);
        }
      }
    });

    tl.to(testimonials, {
      xPercent: -100 * (testimonials.length - 1),
      ease: "none",
      duration: testimonials.length
    });

    return () => {
      tl?.scrollTrigger?.kill();
    };
  }, []);


  return (
    <section className="relative py-20 h-screen px-16" ref={sectionRef}>
      {/* Background texture */}
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 opacity-5 bg-[url('https://assets.codepen.io/1480814/av-grid.png')]"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-emerald-500 opacity-10 blur-3xl"></div>

      <div className="relative z-10   py-12">
        {/* Section header */}

        {/* Testimonial slider */}
        <div className="relative overflow-hidden ">
          <div
            ref={containerRef}
            className="flex w-full min-h-[400px]"
          >

            {testimonials.slice(0, 5).map((item, idx) =>
              <div
                key={idx}
                ref={(el) => {
                  if (el) {
                    testimonialRefs.current[idx] = el
                  }
                }}
                className={`flex-shrink-0 w-full flex items-center py-10 `}
              >
                {
                  idx == 0 ? (
                    <div className=" h-full  space-y-5">
                      <h2 className="text-[5rem] font-semibold s">
                        <ParallaxText text="Our   Clients," />
                        <ParallaxText text="Their   Journeys, " />
                        <ParallaxText text="Their   Words." />
                      </h2>
                    </div>
                  ) : (
                    <div className="max-w-7xl mx-auto flex  lg:gap-20">
                      <div className="w-96">
                        <motion.div
                          initial={{
                            width: 0
                          }}

                          whileInView={{
                            width: "420px",

                          }}

                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="inline-flex h-96  items-center justify-center w-96 flex-shrink-0 mx-auto rounded-md mb-6    overflow-hidden">
                          <img
                            src={item.avatar}
                            className="w-full h-full object-cover"
                            alt={`${item.name}'s avatar`}
                          />
                        </motion.div>
                      </div>
                      <div className="max-w-2xl">
                        <blockquote className="text-2xl md:text-3xl font-medium  leading-snug mb-8">
                          "{item.quote}"
                        </blockquote>
                        <div>
                          <p className="text-lg font-bold ">{item.name}</p>
                          <p className="">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>

            )}
          </div>




        </div>


      </div>
    </section>
  );
};

export default TestimonialSection;