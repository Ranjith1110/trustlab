import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Activity, FileText } from 'lucide-react';

const Hero = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const badgeRef = useRef(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Clean, simple staggered fade-up for content
            tl.fromTo(".hero-elem", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.2 }
            )
            // 2. Smooth fade-in for the image
            .fromTo(imageRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
                "-=0.8"
            )
            // 3. Pop-in for the floating badge
            .fromTo(badgeRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
                "-=0.6"
            );

            // 4. Subtle continuous animations
            gsap.to(imageRef.current, {
                y: -10, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1
            });
            
            gsap.to(badgeRef.current, {
                y: -8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5
            });

            // Gentle medical scanner line loop
            gsap.fromTo(scannerRef.current,
                { top: "10%", opacity: 0 },
                { top: "90%", opacity: 0.8, duration: 3, ease: "linear", yoyo: true, repeat: -1 }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-[90vh] pt-32 pb-20 px-6 bg-white overflow-hidden flex items-center">
            
            {/* Very subtle background glow for depth, perfectly neat */}
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#29a997]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* --- LEFT COLUMN: Clean Content --- */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-20">

                        {/* Neat, standard heading format */}
                        <h1 className="hero-elem text-[#0f172a] text-4xl sm:text-4xl md:text-5xl font-light leading-tight mb-6">
                            A healthy person may have a thousand wishes. <br className="hidden lg:block" />
                            But a sick person has only ONE... <br />
                            <span className="font-bold text-[#29a997] mt-2 inline-block">
                                To Get Well SOON!
                            </span>
                        </h1>

                        <p className="hero-elem text-slate-500 text-base lg:text-md font-light leading-relaxed max-w-lg mb-10">
                            TrustLab provides precision molecular diagnostics and real-time health monitoring, giving you the clarity and care you need to prioritize what truly matters.
                        </p>

                        {/* Standard, clean buttons matching the rest of the site */}
                        <div className="hero-elem flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 bg-[#0f172a] hover:bg-[#29a997] text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-lg">
                                Book Your Test 
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Neat Image Container --- */}
                    <div className="relative flex justify-center lg:justify-end w-full mt-10 lg:mt-0">
                        
                        <div 
                            ref={imageRef}
                            className="relative w-full max-w-[450px] lg:max-w-[500px] aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            {/* Main Image */}
                            <img 
                                src="/diagnosticsolutions/banner.jpg" 
                                alt="Diagnostic Analysis" 
                                className="w-full h-full object-cover"
                            />

                            {/* Clean, subtle scanner line over the image */}
                            <div 
                                ref={scannerRef}
                                className="absolute left-0 w-full h-[2px] bg-[#29a997] shadow-[0_0_15px_#29a997] z-20 pointer-events-none"
                            ></div>
                        </div>

                        {/* Single, clean floating trust badge */}
                        <div 
                            ref={badgeRef}
                            className="absolute bottom-6 -left-4 lg:-left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-30"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#29a997]/10 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-[#29a997]" />
                            </div>
                            <div>
                                <p className="text-[#0f172a] font-bold text-sm leading-none mb-1">NABL Accredited</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">100% Accurate Data</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;