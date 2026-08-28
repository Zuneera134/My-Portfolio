"use client";

import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Languages from "@/components/sections/Languages";
import Skills from "@/components/sections/Skills";
import Tools from "@/components/sections/Tools";
import Journey from "@/components/sections/Journey";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/sections/Footer";
import Navigation from "@/components/ui/Navigation";
import Marquee from "@/components/motion/Marquee";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import StatusBar from "@/components/ui/StatusBar";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <StatusBar />
      <div className="noise-overlay" />
      <Navigation />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Marquee text="REACT·NODE·MY SQL·EXPRESS" speed={0.9} className="-mt-8!" />
        <Introduction />
        <About />
        <Projects />
        <Services />
        <Languages />
        <Skills />
        <Tools />
        <Journey />
        <Connect />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
