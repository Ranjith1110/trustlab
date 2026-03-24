import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LatestNews = () => {
    const sectionRef = useRef(null);

    const articles = [
        {
            id: 1,
            date: "22 Aug, 2020",
            title: "9 vital women's health screenings",
            desc: "In this article, we'll delve into the essential health screenings every woman should undergo to safeguard her health.",
            img: "/diagnosticsolutions/latestdemo.avif" 
        },
        {
            id: 2,
            date: "15 Jul, 2020",
            title: "Eyeing a healthcare career? Here are the trending roles",
            desc: "The Indian healthcare sector has seen massive growth in the past few years and is becoming an economic backbone of the nation.",
            img: "/diagnosticsolutions/blogg2.webp" 
        },
        {
            id: 3,
            date: "05 Jan, 2020",
            title: "Important Tests to Undertake to Detect Diseases like AIDS",
            desc: "Early detection of AIDS (Acquired Immunodeficiency Syndrome) is crucial for effective treatment and long-term management.",
            img: "/diagnosticsolutions/blogg3.webp" 
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

        // 2. GSAP Animations
        const ctx = gsap.context(() => {
            
            // Header Reveal
            gsap.fromTo(".news-header", 
                { y: 30, opacity: 0 },
                { 
                    y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );

            // Staggered Cards Reveal
            gsap.fromTo(".news-card",
                { y: 50, opacity: 0 },
                { 
                    y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: ".news-grid", start: "top 80%" }
                }
            );

            // CTA Button Reveal
            gsap.fromTo(".news-btn",
                { y: 20, opacity: 0 },
                { 
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: ".news-btn-container", start: "top 90%" }
                }
            );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#fcfdfe] overflow-hidden">
            
            {/* Very subtle background depth */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#f1f5f9] to-transparent pointer-events-none opacity-50 z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
                
                {/* --- HEADER --- */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    
                    {/* Eyebrow Label */}
                    <div className="news-header flex items-center justify-center gap-3 mb-6">
                        <div className="h-[2px] w-8 bg-[#29a997]" />
                        <span className="text-[#29a997] text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                            Media & Insights
                        </span>
                        <div className="h-[2px] w-8 bg-[#29a997]" />
                    </div>

                    <h2 className="news-header text-[#0f172a] text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6">
                        Stay Updated With The Latest Health <br className="hidden md:block" />
                        News, Articles From <span className="font-bold text-[#29a997]">TrustLab</span>
                    </h2>

                    {/* Teal Heartbeat Graphic */}
                    <div className="news-header flex justify-center mt-6">
                        <svg width="50" height="16" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10H15L20 2L30 18L35 10H60" stroke="#29a997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* --- ARTICLES GRID --- */}
                <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {articles.map((article) => (
                        <article 
                            key={article.id} 
                            className="news-card group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-[0_15px_40px_rgba(15,23,42,0.04)] hover:shadow-[0_25px_50px_rgba(41,169,151,0.1)] transition-all duration-500 overflow-hidden hover:-translate-y-2"
                        >
                            {/* Image Wrapper */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                                <img 
                                    src={article.img} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Soft Inner Shadow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                
                                {/* Floating Date Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                                    <Calendar className="w-3.5 h-3.5 text-[#29a997]" />
                                    <span className="text-[#0f172a] text-[10px] font-bold tracking-widest uppercase">
                                        {article.date}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow p-8">
                                <h3 className="text-[#0f172a] text-xl font-bold leading-snug mb-4 group-hover:text-[#29a997] transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                
                                <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {article.desc}
                                </p>

                                {/* Read More Link */}
                                <div className="mt-auto flex items-center gap-2 text-[#0f172a] text-xs font-bold uppercase tracking-widest group-hover:text-[#29a997] transition-colors w-fit cursor-pointer">
                                    Read Article
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* --- FOOTER CTA --- */}
                <div className="news-btn-container mt-16 md:mt-20 flex justify-center">
                    <button className="news-btn group px-10 py-4 bg-[#0f172a] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#29a997] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-[0_15px_30px_rgba(41,169,151,0.25)]">
                        More News Articles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default LatestNews;