import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MissionVideo = () => {
    const sectionRef = useRef(null);
    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Play/Pause Toggle
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
        // 1. Smooth Scrolling
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

        // 2. High-End Editorial GSAP Animations
        const ctx = gsap.context(() => {
            
            // Subtle fade up for the text
            gsap.fromTo(textRef.current.children,
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // Cinematic Clip-Path Reveal (The video "opens" vertically as you scroll)
            gsap.fromTo(videoContainerRef.current,
                { 
                    // Starts as a narrow horizontal strip with rounded corners
                    clipPath: 'inset(20% 5% 20% 5% round 2rem)',
                    scale: 0.95
                },
                { 
                    // Expands to full rounded rectangle
                    clipPath: 'inset(0% 0% 0% 0% round 2rem)',
                    scale: 1,
                    ease: "none",
                    scrollTrigger: { 
                        trigger: videoContainerRef.current, 
                        start: "top 85%", 
                        end: "center center", 
                        scrub: 1 
                    } 
                }
            );

            // Subtle inner image parallax (Opposite to container movement for depth)
            gsap.fromTo(videoRef.current,
                { y: "-10%" },
                { 
                    y: "10%", ease: "none",
                    scrollTrigger: { 
                        trigger: videoContainerRef.current, 
                        start: "top bottom", 
                        end: "bottom top", 
                        scrub: true 
                    } 
                }
            );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-24 md:py-32 flex flex-col items-center overflow-hidden">

            {/* --- TOP: Elegant Typography --- */}
            <div ref={textRef} className="w-full max-w-4xl mx-auto px-6 text-center z-10 mb-10 md:mb-8">
                <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                    Our role is to expedite that wish <br /> <span className='text-[#27b199] text-2xl md:text-4xl font-bold'> by delivering accurate diagnostic insights swiftly.</span>
                </h2>
            </div>

            {/* --- BOTTOM: Cinematic Clip-Path Video Player --- */}
            <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8 z-10">
                
                {/* The Container that gets clipped and expanded */}
                <div 
                    ref={videoContainerRef}
                    className="relative w-full aspect-[16/9] bg-[#0f172a] shadow-[0_20px_50px_rgba(31,43,123,0.1)] group overflow-hidden"
                >
                    
                    {/* Background Video */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                        loop
                        playsInline
                        poster="/diagnosticsolutions/bgintro.webp"
                    >
                        <source src="/diagnosticsolutions/trustlabintro.mp4" type="video/mp4" />
                    </video>

                    {/* Clean Dark Overlay (Fades out when playing) */}
                    <div className={`absolute inset-0 bg-[#1F2B7B] transition-opacity duration-700 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-40 mix-blend-multiply'}`}></div>

                    {/* Central Play Button Overlay */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-20 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        
                        {/* Play CTA Text */}
                        <p className="text-white font-medium tracking-widest uppercase text-xs md:text-sm mb-6 drop-shadow-md">
                            Watch Our Process
                        </p>

                        {/* Large, Elegant Play Button */}
                        <button 
                            onClick={togglePlayPause}
                            className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#feed02] hover:border-[#feed02] hover:text-[#1F2B7B] transition-all duration-300 hover:scale-105 shadow-xl group-hover:shadow-[0_0_30px_rgba(254,237,2,0.3)]"
                        >
                            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-2" />
                        </button>
                    </div>

                    {/* Minimalist Pause Control (Appears only when video is playing) */}
                    <button 
                        onClick={togglePlayPause}
                        className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-[#feed02] hover:text-[#1F2B7B] transition-all duration-300 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                    >
                        <Pause className="w-5 h-5 fill-current" />
                    </button>

                </div>
            </div>

        </section>
    );
};

export default MissionVideo;