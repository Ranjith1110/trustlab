import React from 'react'
import Hero from '../components/home/Hero'
import Packages from '../components/home/Packages'
import DirectoryOfServices from '../components/home/DirectoryOfServices'
import HomeCollectionProcess from '../components/home/HomeCollectionProcess'

const Home = () => {
  return (
    <>
      <Hero />
      <Packages />
      <DirectoryOfServices />
      <HomeCollectionProcess />
    </>
  )
}

export default Home