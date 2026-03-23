import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const StatsParallax = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const contentRef = useRef(null);
    const numberRefs = useRef([]);

    const stats = [
        { label: "Patients Tested", target: 980000, suffix: "+" },
        { label: "Reports Delivered", target: 1840000, suffix: "+" },
        { label: "Doctors Associated", target: 185, suffix: "+" },
        { label: "Network Partners", target: 800, suffix: "+" },
    ];

    const addToNumberRefs = (el) => {
        if (el && !numberRefs.current.includes(el)) {
            numberRefs.current.push(el);
        }
    };

    // Force video to play on mount (helps bypass strict browser policies)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

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

        const ctx = gsap.context(() => {
            
            // 2. Subtle Parallax for the Content (Creates depth without zooming the video)
            gsap.to(contentRef.current, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // 3. Simple Header Fade Up
            gsap.fromTo(".stats-header",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 4. Staggered Stat Item Reveal
            gsap.fromTo(".stat-item",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 5. Number Counter Animation
            numberRefs.current.forEach((numNode, index) => {
                const targetVal = stats[index].target;
                const counter = { val: 0 };

                gsap.to(counter, {
                    val: targetVal,
                    duration: 2.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    onUpdate: () => {
                        // Formats the numbers with commas (e.g. 9,80,000)
                        numNode.innerText = Math.floor(counter.val).toLocaleString('en-IN');
                    }
                });
            });

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 bg-[#fcfdfe] overflow-hidden">
            
            <div className="relative px-4 md:px-6 w-full">
                
                {/* --- CONTAINED VIDEO CARD --- */}
                {/* This wrapper keeps the video neat, perfectly proportioned, and "not full screen" */}
                <div className="relative w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#0f172a] flex flex-col justify-center py-24 px-4 md:px-12 min-h-[500px]">
                    
                    {/* Background Video (100% of container, perfectly fitted) */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        loop
                        playsInline
                        muted
                        poster="/diagnosticsolutions/bgintro.webp"
                    >
                        {/* Replace with your background video path */}
                        <source src="/diagnosticsolutions/fun2.mp4" type="video/mp4" />
                    </video>
                    
                    {/* Dark Overlay to make text perfectly readable */}
                    <div className="absolute inset-0 bg-[#0f172a]/75 mix-blend-multiply"></div>

                    {/* --- PARALLAX CONTENT LAYER --- */}
                    <div ref={contentRef} className="relative z-10 w-full">
                        
                        {/* Heading Section */}
                        <div className="stats-header text-center mb-16 md:mb-24">
                            <div className="flex items-center justify-center gap-4 mb-5">
                                <div className="h-[1px] w-8 bg-[#29a997]" />
                                <span className="text-[#29a997] text-xs font-bold tracking-[0.3em] uppercase">
                                    Our Impact
                                </span>
                                <div className="h-[1px] w-8 bg-[#29a997]" />
                            </div>
                            
                            <h2 className="text-white text-3xl md:text-5xl font-light leading-tight">
                                Accelerating patient care begins <br className="hidden md:block" />
                                in the <span className="font-bold text-[#29a997]">laboratory.</span>
                            </h2>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item flex flex-col items-center justify-center text-center pt-8 sm:pt-0">
                                    
                                    {/* Animated Number */}
                                    <div className="flex items-start justify-center mb-1 text-white">
                                        <span 
                                            ref={addToNumberRefs} 
                                            className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight"
                                        >
                                            0
                                        </span>
                                        <span className="text-[#29a997] text-2xl lg:text-3xl font-bold ml-1">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    
                                    {/* Stat Label */}
                                    <p className="text-slate-400 text-[11px] md:text-xs font-bold tracking-widest uppercase mt-3">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatsParallax;