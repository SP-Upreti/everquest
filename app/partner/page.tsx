"use client";

import Button from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useState,ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const Router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPopupOpen(true); // Show popup on submit
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    Router.push("/"); // Redirect to home page
  };

  return (
    <main className="bg-zinc-100">
      <main className="md:w-11/12 w-11/12   mx-auto lg:py-32 md:py-26 py-28">
        <div className="grid lg:grid-cols-2 bg-white border border-primary2/50 shadow-sm md:p-4 p-1 rounded-md">
          <section className="relative ">
            <figure className="h-full min-h-[60vh]">
              <Image
                src="/nextadv.jpeg"
                alt="partner-1"
                width={1000}
                height={1000}
                className="w-full h-full brightness-50 rounded-md object-cover"
              />
              <div className="absolute inset-0 top-4 left-4 text-white">
                <h1 className="sm:text-2xl text-xl font-bold title uppercase ">
                  Become Partner with us
                </h1>
                <p className="md:text-lg text-sm pt-2 w-[80%]">
                  We are constantly seeking to collaborate with like-minded
                  businesses and individuals who share our passion for travel,
                  sustainability, and exceptional service.
                </p>
              </div>

              <div className="absolute bottom-10 left-4">
                <div className="space-y-2">
                  {details.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-start gap-2 items-center bg-white p-2 rounded-md"
                    >
                      <div className="text-xl">{item.icon}</div>
                      <h2 className="md:text-md text-sm font-semibold">
                        {item.title}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </figure>
          </section>

          <section className=" p-4  h-full">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold text-sm">
                  {" "}
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className=" p-3 border rounded-md outline-primary2"
                  placeholder="john Doe"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className=" p-3 border rounded-md outline-primary2"
                  placeholder="youremail@gmail.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold text-sm">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className=" p-3 border  rounded-md outline-primary2"
                  placeholder="Uttardhoka, Lazimpath"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold text-sm">
                  Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className=" p-3 border  rounded-md outline-primary2"
                  placeholder="+977-9803267220"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold text-sm">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className=" p-3 border  rounded-md outline-primary2"
                  placeholder="your message"
                  required
                />
              </div>
              <Button>Submit</Button>
            </form>
          </section>

          {/* Popup modal */}
          <AnimatePresence>
            {isPopupOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              >
                <div className="bg-white p-6 rounded-md text-black w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <Image
                    src="/checked.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="mx-auto h-[12em] w-[12em]"
                  />
                  <h3 className="font-bold text-xl title text-center">
                    Submission Successful
                  </h3>
                  <p className="mt-2 text-center">
                    Thank you! Your form has been submitted successfully.
                  </p>
                  <button
                    onClick={closePopup}
                    className="mt-4 w-full p-2 bg-primary2 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
     
    </main>
  );
};

export default Page;

const details = [
  {
    title: " inquiry@infinityexpedition.com",
    icon: <Icon icon="ic:baseline-email" style={{ color: "#f2a324" }} />,
  },
  {
    title: "+977-9803267220",
    icon: <Icon icon="ic:round-call" style={{ color: "#f2a324" }} />,
  },
  {
    title: "Uttardhoka, Lazimpath",
    icon: <Icon icon="mdi:location" style={{ color: "#f2a324" }} />,
  },
];
