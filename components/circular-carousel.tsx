// components/TestimonialSlider.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import "./embela.css"

const testimonials = [
    {
        id: 1,
        content: `“I would like to say a big <strong>Thank you</strong> for your immense effort and support. In addition, I have feeling that our further events are going to be Great as well, good luck to the team.”`,
        author: "Jim Corner",
        title: "CEO, Victoriany Co."
    },
    // Add more testimonials here following the same structure
    { id: 2, content: "Testimonial 2...", author: "Name 2", title: "Title 2" },
    { id: 3, content: "Testimonial 3...", author: "Name 3", title: "Title 3" },
    { id: 4, content: "Testimonial 4...", author: "Name 4", title: "Title 4" },
    { id: 5, content: "Testimonial 5...", author: "Name 5", title: "Title 5" },
];

export default function TestimonialSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return () => { };
        onSelect();
        emblaApi.on('select', onSelect);
        return () => emblaApi.off('select', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6">
            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="embla__slide flex-[0_0_100%] min-w-0"
                        >
                            <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg">
                                <blockquote
                                    className="text-gray-600 italic text-lg md:text-xl leading-relaxed mb-8"
                                    dangerouslySetInnerHTML={{ __html: testimonial.content }}
                                />

                                <div className="border-t border-dashed border-gray-300 my-6"></div>

                                <div className="text-gray-800">
                                    <p className="font-semibold text-lg">{testimonial.author}</p>
                                    <p className="text-gray-600">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end mt-6 text-gray-500">
                {selectedIndex + 1} / {testimonials.length}
            </div>
        </div>
    );
}