import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Activity, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const Packages = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const packages = [
        {
            id: 1,
            name: "Full Body Checkup - Essential",
            price: 1599,
            oldPrice: 5243,
            discount: 70,
            parameters: 91,
            time: "6 hours *"
        },
        {
            id: 2,
            name: "Full Body Checkup - Advanced",
            price: 2799,
            oldPrice: 7708,
            discount: 64,
            parameters: 100,
            time: "6 hours *"
        },
        {
            id: 3,
            name: "Ultra Full Body Checkup - Male",
            price: 3499,
            oldPrice: 8500,
            discount: 59,
            parameters: 129,
            time: "12 hours *"
        },
        {
            id: 4,
            name: "Women Health Package",
            price: 1699,
            oldPrice: 3399,
            discount: 50,
            parameters: 85,
            time: "6 hours *"
        },
        {
            id: 5,
            name: "Senior Citizen Profile",
            price: 1899,
            oldPrice: 3799,
            discount: 50,
            parameters: 95,
            time: "12 hours *"
        }
    ];

    useEffect(() => {
        // Initialize Lenis Smooth Scrolling
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

        // GSAP Entrance Animations
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Header Reveal
            tl.fromTo(".pkg-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
            )
                // Cards Stagger Reveal
                .fromTo(".pkg-card",
                    { y: 50, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)" },
                    "-=0.5"
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

                {/* --- HEADER --- */}
                <div className="mb-12">
                    <h2 className="pkg-header text-[#334155] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                        Popular Health Packages
                    </h2>
                </div>

                {/* --- SWIPER SLIDER SECTION --- */}
                {/* Removed bottom padding so the arrows center exactly on the cards */}
                <div className="relative w-full group">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={24}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        pagination={{
                            clickable: true,
                            el: '.custom-swiper-pagination',
                            bulletClass: 'swiper-custom-bullet',
                            bulletActiveClass: 'swiper-custom-bullet-active'
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },         // Mobile: 1 Card
                            768: { slidesPerView: 2 },       // iPad: 2 Cards
                            1024: { slidesPerView: 3 },      // Desktop: 3 Cards
                        }}
                        className="w-full py-4 px-2"
                    >
                        {packages.map((pkg) => (
                            <SwiperSlide key={pkg.id} className="!h-auto flex">
                                {/* !h-auto and flex force all slides to match the height of the tallest content */}

                                {/* --- PACKAGE CARD --- */}
                                <div className="pkg-card bg-white rounded-3xl w-full overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300">

                                    {/* Top Half: Green Background */}
                                    <div className="bg-gradient-to-br from-[#2f8a75] to-[#27B199] p-6 text-white relative h-44 flex flex-col justify-end shrink-0">

                                        {/* Corner Tag */}
                                        <div className="absolute top-4 right-6 bg-[#185e4f]/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                            Checkup
                                        </div>

                                        <div className="flex justify-between items-end gap-4">
                                            <h3 className="text-xl md:text-2xl font-bold leading-tight line-clamp-2 pr-2">
                                                {pkg.name}
                                            </h3>

                                            <div className="text-right shrink-0 pb-1">
                                                <div className="flex items-center justify-end gap-2 mb-1">
                                                    <span className="text-sm line-through text-white/70 font-medium">₹{pkg.oldPrice}</span>
                                                    <span className="text-2xl font-bold text-white leading-none">₹{pkg.price}</span>
                                                </div>
                                                <div className="bg-[#00d084] text-white text-[11px] px-2 py-0.5 rounded inline-block font-bold shadow-sm">
                                                    {pkg.discount}% Off
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Half: White Background Content */}
                                    <div className="p-6 flex flex-col flex-grow bg-white">

                                        {/* Parameters & Time (Grid Layout) */}
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="flex items-start gap-3">
                                                <Activity className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                                                <span className="text-[13px] font-bold text-[#1F2B7B] leading-snug">
                                                    {pkg.parameters} parameters <br />
                                                    <span className="font-normal text-slate-500">included</span>
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 border-l border-slate-100 pl-4">
                                                <ClipboardList className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                                                <span className="text-[13px] font-normal text-slate-500 leading-snug">
                                                    Reports within <br />
                                                    <span className="font-bold text-[#1F2B7B]">{pkg.time}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons (Pushed to bottom using mt-auto) */}
                                        <div className="flex gap-4 mt-auto">
                                            <button className="flex-1 py-3 px-2 rounded-xl border border-[#27B199] text-[#27B199] font-bold text-sm hover:bg-teal-50 transition-colors">
                                                View Details
                                            </button>
                                            <button className="flex-1 py-3 px-2 rounded-xl bg-[#FEED02] text-[#1F2B7B] font-bold text-sm hover:bg-[#e6d602] transition-colors">
                                                Add to Cart
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons (Now perfectly centered with the cards) */}
                    <button className="swiper-nav-btn swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 xl:-translate-x-14 z-10 w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#27B199] hover:border-[#27B199] transition-all cursor-pointer hidden md:flex hover:scale-105">
                        <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                    <button className="swiper-nav-btn swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 xl:translate-x-14 z-10 w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#27B199] hover:border-[#27B199] transition-all cursor-pointer hidden md:flex hover:scale-105">
                        <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                </div>

                {/* --- PAGINATION CONTAINER --- */}
                {/* Moved outside the relative Swiper wrapper so it matches the Testimonials layout exactly */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    <div className="bg-slate-500 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center justify-center">
                        {activeIndex + 1}/{packages.length}
                    </div>
                    <div className="custom-swiper-pagination flex items-center gap-1.5"></div>
                </div>

            </div>

            {/* Global styles for Swiper Pagination overrides */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .swiper-custom-bullet {
                    width: 6px;
                    height: 6px;
                    background-color: #cbd5e1; /* slate-300 */
                    border-radius: 50%;
                    display: inline-block;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .swiper-custom-bullet-active {
                    background-color: #94a3b8; /* slate-400 */
                    transform: scale(1.3);
                }
                .swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            `}} />
        </section>
    );
};

export default Packages;