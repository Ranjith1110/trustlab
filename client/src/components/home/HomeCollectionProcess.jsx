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
            icon: Laptop
        },
        {
            id: 2,
            title: "Get Tested at Home",
            desc: "Our trained professionals visit your home to collect samples safely and hygienically.",
            icon: Syringe
        },
        {
            id: 3,
            title: "Receive Your Report",
            desc: "Your diagnostic reports are delivered digitally along with expert consultation if required.",
            icon: FileText
        },
        {
            id: 4,
            title: "Stay Healthy and Safe",
            desc: "Monitor your health regularly and take preventive steps for a healthier life.",
            icon: HeartPulse
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
            tl.fromTo(".hcp-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
            )
                // Desktop Line Draw Animation
                .fromTo(".line-fill",
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "left center" },
                    "-=0.5"
                )
                // Mobile Line Draw Animation
                .fromTo(".line-fill-mobile",
                    { scaleY: 0 },
                    { scaleY: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "top center" },
                    "<" // Run at the same time as desktop line
                )
                // Cards Stagger Reveal
                .fromTo(".hcp-card",
                    { y: 40, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.5)" },
                    "-=1"
                );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* --- HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <h2 className="hcp-header text-[#1F2B7B] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Home Sample Collection Process
                    </h2>

                    {/* Brand Yellow Accent Line */}
                    <div className="hcp-header flex justify-center mb-6">
                        <div className="h-1.5 w-24 bg-[#FEED02] rounded-full"></div>
                    </div>

                    <p className="hcp-header text-slate-500 text-base md:text-lg font-light leading-relaxed">
                        Simple steps to book your diagnostic test and get accurate results from the comfort of your home.
                    </p>
                </div>

                {/* --- PROCESS STEPS --- */}
                <div className="relative w-full">

                    {/* Desktop Horizontal Connecting Line */}
                    {/* Positioned exactly through the center of the icons (left 12.5% to right 12.5% for a 4-col grid) */}
                    <div className="hidden md:block absolute top-[3rem] lg:top-[3.5rem] left-[12.5%] right-[12.5%] h-1 bg-slate-100 rounded-full z-0">
                        <div className="line-fill h-full w-full bg-gradient-to-r from-[#1F2B7B] via-[#27B199] to-[#27B199] rounded-full"></div>
                    </div>

                    {/* Mobile Vertical Connecting Line */}
                    <div className="md:hidden absolute top-8 bottom-8 left-[2.2rem] w-1 bg-slate-100 rounded-full z-0">
                        <div className="line-fill-mobile w-full h-full bg-gradient-to-b from-[#1F2B7B] to-[#27B199] rounded-full"></div>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
                        {steps.map((step) => (
                            <div key={step.id} className="hcp-card group flex flex-row md:flex-col items-start md:items-center text-left md:text-center relative cursor-default">

                                {/* Icon Circle Container */}
                                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white border-4 border-slate-100 shadow-[0_10px_30px_rgba(31,43,123,0.08)] flex items-center justify-center shrink-0 z-10 group-hover:border-[#27B199] group-hover:shadow-[0_15px_40px_rgba(39,177,153,0.2)] transition-all duration-300 md:mb-8 bg-clip-padding">

                                    {/* Yellow Inner Accent Blob */}
                                    <div className="absolute inset-2 bg-[#FEED02]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>

                                    {/* Icon */}
                                    <step.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#1F2B7B] group-hover:text-[#27B199] relative z-10 transition-colors duration-300" strokeWidth={1.5} />

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 bg-[#FEED02] text-[#1F2B7B] font-bold text-sm flex items-center justify-center rounded-full border-2 border-white shadow-sm z-20 group-hover:scale-110 transition-transform duration-300">
                                        {step.id}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="ml-6 md:ml-0 flex flex-col pt-2 md:pt-0">
                                    <h3 className="text-[#1F2B7B] text-lg md:text-xl font-bold mb-3 tracking-tight group-hover:text-[#27B199] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                                        {step.desc}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeCollectionProcess;