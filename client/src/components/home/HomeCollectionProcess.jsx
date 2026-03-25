import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Laptop, Syringe, FileText, HeartPulse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomeCollectionProcess = () => {
    const sectionRef = useRef(null);

    const steps = [
        {
            id: 1,
            title: "Book Your Home Collection",
            desc: "Schedule your diagnostic test online and choose a convenient time for home sample collection.",
            icon: Laptop,
            color: "#1F2B7B", // Medical Blue
            align: "md:mr-auto", // Left aligned
            connector: "right"
        },
        {
            id: 2,
            title: "Get Tested at Home",
            desc: "Our trained professionals visit your home to collect samples safely and hygienically.",
            icon: Syringe,
            color: "#27B199", // Healthcare Green
            align: "md:ml-auto", // Right aligned
            connector: "left"
        },
        {
            id: 3,
            title: "Receive Your Report",
            desc: "Your diagnostic reports are delivered digitally along with expert consultation if required.",
            icon: FileText,
            color: "#1F2B7B", // Medical Blue
            align: "md:mr-auto", // Left aligned
            connector: "right"
        },
        {
            id: 4,
            title: "Stay Healthy and Safe",
            desc: "Monitor your health regularly and take preventive steps for a healthier life.",
            icon: HeartPulse,
            color: "#27B199", // Healthcare Green
            align: "md:ml-auto", // Right aligned
            connector: "none"
        }
    ];

    useEffect(() => {
        // 1. Initialize Lenis Smooth Scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. GSAP Entrance Animations
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // Header Reveal
            tl.fromTo(".hcp-header-elem",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
            )
            // Cards Stagger Reveal (Popping in)
            .fromTo(".hcp-card",
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)" },
                "-=0.5"
            )
            // Connectors Fade In
            .fromTo(".hcp-connector",
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out" },
                "-=0.4"
            );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    // Render SVG connecting lines based on card position
    const renderConnector = (type) => {
        if (type === "right") {
            return (
                <div className="hcp-connector hidden md:block absolute top-[60%] left-[calc(100%-2rem)] w-[20vw] max-w-[220px] h-[calc(100%+3rem)] border-t-2 border-r-2 border-dashed border-slate-300 rounded-tr-[2.5rem] -z-10"></div>
            );
        }
        if (type === "left") {
            return (
                <div className="hcp-connector hidden md:block absolute top-[60%] right-[calc(100%-2rem)] w-[20vw] max-w-[220px] h-[calc(100%+3rem)] border-t-2 border-l-2 border-dashed border-slate-300 rounded-tl-[2.5rem] -z-10"></div>
            );
        }
        return null;
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 bg-[#fcfdfe] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* --- HEADER (Left Aligned like reference) --- */}
                <div className="max-w-7xl mb-16 md:mb-24 text-center">
                    
                    <h2 className="hcp-header-elem text-[#334155] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-6">
                        Home Sample Collection Process
                    </h2>
                    
                    <p className="hcp-header-elem text-slate-500 text-base md:text-lg font-light leading-relaxed">
                        Simple steps to book your diagnostic test and get accurate results from the comfort of your home.
                    </p>
                </div>

                {/* --- STAGGERED PROCESS STEPS --- */}
                <div className="relative flex flex-col gap-10 md:gap-16 z-10 w-full">
                    {steps.map((step) => (
                        <div 
                            key={step.id} 
                            className={`hcp-card relative w-full md:w-[45%] bg-white rounded-3xl p-2 pr-6 md:pr-8 shadow-[0_8px_30px_rgba(31,43,123,0.04)] border border-slate-100 flex items-stretch gap-5 md:gap-6 group hover:shadow-[0_15px_40px_rgba(31,43,123,0.1)] transition-all duration-300 ${step.align}`}
                        >
                            {/* Vertical Colored Pill */}
                            <div 
                                className="w-10 md:w-12 rounded-full flex items-center justify-center shrink-0 shadow-inner"
                                style={{ backgroundColor: step.color }}
                            >
                                <span className="-rotate-90 text-white text-[10px] md:text-xs font-bold tracking-[0.2em] whitespace-nowrap drop-shadow-sm">
                                    STEP {step.id}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="py-5 md:py-6 flex-1 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: step.color }} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-[#1F2B7B] text-lg md:text-xl font-bold tracking-tight">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed font-light">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Connecting Dashed Lines */}
                            {renderConnector(step.connector)}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HomeCollectionProcess;