import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import BelowHero from "./components/BelowHero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Intro from "./components/Intro.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import projects from "./data/projects.js";
import LiveBackground from "./components/LiveBackground.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  React.useEffect(() => {
    // Handle initial URL like /projects/:id
    try{
      const path = window.location.pathname || '';
      const m = path.match(/\/projects\/(.+)$/);
      if(m && m[1]){
        const id = m[1];
        const p = projects.find((x)=>x.id === id);
        if(p) setSelectedProject(p);
      }

      const onPop = () => {
        const pth = window.location.pathname || '';
        const mm = pth.match(/\/projects\/(.+)$/);
        if(mm && mm[1]){
          const pid = mm[1];
          const pr = projects.find((x)=>x.id === pid);
          setSelectedProject(pr || null);
        } else {
          setSelectedProject(null);
        }
      };

      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }catch(e){}
  }, []);

  return (
    <div>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          <LiveBackground />
          {selectedProject ? (
            <ProjectDetails project={selectedProject} onBack={() => { setSelectedProject(null); try{ window.history.pushState({}, '', '/'); }catch(e){} }} />
          ) : (
            <>
              <Navbar />
              <Hero />
              <BelowHero />
              <Projects onSelect={(p) => setSelectedProject(p)} />
              <Skills />
              <Contact />
            </>
          )}
        </>
      )}
    </div>
  );
}
