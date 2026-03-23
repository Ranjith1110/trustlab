import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowRight, AlertCircle, ShieldCheck, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const triggerRef = useRef(null);
    const scannerRef = useRef(null);
    const imageParallaxRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        // 1. Smooth Scroll Initialization
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. Initial Premium Reveal (On Load)
        const tlLoad = gsap.timeline();
        tlLoad.fromTo(imageContainerRef.current, 
            { height: "0vh", opacity: 0 }, 
            { height: "80vh", opacity: 1, duration: 1.5, ease: "expo.inOut" }
        )
        .from(".hero-line", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.8");

        // 3. GSAP Timeline for Scroll Storytelling
        const tlScroll = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=800%", 
                pin: true,
                scrub: 1,
            }
        });

        // Step 1: Fade initial text & Start Scanner inside the capsule
        tlScroll.to(".initial-text", { opacity: 0, scale: 0.95, duration: 1 })
                .to(scannerRef.current, { top: "100%", duration: 14, ease: "none" }, 0)
                // Parallax effect on the image inside the capsule
                .to(imageParallaxRef.current, { y: "-15%", duration: 14, ease: "none" }, 0);

        // Step 2: Sequential Point Reveal
        const pointTimeline = [
            { class: ".pt-1", start: 1 },
            { class: ".pt-2", start: 4 },
            { class: ".pt-3", start: 7 },
            { class: ".pt-4", start: 10 }
        ];

        pointTimeline.forEach((pt, index) => {
            // Fade In & float up
            tlScroll.fromTo(pt.class, 
                { opacity: 0, y: 40, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "back.out(1.2)" }, 
                pt.start
            );
            
            // Fade Out / Blur
            tlScroll.to(pt.class, { 
                opacity: index === 3 ? 0 : 0.05, 
                filter: "blur(8px)", 
                scale: 0.95,
                duration: 1.2 
            }, pt.start + 2.5);
        });

        // Step 3: Final CTA Reveal 
        tlScroll.fromTo(".final-section", 
            { opacity: 0, y: 50, pointerEvents: "none" }, 
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 2, ease: "power4.out" }, 
            13.5
        );

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const medicalPoints = [
        { id: "pt-1", text: "15% of people with diabetes are unaware of their condition until severe complications arise.", side: "left", top: "25%" },
        { id: "pt-2", text: "40% of cancer diagnoses occur in patients with no prior symptoms.", side: "right", top: "35%" },
        { id: "pt-3", text: "1 in 3 suffer from undetected high blood pressure, the leading silent cause of heart attacks.", side: "left", top: "45%" },
        { id: "pt-4", text: "1 in 5 seemingly healthy individuals show signs of silent liver disease during health checkups.", side: "right", top: "55%" },
    ];

    return (
        <section ref={triggerRef} className="relative h-screen w-full bg-[#f8fafc] overflow-hidden flex items-center justify-center">
            
            {/* Premium Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(to right, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Central Diagnostic Capsule (The Premium Image Setup) */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none mt-20">
                <div 
                    ref={imageContainerRef}
                    className="relative w-[90%] md:w-[400px] h-[80vh] rounded-[100px] overflow-hidden border-[6px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.08)] bg-white"
                >
                    <img 
                        ref={imageParallaxRef}
                        src="/home/banner.png" 
                        alt="Anatomy Scan" 
                        className="absolute top-0 left-0 w-full h-[130%] object-cover grayscale-[30%] contrast-125"
                    />
                    
                    {/* Inner Shadow for depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] z-10"></div>

                    {/* Laser Scanner confined to the capsule */}
                    <div 
                        ref={scannerRef}
                        className="absolute top-0 left-0 w-full h-[2px] bg-[#27b199] shadow-[0_0_20px_4px_rgba(41,169,151,0.6)] z-20"
                    >
                        <div className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-[#27b199] text-[9px] font-black uppercase tracking-widest py-1 px-3 rounded-full shadow-md flex items-center gap-2">
                            <Activity className="w-3 h-3 animate-pulse" /> Scanning
                        </div>
                    </div>
                </div>
            </div>

            {/* Layer 1: Opening Statement */}
            <div className="initial-text absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6 pointer-events-none">
                <div className="bg-white/70 backdrop-blur-md px-8 py-10 rounded-3xl shadow-xl max-w-4xl border border-white/50 mt-20">
                    <div className="flex items-center justify-center gap-2 mb-6 overflow-hidden">
                        <div className="h-[1px] w-8 md:w-12 bg-[#27b199] hero-line" />
                        <span className="text-[#27b199] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase hero-line">TrustLab Premium Diagnostics</span>
                        <div className="h-[1px] w-8 md:w-12 bg-[#27b199] hero-line" />
                    </div>
                    
                    <h1 className="text-[#0f172a] text-4xl md:text-6xl font-light leading-tight">
                        <span className="block overflow-hidden pb-2">
                            <span className="block hero-line">Your body often stays</span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <span className="block hero-line italic font-serif text-[#27b199]">silent</span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <span className="block hero-line">until it's too late.</span>
                        </span>
                    </h1>
                    
                    <div className="overflow-hidden mt-8">
                        <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] animate-pulse hero-line">Scroll to Analyze</p>
                    </div>
                </div>
            </div>

            {/* Layer 2: The 4 Points (Sequential) */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {medicalPoints.map((point, index) => (
                    <div 
                        key={point.id}
                        className={`${point.id.replace('pt', 'pt')} absolute ${point.side === 'left' ? 'left-[4%] md:left-[12%]' : 'right-[4%] md:right-[12%]'} max-w-[280px] md:max-w-sm`}
                        style={{ top: point.top }}
                    >
                        <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">
                            {/* Decorative Accent */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#27b199] to-[#f5ed00]"></div>
                            
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-xl bg-[#27b199]/10">
                                    <AlertCircle className="w-4 h-4 text-[#27b199]" />
                                </div>
                                <h3 className="text-[#0f172a] font-black uppercase tracking-widest text-[9px] md:text-[10px]">Fact 0{index + 1}</h3>
                            </div>
                            <p className="text-[#334155] text-sm md:text-base font-medium leading-relaxed">
                                {point.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Layer 3: Final Call to Action */}
            <div className="final-section absolute inset-0 flex flex-col items-center justify-center z-40 bg-[#f8fafc]/95 backdrop-blur-lg px-6 text-center">
                <div className="p-5 rounded-full bg-white shadow-xl mb-8 border border-slate-100">
                    <ShieldCheck className="w-12 h-12 text-[#27b199]" />
                </div>
                <h2 className="text-[#0f172a] text-3xl md:text-6xl font-light mb-6">
                    Don't wait to find out <br />
                    <span className="font-bold relative inline-block">
                        what's hiding within.
                        <span className="absolute bottom-1 left-0 w-full h-3 bg-[#f5ed00]/40 -z-10 rounded-full"></span>
                    </span>
                </h2>
                <p className="text-slate-500 mb-10 max-w-lg text-sm md:text-base">
                    Advanced molecular diagnostics and personalized health monitoring for those who value clarity and longevity.
                </p>
                <button className="group relative px-10 py-4 bg-[#0f172a] text-white rounded-full overflow-hidden transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(41,169,151,0.3)]">
                    <span className="relative z-10 flex items-center gap-3 font-bold tracking-[0.15em] uppercase text-xs">
                        Book Your Test <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-[#27b199] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
            </div>
        </section>
    );
};

export default Hero;