
import Footer from "./components/footer";
import { BaseHeroSection } from "./components/home/sections/hero-section";
import { AboutScrollSection } from "./components/about/about-scroll-section";

export default function Home() {
  return (
    <div>
      <main>
        <BaseHeroSection description="Empowering Developers, Elevating Innovation at GDG NITH Chapter." />
        <AboutScrollSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
