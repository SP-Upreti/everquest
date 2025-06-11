import { ParallaxText } from '@/components/ParallexText'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Donations() {
    return (
        <section className='h-[150dvh]  relative'>


            {/* background woman */}
            <div className="h-full w-full absolute top-0 left-0 -z-30">
                <Image src={"/woman.jpg"} fill alt='Everest Quest Donations' className='object-cover' />
            </div>
            <div className="flex px-24 h-full w-full items-center bg-black/30 z-[99]">
                <div className="space-y-6">
                    <h2 className='text-6xl font-semibold max-w-2xl space-y-2'>
                        <ParallaxText text='Travel the World.' textStyle='' triggerOnce={false} />
                        <ParallaxText text='Empower Her Future.' textStyle='' triggerOnce={false} />
                    </h2>
                    <p className='max-w-2xl pb-6 text-xl'>We donate a portion of every travel package to empower women through education.
                        Because every step you take, takes her closer to her dreams.</p>
                    <div className="flex gap-6 items-center">
                        <button className=' text-lg border px-6 py-2 rounded-full flex gap-4 items-center'>
                            Book now & give back <ArrowRight className='animate-arrow' />
                        </button>
                        <button className=' text-lg  px-6 py-2  flex gap-4 items-center'>
                            View Gallery
                        </button>
                    </div>
                </div>

            </div>


        </section>
    )
}
