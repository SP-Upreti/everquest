import Image from "next/image";
import React, { useState } from "react";
import CertificatesHero from "./CertificatesHero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {};
gsap.registerPlugin(ScrollTrigger);

type Certificate = {
  _id: string;
  certificate: string;
  certificatePublicId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export default function CertificatesMain({}: Props) {
  const [certificateData, setCertificateData] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate`
      );
      const data = await res.json();
      setCertificateData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="">
        <CertificatesHero />
      </div>

      <div className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto my-14">
        <p className="text-secondary-400 md:text-lg sm:text-md text-sm leading-relaxed">
          Our commitment to delivering exceptional travel experiences is backed
          by our certifications and industry-recognized accreditations. From
          eco-friendly practices to safety and quality assurance, these
          certificates reflect our dedication to high standards and compliance
          with global travel protocols. As a certified travel service provider,
          we prioritize customer satisfaction, environmental responsibility, and
          adherence to international travel regulations, ensuring your journeys
          are safe, reliable, and memorable."
        </p>
        <div className="lg:w-11/12 mx-auto">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-14 gap-y-8 my-10">
            {certificateData?.map((item, index) => (
              <div key={index} className="relative">
                <Image
                  src="/frame3.jpg"
                  alt="cert-image"
                  width={1000}
                  height={1000}
                  className="h-[60vh]"
                />
                <Image
                  src={item.certificate}
                  alt="cert-image"
                  width={500}
                  height={500}
                  className="absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%] h-[52vh]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const CertificatesData = [
  {
    num: "01",
    name: "Sustainable Tourism Award",
    img: "/pan.jpg",
    desc: "Recognized for our commitment to sustainable and eco-friendly tourism practices. Our treks aim to minimize environmental impact and promote conservation efforts in the regions we explore.",
  },
  {
    num: "02",
    name: "Best Adventure Travel Company",
    img: "/pan.jpg",
    desc: "Awarded for our outstanding adventure travel experiences. Our team is dedicated to providing safe, thrilling, and unforgettable treks that cater to both novice and seasoned adventurers.",
  },
  {
    num: "03",
    name: "Excellence in Customer Service",
    img: "/pan.jpg",
    desc: "Honored for our exceptional customer service. We strive to ensure every trekker has a seamless and enjoyable experience, from the initial booking to the end of their adventure.",
  },
  {
    num: "04",
    name: "Top Safety Standards Certification",
    img: "/pan.jpg",
    desc: "Certified for our rigorous safety standards. Our guides are highly trained, and our equipment is meticulously maintained to ensure the highest level of safety on all our treks.",
  },
];
