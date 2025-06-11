'use client'

import React, { lazy } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import {
    DotButton,
    useDotButton
} from './EmblaCarouselDotButton'
import AutoScroll from "embla-carousel-auto-scroll"
import Autoplay from 'embla-carousel-autoplay' // autoplay plugin
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PropType = {
    slides: {
        id: number
        title: string
        location: string
        altitude: number
        image: string
        description: string
    }[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,

        }, [Autoplay({
            playOnInit: true,
            stopOnFocusIn: true,
            stopOnInteraction: false,
            stopOnMouseEnter: false
        })])

    const {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    } = useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="w-full  mx-auto relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y backface-hidden -ml-4 sm:-ml-6 xl:-ml-8">
                    {slides.map((data, index) => (
                        <div
                            className="min-w-0 pl-4 sm:pl-6 xl:pl-8 flex-[0_0_100%] sm:flex-[0_0_50%] xl:flex-[0_0_calc(100%/3)]"
                            key={index}
                        >
                            <div className="h-[78vh] rounded-md overflow-hidden  relative">
                                <div className="absolute top-0 left-0 w-full h-full -z-20">
                                    <div className="w-full h-full relative ">
                                        <Image quality={50} src={data.image || "/ExpeditionPackage/Exp1.png"} fill alt='Test' className='object-cover' />
                                    </div>
                                </div>
                                <div className="h-full w-full bg-black/50 z-50 relative">
                                    <div className="absolute top-0 left-0 w-full  border-b flex">
                                        <div className="border-r w-fit p-4">
                                            <div className="flex gap-2">
                                                <h2 className='text-3xl'>{data.altitude}</h2>
                                                <span>M</span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h2 className='text-2xl'>{data.title}</h2>
                                            <p className='text-sm'>{data.location}</p>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 p-4 space-y-4">
                                        <p>{data.description}</p>
                                        <div className="flex gap-4 items-center">
                                            <button className='border px-6 py-2 rounded-md bg-[#DFB6FF] text-black'>Book Now</button>
                                            <button className='border px-6 py-2 rounded-md'>View More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full">
                <button onClick={onPrevButtonClick} className='size-16 bg-white/10 flex justify-center items-center rounded-'><ChevronLeft className='size-12' /></button>
                <button onClick={onNextButtonClick} className='size-16 bg-white/10 flex justify-center items-center '><ChevronRight className='size-12' /></button>
            </div>

        </section >
    )
}

export default EmblaCarousel
