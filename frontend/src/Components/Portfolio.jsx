import React, {useEffect} from 'react'
import Aos from "aos"
import "aos/dist/aos.css"
const Portfolio = () => {
            useEffect(() => {
    Aos.init({duration:2000})
}, [])
  return (
    <>
      <section data-aos="fade-up" className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Our
            Portfolio</h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-2">
            <div className="flex items-end overflow-hidden bg-cover rounded-lg h-96" style={{backgroundImage:`url("https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80")`}} >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">Best website
                        collections</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">Website</p>
                </div>
            </div>

            <div className="flex items-end overflow-hidden bg-cover rounded-lg h-96" style={{backgroundImage:`url("https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80")`}}>
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">Block of Ui kit
                        collections</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">Ui kit</p>
                </div>
            </div>

            <div className="flex items-end overflow-hidden bg-cover rounded-lg h-96" style={{backgroundImage:`url("https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`}}>
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">Ton’s of mobile
                        mockup</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">Mockups</p>
                </div>
            </div>

            <div className="flex items-end overflow-hidden bg-cover rounded-lg h-96" style={{backgroundImage:`url("https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`}} >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">Huge collection of
                        animation</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">Animation</p>
                </div>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Portfolio
