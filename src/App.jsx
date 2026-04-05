import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Exhibition from './components/Exhibition';
import Team from './components/Team';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Exhibition />
        <Team />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
