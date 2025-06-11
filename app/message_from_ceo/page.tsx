import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className=" grid md:grid-cols-11 lg:w-11/12 w-11/12 3xl:w-9/12 mx-auto gap-4 mt-28 mb-14">
      <div className="sm:col-span-3 col-span-9 md:sticky top-20 border rounded-md p-2 bg-zinc-100 h-fit">
        <Image
          src="/Team/Guide.jpg"
          alt="logo"
          width={1000}
          height={1000}
          className=" mx-auto rounded-md"
        />
        <div className="flex items-center justify-between ">
          <div className="mt-4 space-y-2">
            <h2 className="font-bold lg:text-2xl md:text-xl text-lg title tracking-wide">
              Prem Gurung
            </h2>

            <p className="font-bold text-sm text-gray-800">
              IFMGA Mountain Guide & Founder
            </p>
          </div>

          <div className="flex gap-2 items-center text-2xl">
            {socialmedias.map((item, index) => (
              <div key={index}>
                <Link href={item.path} target="_blank">
                  {item.icon}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-8  p-2">
        <h2 className=" lg:text-3xl md:text-2xl sm:text-xl text-xl tracking-wide title font-bold">
          What Our IFMGA Mountain Guide has to Say
        </h2>

        <p className="mt-4 desc md:text-base text-sm">
          Our mission is simple - to inspire and enable your journey of
          discovery. Travel is more than just visiting new places; it’s about
          connecting with people, cultures, and nature in ways that transform
          us. As CEO, I am proud of the dedicated team that makes these
          unforgettable experiences possible, ensuring safety, affordability,
          and personalized service every step of the way. We believe that
          adventure should be accessible to everyone, and it’s our privilege to
          help you explore the world with confidence and excitement. Thank you
          for choosing us to be a part of your journey.
        </p>
        <div className="flex gap-2 items-start my-4">
          <Icon
            icon="ri:double-quotes-l"
            style={{ color: "orange" }}
            className="w-10 h-10"
          />
          <h2 className="font-bold md:text-2xl text-sm  my-4 flex items-center">
            Embark on a Guided Adventure with Experts
          </h2>

          <Icon
            icon="ri:double-quotes-l"
            style={{ color: "orange" }}
            className="w-10 h-10  rotate-[180deg]"
          />
        </div>
        <p className="desc  md:text-base text-sm">
          Travel has the incredible power to broaden our horizons, foster
          connections, and inspire personal growth. Our team is passionate about
          curating journeys that not only showcase the beauty of our world but
          also embrace the rich tapestry of cultures and traditions we encounter
          along the way.In today’s fast-paced world, we often find ourselves
          caught up in the daily grind, losing sight of what truly matters.
          That’s why we believe in the transformative power of travel. It’s not
          just about reaching a destination; it’s about the stories we gather,
          the friendships we forge, and the memories we create along the way.
          Each trip we craft is designed to inspire a sense of wonder and
          connection with the world around us.Safety and security are at the
          forefront of our operations. We understand that peace of mind is
          essential for a truly enjoyable experience, and we have implemented
          rigorous protocols to ensure your well-being while traveling.
          Additionally, our commitment to cost efficiency means you can embark
          on your adventures without worrying about breaking the bank. At
          Infinity, we understand that planning a trip can be overwhelming.
          That’s why we prioritize your needs with personalized itineraries,
          ensuring that every detail is tailored to your preferences. Our focus
          on excellent security and cost efficiency means you can explore the
          globe without worry or financial strain. We take pride in our
          extensive network of worldwide routes, allowing you to experience the
          hidden gems and iconic destinations that make travel so enriching. But
          what truly sets us apart is our dedication to exceptional service. Our
          team is here for you, offering support and expertise from the moment
          you book until you return home. Thank you for entrusting us with your
          travel dreams. We look forward to being a part of your next adventure,
          creating memories that will last a lifetime.
        </p>
      </div>
    </main>
  );
};

export default page;

const socialmedias = [
  {
    icon: <Icon icon="logos:facebook" />,
    path: "https://www.facebook.com/peak15",
  },
  {
    icon: <Icon icon="logos:whatsapp-icon" className="text-3xl" />,
    path: "https://wa.me/9856008848",
  },
  {
    icon: <Icon icon="skill-icons:instagram" />,
    path: "https://www.instagram.com/premguide/",
  },
];
