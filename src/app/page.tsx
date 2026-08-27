"use client";

import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Lab from "@/components/sections/Lab";
import Personality from "@/components/sections/Personality";
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
      <main>
        <Hero />
        <Marquee text="DESIGN · ENGINEER · CREATE" speed={0.8} />
        <div className="h-line section-padding" />
        <Introduction />
        <div className="h-line section-padding" />
        <Projects />
        <Marquee text="PIXELS · MOTION · CODE" speed={0.6} direction="right" />
        <div className="h-line section-padding" />
        <About />
        <div className="h-line section-padding" />
        <Lab />
        <div className="h-line section-padding" />
        <Personality />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
