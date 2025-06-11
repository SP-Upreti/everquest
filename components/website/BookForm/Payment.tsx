import React, { useState } from "react";
import toast from "react-hot-toast";
import Card1 from "@/public/780370.png";
import Card2 from "@/public/PayPalCard.png";
import Image from "next/image";

import { Icon } from "@iconify/react";
type Props = {};

export default function Payment({ handleClose }: any) {
  // const notifyPayment = () => ;

  const handleSubmit = (e: any) => {
    toast.success("Payment Successful!");
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };
  return (
    <>
      <div className="min-w-screen min-h-[70vh] pt-[8rem]  backdrop-blur-sm flex items-center justify-center  pb-10 relative"  onClick={handleClose}>
        <div className="md:w-[30%] w-11/12 mx-auto rounded-lg bg-white shadow-lg p-5 relative text-gray-700">
     
          <div className="mb-10">
            <Icon icon="logos:stripe" className="w-10" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 w-full flex ">
              <div className="px-2 w-[50%]">
                <label
                  htmlFor="type1"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    required
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-500"
                    name="type"
                    id="type1"
                    checked
                  />
                  <Image src={Card1} className="h-8 ml-3" alt="Card 1" />
                </label>
              </div>
              <div className="px-2 w-[30%] ml-10">
                <label
                  htmlFor="type2"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    required
                    type="radio"
                    className="form-radio h-5 w-5  text-indigo-500"
                    name="type"
                    id="type2"
                  />
                  <Image src={Card2} className="h-8  w-14  ml-3" alt="Card2" />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Name on card
              </label>
              <div>
                <input
                  required
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9966FF] transition-colors"
                  placeholder="John Smith"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Card number</label>
              <div>
                <input
                  required
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9966FF] transition-colors"
                  placeholder="0000 0000 0000 0000"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3 -mx-2 flex items-end">
              <div className="px-2 w-1/2">
                <label className="font-bold text-sm mb-2 ml-1">
                  Expiration date
                </label>
                <div>
                  <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9966FF] transition-colors cursor-pointer">
                    <option value="01">01 - January</option>
                    <option value="02">02 - February</option>
                    <option value="03">03 - March</option>
                    <option value="04">04 - April</option>
                    <option value="05">05 - May</option>
                    <option value="06">06 - June</option>
                    <option value="07">07 - July</option>
                    <option value="08">08 - August</option>
                    <option value="09">09 - September</option>
                    <option value="10">10 - October</option>
                    <option value="11">11 - November</option>
                    <option value="12">12 - December</option>
                  </select>
                </div>
              </div>
              <div className="px-2 w-1/2">
                <select
                  required
                  className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9966FF] transition-colors cursor-pointer"
                >
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>
            <div className="mb-10">
              <label className="font-bold text-sm mb-2 ml-1">
                Security code
              </label>
              <div>
                <input
                  className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#9966FF] transition-colors"
                  placeholder="000"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                onClick={handleClose}
                // onClick={notifyPayment}
                className="mx-auto whitespace-nowrap text-center cursor-pointer py-3 rounded-lg px-10 bg-gradient-to-r bg-[#9966FF] text-sm font-medium text-secondary-50"
              >
                Pay now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
