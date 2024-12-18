import React,{useState} from "react"
import { Link } from "react-router-dom"
import 'animate.css';

export const Hero = () => {
    return (
        <>
        <header className="bg-white dark:bg-gray-900">
    <div className="lg:flex lg:pt-28">
        <div className="flex items-center lg:items-start justify-center w-full px-6 pt-24 lg:pt-16 pb-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl ">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl animate__animated animate__flipInY animate__delay-1s">We Provide Your <span className="text-blue-600 dark:text-blue-400">Ideas</span></h2>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">Step into the world of wixy – where style, quality, and value come together. Explore our collections today, connect nation wide with buyers and sellers and find exactly what you’ve been looking for! <br />🤩🇳🇬🎁
</p>

                <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                    <Link to={"/auth"} className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Get Started</Link>
                    <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">Learn More</a>
                </div>
            </div>
        </div>

        <div className="w-full lg:mr-5 h-[45vh] lg:rounded-xl lg:w-1/2 lg:h-auto">
            <div className="w-full lg:rounded-xl h-full bg-gray-900 flex items-center justify-center bg-cover">
                <img src="https://i.imgur.com/95Vxv5f.png" className="w-full h-full object-cover"/>
            </div>
        </div>
    </div>
</header>
        </>
    )

}