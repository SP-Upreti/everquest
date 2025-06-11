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
import Image from 'next/image'

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

        }, [AutoScroll({
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
        <section className="w-full  mx-auto">
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
                                            <button className='border px-6 py-2 rounded-md'>View More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] justify-between gap-6 mt-7">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="flex flex-wrap justify-end items-center -mr-[0.6rem]">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`w-[2.6rem] h-[2.6rem] flex items-center justify-center rounded-full after:w-[1.4rem] after:h-[1.4rem] after:rounded-full after:content-[''] after:shadow-inner ${index === selectedIndex
                                ? 'after:shadow-[inset_0_0_0_0.2rem_var(--text-body)]'
                                : 'after:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)]'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
