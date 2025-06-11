import Image from 'next/image'
import React from 'react'

export default function AboutSection() {
    return (
        <div
            className='min-h-[200dvh] about-section bg-black/60'
            id='aboutsection'
        >

            <div className="sticky top-0 -z-10  left-0 w-full h-screen">
                <div className="w-full h-full relative ">
                    <Image fill src={"/ceo.jpg"} alt='ceo' className='object-cover ' />
                </div>
            </div>
            <div className="min-h-screen z-[999]  px-16 py-10">
                <h2 className='text-4xl font-semibold'>Message From CEO</h2>
                <p className='max-w-2xl text-lg mt-4 font-semibold -tracking-wide'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed beatae voluptas eum deleniti veritatis, quo saepe iste repudiandae ut. Facilis, unde totam molestias fuga ut quisquam. Distinctio doloremque quas nam, totam neque, in laboriosam culpa necessitatibus corrupti nesciunt quos rerum ipsum, rem soluta fugiat cum eius officia architecto mollitia! Repellendus.</p>
                <p className='max-w-2xl text-lg mt-4 font-semibold -tracking-wide'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed beatae voluptas eum deleniti veritatis, quo saepe iste repudiandae ut. Facilis, unde totam molestias fuga ut quisquam. Distinctio doloremque quas nam, totam neque, in laboriosam culpa necessitatibus corrupti nesciunt quos rerum ipsum, rem soluta fugiat cum eius officia architecto mollitia! Repellendus.</p>
                <div className="max-w-2xl text-right text-xl font-semibold">- Surendra P. Upreti</div>
            </div>

        </div>
    )
}
