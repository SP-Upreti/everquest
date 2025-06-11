import Image from "next/image";
import AssociatedLogo1 from "@/public/logo/associated1.png";
import AssociatedLogo2 from "@/public/logo/associated2.png";
import CertifiedLogo1 from "@/public/logo/certified.png";
import { motion } from "framer-motion"
type Props = {};

export default function PartnerHome({ }: Props) {
  return (
    <div className="relative  mx-auto md:py-[3rem]  px-16">

      <div className="grid lg:grid-cols-2    gap-10  z-20 ">

        <div className="flex    flex-shrink-0  rounded-lg overflow-hidden   gap-14 justify-end items-center   ">
          <h2 className="flex gap-2  text-lg  title font-semibold items">
            <span className="text-nowrap text-4xl font-semibold">In Association With</span>{" "}
          </h2>
          <div className="flex flex-wrap w-full gap-4  items-start">

            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="relative size-16 p-1 bg-[rgba(255,255,255,0.05)]  rounded-full overflow-hidden flex justify-center items-center">
              <Image
                src={AssociatedLogo1}
                alt="logo"
                className="overflow-hidden   object-cover object-center "
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}

              className="relative size-16 p-1 bg-[rgba(255,255,255,0.05)]   rounded-full overflow-hidden flex justify-center items-center">
              <Image
                src={AssociatedLogo2}
                alt="logo"
                className="overflow-hidden size-12 object-cover object-center   "
              />
            </motion.div>

          </div>
        </div>



        <div className="flex  items-center gap-14">
          <h2 className="flex text-4xl gap-2 text-black  text-nowrap  title font-semibold items">
            Professional Association
          </h2>
          <div className="flex gap-4  w-full items-end  ">
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="relative size-16 bg-white rounded-full">
              <Image
                src={CertifiedLogo1}
                alt="logo"
                className="overflow-hidden  object-cover object-center"
              ></Image>
            </motion.div>
          </div>
        </div>

      </div>
    </div >
  );
}
