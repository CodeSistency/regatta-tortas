import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import About from "@/components/About";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <Process />
        <About />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
