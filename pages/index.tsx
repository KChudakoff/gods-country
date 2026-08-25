import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Principles from '../components/Principles'
import CinematicBreak from '../components/CinematicBreak'
import World from '../components/World'
import ServerPanel from '../components/ServerPanel'
import Gallery from '../components/Gallery'
import Community from '../components/Community'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-black text-primary-text font-sans">
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Principles />
        <CinematicBreak />
        <World />
        <ServerPanel />
        <Gallery />
        <Community />
      </main>
      <Footer />
    </div>
  )
}
