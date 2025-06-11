import Image from 'next/image'
import React from 'react'

export default function AboutSection() {
    return (
        <div
            className='min-h-[200dvh] relative about-section bg-black/90'
            id='aboutsection'
        >
            <div className="absolute top-0 left-0 w-full h-64 z-10 pointer-events-none bg-gradient-to-b from-[#121212] to-transparent" />


            <div className="sticky top-0 -z-10  left-0 w-full h-screen">
                <div className="w-full h-full relative ">
                    <Image fill src={"https://cdn.pixabay.com/photo/2016/11/08/04/49/jungle-1807476_1280.jpg"} alt='ceo' className='object-cover ' />
                </div>
            </div>
            <div className="min-h-screen z-[999]  px-16 py-10 text-center">
                <h2 className='text-4xl  font-semibold'>Message From CEO</h2>

                <p className='max-w-2xl text-[1.3rem] mt-6   mx-auto'>
                    Namaste and warm greetings from the heart of the Himalayas!                </p>

                <p className='max-w-2xl text-[1.3rem] mt-6   mx-auto'>
                    At EverQuest Nepal, our mission is simple — to help you experience Nepal in its most authentic and soul-stirring form. From the mighty peaks of Everest to the serene trails of Annapurna and the mystic winds of Mustang, every journey with us is more than just travel — it's a transformation.
                </p>
                <p className='max-w-2xl text-[1.3rem] mt-6  - mx-auto'>
                    I founded EverQuest with a deep love for the mountains, our diverse culture, and the stories hidden in every village and valley. Our dedicated guides, local experts, and travel designers work day and night to ensure your journey is safe, immersive, and unforgettable.
                </p>

                <p className='max-w-2xl text-[1.3rem] mt-6  - mx-auto'>
                    Whether you're an adventurer seeking thrills or a soul-searcher looking for peace, Nepal welcomes you — and EverQuest is your gateway.
                </p>

                <div className="max-w-2xl text-[1.3rem] mx-auto ">Thank you for trusting us with your adventures. We promise to make them legendary."

                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-64 z-10 pointer-events-none bg-gradient-to-t from-[#121212] to-transparent" />


        </div>
    )
}
