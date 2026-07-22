import AnimatedBackground from "../components/ui/AnimatedBackground";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";

export default function LandingPage({ onStart }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <Navbar onStart={onStart} />

      <Hero onStart={onStart} />

      <Stats />

      <Features />
    </div>
  );
}