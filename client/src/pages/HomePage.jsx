import React from 'react'
import Header from './HomePageComponents/Header'
import Hero from './HomePageComponents/Hero'
import Footer from './HomePageComponents/Footer'

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <Hero />
      <Footer />
    </div>
  )
}

export default HomePage
