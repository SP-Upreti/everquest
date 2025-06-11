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
    {},
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "Martin Escobar",
      title: "Founder of Meta",
      quote: "The service exceeded all my expectations. The team was professional, responsive, and delivered exceptional results. I'll definitely be using them again for future projects!"
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "Angela Stian",
      title: "Product Designer",
      quote: "Working with this team transformed our digital presence. Their attention to detail and creative solutions helped us achieve a 40% increase in customer engagement."
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Karim Ahmed",
      title: "DevOps Engineer",
      quote: "The technical expertise demonstrated was impressive. They solved complex challenges efficiently and delivered a robust solution ahead of schedule."
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Sophia Reynolds",
      title: "Marketing Director",
      quote: "Our campaign results were phenomenal! The strategic approach and creative execution drove a 75% increase in qualified leads. Highly recommend their services."
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "James Wilson",
      title: "Startup CEO",
      quote: "As a startup, we needed partners who understood our vision. This team not only understood but helped us refine and execute it perfectly. Worth every penny!"
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
                    <div className=" h-full pl-16 space-y-5">
                      <h2 className="text-4xl font-semibold">
                        <ParallaxText text="What our Client Says" />
                        <ParallaxText text="About Us ?" />
                      </h2>
                      <p className="max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aspernatur, deserunt voluptatem accusamus eligendi eveniet beatae sit inventore dignissimos sapiente.</p>
                    </div>
                  ) : (
                    <div className="max-w-7xl mx-auto flex  lg:gap-20">
                      <div className="w-96">
                        <motion.div
                          initial={{
                            width: 0
                          }}

                          whileInView={{
                            width: "384px",

                          }}

                          transition={{ delay: 0.5, duration: 0.3 }}
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