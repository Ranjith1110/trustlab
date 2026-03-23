import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomeCollection = () => {
    const sectionRef = useRef(null);
    const parallaxBgRef = useRef(null);
    const rightImageRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Clean Background Parallax
            gsap.to(parallaxBgRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // 2. Simple Staggered Text Reveal
            gsap.fromTo(".hc-anim", 
                { y: 30, opacity: 0 },
                { 
                    y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 3. Image Reveal
            gsap.fromTo(rightImageRef.current,
                { opacity: 0, y: 40 },
                { 
                    opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 4. Gentle Float for the single badge
            gsap.to(badgeRef.current, {
                y: -10, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 px-6 overflow-hidden min-h-[85vh] flex items-center">
            
            {/* Parallax Background */}
            <div className="absolute top-[-20%] left-0 w-full h-[140%] z-0 pointer-events-none">
                <div 
                    ref={parallaxBgRef}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        // Recommended: A clean, dark medical or lifestyle background image
                        backgroundImage: 'url("https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop")',
                    }}
                />
            </div>
            
            {/* Clean Dark Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-[#0f172a]/85 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* LEFT COLUMN: Content */}
                    <div className="flex flex-col gap-8 lg:pr-10">
                        
                        {/* Eyebrow */}
                        <div className="hc-anim flex items-center gap-4">
                            <div className="h-[2px] w-10 bg-[#27b199]" />
                            <span className="text-[#27b199] text-xs font-bold tracking-[0.3em] uppercase">
                                Doorstep Diagnostics
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="hc-anim text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                            Your health is too important for a <br className="hidden lg:block" />
                            <span className="font-bold text-white">waiting room.</span>
                        </h2>

                        {/* Description */}
                        <p className="hc-anim text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-lg">
                            Experience the convenience and reliability of our home collection services. TrustLab brings precise, world-class diagnostics right to your doorstep.
                        </p>

                        {/* Clean White Contact Card */}
                        <div className="hc-anim bg-white rounded-3xl p-8 shadow-2xl max-w-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-[#0f172a] text-lg font-medium mb-1">
                                    Think Home Collection, <br />
                                    <span className="font-bold text-[#27b199]">Think TrustLab!</span>
                                </h3>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mt-4 mb-1">
                                    Call to Book
                                </span>
                                <a href="tel:7440075400" className="text-3xl font-black text-[#0f172a] hover:text-[#27b199] transition-colors">
                                    74400 75400
                                </a>
                            </div>
                            
                            <div className="hidden sm:flex w-16 h-16 rounded-full bg-slate-50 border border-slate-100 items-center justify-center shrink-0">
                                <Phone className="w-6 h-6 text-[#27b199]" />
                            </div>
                        </div>

                        {/* Simple Action Buttons */}
                        <div className="hc-anim flex flex-wrap gap-4 mt-2">
                            <button className="px-8 py-4 bg-[#27b199] hover:bg-[#1e8576] text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
                                Contact Now
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white hover:text-[#0f172a] text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 group">
                                Learn More
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Minimal Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div 
                            ref={rightImageRef} 
                            className="relative w-full max-w-[550px] aspect-[4/5]"
                        >
                            <img 
                                src="/home/2dbloodkit.webp" 
                                alt="Phlebotomist at home" 
                                className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                            />

                            {/* Single Clean Trust Badge */}
                            <div 
                                ref={badgeRef}
                                className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20 border border-slate-100"
                            >
                                <div className="bg-[#27b199]/10 p-3 rounded-xl">
                                    <ShieldCheck className="w-6 h-6 text-[#27b199]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">100% Verified</p>
                                    <p className="text-[#0f172a] text-sm font-black">Expert Phlebotomists</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeCollection;