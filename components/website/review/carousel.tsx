'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './thumbbutton'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        loop: true
    })

    // Handle Autoplay
    useEffect(() => {
        if (!emblaMainApi) return
        const autoplay = setInterval(() => {
            emblaMainApi.scrollNext()
        }, 4000)

        return () => clearInterval(autoplay)
    }, [emblaMainApi])

    const onThumbClick = useCallback((index: number) => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(index)
    }, [emblaMainApi, emblaThumbsApi])

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    // Button navigation handlers
    const scrollPrev = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollPrev()
    }, [emblaMainApi])

    const scrollNext = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollNext()
    }, [emblaMainApi])

    return (
        <div className="grid grid-cols-2 items-end">
            <div>
                <div className="flex gap-4 items-center mb-4">
                    <button className="px-4 py-2 border rounded-md" onClick={scrollPrev}>
                        <ChevronLeft />
                    </button>
                    <button className="px-4 py-2 border rounded-md" onClick={scrollNext}>
                        <ChevronRight />
                    </button>
                </div>

                <div className="overflow-hidden" ref={emblaMainRef}>
                    <div className="flex ml-[-1rem] touch-pan-y touch-pinch-zoom">
                        {slides.map((index) => {
                            const [ref, inView] = useInView({
                                triggerOnce: false,
                                threshold: 0.7,
                            })

                            return (
                                <div
                                    className="flex-[0_0_100%] min-w-0 pl-4 transform-gpu"
                                    key={index}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                                        className="h-[26rem] flex items-end relative card-popup"
                                        ref={ref}
                                    >
                                        <div className="absolute left-60 top-0 z-50">
                                            <div className="backdrop-blur-2xl w-[28rem] relative rounded-br-none p-4 bg-white/10 rounded-2xl">
                                                <div className="absolute -bottom-5 -right-4 w-32 h-[2px] bg-white/40" />
                                                <div className="absolute -bottom-5 -right-4 h-32 w-[2px] bg-white/40" />
                                                <p>
                                                    Climbing Everest is not just a journey — it’s a
                                                    lifetime dream. And Everest Quest made that dream
                                                    not only possible, but unforgettable.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-white/10 p-4 rounded-2xl h-96">
                                            <div className=" w-72 h-[79%] relative ">
                                                <Image
                                                    fill
                                                    alt='review'
                                                    src="https://worldexpeditions.com/croppedImages/Indian-Sub-Continent/Nepal/anna_circ_17_descending_thorong_la_3-2785970-1920px.jpg"
                                                    className="h-full w-full object-cover rounded-xl"
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <h2 className='text-xl tracking-tight'>Bir Bikram Shah</h2>
                                                <p>Traveller</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                    <div className="flex flex-row items-center justify-start h-full gap-4">
                        {slides.map((index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index - 1)}
                                selected={index === selectedIndex + 1}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
