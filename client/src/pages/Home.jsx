import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import PackagesTest from '../components/home/PackagesTest'
import DirectoryOfServices from '../components/home/DirectoryOfServices'
import HomeCollection from '../components/home/HomeCollection'
import ContactSection from '../components/home/ContactSection'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <PackagesTest />
        <DirectoryOfServices />
        <HomeCollection />
        <ContactSection />
    </>
  )
}

export default Home