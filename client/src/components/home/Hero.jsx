import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
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
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(".hero-elem",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, delay: 0.2 }
            )
                .fromTo(".hero-bg-shape",
                    { scaleX: 0, transformOrigin: "right center" },
                    { scaleX: 1, duration: 1.2, ease: "expo.inOut" },
                    "-=0.8"
                )
                .fromTo(".hero-img",
                    { scale: 0.9, opacity: 0, y: 30 },
                    { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 1 },
                    "-=0.6"
                )
                .fromTo(".hero-float-card",
                    { scale: 0.8, opacity: 0, x: -30 },
                    { scale: 1, opacity: 1, x: 0, duration: 1, ease: "back.out(1.5)" },
                    "-=0.6"
                );

            gsap.to(".hero-img-1", {
                yPercent: -15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
            gsap.to(".hero-img-2", {
                yPercent: -5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
            gsap.to(".hero-img-3", {
                yPercent: -20,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2
                }
            });

        }, sectionRef);

        // Cleanup
        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-20 w-full">

                <div className="flex-1 text-center lg:text-left z-10 mt-10 lg:mt-0">
                    <h1 className="hero-elem text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
                        <span className="text-gray-400 block mb-2">Trusted Kits</span>
                        <span className="text-[#1F2B7B]">Real Results</span>
                    </h1>

                    <p className="hero-elem text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Order medical-grade test kits, return by mail, or schedule doorstep collection. Get fast, accurate, secure results online — anytime, anywhere, hassle-free.
                    </p>

                    <div className="hero-elem flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
                        <button className="px-8 py-4 bg-[#FEED02] text-[#1F2B7B] font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                            Book Test
                        </button>
                        <button className="px-8 py-4 bg-transparent text-[#1F2B7B] font-semibold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                            View All Tests
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="hero-elem flex items-center justify-center lg:justify-start gap-12">
                        <div>
                            <h3 className="text-4xl font-black text-[#1F2B7B] mb-1">100<span className="text-2xl text-gray-400">%</span></h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                                <span className="text-[#27B199]"></span> Safe & Private
                            </p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-[#1F2B7B] mb-1">98<span className="text-2xl text-gray-400">%</span></h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                                <span className="text-[#27B199]"></span> Satisfaction Rate
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative w-full h-[500px] lg:h-[650px] max-w-lg lg:max-w-none mx-auto mt-12 lg:mt-0 hidden md:block">

                    <div className="hero-bg-shape absolute right-0 top-10 bottom-10 w-[85%] bg-[#1F2B7B] rounded-l-[40px] rounded-r-2xl shadow-2xl"></div>

                    <img
                        src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=600"
                        alt="Healthcare Professional"
                        className="hero-img hero-img-1 absolute top-0 left-[5%] w-[45%] h-[55%] object-cover rounded-[30px] shadow-xl border-[6px] border-[#F8FAFC] z-20"
                    />

                    <img
                        src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=600"
                        alt="Patient Blood Draw"
                        className="hero-img hero-img-2 absolute top-[10%] right-[-2%] w-[42%] h-[50%] object-cover rounded-[30px] shadow-lg border-[6px] border-[#F8FAFC] z-10"
                    />

                    <img
                        src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=600"
                        alt="Diagnostic Test Kit"
                        className="hero-img hero-img-3 absolute bottom-[2%] right-[5%] w-[45%] h-[35%] object-cover rounded-[30px] shadow-lg border-[6px] border-[#F8FAFC] z-20"
                    />

                    <div className="hero-float-card absolute bottom-[10%] left-[-5%] bg-[#27B199] text-white p-5 rounded-2xl shadow-2xl z-30 flex flex-col gap-3 w-[240px]">
                        <div className="flex justify-between items-start">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#1F2B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                            </svg>
                        </div>

                        <p className="font-bold text-lg leading-tight mt-1">Fast & Reliable <br /> Delivery</p>

                        <div className="flex -space-x-3 mt-2">
                            <img className="w-10 h-10 rounded-full border-2 border-[#27B199]" src="https://i.pravatar.cc/100?img=33" alt="User" />
                            <img className="w-10 h-10 rounded-full border-2 border-[#27B199]" src="https://i.pravatar.cc/100?img=12" alt="User" />
                            <div className="w-10 h-10 rounded-full border-2 border-[#27B199] bg-white text-[#1F2B7B] flex items-center justify-center text-xs font-bold shadow-inner">
                                +4k
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;