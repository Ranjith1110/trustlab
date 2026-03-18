import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Play, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MobileApp = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const blobRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Staggered Content Reveal
            gsap.fromTo(".app-anim",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 2. Image Reveal (slides up gently)
            gsap.fromTo(imageRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 3. Continuous Gentle Float for the Mobile Image
            gsap.to(imageRef.current, {
                y: -15,
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 0.5
            });

            // 4. Ambient Background Blob Pulse
            gsap.to(blobRef.current, {
                scale: 1.1,
                opacity: 0.8,
                duration: 4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 lg:py-32 px-6 bg-white overflow-hidden flex items-center min-h-[80vh]">

            {/* Subtle Background Accent Blob */}
            <div 
                ref={blobRef}
                className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#29a997]/5 rounded-full blur-[120px] pointer-events-none z-0 -translate-y-1/2 -translate-x-1/4"
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                    {/* LEFT COLUMN: Clean Image Container */}
                    <div className="order-2 lg:order-1 relative flex justify-center lg:justify-start lg:pl-10">
                        <div
                            ref={imageRef}
                            className="relative w-full max-w-[320px] lg:max-w-[400px]"
                        >
                            {/* Decorative backing glow for the phone */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#29a997]/20 to-transparent rounded-[3rem] blur-2xl transform translate-y-10 scale-90 -z-10"></div>
                            
                            {/* App Mockup Image */}
                            <img
                                src="/home/mobilemockup.webp"
                                alt="TrustLab Mobile App Interface"
                                className="w-[500px] h-[500px] object-contain drop-shadow-[0_30px_50px_rgba(15,23,42,0.15)] relative z-10"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="order-1 lg:order-2 flex flex-col lg:pl-12">

                        {/* Coming Soon Badge */}
                        <div className="app-anim flex items-center gap-3 mb-6">
                            <div className="h-[2px] w-8 bg-[#29a997]" />
                            <span className="text-[#29a997] text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                                <Smartphone className="w-4 h-4" /> Coming Soon
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="app-anim text-[#0f172a] text-4xl font-light leading-tight mb-6">
                            Access health anytime with the <br className="hidden xl:block" />
                            <span className="font-bold text-[#0f172a]">TrustLab Mobile App.</span>
                        </h2>

                        {/* Download Buttons Section */}
                        <div className="app-anim">
                            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                                Join the waitlist for
                            </span>

                            <div className="flex flex-col sm:flex-row gap-4">

                                {/* App Store Button */}
                                <button className="group relative flex items-center justify-center gap-4 bg-[#0f172a] hover:bg-[#29a997] text-white rounded-2xl px-8 py-4 transition-all duration-300 w-full sm:w-auto text-left shadow-[0_10px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_15px_30px_rgba(41,169,151,0.25)]">
                                    <Apple className="w-8 h-8" />
                                    <div>
                                        <span className="block text-[9px] text-white/70 uppercase tracking-widest leading-none mb-1">Coming to</span>
                                        <span className="block font-bold text-lg leading-none tracking-wide">App Store</span>
                                    </div>
                                </button>

                                {/* Google Play Button */}
                                <button className="group relative flex items-center justify-center gap-4 bg-[#0f172a] hover:bg-[#29a997] text-white rounded-2xl px-8 py-4 transition-all duration-300 w-full sm:w-auto text-left shadow-[0_10px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_15px_30px_rgba(41,169,151,0.25)]">
                                    <Play className="w-7 h-7 ml-1" />
                                    <div>
                                        <span className="block text-[9px] text-white/70 uppercase tracking-widest leading-none mb-1">Coming to</span>
                                        <span className="block font-bold text-lg leading-none tracking-wide">Google Play</span>
                                    </div>
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileApp;