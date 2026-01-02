import React, { useState, useEffect, useRef } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { FloatingPanel } from './components/FloatingPanel';
import { DecryptText } from './components/DecryptText';
import SplashCursor from './components/SplashCursor';
import DomeGallery from './components/DomeGallery';
import GlassSurface from './components/GlassSurface';
import FuzzyText from './components/FuzzyText';
import { PROJECTS, SKILL_GROUPS, NAV_ITEMS } from './constants';
import { 
  Shield, 
  Cpu, 
  Terminal, 
  Layers, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Mail,
  ArrowRight,
  Database,
  Clock,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(0);
  const [time, setTime] = useState(new Date());
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollPos / height);

      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      triggerError();
    }
  };

  const triggerError = () => {
    setErrorState(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const resetSystem = () => {
    setErrorState(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (errorState) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
        </div>
        
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center gap-4 text-red-500 mono animate-pulse mb-8">
            <AlertTriangle size={32} />
            <span className="text-xl tracking-[0.5em] font-bold uppercase">CRITICAL_SYSTEM_FAILURE</span>
            <AlertTriangle size={32} />
          </div>
          
          <FuzzyText 
            baseIntensity={0.3} 
            hoverIntensity={0.8} 
            enableHover={true}
            glitchMode={true}
            // color="#f97316ff"
            color="#f97316"

            className="ml-20 mt-14
            sm:ml-8 sm:mt-6
            md:ml-20 md:mt-10"
            
            
          >
            404_X
          </FuzzyText>
        </div>

        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black mono text-white">RESOURCE_NOT_FOUND</h2>
            <p className="text-gray-500 mono text-sm md:text-base leading-relaxed">
              The requested node or memory address is corrupted or does not exist in the current system kernel. 
              Uplink failed. Telemetry indicates a broken path.
            </p>
          </div>

          <div className="glass border-red-500/20 p-6 rounded-2xl bg-red-500/5 text-left max-w-md mx-auto">
            <div className="mono text-[10px] text-red-500/50 mb-2">DEBUG_CONSOLE:</div>
            <code className="text-xs text-red-400 block whitespace-pre">
              {`> status: error_404\n> thread: 0x82ff19\n> trace: main.sys.render.fault\n> solution: hard_reset_required`}
            </code>
          </div>

          <button 
            onClick={resetSystem}
            className="group flex items-center gap-3 px-8 py-4 bg-orange-500 text-black font-black mono text-sm hover:bg-white transition-all mx-auto orange-glow"
          >
            <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            REBOOT_SYSTEM_KERNEL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-orange-500 selection:text-black">
      <SplashCursor />
      <NeuralBackground />
      
      {/* HUD - Dynamic Navigation */}
      <nav className="fixed top-4 md:top-8 left-4 right-4 md:left-8 md:right-8 z-[100] flex items-center justify-between">
        <GlassSurface 
          className={`transition-all duration-700 ${window.scrollY > 50 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          borderRadius={16}
          distortionScale={scrolled * -200}
          brightness={70}
          opacity={0.4}
          style={{ position: 'absolute', top: '-10px', left: '-10px', width: '240px', height: '80px', zIndex: -1 }}
        >
          <div></div>
        </GlassSurface>
        
        <div className="flex items-center gap-3 md:gap-4 group cursor-pointer relative" onClick={() => scrollTo('home')}>
          <GlassSurface
            width={scrolled > 0 ? 52 : 48}
            height={scrolled > 0 ? 52 : 48}
            borderRadius={12}
            distortionScale={scrolled > 0 ? -150 : 0}
            displace={scrolled > 0 ? 2 : 0}
            opacity={scrolled > 0 ? 0.8 : 0}
            className="transition-all duration-500"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-lg flex items-center justify-center border-orange-500/50 orange-glow transition-all group-hover:rotate-90">
              <span className="text-orange-500 font-bold mono text-lg md:text-xl">X</span>
            </div>
          </GlassSurface>
          
          <div className="hidden sm:block">
            <h3 className="mono text-[9px] md:text-xs opacity-40 flicker">SYSTEM_STATUS</h3>
            <p className="mono text-[10px] md:text-sm text-green-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
              LEARNING_PATH_ACTIVE
            </p>
          </div>
        </div>

        <div className="glass px-4 md:px-6 py-2 md:py-3 rounded-full flex gap-3 md:gap-8 overflow-x-auto no-scrollbar max-w-[70vw] sm:max-w-none shadow-2xl backdrop-blur-2xl border-white/10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link-hover mono text-[9px] md:text-xs transition-all tracking-widest whitespace-nowrap ${activeSection === item.id ? 'text-orange-500 scale-110 font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
          {/* Test button for error state */}
          <button
            onClick={triggerError}
            className="nav-link-hover mono text-[9px] md:text-xs text-red-500/40 hover:text-red-500 transition-all tracking-widest whitespace-nowrap"
          >
            [X]
          </button>
        </div>

        <div className="hidden lg:flex flex-col items-end">
          <h3 className="mono text-xs opacity-40 flex items-center gap-2">
            <Clock size={10} className="text-orange-500" />
            CURRENT_TIME
          </h3>
          <p className="mono text-sm uppercase shimmer-text font-bold tracking-widest">{formatTime(time)}</p>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* Section 1: HOME */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              
              // src="IMG_20251216_125234.jpg" 

              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="Hero Cover" 
              className="w-full h-full object-cover grayscale opacity-20 transition-transform duration-1000 scale-105"
              style={{ transform: `translateY(${scrolled * 100}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
          </div>

          <div className="relative z-10 max-w-5xl">
            <div className="mono text-orange-500 text-[10px] md:text-sm mb-4 md:mb-6 tracking-[0.5em] animate-pulse flex items-center gap-3">
              <div className="h-px w-6 md:w-8 bg-orange-500"></div>
              [ IDENTITY MODULE LOADED ]
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-black mb-6 md:mb-8 tracking-tighter leading-[0.85] group">
              <span className="glitch-text block" data-text="SHIMUL">SHIMUL</span>
              <span className="text-orange-500 transition-all group-hover:pl-4">_MRX</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6 md:mt-12 items-end">
              <div className="space-y-6 md:space-y-8">
                <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed border-l-4 border-orange-500/30 pl-6 animate-soft-alive">
                  Computer Science Student specializing in <span className="text-white font-bold">hands-on building</span>, 
                  experimental systems, and <span className="text-orange-500">learning by doing</span>.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <button onClick={() => scrollTo('projects')} className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-black font-black mono text-[10px] md:text-sm hover:bg-yellow-400 transition-all hover:pr-10 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                    ACCESS_ARTIFACTS
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                  </button>
                  <button onClick={() => scrollTo('contact')} className="px-6 md:px-8 py-3 md:py-4 glass border border-orange-500/20 text-white mono text-[10px] md:text-sm hover:border-orange-500/50 transition-all hover:bg-white/5">
                    ESTABLISH_UPLINK
                  </button>
                </div>
              </div>
              
              <div className="hidden md:flex justify-end">
                <div className="glass p-6 rounded-2xl border-orange-500/10 space-y-4 max-w-[320px] orange-glow backdrop-blur-xl object-card">
                  <div className="flex justify-between items-center mono text-[10px] opacity-40 flicker">
                    <span>COGNITIVE_METRICS</span>
                    <span>CSE_MODULE_3.1</span>
                  </div>
                  <div className="flex gap-1 h-8 items-end">
                    {[30, 60, 45, 80, 55, 40, 75, 50, 65, 35].map((h, i) => (
                      <div key={i} className="flex-1 bg-orange-500/40 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                  <p className="mono text-[11px] leading-relaxed text-gray-400">
                    Student Link active. Current Phase: 3rd Year, 1st Sem. Focused on building, breaking, and understanding core computing primitives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: EXPERTISE */}
        <section id="expertise" className="min-h-screen py-24 md:py-32 px-6 md:px-24">
          <div className="flex items-center gap-4 md:gap-8 mb-12 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter">
              <DecryptText text="EXPERTISE" />
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SKILL_GROUPS.map((group, idx) => (
              <FloatingPanel key={idx} className="group relative overflow-hidden object-card">
                <span className="absolute -right-4 -bottom-4 text-7xl md:text-8xl font-black text-white/5 pointer-events-none group-hover:text-orange-500/10 transition-colors">0{idx + 1}</span>
                
                <div className="flex items-center justify-between mb-8 md:mb-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-orange-500/5 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all duration-500">
                    {group.icon === 'Terminal' && <Terminal size={20} />}
                    {group.icon === 'Cpu' && <Cpu size={20} />}
                    {group.icon === 'Layers' && <Layers size={20} />}
                    {group.icon === 'Shield' && <Shield size={20} />}
                  </div>
                  <span className="mono text-[9px] md:text-[10px] text-gray-600 tracking-widest uppercase flicker">Skillset</span>
                </div>
                <h3 className="mono font-bold text-lg md:text-xl mb-4 md:mb-6 text-white tracking-tight">
                   <DecryptText text={group.name} delay={idx * 150} />
                </h3>
                <ul className="space-y-2 md:space-y-3 relative z-10">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-xs md:text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 group-hover:scale-125 transition-all"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </FloatingPanel>
            ))}
          </div>
        </section>

        {/* Section 3: PROJECTS */}
        <section id="projects" className="min-h-screen py-24 md:py-32 px-6 md:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 md:gap-8">
            <div className="pt-10 md:pt-0">
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4">
                <DecryptText text="PROJECTS" />
              </h2>
              <p className="mono text-gray-500 max-w-lg text-[10px] md:text-sm tracking-wide">
                Archive of experimental builds and artifacts. These represent a journey through hands-on system building and problem solving.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="px-4 md:px-6 py-2 md:py-3 glass rounded-xl mono text-[10px] md:text-xs border border-white/5 flex items-center gap-3">
                 <span className="text-orange-500 font-bold flicker">BUILD_COUNT:</span>
                 <span className="shimmer-text">50+</span>
               </div>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {PROJECTS.map((project, idx) => (
              <div key={project.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <FloatingPanel className="relative p-0 overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col md:flex-row border border-white/5 group-hover:border-orange-500/20 object-card">
                  <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
                    <div>
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <span className="px-3 md:px-4 py-1 md:py-1.5 glass rounded-lg text-[9px] md:text-[10px] mono text-orange-500 font-bold border border-orange-500/20 flicker">{project.category}</span>
                        <span className="mono text-[9px] md:text-[10px] text-gray-600">ARTIFACT_ID_{project.id}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 tracking-tight group-hover:text-orange-500 transition-colors">
                        <DecryptText text={project.title} />
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-6 md:mb-8 text-base md:text-lg font-light">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 md:px-4 py-1 md:py-1.5 bg-white/5 border border-white/5 rounded-lg text-[9px] md:text-[10px] mono text-gray-400 group-hover:text-white group-hover:border-white/10 transition-all">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-8 md:p-10 bg-[#070707] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                    
                    <div className="relative z-10">
                      <h4 className="mono text-[9px] md:text-[10px] text-orange-500 mb-6 md:mb-8 tracking-[0.3em] uppercase flex items-center gap-2 flicker">
                        <Database size={12} />
                        EXPERIMENTAL_OUTCOME
                      </h4>
                      <div className="bg-black/40 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-md transition-all group-hover:bg-orange-500/5 group-hover:border-orange-500/20">
                        <p className="text-xl md:text-2xl font-light italic text-gray-100 leading-normal">
                          "{project.impact}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-10 md:mt-12 relative z-10">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group/btn bg-white/5 hover:bg-orange-500/10 px-4 md:px-6 py-3 md:py-4 rounded-2xl transition-all border border-transparent hover:border-orange-500/30 w-full md:w-auto justify-center">
                        <span className="mono text-[10px] md:text-xs font-bold tracking-[0.2em] group-hover/btn:text-orange-500 transition-colors">ACCESS_REPOSITORY</span>
                        <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center border-white/10 group-hover/btn:border-orange-500 group-hover/btn:rotate-45 transition-all">
                          <ExternalLink size={18} />
                        </div>
                      </a>
                    </div>
                  </div>
                </FloatingPanel>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: GALLERY */}
        <section id="gallery" className="min-h-screen py-24 md:py-32 flex flex-col justify-center px-6 md:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4">
                <DecryptText text="GALLERY" />
              </h2>
              <p className="mono text-gray-500 max-w-lg text-[10px] md:text-sm tracking-wide">
                Immersive visual archive. Drag to rotate the system vault and click to explore high-resolution captures.
              </p>
            </div>
          </div>
          <div className="w-full h-[600px] md:h-[800px] rounded-[2rem] overflow-hidden glass border border-white/5 relative">
            <DomeGallery />
          </div>
        </section>

        {/* Section 5: ABOUT */}
        <section id="about" className="min-h-screen py-24 md:py-32 flex flex-col justify-center px-6 md:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/5] glass rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative group orange-glow object-card mx-auto max-w-[400px] lg:max-w-none">
                  <img 
                    src="1.jpg" 

                    // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 


                    alt="Shimul MRX" 
                    className="w-full h-full object-cover grayscale brightness-375 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex justify-between items-end">
                     <div>
                        <div className="flex gap-1.5 mb-2 md:mb-3">
                           <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-orange-500 animate-pulse"></div>
                           <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-orange-500/30 flicker"></div>
                        </div>
                        <p className="mono text-[9px] md:text-[11px] font-bold text-white tracking-widest uppercase flicker">SYSTEMS_BUILDER</p>
                     </div>
                     <div className="glass px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border-white/10 text-[9px] md:text-[10px] mono text-gray-400">
                        STUDENT_NODE
                     </div>
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-32 md:w-48 h-32 md:h-48 glass rounded-full border border-orange-500/10 orange-glow -z-10 animate-pulse"></div>
              </div>
              
              <div className="space-y-8 md:space-y-10 order-1 lg:order-2">
                <div className="space-y-3 md:space-y-4">
                  <div className="mono text-orange-500 text-[10px] md:text-xs tracking-[0.4em] uppercase flicker">[ NARRATIVE_BUFFER ]</div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none pt-4">
                     <DecryptText text="SHIMUL" /><br /><span className="text-gray-600 font-light text-4xl md:text-6xl">_MRX</span>
                  </h2>
                </div>
                
                <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                  <p className="transition-all hover:text-white duration-500">
                    I am a Computer Science & Engineering student in my 3rd year. My approach to technology is driven by a deep curiosity for how systems work under the hood. I believe in <span className="text-white font-medium italic shimmer-text">building and breaking</span> as the primary methods of mastery.
                  </p>
                  <p className="transition-all hover:text-white duration-500">
                    Whether it's deploying a complex web platform, writing a system-level script, or solving competitive programming problems, I aim for <span className="text-orange-500 font-bold">handshake-level understanding</span>. My mission is to explore the intersection of software, hardware, and security.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 md:gap-10 pt-8 md:pt-10 border-t border-white/5">
                    <div className="object-card p-3 md:p-4 rounded-xl border border-transparent hover:border-orange-500/10">
                      <h4 className="mono text-[9px] md:text-[10px] text-gray-500 mb-2 md:mb-3 tracking-widest uppercase flicker">Current Year</h4>
                      <p className="text-white text-xl md:text-2xl font-black italic underline decoration-orange-500/30 underline-offset-8">3RD YEAR</p>
                    </div>
                    <div className="object-card p-3 md:p-4 rounded-xl border border-transparent hover:border-orange-500/10">
                      <h4 className="mono text-[9px] md:text-[10px] text-gray-500 mb-2 md:mb-3 tracking-widest uppercase flicker">Real Projects</h4>
                      <p className="text-white text-xl md:text-2xl font-black italic underline decoration-orange-500/30 underline-offset-8">50+ BUILDS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: CONTACT */}
        <section id="contact" className="min-h-screen py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <div className="mono text-orange-500 text-[10px] md:text-sm tracking-[0.5em] animate-pulse flicker">ESTABLISHING_HANDSHAKE_PROTOCOL</div>
              <h2 className="text-6xl sm:text-7xl md:text-[9rem] font-black tracking-tighter mb-6 md:mb-8 leading-none group pt-6">
                 <DecryptText text="UPLINK" className="group-hover:text-orange-500 transition-colors" />
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Always open for collaboration on experimental builds, robotics research, or competitive programming challenges. Reach out via my primary protocols.
              </p>
            </div>
            
            {/* Social Icons with Hover Effects */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-10">
              <a href="https://github.com/alex46x" target="_blank" rel="noopener noreferrer" className="group relative w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center border-white/5 hover:border-orange-500/50 transition-all hover:scale-110 orange-glow object-card">
                <Github size={28} className="text-gray-400 group-hover:text-white group-hover:rotate-12 transition-all" />
                <span className="absolute -bottom-8 mono text-[8px] opacity-0 group-hover:opacity-100 transition-all tracking-widest flicker">GITHUB</span>
              </a>
              <a href="https://www.linkedin.com/in/mrx46" target="_blank" rel="noopener noreferrer" className="group relative w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center border-white/5 hover:border-orange-500/50 transition-all hover:scale-110 orange-glow object-card">
                <Linkedin size={28} className="text-gray-400 group-hover:text-blue-400 group-hover:-rotate-12 transition-all" />
                <span className="absolute -bottom-8 mono text-[8px] opacity-0 group-hover:opacity-100 transition-all tracking-widest flicker">LINKEDIN</span>
              </a>
              <a href="https://www.facebook.com/mrx460" target="_blank" rel="noopener noreferrer" className="group relative w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center border-white/5 hover:border-orange-500/50 transition-all hover:scale-110 orange-glow object-card">
                <Facebook size={28} className="text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                <span className="absolute -bottom-8 mono text-[8px] opacity-0 group-hover:opacity-100 transition-all tracking-widest flicker">FACEBOOK</span>
              </a>
              <a href="https://x.com/mrx_46x" target="_blank" rel="noopener noreferrer" className="group relative w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center border-white/5 hover:border-orange-500/50 transition-all hover:scale-110 orange-glow object-card">
                <Twitter size={28} className="text-gray-400 group-hover:text-sky-400 transition-all" />
                <span className="absolute -bottom-8 mono text-[8px] opacity-0 group-hover:opacity-100 transition-all tracking-widest flicker">X_FEED</span>
              </a>
              <a href="mailto:alex@xero.sys" className="group relative w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center border-white/5 hover:border-orange-500/50 transition-all hover:scale-110 orange-glow object-card">
                <Mail size={28} className="text-gray-400 group-hover:text-orange-500 transition-all" />
                <span className="absolute -bottom-8 mono text-[8px] opacity-0 group-hover:opacity-100 transition-all tracking-widest flicker">EMAIL</span>
              </a>
            </div>

            <div className="pt-16 md:pt-24 flex flex-col items-center">
              <div className="mono text-[9px] md:text-[10px] text-gray-700 tracking-[0.8em] mb-4 flicker uppercase">SYSTEM_TELEMETRY</div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-16 mono text-[8px] md:text-[10px] opacity-30">
                 <span className="hover:opacity-100 transition-opacity cursor-crosshair shimmer-text">WEB_DEV_NODE</span>
                 <span className="hover:opacity-100 transition-opacity cursor-crosshair shimmer-text">COMP_PROG_100</span>
                 <span className="hover:opacity-100 transition-opacity cursor-crosshair shimmer-text">CSE_STUDENT</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Progress Indicator HUD - Hidden on small mobile */}
      <div className="fixed right-4 md:right-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-6 md:gap-8 z-50">
        <div className="mono text-[8px] md:text-[10px] -rotate-90 origin-center text-gray-500 tracking-[0.5em] w-0 mb-8 md:mb-10 whitespace-nowrap flicker">
          EXPLORATION_DEP
        </div>
        <div className="w-px h-32 md:h-48 bg-white/5 relative">
          <div className="absolute top-0 w-full bg-orange-500 orange-glow transition-all duration-300" style={{ height: `${scrolled * 100}%` }}></div>
          {[0, 0.25, 0.5, 0.75, 1].map((mark) => (
            <div key={mark} className="absolute w-2 h-px bg-white/10 -left-1" style={{ top: `${mark * 100}%` }}></div>
          ))}
        </div>
        <div className="mono text-[8px] md:text-[10px] text-orange-500 font-bold flicker">{Math.round(scrolled * 100)}%</div>
      </div>

      {/* Background Ambience Footer */}
      <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center text-gray-600 mono text-[9px] md:text-[10px] gap-8 bg-black/40">
         <div className="flex flex-col sm:flex-row gap-6 md:gap-8 text-center sm:text-left">
           <div>
             <span className="block opacity-40 mb-1 flicker">IDENTITY</span>
             <span className="text-gray-400 shimmer-text">SHIMUL_MRX // CSE_STUDENT</span>
           </div>
           <div>
             <span className="block opacity-40 mb-1 flicker">VERSION</span>
             <span className="text-gray-400">v1.0.0-STABLE</span>
           </div>
         </div>
         
         <div className="flex flex-col items-center md:items-end gap-2 md:gap-3">
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
             <span className="tracking-[0.2em] flicker">CURIOSITY_ENGINE_RUNNING</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
             <span className="tracking-[0.2em]">BUILD_AND_BREAK</span>
           </div>
         </div>
      </footer>

      {/* Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
    </div>
  );
};

export default App;
