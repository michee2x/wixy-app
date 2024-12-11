import React, { useEffect, useState } from "react"

export const ErrorAlert = ({AlertType}) => {
    const [show, setShow] = useState(true)

    if(show) {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }
    return (
        <>
        {AlertType === false && <div className={`w-[80%] transition-all ${show ? "top-10" : "-top-20"} duration-200 shadow-md shadow-black/20 rounded-md h-auto left-1/2 transform -translate-x-1/2 lg:w-1/3 fixed top-0 text-white bg-red-500`}>
    <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="flex">
            <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                </path>
            </svg>

            <p className="mx-3">Validation Error.</p>
        </div>

        <button onClick={() => setShow(false)} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>}

{AlertType === true && <div className={`rounded-md transition-all duration-300 ${show ? "top-10" : "-top-20"} fixed lg:w-1/3 left-1/2 transform -translate-x-1/2 w-[80%] shadow-md shadow-black/20 text-white bg-emerald-500`}>
    <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="flex">
            <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z">
                </path>
            </svg>

            <p className="mx-3">Authentication successfull</p>
        </div>

        <button onClick={() => setShow(false)} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>}
        </>
    )
}