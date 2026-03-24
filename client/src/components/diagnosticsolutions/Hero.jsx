import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, FlaskConical, Package, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const bannerRef = useRef(null);
    const floatBarRef = useRef(null);
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });

            // 1. Reveal the main banner card
            tl.fromTo(bannerRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
            // 2. Pop-in the floating search bar
            .fromTo(floatBarRef.current,
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
                "-=0.6"
            )
            // 3. Fade in the promo text below
            .fromTo(".promo-text",
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "-=0.4"
            );

            // Ambient background blob animations using your brand colors
            gsap.to(blob1Ref.current, {
                x: 30, y: 20, scale: 1.1, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1
            });
            gsap.to(blob2Ref.current, {
                x: -30, y: -20, scale: 1.1, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-16 md:py-32 px-4 flex flex-col items-center justify-center overflow-hidden">
            
            <div className="relative w-full max-w-6xl mb-12 mt-10 md:mt-0">
                
                <div ref={bannerRef} className="relative bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between border border-slate-100 shadow-[0_15px_50px_rgba(31,43,123,0.06)] overflow-hidden">
                    
                    <div ref={blob1Ref} className="absolute top-0 left-0 w-64 h-64 bg-[#feed02]/20 rounded-full blur-[80px] pointer-events-none"></div>
                    <div ref={blob2Ref} className="absolute bottom-0 right-0 w-80 h-80 bg-[#27b199]/15 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-start text-left w-full md:w-1/2 mb-10 md:mb-0">
                        <h2 className="text-[#1F2B7B] text-2xl md:text-3xl lg:text-4xl font-light mb-2 leading-tight tracking-tight">
                            A healthy person may have a thousand wishes.
                        </h2>
                        
                        <p className="text-[#27b199] text-xl md:text-2xl font-bold mb-2">
                            But a sick person has only ONE...
                        </p>
                        
                        <h3 className="text-[#1F2B7B] text-3xl md:text-4xl lg:text-5xl font-black mb-10 tracking-tight">
                            To Get Well <span className="relative inline-block">
                                SOON!
                                <span className="absolute bottom-1 left-0 w-full h-2 md:h-3 bg-[#feed02]/60 -z-10 rounded-full"></span>
                            </span>
                        </h3>
                        
                        <button className="bg-[#1F2B7B] hover:bg-[#27b199] text-white px-8 py-3.5 rounded-full font-bold tracking-wide text-sm shadow-[0_8px_20px_rgba(31,43,123,0.25)] hover:shadow-[0_10px_25px_rgba(39,177,153,0.35)] transition-all hover:-translate-y-0.5">
                            Book a Home Test
                        </button>
                    </div>

                    <div className="relative z-10 w-full md:w-[45%] flex justify-end">
                        <div className="relative w-full aspect-[4/3] md:aspect-square max-w-[400px]">
                            <div className="absolute inset-0 border-l-[6px] border-[#feed02] rounded-l-[5rem] md:rounded-l-[8rem] -left-2 z-20 pointer-events-none"></div>
                            
                            <img 
                                src="/diagnosticsolutions/banner.jpg" 
                                alt="Patient Care and Diagnostics" 
                                className="w-full h-full object-cover rounded-l-[5rem] md:rounded-l-[8rem] rounded-r-3xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                <div 
                    ref={floatBarRef} 
                    className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 w-[95%] md:w-auto bg-white/95 backdrop-blur-xl p-2 md:p-3 rounded-2xl md:rounded-full shadow-[0_20px_50px_-10px_rgba(31,43,123,0.15)] border border-slate-100 flex flex-col md:flex-row items-center gap-3 md:gap-4 z-30"
                >
                    {/* Search Input */}
                    <div className="relative w-full md:w-72 flex items-center bg-white border border-slate-200 rounded-full px-5 py-3 hover:border-[#27b199] transition-colors">
                        <input 
                            type="text" 
                            placeholder="Search for tests..." 
                            className="w-full bg-transparent border-none outline-none text-[#1F2B7B] text-sm placeholder:text-slate-400 pr-8"
                        />
                        <Search className="absolute right-4 w-4 h-4 text-[#27b199]" />
                    </div>

                    {/* Action Buttons Container */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1F2B7B] hover:bg-[#151d54] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[0_8px_15px_rgba(31,43,123,0.2)] hover:shadow-[0_10px_20px_rgba(31,43,123,0.3)] hover:-translate-y-0.5 transition-all">
                            <span>Lab Tests</span>
                        </button>

                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#27b199] hover:bg-[#208a7b] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[0_8px_15px_rgba(39,177,153,0.2)] hover:shadow-[0_10px_20px_rgba(39,177,153,0.3)] hover:-translate-y-0.5 transition-all">
                            <span>Checkups</span>
                        </button>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Hero;