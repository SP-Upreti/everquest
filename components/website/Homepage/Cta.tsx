import { ParallaxText } from "@/components/ParallexText";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Cta({ }: Props) {

  return (
    <>
      <main className="px-16 py-24">

        <div className="flex gap-2 items-center justify-start  w-fit">
          <video src="/handshake.webm" className=" size-14" muted autoPlay loop />
          <h2 className="text-lg font-semibold w-fit">Ready to unlock new journeys together?</h2>
        </div>
        <div className="mt-4 space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl tracking-tighter space-y-3 lg:text-5xl xl:text-7xl font-bold  text-[#DFB6FF]">
            <ParallaxText text="Ready   to  Turn   Wanderlust " triggerOnce={false} />
            <ParallaxText text="Into Wonderful Opportunities?" triggerOnce={false} />
          </h2>
          <p className="text-xl tracking-tight">Partner with us to share unforgettable journeys, exclusive packages, and the magic of Nepal’s beauty.</p>
        </div>

        <button className="bg-[#DFB6FF] text-black px-6 py-2 text-xl rounded-full flex gap-2">Become Partner <ArrowRight color="black" className='animate-arrow ' /></button>


      </main>
    </>
  );
}
