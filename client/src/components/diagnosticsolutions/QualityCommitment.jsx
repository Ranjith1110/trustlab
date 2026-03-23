import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const QualityCommitment = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const badgeRef = useRef(null);

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

        // 2. GSAP Animations
        const ctx = gsap.context(() => {

            // Text Content Staggered Reveal
            gsap.fromTo(".qc-anim",
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // Image Reveal (Slides in from the left)
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.95, x: -30 },
                {
                    opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // Floating Badge Reveal
            gsap.fromTo(badgeRef.current,
                { opacity: 0, y: 30, scale: 0.8 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.5)", delay: 0.4,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // Ambient continuous float for the badge
            gsap.to(badgeRef.current, {
                y: -10, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5
            });

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 px-6 bg-[#f8fafc] overflow-hidden flex items-center min-h-[80vh]">

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#29a997 1px, transparent 1px), linear-gradient(to right, #29a997 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                    {/* --- LEFT COLUMN: Rectangular Image --- */}
                    <div className="relative flex justify-center lg:justify-start w-full">
                        <div
                            ref={imageRef}
                            className="relative w-full max-w-[550px] lg:max-w-full aspect-[4/3] lg:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.08)] bg-white"
                        >
                            <img
                                src="/diagnosticsolutions/qc.webp"
                                alt="Quality Commitment at TrustLab"
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        
                    </div>

                    {/* --- RIGHT COLUMN: Content --- */}
                    <div className="flex flex-col lg:pl-10 z-20">

                        {/* Eyebrow Label */}
                        <div className="qc-anim flex items-center gap-4 mb-6 mt-8 lg:mt-0">
                            <div className="h-[2px] w-10 bg-[#29a997]" />
                            <div className="flex items-center gap-2">
                                <span className="text-[#29a997] text-xs font-bold tracking-[0.3em] uppercase">
                                    Why Choose Us
                                </span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h2 className="qc-anim text-[#0f172a] text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                            Our Quality <br className="hidden md:block" />
                            <span className="font-bold text-[#0f172a]">Commitment.</span>
                        </h2>

                        {/* Paragraph Content */}
                        <p className="qc-anim text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10 border-l-2 border-[#29a997] pl-5">
                            Our pursuit to attain the highest standards of quality in medical diagnostics is a given, but it is the attention to detail and care that we invest to achieve this quality of work that sets us apart from the rest and makes us the preferred choice of Medical Diagnostics Partner.
                        </p>

                        {/* Optional Premium CTA Button */}
                        <div className="qc-anim">
                            <button className="group flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 hover:border-[#29a997] text-[#0f172a] hover:text-[#29a997] rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-sm hover:shadow-md">
                                Read Our Policy
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityCommitment;