import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MissionVideo = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const videoContainerRef = useRef(null);
    const videoWrapperRef = useRef(null);
    const overlayTextRef = useRef(null);
    const videoRef = useRef(null);

    // State to track if the video is playing
    const [isPlaying, setIsPlaying] = useState(false);

    // Play/Pause Toggle Function
    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(error => {
                    console.log("Video playback failed:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // 1. Initialize Lenis Smooth Scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. GSAP Animations
        const ctx = gsap.context(() => {
            // Intro Text Fade Up
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // ScrollTrigger Timeline for Video Expansion
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: videoContainerRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1,
                    pin: true,
                }
            });

            // Animate video wrapper to full screen
            tl.to(videoWrapperRef.current, {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                ease: "power1.inOut"
            })
            // Fade in the final overlay text after video expands
            .to(overlayTextRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-white flex flex-col items-center overflow-hidden">

            {/* --- TOP: The Continuation Text (Adjusted padding to reduce white space) --- */}
            <div className="w-full flex items-center justify-center px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center z-10">
                <h2 ref={textRef} className="text-[#0f172a] text-2xl md:text-4xl font-light leading-relaxed max-w-5xl">
                    Our role is to expedite that wish <br className="hidden md:block" />
                    <span className="font-bold text-[#29a997]">by delivering accurate diagnostic insights swiftly.</span>
                </h2>
            </div>

            {/* --- BOTTOM: The Expanding Video Section --- */}
            <div ref={videoContainerRef} className="relative w-full h-screen flex items-start md:items-center justify-center bg-white">

                {/* The wrapper that starts small and grows */}
                <div
                    ref={videoWrapperRef}
                    className="relative w-[90%] md:w-[75%] h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center group mt-4 md:mt-0"
                >
                    {/* Background Video with Poster Cover */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        loop
                        playsInline
                        poster="/diagnosticsolutions/bgintro.webp"
                    >
                        <source src="/diagnosticsolutions/trustlabintro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark overlay for text readability - lower opacity when playing */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none ${isPlaying ? 'opacity-20' : 'opacity-40'}`}></div>

                    {/* Final Overlay Text (Hidden initially, revealed by GSAP) */}
                    <div ref={overlayTextRef} className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-10 z-20 px-6 text-center pointer-events-none">
                        <h3 className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight drop-shadow-2xl">
                            That's what we do <br className="md:hidden" />
                            <span className="font-bold text-[#29a997]">Best!</span>
                        </h3>
                    </div>

                    {/* Premium Glassmorphic Play/Pause Button */}
                    <button 
                        onClick={togglePlayPause}
                        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-[#29a997] hover:border-[#29a997] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                        ) : (
                            <Play className="w-6 h-6 md:w-7 md:h-7 fill-current ml-1" />
                        )}
                    </button>

                </div>
            </div>

        </section>
    );
};

export default MissionVideo;