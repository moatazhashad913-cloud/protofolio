import React, { Suspense, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import BelowHero from "./components/BelowHero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Intro from "./components/Intro.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import projects from "./data/projects.js";
import Contact from "./components/Contact.jsx";

const LazyLiveBackground = React.lazy(() => import("./components/LiveBackground.jsx"));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadHeavy, setLoadHeavy] = useState(false);
  const [liveBgReady, setLiveBgReady] = useState(false);
  const [threadsReady, setThreadsReady] = useState(false);

  useEffect(() => {
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


  useEffect(() => {
    if (showIntro) return;
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setLoadHeavy(true);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(markReady, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const t = setTimeout(markReady, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [showIntro]);

  useEffect(() => {
    if (!loadHeavy || !liveBgReady || !threadsReady) return;
    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      import("gsap/ScrollTrigger")
        .then((mod) => {
          const ScrollTrigger = mod.ScrollTrigger || mod.default || mod;
          ScrollTrigger?.refresh?.();
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [loadHeavy, liveBgReady, threadsReady]);

  const contentShellClass = useMemo(
    () =>
      showIntro
        ? "opacity-0 pointer-events-none select-none"
        : "opacity-100 pointer-events-auto",
    [showIntro]
  );

  return (
    <div>
      <h1 className="lcp-title">Moataz Hashad</h1>

      {showIntro ? <Intro onFinish={() => setShowIntro(false)} /> : null}

      <div className={`transition-opacity duration-300 ${contentShellClass}`}>
        <Suspense fallback={null}>
          {loadHeavy ? <LazyLiveBackground onReady={() => setLiveBgReady(true)} /> : null}
        </Suspense>

        {selectedProject ? (
          <ProjectDetails project={selectedProject} onBack={() => { setSelectedProject(null); try{ window.history.pushState({}, '', '/'); }catch(e){} }} />
        ) : (
          <>
            <Navbar />
            <Hero
              showBackground={loadHeavy}
              onBackgroundReady={() => setThreadsReady(true)}
              scrollReady={loadHeavy && liveBgReady && threadsReady}
            />
            <BelowHero />
            <Projects onSelect={(p) => setSelectedProject(p)} />
            <Skills />
            <Contact />
          </>
        )}
      </div>
    </div>
  );
}
