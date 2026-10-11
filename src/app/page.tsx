import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { Lab } from "@/components/sections/Lab";
import { Projects } from "@/components/sections/Projects";
import { SystemArchitecture } from "@/components/sections/SystemArchitecture";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <About />
        <Expertise />
        <SystemArchitecture />
        <Experience />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
