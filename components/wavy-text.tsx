"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function WavyText({ text }: { text: string }) {
    const { ref, inView } = useInView({
        triggerOnce: false,
        rootMargin: "0px 0px -100px 0px", // 👈 triggers when 100px of the bottom is visible
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (inView) {
            setShow(true);
        }
    }, [inView]);

    return (
        <div ref={ref}>
            <TextAnimate
                animate={show ? "show" : "hidden"}
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 30,
                        rotate: 45,
                        scale: 0.5,
                    },
                    show: (i) => ({
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        transition: {
                            delay: i * 0.1,
                            duration: 0.4,
                            y: {
                                type: "spring",
                                damping: 12,
                                stiffness: 200,
                                mass: 0.8,
                            },
                            rotate: {
                                type: "spring",
                                damping: 8,
                                stiffness: 150,
                            },
                            scale: {
                                type: "spring",
                                damping: 10,
                                stiffness: 300,
                            },
                        },
                    }),
                }}
                by="character"
            >
                {text}
            </TextAnimate>
        </div>
    );
}
