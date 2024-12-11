import React from 'react'
import { Hero } from '../Components/Hero'
import { ProductGrid } from '../Components/ProductGrid'
import Stats from '../Components/Stats'
import Reviews from '../Components/Reviews'
import Portfolio from '../Components/Portfolio'
import { BentoSection } from '../Components/BentoGrid'

export const Home = () => {
  return (
    <>
    <div className='w-full bg-white dark:bg-gray-900 min-h-64 relative'>
      <Hero />
      <Stats />
      <BentoSection />
      <div className='w-full hidden min-h-64'>
          {[1,2,3,4].map(e => {
            return (
              <li>
                <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&q=75&fit=crop&w=600" alt="" />
                <p className='text-green-200'>Now $18.60</p>
              
              </li>
            )
          }) }
      </div>
      <Portfolio />
      <Reviews />
    <ProductGrid section="Featured Products"/>
    
    </div>
    </>
  )
}