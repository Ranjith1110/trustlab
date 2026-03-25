import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ShieldCheck, Stethoscope, MonitorSmartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
    const sectionRef = useRef(null);

    const certifications = [
        {
            id: 1,
            title: "NABL Certified",
            desc: "Ensuring the highest standards of quality and accuracy in laboratory testing.",
            icon: ShieldCheck
        },
        {
            id: 2,
            title: "Experienced Doctors",
            desc: "Providing specialized care backed by decades of medical expertise.",
            icon: Stethoscope
        },
        {
            id: 3,
            title: "Advanced Technology",
            desc: "Streamlining healthcare services for efficient and reliable delivery systems.",
            icon: MonitorSmartphone
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
                    start: "top 80%",
                }
            });

            // Header Elements Fade Up
            tl.fromTo(".cert-header-elem",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
            )
            // Cards Stagger Fade Up
            .fromTo(".cert-card",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)" },
                "-=0.6"
            );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 overflow-hidden">
            
            {/* Subtle Background Glows for Depth */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#27B199]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1F2B7B]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    
                    {/* Eyebrow Label */}
                    <div className="cert-header-elem flex items-center justify-center gap-3 mb-6">
                        <span className="text-[#27B199] text-xs font-bold tracking-[0.25em] uppercase">
                            Certifications & Expertise
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="cert-header-elem text-[#334155] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                        Relax, Your Test Samples are in <br className="hidden md:block" />
                        <span className="font-bold text-[#27B199]">Trusted Hands!</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="cert-header-elem text-slate-500 text-base md:text-lg font-light leading-relaxed">
                        With a commitment to accuracy and reliability, we meticulously process each biological sample, ensuring precise results and timely delivery.
                    </p>
                </div>

                {/* --- THREE-COLUMN GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {certifications.map((cert) => (
                        <div 
                            key={cert.id} 
                            className="cert-card group bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_40px_rgba(31,43,123,0.05)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(31,43,123,0.12)] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {/* Hover Accent Line at the top of the card */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#FEED02] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            {/* Icon Box */}
                            <div className="w-20 h-20 rounded-2xl bg-[#27B199]/10 flex items-center justify-center mb-8 group-hover:bg-[#1F2B7B] transition-colors duration-500">
                                <cert.icon className="w-10 h-10 text-[#27B199] group-hover:text-[#FEED02] group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                            </div>

                            {/* Content */}
                            <h3 className="text-[#1F2B7B] text-2xl font-bold tracking-tight mb-4">
                                {cert.title}
                            </h3>
                            <p className="text-slate-500 text-base leading-relaxed font-light">
                                {cert.desc}
                            </p>
                            
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Certifications;