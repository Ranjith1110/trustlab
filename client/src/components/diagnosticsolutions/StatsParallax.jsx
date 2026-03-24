import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const StatsParallax = () => {
    const sectionRef = useRef(null);
    const statsWrapperRef = useRef(null);
    const videoRef = useRef(null);
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

    // Force video to play on mount
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
            
            // 2. The Master Scrub Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "center center", // Pin exactly in the center of the screen
                    end: "+=400%", // The user scrolls for 4 screen heights to complete the animation
                    pin: true, // This locks the left side in place!
                    scrub: 1, // Smoothly links the animation to the scroll bar
                }
            });

            // Create an array to hold the counter values
            const counters = stats.map(() => ({ val: 0 }));

            // Step 1: Count up the first stat immediately as pinning starts
            tl.to(counters[0], { 
                val: stats[0].target, 
                duration: 1, 
                onUpdate: () => {
                    if(numberRefs.current[0]) numberRefs.current[0].innerText = Math.floor(counters[0].val).toLocaleString('en-IN');
                }
            });

            // Step 2: Slide wrapper up by 25% (revealing stat 2) and count it up
            tl.to(statsWrapperRef.current, { yPercent: -25, duration: 1.5, ease: "power2.inOut" }, "+=0.2")
              .to(counters[1], { 
                  val: stats[1].target, 
                  duration: 1, 
                  onUpdate: () => {
                      if(numberRefs.current[1]) numberRefs.current[1].innerText = Math.floor(counters[1].val).toLocaleString('en-IN');
                  }
              }, "<0.5"); // Start counting halfway through the slide

            // Step 3: Slide wrapper up to 50% (revealing stat 3) and count it up
            tl.to(statsWrapperRef.current, { yPercent: -50, duration: 1.5, ease: "power2.inOut" }, "+=0.2")
              .to(counters[2], { 
                  val: stats[2].target, 
                  duration: 1, 
                  onUpdate: () => {
                      if(numberRefs.current[2]) numberRefs.current[2].innerText = Math.floor(counters[2].val).toLocaleString('en-IN');
                  }
              }, "<0.5");

            // Step 4: Slide wrapper up to 75% (revealing stat 4) and count it up
            tl.to(statsWrapperRef.current, { yPercent: -75, duration: 1.5, ease: "power2.inOut" }, "+=0.2")
              .to(counters[3], { 
                  val: stats[3].target, 
                  duration: 1, 
                  onUpdate: () => {
                      if(numberRefs.current[3]) numberRefs.current[3].innerText = Math.floor(counters[3].val).toLocaleString('en-IN');
                  }
              }, "<0.5");

            // End padding so it doesn't unpin too abruptly
            tl.to({}, { duration: 0.5 });

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        // min-h-[100dvh] ensures it perfectly fits mobile and desktop screens when pinned
        <section ref={sectionRef} className="relative w-full flex items-center justify-center min-h-[100dvh] py-10 px-4 md:px-6 overflow-hidden">
            
            {/* --- THE MASTER CARD --- */}
            <div className="relative w-full max-w-7xl mx-auto h-[75dvh] max-h-[800px] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
                
                {/* Background Video */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    poster="/diagnosticsolutions/bgintro.webp"
                >
                    <source src="/diagnosticsolutions/fun2.mp4" type="video/mp4" />
                </video>
                
                {/* Deep Blue Brand Overlay */}
                <div className="absolute inset-0 bg-[#000]/45 mix-blend-multiply"></div>

                {/* --- CARD CONTENT --- */}
                <div className="relative z-10 w-full h-full flex flex-col lg:flex-row p-8 md:p-12 lg:p-16 gap-8 lg:gap-0">
                    
                    {/* LEFT COLUMN: Sticky Headings */}
                    <div className="flex-none lg:flex-1 w-full lg:w-1/2 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-12">
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[2px] w-8 bg-[#27b199]" />
                            <span className="text-[#27b199] text-xs font-bold tracking-[0.3em] uppercase">
                                Our Impact
                            </span>
                        </div>
                        
                        <h2 className="text-white text-3xl md:text-5xl font-light leading-tight">
                            Accelerating patient care begins <br className="hidden lg:block" />
                            in the <span className="font-bold text-[#feed02]">laboratory.</span>
                        </h2>

                        <p className="text-slate-300 mt-6 text-sm md:text-base font-light max-w-sm">
                            Every number represents a life we've touched with precise, timely diagnostics and unwavering care.
                        </p>
                    </div>

                    {/* RIGHT COLUMN: The Scrolling Stats Frame */}
                    {/* This column is relative and overflow-hidden to act as a "window" */}
                    <div className="flex-1 w-full lg:w-1/2 overflow-hidden relative lg:pl-12">
                        
                        {/* The Wrapper that slides up on scroll. Height is 400% because there are 4 stats */}
                        <div 
                            ref={statsWrapperRef}
                            className="absolute top-0 left-0 w-full h-[400%] flex flex-col"
                        >
                            {stats.map((stat, index) => (
                                // Each stat takes exactly 25% of the 400% wrapper, meaning it fills the "window" perfectly
                                <div key={index} className="w-full h-[25%] flex flex-col justify-center">
                                    
                                    {/* Animated Number */}
                                    <div className="flex items-start">
                                        <span 
                                            ref={addToNumberRefs} 
                                            className="text-white text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter leading-none"
                                        >
                                            0
                                        </span>
                                        <span className="text-[#27b199] text-4xl md:text-6xl lg:text-7xl font-bold ml-2 -mt-2">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    
                                    {/* Stat Label */}
                                    <div className="flex items-center gap-4 mt-6">
                                        <div className="h-[2px] w-10 bg-[#feed02]"></div>
                                        <p className="text-slate-300 text-xs md:text-sm font-bold tracking-widest uppercase">
                                            {stat.label}
                                        </p>
                                    </div>

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