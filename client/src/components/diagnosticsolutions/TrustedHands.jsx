import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ShieldCheck, Activity, MonitorSmartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TrustedHands = () => {
    const sectionRef = useRef(null);
    const rightColRef = useRef(null);

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

        // 2. GSAP Scroll Animation (The Stacking Effect)
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.th-card');

            // Setup initial states for the cards
            gsap.set(cards, {
                x: (i) => i === 0 ? 0 : 300, // Card 0 is in place, others are pushed right
                y: (i) => i === 0 ? 0 : 300, // Card 0 is in place, others are pushed down
                opacity: (i) => i === 0 ? 1 : 0, // Card 0 is visible, others are hidden
                scale: 1,
                transformOrigin: "top center"
            });

            // Create the Scroll Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top", // Starts when section hits top of viewport
                    end: "+=300%", // Scroll distance (300% height allows time to see 3 cards)
                    scrub: 1, // Smoothly link animation to scroll bar
                    pin: true, // Lock the section in place!
                }
            });

            // Animate cards 1 by 1
            cards.forEach((card, index) => {
                if (index === 0) return; // Skip the first card (it's already on screen)

                tl.addLabel(`card${index}`)
                  // 1. Move the PREVIOUS cards UP and make them smaller to create a "Stack"
                  .to(cards.slice(0, index), {
                      y: (i) => -((index - i) * 25), // Move up by 25px per index difference
                      scale: (i) => 1 - ((index - i) * 0.05), // Shrink slightly
                      opacity: (i) => 1 - ((index - i) * 0.2), // Dim the background cards
                      duration: 1,
                      ease: "power2.inOut"
                  }, `card${index}`)
                  
                  // 2. Bring the NEW card IN from Bottom-Right to Top-Left
                  .to(card, {
                      x: 0,
                      y: 0,
                      opacity: 1,
                      duration: 1,
                      ease: "power2.out"
                  }, `card${index}`);
            });

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        // Added min-h-screen to ensure the section is full height when pinned
        <section ref={sectionRef} className="relative w-full min-h-screen flex items-center overflow-hidden">
            
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#27b199]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 h-full">
                    
                    {/* --- LEFT COLUMN: Sticky Content --- */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[2px] w-8 bg-[#27b199]" />
                            <span className="text-[#27b199] text-xs font-bold tracking-[0.3em] uppercase">
                                Why Trust Us
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
                            Relax, Your Test Samples Are In <br />
                            <span className="font-bold text-[#27b199]">Trusted Hands!</span>
                        </h2>

                        <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-md border-l-2 border-[#1F2B7B] pl-4">
                            With a commitment to accuracy and reliability, we meticulously process each biological sample, ensuring precise results and timely delivery straight to your device.
                        </p>
                    </div>

                    {/* --- RIGHT COLUMN: Stacked Cards Animation --- */}
                    {/* The container needs relative positioning and a fixed height to hold the absolute cards */}
                    <div ref={rightColRef} className="w-full lg:w-1/2 relative h-[320px] md:h-[400px] flex justify-center lg:justify-end perspective-[1000px]">
                        
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                // absolute positioning forces them to stack exactly on top of each other
                                className="th-card absolute top-10 lg:top-1/2 lg:-translate-y-1/2 right-0 lg:right-10 w-full max-w-md bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(31,43,123,0.1)] border border-slate-100 flex flex-col justify-center gap-6 z-10"
                            >
                                {/* Icon Header */}
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#27b199]/10 flex items-center justify-center shrink-0">
                                        <feature.icon className="w-8 h-8 text-[#27b199]" />
                                    </div>
                                    <h3 className="text-[#1F2B7B] text-2xl md:text-3xl font-bold">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Content */}
                                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default TrustedHands;