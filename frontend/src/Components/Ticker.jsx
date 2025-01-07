import React from 'react'

export const Ticker = ({text}) => {
  return (
    <div className='text-sm overflow-hidden'>
        <div
        style={{
            display:"inline-block",
            whiteSpace:"nowrap",
            animation:"scrollLeft 20s linear infinite"
        }} className=''>
            <span>{text}</span>
        </div>
        <style>
            {`
                @keyframes scrollLeft {

                    0%{
                        transform:translateX(100%)
                    }
                    100%{
                        transform:translateX(-100%)
                    }

                }
                
            `}
        </style>
    </div>
  )
}