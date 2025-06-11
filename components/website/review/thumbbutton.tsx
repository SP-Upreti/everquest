import React from 'react'

type PropType = {
    selected: boolean
    index: number
    onClick: () => void
}

export const Thumb: React.FC<PropType> = ({ selected, index, onClick }) => {
    return (
        <div
            className={`${selected ? "" : "blur-sm"} `}
        >
            <button
                onClick={onClick}
                type="button"
                className={`w-36 h-40  appearance-none cursor-pointer select-none inline-flex items-center justify-center  
          ${selected
                        ? 'text-black border-black'
                        : 'text-gray-500 border-gray-300'
                    }`}
            >
                <img src='https://st2.depositphotos.com/4138543/10666/i/950/depositphotos_106669494-stock-photo-male-hiker-looking-to-the.jpg' alt='trekking' className='object-cover object-center h-full w-full rounded-md' />
            </button>
        </div>
    )
}
