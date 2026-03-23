import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ShieldCheck, Activity, MonitorSmartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TrustedHands = () => {
    const sectionRef = useRef(null);

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
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Header Reveal
            tl.fromTo(".th-header", 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
            )
            // Staggered reveal for the icons (pop-in effect)
            .fromTo(".th-icon-box",
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" },
                "-=0.4"
            )
            // Animate the connecting lines drawing from left to right (Desktop only)
            .fromTo(".th-line",
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, stagger: 0.2, ease: "power2.inOut", transformOrigin: "left center" },
                "-=0.8"
            )
            // Reveal the text under the icons
            .fromTo(".th-card-text",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
                "-=0.8"
            );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    const features = [
        {
            icon: ShieldCheck,
            title: "NABL Certified",
            desc: "Ensuring the highest standards of quality and accuracy in laboratory testing."
        },
        {
            icon: Activity,
            title: "Experienced Doctors",
            desc: "Providing specialized care backed by decades of medical expertise."
        },
        {
            icon: MonitorSmartphone,
            title: "Advanced Technology",
            desc: "Streamlining healthcare services for efficient and reliable delivery systems."
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-20 lg:py-32 px-6 overflow-hidden bg-white flex items-center min-h-[70vh]">
            
            {/* Extremely subtle background dot pattern for depth */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                
                {/* --- HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                    {/* Reduced Heading Size */}
                    <h2 className="th-header text-[#0f172a] text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-5">
                        Relax, Your Test Samples Are In <br className="hidden sm:block" />
                        <span className="font-bold text-[#29a997]">Trusted Hands!</span>
                    </h2>
                    
                    {/* Small Heartbeat/Pulse Graphic */}
                    <div className="th-header flex justify-center mb-6">
                        <svg width="50" height="16" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H15L20 2L30 18L35 10H60" stroke="#29a997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <p className="th-header text-slate-500 text-sm md:text-base font-light leading-relaxed">
                        With a commitment to accuracy and reliability, we meticulously process each biological sample, ensuring precise results and timely delivery.
                    </p>
                </div>

                {/* --- PROCESS FLOW / FEATURES --- */}
                <div className="relative w-full">
                    
                    {/* Desktop Connecting Lines (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-10 lg:top-12 left-[16%] right-[16%] h-[2px] z-0">
                        {/* Line 1 */}
                        <div className="absolute left-0 w-[45%] h-full">
                            <div className="th-line w-full h-full border-t-2 border-dashed border-slate-200"></div>
                        </div>
                        {/* Line 2 */}
                        <div className="absolute right-0 w-[45%] h-full">
                            <div className="th-line w-full h-full border-t-2 border-dashed border-slate-200"></div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                
                                {/* Clean Icon Box */}
                                <div className="th-icon-box relative w-20 h-20 lg:w-24 lg:h-24 mb-6 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.06)] group-hover:border-[#29a997]/30 group-hover:bg-[#29a997]/5 transition-all duration-500">
                                    <feature.icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#29a997] group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                {/* Text Content */}
                                <div className="th-card-text px-2">
                                    <h3 className="text-[#0f172a] text-lg lg:text-xl font-bold mb-3 tracking-wide">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs lg:text-sm leading-relaxed font-light max-w-[260px] mx-auto">
                                        {feature.desc}
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

export default TrustedHands;