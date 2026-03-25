import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Users, FileText, Stethoscope, Network, Play, Pause, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const numberRefs = useRef([]);
    const [isPlaying, setIsPlaying] = useState(false);

    // Reset refs array on each render
    numberRefs.current = [];

    const addToNumberRefs = (el) => {
        if (el && !numberRefs.current.includes(el)) {
            numberRefs.current.push(el);
        }
    };

    const stats = [
        { id: 1, label: "Patients Tested", value: 980000, suffix: "+", icon: Users },
        { id: 2, label: "Reports Delivered", value: 1840000, suffix: "+", icon: FileText },
        { id: 3, label: "Doctors Associated", value: 185, suffix: "+", icon: Stethoscope },
        { id: 4, label: "Network Partners", value: 800, suffix: "+", icon: Network }
    ];

    // Video Play/Pause Handler
    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => console.log("Playback error:", err));
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
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. GSAP Animations
        const ctx = gsap.context(() => {

            // --- Header Animation ---
            gsap.fromTo(".wcu-header",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );

            // --- Stats Cards Fade-Up ---
            gsap.fromTo(".wcu-stat-card",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".wcu-stats-grid", start: "top 85%" } }
            );

            // --- Animated Number Counters ---
            stats.forEach((stat, index) => {
                const targetObj = { val: 0 };
                gsap.to(targetObj, {
                    val: stat.value,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".wcu-stats-grid",
                        start: "top 80%",
                    },
                    onUpdate: () => {
                        if (numberRefs.current[index]) {
                            // Format number with commas (e.g., 980,000)
                            numberRefs.current[index].innerText = Math.floor(targetObj.val).toLocaleString('en-US');
                        }
                    }
                });
            });

            // --- Split Content (Video & Quote) Reveal ---
            gsap.fromTo(".wcu-media-split",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".wcu-media-split", start: "top 80%" } }
            );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ========================================= */}
                {/* 1. SECTION HEADER                         */}
                {/* ========================================= */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="wcu-header flex items-center justify-center gap-3 mb-6">
                        <span className="text-[#27B199] text-xs font-bold tracking-[0.25em] uppercase">
                            Excellence in Diagnostics
                        </span>
                    </div>

                    <h2 className="wcu-header text-[#334155] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Why Choose <span className="font-bold">TrustLab</span>
                    </h2>

                    <p className="wcu-header text-slate-500 text-base md:text-lg font-light leading-relaxed">
                        Accelerating patient care begins in the laboratory.
                    </p>
                </div>

                {/* ========================================= */}
                {/* 2. STATISTICS GRID                        */}
                {/* ========================================= */}
                <div className="wcu-stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="wcu-stat-card bg-white rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(31,43,123,0.05)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#27B199]/10 flex items-center justify-center mb-6">
                                <stat.icon className="w-6 h-6 text-[#27B199]" strokeWidth={2} />
                            </div>

                            <div className="flex items-start justify-center mb-2">
                                <span
                                    ref={addToNumberRefs}
                                    className="text-[#1F2B7B] text-4xl md:text-5xl font-black tracking-tight"
                                >
                                    0
                                </span>
                                <span className="text-[#27B199] text-2xl md:text-3xl font-bold ml-1">
                                    {stat.suffix}
                                </span>
                            </div>

                            <p className="text-slate-500 text-sm md:text-base font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ========================================= */}
                {/* 3. VIDEO & QUALITY COMMITMENT SPLIT       */}
                {/* ========================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* --- LEFT: Video Container (7 Cols) --- */}
                    <div className="wcu-media-split lg:col-span-7 relative w-full aspect-video md:aspect-auto md:h-full min-h-[300px] md:min-h-[400px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(31,43,123,0.1)] bg-[#0f172a] group">

                        <video
                            ref={videoRef}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            loop
                            playsInline
                            poster="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000"
                        >
                            {/* Replace with your actual video source */}
                            <source src="/home/trustlabintro.mp4" type="video/mp4" />
                        </video>

                        {/* Dark Overlay */}
                        <div className={`absolute inset-0 bg-[#1F2B7B] transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-40 mix-blend-multiply'}`}></div>

                        {/* Custom Play Button */}
                        <button
                            onClick={togglePlayPause}
                            className={`absolute z-30 flex items-center justify-center rounded-full transition-all duration-500 active:scale-95
                                ${isPlaying
                                    ? 'bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#FEED02] hover:text-[#1F2B7B]'
                                    : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FEED02] text-[#1F2B7B] shadow-[0_10px_30px_rgba(254,237,2,0.3)] hover:scale-110'
                                }`}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 fill-current" />
                            ) : (
                                <Play className="w-8 h-8 fill-current ml-1" />
                            )}
                        </button>
                    </div>

                    {/* --- RIGHT: Quality Commitment Card (5 Cols) --- */}
                    <div className="wcu-media-split lg:col-span-5 relative bg-[#27B199] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center overflow-hidden shadow-[0_20px_50px_rgba(31,43,123,0.15)]">

                        {/* Decorative Background Icon */}
                        <Quote className="absolute -bottom-6 -right-6 w-48 h-48 text-white/5 rotate-12 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 flex items-center gap-4">
                                Our Quality Commitment
                            </h3>

                            {/* Accent Line */}
                            <div className="w-16 h-1 bg-[#FEED02] rounded-full mb-8"></div>

                            <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed mb-8">
                                “Our pursuit to attain the highest standards of quality in medical diagnostics is a given, but it is the attention to detail and care that we invest to achieve this quality of work that sets us apart from the rest and makes us the preferred choice of Medical Diagnostics Partner.”
                            </p>

                            {/* Decorative signature/trust mark */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#27B199] flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-white"></div>
                                </div>
                                <span className="text-white text-sm font-bold tracking-widest uppercase">
                                    TrustLab Certified
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;