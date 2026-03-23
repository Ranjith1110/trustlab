import React from 'react'
import Hero from '../components/diagnosticsolutions/Hero'
import MissionVideo from '../components/diagnosticsolutions/MissionVideo'
import StatsParallax from '../components/diagnosticsolutions/StatsParallax'
import QualityCommitment from '../components/diagnosticsolutions/QualityCommitment'
import DirectoryOfServices from '../components/home/DirectoryOfServices'
import HomeCollection from '../components/home/HomeCollection'
import ContactSection from '../components/home/ContactSection'
import Newsletter from '../components/home/Newsletter'
import TrustedHands from '../components/diagnosticsolutions/TrustedHands'
import LatestNews from '../components/diagnosticsolutions/LatestNews'

const DiagnosticSolutions = () => {
  return (
    <>
        <Hero />
        <MissionVideo />
        <StatsParallax />
        <QualityCommitment />
        <DirectoryOfServices />
        <HomeCollection />
        <ContactSection />
        <TrustedHands />
        <LatestNews />
        <Newsletter />
    </>
  )
}

export default DiagnosticSolutions