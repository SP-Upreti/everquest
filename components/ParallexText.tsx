"use client"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';

export const ParallaxText = ({
    text,
    textStyle,
    triggerOnce = true
}: {
    text: string;
    textStyle?: string;
    triggerOnce?: boolean;
}) => {
    // ✅ Memoize the split to avoid recalculating on every render
    const words = useMemo(() => text.split(' '), [text]);

    const { ref, inView } = useInView({
        triggerOnce: triggerOnce,
        rootMargin: '-80px 0px',
    });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [inView, controls]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1,
            },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'linear',
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={container}
            className={textStyle}
            style={{ overflow: 'hidden' }}
        >
            {words.map((word, index) => (
                <motion.span key={index} variants={child} className="mr-2 inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
