'use client';

import { useEffect, useState } from 'react';
import type { CaseStudy, CaseStudySection } from '@prisma/client';
import Image from 'next/image';
import { ArrowRight, MapPin, Search, Navigation, Heart, SquareParking, Bell, Filter, ChevronLeft, ChevronRight, CreditCard, Car, Clock, ShieldCheck, Map } from 'lucide-react';
import { motion } from 'framer-motion';

export function SteeGoCaseStudyContent({ caseStudy }: { caseStudy: CaseStudy & { sections: CaseStudySection[] } }) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navigationSections = [
    { id: 'hero', title: 'Hero' },
    { id: 'overview', title: 'Overview' },
    { id: 'process', title: 'Process' },
    { id: 'brand', title: 'Brand' },
    { id: 'color', title: 'Color System' },
    { id: 'typography', title: 'Typography' },
    { id: 'iconography', title: 'Iconography' },
    { id: 'components', title: 'Components' },
    { id: 'experience', title: 'The Experience' },
    { id: 'flow', title: 'User Flow' },
    { id: 'active-parking', title: 'Active Parking' },
    { id: 'final', title: 'Final' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sectionElements = document.querySelectorAll('.steego-section');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block">
        <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">SteeGo Case Study</h3>
        <nav className="flex flex-col gap-1">
          {navigationSections.map((section, idx) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollTo(e, section.id)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === section.id
                  ? 'bg-white/5 font-semibold text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className={`font-mono text-xs ${activeSection === section.id ? 'text-[#FF5858]' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{section.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <article className="min-w-0 flex-1 space-y-32 pb-32">
        {/* 1. HERO SECTION */}
        <section id="hero" className="steego-section scroll-mt-24 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 shadow-2xl p-8 lg:p-12">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5858]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-[#FF5858] text-xs font-bold tracking-widest uppercase mb-4">Mobile UX / Product Design</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  SteeGo — Steer N Go
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl mt-6 leading-relaxed max-w-lg">
                  A smarter way to find, reserve and manage parking in busy cities.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold tracking-widest text-zinc-500">
                <div>
                  <span className="block text-zinc-700 mb-1">ROLE</span>
                  <span className="text-zinc-300">UI UX DESIGN</span>
                </div>
                <div>
                  <span className="block text-zinc-700 mb-1">PLATFORM</span>
                  <span className="text-zinc-300">MOBILE</span>
                </div>
                <div>
                  <span className="block text-zinc-700 mb-1">CATEGORY</span>
                  <span className="text-zinc-300">PARKING</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="rounded-full bg-gradient-to-r from-[#FF5858] to-[#F09819] px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,88,88,0.3)] transition-transform hover:scale-105 active:scale-95">
                  View Prototype
                </button>
                <button className="rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  Explore Case Study
                </button>
              </div>
            </div>

            <div className="relative h-[600px] w-full flex items-center justify-center">
              {/* Fake Phone Frame */}
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden z-10 ring-1 ring-white/10">
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-xl w-32 mx-auto z-50"></div>
                
                {/* Map UI Built in CSS */}
                <div className="absolute inset-0 bg-[#E5E3DF]">
                  {/* Fake Map Paths */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]"></div>
                  <div className="absolute top-1/4 left-0 right-0 h-16 bg-white/50 rotate-12 transform origin-left"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-12 bg-white/50 -rotate-12 transform origin-right"></div>
                  
                  {/* Fake UI Overlay */}
                  <div className="absolute top-8 left-4 right-4 bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3 z-20">
                    <Search size={18} className="text-zinc-400" />
                    <span className="text-zinc-400 text-sm font-medium">Search destination...</span>
                  </div>

                  {/* Fake Map Markers */}
                  <div className="absolute top-1/3 left-1/3 bg-[#FF5858] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 flex gap-1 items-center transform -translate-x-1/2 -translate-y-1/2">
                    ₹40 
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-[45%] right-1/4 bg-white text-zinc-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 transform -translate-x-1/2 -translate-y-1/2 border border-zinc-200">
                    ₹60
                  </div>

                  {/* Bottom Sheet */}
                  <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-5 z-30">
                    <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mb-4"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-zinc-900 text-lg">CP Parking</h4>
                        <p className="text-sm text-zinc-500">Connaught Place</p>
                      </div>
                      <div className="bg-[#FF5858]/10 text-[#FF5858] text-xs font-bold px-2 py-1 rounded-md">
                        Available
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-zinc-400 text-xs">Distance</span>
                        <span className="font-bold text-zinc-800 text-sm">1.2 km</span>
                      </div>
                      <div className="w-px bg-zinc-100"></div>
                      <div className="flex flex-col">
                        <span className="text-zinc-400 text-xs">Time</span>
                        <span className="font-bold text-zinc-800 text-sm">2 min</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#FF5858] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(255,88,88,0.3)]">
                      Reserve Spot
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 -left-8 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF5858] flex items-center justify-center">
                  <SquareParking size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Parking available</p>
                  <p className="text-zinc-400 text-xs">2 min away</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-48 -right-4 bg-white p-3 rounded-xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="text-lg font-black text-zinc-900">₹40</div>
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wide">/ hour</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT OVERVIEW */}
        <section id="overview" className="steego-section scroll-mt-24 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5">
            <div>
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">Role</p>
              <p className="text-white font-medium">UI/UX Designer</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">Platform</p>
              <p className="text-white font-medium">Mobile App</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">Focus</p>
              <p className="text-white font-medium">Parking Discovery</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">Tools</p>
              <p className="text-white font-medium">Figma / Prototyping</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">The Problem</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Finding available parking in busy urban areas is frustrating, time-consuming and uncertain. Drivers waste fuel and time circling blocks, contributing to congestion and emissions, while parking lots often lack digital visibility.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">The Goal</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Design a simple, high-visibility mobile experience that helps users discover nearby parking, check real-time availability, select a slot, pay digitally, and track their active parking session with minimal friction.
              </p>
            </div>
          </div>
        </section>

        {/* 3. DESIGN PROCESS */}
        <section id="process" className="steego-section scroll-mt-24 space-y-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Design Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Discover' },
              { num: '02', title: 'Define' },
              { num: '03', title: 'Structure' },
              { num: '04', title: 'Design' },
              { num: '05', title: 'Prototype' }
            ].map((step) => (
              <div key={step.num} className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#FF5858]/10 hover:border-[#FF5858]/30 transition-all cursor-default">
                <span className="block text-3xl font-black text-white/10 group-hover:text-[#FF5858]/30 transition-colors mb-4">{step.num}</span>
                <span className="block text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{step.title}</span>
              </div>
            ))}
          </div>
        </section>
        {/* 4. BRAND / LOGO */}
        <section id="brand" className="steego-section scroll-mt-24 space-y-12">
          <div className="grid md:grid-cols-2 gap-12 items-center p-8 lg:p-16 rounded-[2.5rem] bg-zinc-900 border border-white/5">
            <div className="flex flex-col items-center justify-center p-12 bg-black rounded-[2rem] border border-white/5 shadow-inner">
              {/* Fake logo construction */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <MapPin className="w-full h-full text-[#FF5858] opacity-20 absolute" strokeWidth={1} />
                <div className="w-24 h-24 bg-gradient-to-br from-[#FF5858] to-[#F09819] rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-5xl font-black text-white italic">S</span>
                </div>
                {/* Grid lines for "construction" feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Parking starts with location.</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                The location symbol instantly communicates parking discovery, while the bold "S" integrates the SteeGo identity directly into the mark.
              </p>
              <div className="flex gap-4 pt-4">
                <span className="px-4 py-2 rounded-full bg-white/5 text-xs font-bold text-zinc-300 tracking-wider">LOCATION</span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-xs font-bold text-zinc-300 tracking-wider">IDENTITY</span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-xs font-bold text-zinc-300 tracking-wider">NAVIGATION</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COLOR SYSTEM */}
        <section id="color" className="steego-section scroll-mt-24 space-y-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Built for the city.</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">Orange was selected to differentiate SteeGo from blue-heavy parking apps and to evoke traffic signage and high visibility.</p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-[2rem] overflow-hidden relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-[#FF5858] to-[#F09819]">
              <span className="text-5xl md:text-7xl font-black text-white/20 tracking-tighter mix-blend-overlay">BUILT FOR THE CITY</span>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#FF5858] flex justify-between items-end h-32 shadow-lg">
                <span className="text-white font-bold">Primary Coral</span>
                <span className="text-white/80 font-mono text-sm">#FF5858</span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F09819] flex justify-between items-end h-32 shadow-lg">
                <span className="text-white font-bold">Orange</span>
                <span className="text-white/80 font-mono text-sm">#F09819</span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F3F3F3] flex justify-between items-end h-32 shadow-lg">
                <span className="text-zinc-900 font-bold">Light Grey</span>
                <span className="text-zinc-500 font-mono text-sm">#F3F3F3</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center gap-4">
              <button className="w-full py-3 bg-[#FF5858] text-white font-bold rounded-xl shadow-lg">Active Button</button>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center gap-4">
              <div className="bg-[#FF5858] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex gap-1 items-center">
                ₹40 <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <span className="text-zinc-500 text-xs font-medium">Map Marker</span>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center gap-4">
              <div className="bg-[#FF5858]/10 text-[#FF5858] px-3 py-1.5 rounded-md text-xs font-bold">Available</div>
              <span className="text-zinc-500 text-xs font-medium">Badge</span>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center gap-4">
              <MapPin className="text-[#FF5858]" size={28} />
              <div className="w-1 h-1 bg-[#FF5858] rounded-full mt-1"></div>
              <span className="text-zinc-500 text-xs font-medium">Active Nav</span>
            </div>
          </div>
        </section>

        {/* 6. TYPOGRAPHY */}
        <section id="typography" className="steego-section scroll-mt-24 space-y-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Typography</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8 p-8 lg:p-12 rounded-[2rem] bg-zinc-900 border border-white/5">
              <div>
                <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">DISPLAY / BOLD / 48PX</p>
                <div className="text-5xl font-black text-white tracking-tighter">SteeGo</div>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div>
                <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">H1 / BOLD / 32PX</p>
                <div className="text-3xl font-bold text-white">Find parking near you.</div>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div>
                <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">H2 / MEDIUM / 20PX</p>
                <div className="text-xl font-medium text-white">Available parking</div>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div>
                <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">BODY / REGULAR / 16PX</p>
                <div className="text-base text-zinc-400">Choose a nearby parking location and reserve your slot.</div>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div>
                <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">CAPTION / MEDIUM / 12PX</p>
                <div className="text-xs text-zinc-500">2 min away · ₹40/hour</div>
              </div>
            </div>

            <div className="flex items-center justify-center p-8 lg:p-12 rounded-[2rem] bg-black border border-white/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
              {/* Mock UI Card using the typography */}
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
                <h1 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">Find parking near you.</h1>
                <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 mb-4">
                  <h2 className="text-xl font-bold text-zinc-800 mb-1">Available parking</h2>
                  <p className="text-zinc-500 text-sm mb-4">Choose a nearby parking location and reserve your slot.</p>
                  <div className="flex gap-2">
                    <span className="bg-[#FF5858]/10 text-[#FF5858] text-xs font-bold px-2 py-1 rounded">2 min away</span>
                    <span className="bg-zinc-200 text-zinc-600 text-xs font-bold px-2 py-1 rounded">₹40/hour</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-black text-white font-bold rounded-xl text-lg">Search Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ICONOGRAPHY */}
        <section id="iconography" className="steego-section scroll-mt-24 space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-bold text-white tracking-tight">Iconography</h2>
            <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase">24PX SYSTEM</span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              { icon: <MapPin />, label: "Location" },
              { icon: <Search />, label: "Search" },
              { icon: <Navigation />, label: "Navigation" },
              { icon: <Heart />, label: "Favourite" },
              { icon: <SquareParking />, label: "Parking" },
              { icon: <Bell />, label: "Notification" },
              { icon: <Filter />, label: "Filter" },
              { icon: <ChevronLeft />, label: "Back" },
              { icon: <ChevronRight />, label: "Next" },
              { icon: <CreditCard />, label: "Payment" },
              { icon: <Car />, label: "Vehicle" },
              { icon: <ShieldCheck />, label: "Security" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors">
                <div className="text-zinc-300 [&>svg]:w-6 [&>svg]:h-6">
                  {item.icon}
                </div>
                <span className="text-xs text-zinc-500 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
        {/* 8. COMPONENTS */}
        <section id="components" className="steego-section scroll-mt-24 space-y-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Components</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">A modular component system designed for quick decision-making while driving or walking.</p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Buttons & Inputs */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 space-y-6">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Buttons</h3>
                <div className="space-y-4">
                  <button className="w-full py-3.5 bg-[#FF5858] text-white font-bold rounded-xl shadow-lg">Primary Action</button>
                  <button className="w-full py-3.5 bg-white text-zinc-900 font-bold rounded-xl shadow-md">Secondary Action</button>
                  <button className="w-full py-3.5 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl">Outline Button</button>
                  <button className="w-full py-3.5 bg-transparent text-zinc-400 font-bold rounded-xl hover:text-white">Text Button</button>
                </div>
              </div>
              
              <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 space-y-6">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Inputs</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Full Name</label>
                    <input type="text" disabled placeholder="John Doe" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF5858]" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Mobile Number</label>
                    <div className="flex">
                      <div className="bg-white/5 border border-white/10 border-r-0 rounded-l-xl px-4 py-3.5 text-zinc-400 font-medium">+91</div>
                      <input type="text" disabled placeholder="98765 43210" className="w-full bg-black border border-white/10 rounded-r-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF5858]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 space-y-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-900">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Cards</h3>
              
              {/* Location Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-lg">CP Parking</h4>
                    <p className="text-sm text-zinc-500">Connaught Place</p>
                  </div>
                  <div className="bg-[#FF5858]/10 text-[#FF5858] text-xs font-bold px-2 py-1 rounded-md">
                    ₹40/hr
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-600">
                    <Navigation size={14} className="text-[#FF5858]" /> 1.2 km
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-600">
                    <Clock size={14} className="text-zinc-400" /> 2 min
                  </div>
                </div>
              </div>

              {/* Vehicle Card */}
              <div className="bg-black border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Car size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Hyundai Creta</h4>
                    <p className="text-sm text-zinc-400">DL 8C AB 1234</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#FF5858] flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#FF5858] rounded-full"></div>
                </div>
              </div>

              {/* Parking Slot Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center h-24">
                  <span className="text-xl font-bold text-white">A-12</span>
                  <span className="text-xs text-[#FF5858] font-medium mt-1">Booked</span>
                </div>
                <div className="bg-[#FF5858] rounded-xl p-4 flex flex-col items-center justify-center h-24 shadow-lg shadow-[#FF5858]/20">
                  <span className="text-xl font-bold text-white">A-13</span>
                  <span className="text-xs text-white/80 font-medium mt-1">Selected</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 9. THE EXPERIENCE */}
        <section id="experience" className="steego-section scroll-mt-24 space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">The Experience</h2>
            <p className="text-zinc-400 max-w-2xl text-lg">A frictionless journey from finding a parking spot to tracking your active session.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 01 Splash */}
            <div className="space-y-6">
              <div className="relative aspect-[9/19] w-full bg-[#FF5858] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-4xl font-black text-[#FF5858] italic">S</span>
                </div>
                <h3 className="text-white font-black text-2xl tracking-tighter">SteeGo</h3>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">01</span>
                <h4 className="text-white font-bold">Splash & Logo</h4>
              </div>
            </div>

            {/* 02 Onboarding */}
            <div className="space-y-6 lg:mt-12">
              <div className="relative aspect-[9/19] w-full bg-white rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="flex-1 bg-[#F3F3F3] flex items-center justify-center p-8">
                  {/* Fake illustration */}
                  <div className="w-full aspect-square bg-[#FF5858]/10 rounded-full flex items-center justify-center relative">
                    <MapPin className="text-[#FF5858] w-16 h-16 absolute -mt-4" />
                    <div className="w-24 h-6 bg-black/5 rounded-full absolute bottom-8 blur-sm"></div>
                  </div>
                </div>
                <div className="p-6 bg-white space-y-4">
                  <h3 className="text-xl font-bold text-zinc-900 text-center">Find Parking Instantly</h3>
                  <p className="text-sm text-zinc-500 text-center">Discover and book parking slots near your destination with ease.</p>
                  <div className="flex justify-center gap-1.5 py-4">
                    <div className="w-6 h-1.5 bg-[#FF5858] rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full"></div>
                  </div>
                  <button className="w-full py-3.5 bg-[#FF5858] text-white font-bold rounded-xl">Get Started</button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">02</span>
                <h4 className="text-white font-bold">Onboarding</h4>
              </div>
            </div>

            {/* 03 Home */}
            <div className="space-y-6">
              <div className="relative aspect-[9/19] w-full bg-[#E5E3DF] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                {/* Header */}
                <div className="absolute top-0 inset-x-0 pt-12 pb-4 px-4 bg-gradient-to-b from-white/90 to-white/0 z-20">
                  <div className="bg-white rounded-xl shadow-md p-3 flex items-center gap-3">
                    <Search className="text-zinc-400 w-5 h-5" />
                    <span className="text-sm text-zinc-400">Where are you going?</span>
                  </div>
                </div>
                {/* Map lines */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,1)_2px,transparent_2px)] bg-[size:40px_40px] transform rotate-12 scale-150"></div>
                {/* Markers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF5858] rounded-full border-2 border-white shadow-lg z-10">
                  <div className="absolute inset-0 bg-[#FF5858] rounded-full animate-ping opacity-50"></div>
                </div>
                <div className="absolute top-1/3 left-1/4 bg-white px-2 py-1 rounded-md text-[10px] font-bold text-zinc-800 shadow-md border border-zinc-200 z-10">₹40</div>
                <div className="absolute bottom-1/3 right-1/4 bg-[#FF5858] px-2 py-1 rounded-md text-[10px] font-bold text-white shadow-md z-10">₹60</div>
                {/* Bottom Nav */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-zinc-100 flex justify-around items-center px-4 z-20">
                  <Map className="w-6 h-6 text-[#FF5858]" />
                  <Heart className="w-6 h-6 text-zinc-300" />
                  <CreditCard className="w-6 h-6 text-zinc-300" />
                  <div className="w-6 h-6 rounded-full bg-zinc-200"></div>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">03</span>
                <h4 className="text-white font-bold">Home / Map</h4>
              </div>
            </div>

            {/* 04 Search */}
            <div className="space-y-6 lg:mt-12">
              <div className="relative aspect-[9/19] w-full bg-[#F8F9FA] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="pt-12 px-4 pb-4 bg-white border-b border-zinc-100">
                  <div className="flex items-center gap-3 mb-6">
                    <ChevronLeft className="w-6 h-6 text-zinc-800" />
                    <h2 className="text-lg font-bold text-zinc-900">Search</h2>
                  </div>
                  <div className="bg-zinc-100 rounded-xl p-3 flex items-center gap-3">
                    <Search className="text-zinc-500 w-5 h-5" />
                    <span className="text-sm text-zinc-800 font-medium border-r border-zinc-300 pr-2">Connaught</span>
                    <div className="w-1.5 h-4 bg-[#FF5858] animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-4">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recent</p>
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div className="flex-1 border-b border-zinc-200 pb-4">
                        <h4 className="text-sm font-bold text-zinc-800">Connaught Place</h4>
                        <p className="text-xs text-zinc-500">New Delhi</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">04</span>
                <h4 className="text-white font-bold">Search Parking</h4>
              </div>
            </div>

            {/* 05 Details */}
            <div className="space-y-6">
              <div className="relative aspect-[9/19] w-full bg-white rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                {/* Fake Map Header */}
                <div className="h-48 bg-[#E5E3DF] relative">
                  <div className="absolute top-12 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <ChevronLeft className="w-6 h-6 text-zinc-800" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="text-[#FF5858] w-10 h-10" fill="#FF5858" fillOpacity={0.2} />
                  </div>
                </div>
                {/* Details Sheet */}
                <div className="flex-1 bg-white -mt-6 rounded-t-3xl p-5 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900">CP Parking</h3>
                      <p className="text-sm text-zinc-500">Connaught Place</p>
                    </div>
                    <div className="bg-[#FF5858]/10 text-[#FF5858] text-xs font-bold px-2 py-1 rounded">₹40/hr</div>
                  </div>
                  <div className="flex justify-around mb-6 py-4 border-y border-zinc-100">
                    <div className="text-center">
                      <div className="text-sm font-bold text-zinc-800">1.2 km</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wide mt-1">Distance</div>
                    </div>
                    <div className="w-px bg-zinc-100"></div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-zinc-800">2 min</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wide mt-1">Time</div>
                    </div>
                    <div className="w-px bg-zinc-100"></div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#FF5858]">42</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wide mt-1">Spots left</div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button className="w-full py-3.5 bg-[#FF5858] text-white font-bold rounded-xl shadow-lg">Reserve Spot</button>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">05</span>
                <h4 className="text-white font-bold">Location Details</h4>
              </div>
            </div>

            {/* 06 Select Vehicle */}
            <div className="space-y-6 lg:mt-12">
              <div className="relative aspect-[9/19] w-full bg-[#F8F9FA] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="pt-12 px-4 pb-4 bg-white border-b border-zinc-100 flex items-center gap-3">
                  <ChevronLeft className="w-6 h-6 text-zinc-800" />
                  <h2 className="text-lg font-bold text-zinc-900">Select Vehicle</h2>
                </div>
                <div className="p-4 space-y-4 flex-1">
                  {/* Vehicle 1 Selected */}
                  <div className="bg-white border-2 border-[#FF5858] rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Car size={18} className="text-zinc-800" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm">Hyundai Creta</h4>
                        <p className="text-xs text-zinc-500">DL 8C AB 1234</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#FF5858] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-[#FF5858] rounded-full"></div>
                    </div>
                  </div>
                  {/* Vehicle 2 */}
                  <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between shadow-sm opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Car size={18} className="text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-500 text-sm">Honda City</h4>
                        <p className="text-xs text-zinc-400">UP 16 XY 9876</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-300"></div>
                  </div>
                  
                  <button className="w-full py-3 border border-dashed border-zinc-300 rounded-xl text-sm font-bold text-zinc-500 flex items-center justify-center gap-2">
                    <span>+ Add New Vehicle</span>
                  </button>
                </div>
                <div className="p-4 bg-white border-t border-zinc-100">
                  <button className="w-full py-3.5 bg-[#FF5858] text-white font-bold rounded-xl shadow-lg">Continue</button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">06</span>
                <h4 className="text-white font-bold">Select Vehicle</h4>
              </div>
            </div>
            {/* 07 Choose Slot */}
            <div className="space-y-6">
              <div className="relative aspect-[9/19] w-full bg-[#F8F9FA] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="pt-12 px-4 pb-4 bg-white border-b border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ChevronLeft className="w-6 h-6 text-zinc-800" />
                    <h2 className="text-lg font-bold text-zinc-900">Select Slot</h2>
                  </div>
                  <span className="text-[#FF5858] font-bold">L1</span>
                </div>
                <div className="flex-1 p-6 relative">
                  {/* Fake Slot Grid */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div className="h-16 bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 font-bold opacity-50 relative">
                      A1 <div className="absolute inset-x-2 h-0.5 bg-[#FF5858] rotate-45 transform origin-center"></div>
                    </div>
                    <div className="h-16 bg-white border-2 border-zinc-200 rounded-xl flex items-center justify-center text-zinc-700 font-bold shadow-sm">A2</div>
                    <div className="h-16 bg-[#FF5858] border-2 border-[#FF5858] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-[#FF5858]/30">A3</div>
                    <div className="h-16 bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 font-bold opacity-50 relative">
                      A4 <div className="absolute inset-x-2 h-0.5 bg-[#FF5858] rotate-45 transform origin-center"></div>
                    </div>
                    <div className="h-16 bg-white border-2 border-zinc-200 rounded-xl flex items-center justify-center text-zinc-700 font-bold shadow-sm">B1</div>
                    <div className="h-16 bg-white border-2 border-zinc-200 rounded-xl flex items-center justify-center text-zinc-700 font-bold shadow-sm">B2</div>
                  </div>
                  {/* Road marking */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 flex flex-col items-center justify-around py-8 opacity-20 pointer-events-none">
                     <div className="w-1 h-6 bg-zinc-900"></div>
                     <div className="w-1 h-6 bg-zinc-900"></div>
                     <div className="w-1 h-6 bg-zinc-900"></div>
                     <div className="w-1 h-6 bg-zinc-900"></div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-zinc-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-zinc-500">Selected</p>
                    <p className="font-bold text-lg text-zinc-900">Slot A3</p>
                  </div>
                  <button className="px-8 py-3.5 bg-[#FF5858] text-white font-bold rounded-xl shadow-lg">Confirm</button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">07</span>
                <h4 className="text-white font-bold">Choose Parking Slot</h4>
              </div>
            </div>

            {/* 08 Payment */}
            <div className="space-y-6 lg:mt-12">
              <div className="relative aspect-[9/19] w-full bg-[#F8F9FA] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="pt-12 px-4 pb-4 bg-white border-b border-zinc-100 flex items-center gap-3">
                  <ChevronLeft className="w-6 h-6 text-zinc-800" />
                  <h2 className="text-lg font-bold text-zinc-900">Payment</h2>
                </div>
                <div className="flex-1 p-4 space-y-6">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
                    <p className="text-sm text-zinc-500 text-center mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-zinc-900 text-center">₹40.00</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Payment Method</h3>
                    <div className="bg-white border-2 border-[#FF5858] rounded-xl p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[8px] text-white font-black">UPI</div>
                        <span className="font-bold text-zinc-900 text-sm">Google Pay</span>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-[#FF5858] flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-[#FF5858] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between shadow-sm opacity-60">
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-zinc-600" />
                        <span className="font-bold text-zinc-500 text-sm">**** **** **** 1234</span>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-zinc-300"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-zinc-100">
                  <button className="w-full py-3.5 bg-zinc-900 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                    Pay ₹40.00
                  </button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">08</span>
                <h4 className="text-white font-bold">Payment</h4>
              </div>
            </div>

            {/* 09 Digital Receipt */}
            <div className="space-y-6">
              <div className="relative aspect-[9/19] w-full bg-[#FF5858] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col justify-center items-center px-6">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                
                {/* Confetti / Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
                
                <div className="bg-white w-full rounded-2xl p-6 relative shadow-2xl">
                  {/* Receipt jagged edge effect using CSS gradients (simplified with border for now) */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#FF5858]">
                    <ShieldCheck className="text-white w-8 h-8" />
                  </div>
                  <div className="pt-10 text-center space-y-1 mb-6">
                    <h3 className="font-bold text-zinc-900 text-xl">Booking Confirmed!</h3>
                    <p className="text-zinc-500 text-sm">Slot A3 at CP Parking</p>
                  </div>
                  <div className="border-t border-dashed border-zinc-300 py-4 space-y-3">
                    <div className="flex justify-between">
                       <span className="text-zinc-500 text-sm">Start Time</span>
                       <span className="font-bold text-zinc-900 text-sm">10:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-zinc-500 text-sm">Duration</span>
                       <span className="font-bold text-zinc-900 text-sm">1 Hour</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-zinc-500 text-sm">Vehicle</span>
                       <span className="font-bold text-zinc-900 text-sm">DL 8C AB 1234</span>
                    </div>
                  </div>
                  <div className="border-t border-zinc-200 pt-4 mt-2">
                    <div className="w-full h-12 bg-zinc-100 flex items-center justify-center rounded-lg">
                      {/* Fake barcode */}
                      <div className="flex gap-1 items-center h-8">
                         <div className="w-1 h-full bg-zinc-800"></div><div className="w-2 h-full bg-zinc-800"></div><div className="w-1 h-full bg-zinc-800"></div>
                         <div className="w-0.5 h-full bg-zinc-800"></div><div className="w-3 h-full bg-zinc-800"></div><div className="w-1 h-full bg-zinc-800"></div>
                         <div className="w-2 h-full bg-zinc-800"></div><div className="w-1 h-full bg-zinc-800"></div><div className="w-2 h-full bg-zinc-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-8 text-white font-bold text-sm bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">View Ticket</button>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">09</span>
                <h4 className="text-white font-bold">Digital Receipt</h4>
              </div>
            </div>

            {/* 10 Active Timer */}
            <div className="space-y-6 lg:mt-12">
              <div className="relative aspect-[9/19] w-full bg-[#111] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="pt-12 px-4 pb-4 flex items-center justify-between">
                  <ChevronLeft className="w-6 h-6 text-white" />
                  <h2 className="text-lg font-bold text-white">Active Parking</h2>
                  <div className="w-6"></div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                  {/* Glowing Timer */}
                  <div className="relative w-48 h-48 mb-8">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="4" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#FF5858" strokeWidth="4" strokeDasharray="283" strokeDashoffset="100" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(255,88,88,0.8)]" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-white">34:12</span>
                      <span className="text-xs text-[#FF5858] uppercase tracking-widest font-bold mt-1">Remaining</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between">
                       <span className="text-zinc-400 text-sm">Location</span>
                       <span className="font-bold text-white text-sm">CP Parking</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-zinc-400 text-sm">Slot</span>
                       <span className="font-bold text-white text-sm">A3</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-white/5">
                  <button className="w-full py-3.5 bg-white/10 text-white font-bold rounded-xl backdrop-blur-md">Extend Time</button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">10</span>
                <h4 className="text-white font-bold">Active Timer</h4>
              </div>
            </div>
            
            {/* 11 Extend Time */}
            <div className="space-y-6">
              <div className="relative aspect-[9/19] w-full bg-[#111] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col justify-end">
                  {/* Bottom Sheet */}
                  <div className="bg-zinc-900 rounded-t-3xl p-5 border-t border-white/10">
                    <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-6"></div>
                    <h3 className="text-xl font-bold text-white mb-6 text-center">Extend Parking</h3>
                    
                    <div className="flex items-center justify-between mb-8 px-4">
                      <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xl font-bold">-</button>
                      <div className="text-center">
                        <span className="text-4xl font-black text-[#FF5858]">1</span>
                        <span className="text-zinc-400 font-bold ml-2">Hr</span>
                      </div>
                      <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xl font-bold">+</button>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6 py-4 border-t border-white/10">
                      <span className="text-zinc-400 font-medium">Additional Cost</span>
                      <span className="text-xl font-bold text-white">₹40.00</span>
                    </div>
                    
                    <button className="w-full py-3.5 bg-[#FF5858] text-white font-bold rounded-xl shadow-lg">Pay & Extend</button>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">11</span>
                <h4 className="text-white font-bold">Extend Parking Time</h4>
              </div>
            </div>

            {/* 12 End Session */}
            <div className="space-y-6 lg:mt-12">
              <div className="relative aspect-[9/19] w-full bg-[#F8F9FA] rounded-[2.5rem] border-[6px] border-zinc-900 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-50"></div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#F09819] to-[#FF5858] text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                     <SquareParking className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-2 text-center">Parking<br/>Complete</h3>
                  <p className="text-white/80 text-center mb-8 text-sm">You have successfully exited the parking lot.</p>
                  
                  <div className="w-full bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex justify-between py-2 border-b border-white/10">
                       <span className="text-white/70 text-sm">Total Time</span>
                       <span className="font-bold text-white text-sm">1h 45m</span>
                    </div>
                    <div className="flex justify-between py-2">
                       <span className="text-white/70 text-sm">Total Paid</span>
                       <span className="font-bold text-white text-sm">₹80.00</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <button className="w-full py-3.5 bg-zinc-100 text-zinc-900 font-bold rounded-xl">Back to Home</button>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500">12</span>
                <h4 className="text-white font-bold">End Session</h4>
              </div>
            </div>
          </div>
        </section>
        {/* 10. USER FLOW */}
        <section id="flow" className="steego-section scroll-mt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">User Flow</h2>
            <p className="text-zinc-400 max-w-2xl text-lg">A streamlined journey removing unnecessary steps.</p>
          </div>
          
          <div className="p-8 lg:p-12 rounded-[2.5rem] bg-zinc-900 border border-white/5 overflow-x-auto">
            <div className="flex items-center min-w-max gap-4">
              {[
                { title: 'Open App', icon: <SquareParking className="w-5 h-5" /> },
                { title: 'Discover', icon: <Search className="w-5 h-5" /> },
                { title: 'Select Location', icon: <MapPin className="w-5 h-5" /> },
                { title: 'Choose Vehicle', icon: <Car className="w-5 h-5" /> },
                { title: 'Select Slot', icon: <Map className="w-5 h-5" /> },
                { title: 'Pay', icon: <CreditCard className="w-5 h-5" /> },
                { title: 'Park & Track', icon: <Clock className="w-5 h-5" /> },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-3 w-28">
                    <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 shadow-lg flex items-center justify-center text-zinc-400 group-hover:text-[#FF5858] transition-colors relative">
                      {step.icon}
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF5858] text-white text-[10px] font-bold flex items-center justify-center border-2 border-black">{i + 1}</div>
                    </div>
                    <span className="text-xs font-bold text-zinc-300 text-center">{step.title}</span>
                  </div>
                  {i < 6 && (
                    <div className="w-12 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-zinc-700" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. ACTIVE PARKING FEATURE */}
        <section id="active-parking" className="steego-section scroll-mt-24 space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16 rounded-[2.5rem] bg-black border border-white/5 relative overflow-hidden">
            {/* Background glowing effect */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF5858]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <span className="px-4 py-2 rounded-full bg-[#FF5858]/10 text-[#FF5858] text-xs font-bold tracking-widest uppercase inline-block">Key Feature</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">Animated Parking Timer</h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Instead of a static countdown, active parking uses a fluid, water-style animation. It fills up as time passes, providing a quick, intuitive glanceable state while walking back to the vehicle.
              </p>
              
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-[#FF5858]">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Glanceable UI</h4>
                    <p className="text-zinc-500 text-xs">Easy to read while walking</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-[#F09819]">
                    <Bell />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Smart Alerts</h4>
                    <p className="text-zinc-500 text-xs">Notifies 15 mins before expiry</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center relative z-10">
              {/* Highlight Phone Mockup */}
              <div className="relative w-[320px] h-[660px] bg-[#111] rounded-[3.5rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10">
                <div className="absolute top-0 inset-x-0 h-7 bg-zinc-900 rounded-b-xl w-36 mx-auto z-50"></div>
                
                <div className="flex-1 flex flex-col pt-16 px-6">
                  <h3 className="text-white font-bold text-xl text-center mb-12">Active Session</h3>
                  
                  {/* The Liquid Timer Mockup */}
                  <div className="relative w-full aspect-square bg-zinc-900 rounded-full border-[8px] border-black shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center mb-10 group">
                    {/* Liquid fill effect */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F09819] to-[#FF5858] h-[65%] group-hover:h-[70%] transition-all duration-1000 ease-in-out opacity-80 mix-blend-screen"></div>
                    {/* Waves */}
                    <svg className="absolute w-[200%] h-8 top-[35%] left-[-50%] text-[#FF5858] opacity-50 fill-current animate-[spin_10s_linear_infinite]" viewBox="0 0 1000 100" preserveAspectRatio="none">
                      <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" />
                    </svg>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">34<span className="text-3xl text-white/70">:12</span></span>
                      <span className="text-xs text-white/90 uppercase tracking-widest font-bold mt-2">Remaining</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-auto backdrop-blur-md space-y-4">
                     <div className="flex justify-between items-center border-b border-white/5 pb-4">
                       <span className="text-zinc-400 text-sm">Location</span>
                       <span className="font-bold text-white">Connaught Place</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-zinc-400 text-sm">Slot</span>
                       <span className="font-bold text-white text-xl">A3</span>
                     </div>
                  </div>
                  
                  <div className="pb-8 pt-4">
                    <button className="w-full py-4 bg-[#FF5858] text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,88,88,0.3)] text-lg">Extend Time</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. FINAL CTA */}
        <section id="final" className="steego-section scroll-mt-24 space-y-16">
          <div className="flex flex-col items-center justify-center py-24 px-8 rounded-[3rem] bg-gradient-to-b from-zinc-900 to-black border border-white/5 shadow-2xl relative overflow-hidden text-center">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF5858]/50 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF5858]/50 to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5858]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl relative z-10">
              <span className="text-4xl font-black text-[#FF5858] italic">S</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 relative z-10">
              Designed to make parking feel effortless.
            </h2>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 relative z-10">
              Thanks for exploring the SteeGo product design case study. 
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <button className="rounded-full bg-white px-10 py-5 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-95">
                View Figma Prototype
              </button>
              <button className="rounded-full bg-white/5 border border-white/10 px-10 py-5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Back to Projects
              </button>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
