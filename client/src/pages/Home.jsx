
import Hero from '../components/home/Hero'
import PackagesTest from '../components/home/PackagesTest'
import DirectoryOfServices from '../components/home/DirectoryOfServices'
import HomeCollection from '../components/home/HomeCollection'
import ContactSection from '../components/home/ContactSection'
import MobileApp from '../components/home/MobileApp'
import Newsletter from '../components/home/Newsletter'

const Home = () => {
  return (
    <>
        <Hero />
        <PackagesTest />
        <DirectoryOfServices />
        <HomeCollection />
        <ContactSection />
        <MobileApp />
        <Newsletter />
    </>
  )
}

export default Home