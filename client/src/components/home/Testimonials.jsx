import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Ramesh Kumar",
            text: "Fast service and accurate reports. The phlebotomist arrived exactly on time, and I received my results on my phone the same evening. Highly recommended!",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=11"
        },
        {
            id: 2,
            name: "Priya Sharma",
            text: "TrustLab has made preventive healthcare so much easier for my parents. The home collection is hygienic, and the staff is incredibly polite and professional.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=5"
        },
        {
            id: 3,
            name: "Anil Desai",
            text: "I was amazed by the seamless booking process. The reports are detailed yet easy to understand, and having the option for a doctor's consultation is a great bonus.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=8"
        },
        {
            id: 4,
            name: "Sneha Reddy",
            text: "Very reliable diagnostic center. I have compared their reports with my hospital lab, and they are spot on. Their diabetes care package is very comprehensive.",
            rating: 4,
            image: "https://i.pravatar.cc/150?img=9"
        },
        {
            id: 5,
            name: "Vikram Singh",
            text: "The best part is their transparency. No hidden charges, and you get exactly what you pay for. The customer support team is also very responsive.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=12"
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
                    start: "top 75%",
                }
            });

            // Header Reveal
            tl.fromTo(".testi-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
            )
                // Cards Reveal
                .fromTo(".testi-swiper",
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    // Helper to render stars
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 md:w-5 md:h-5 ${index < rating ? 'text-[#FEED02] fill-[#FEED02]' : 'text-slate-200 fill-slate-200'}`}
            />
        ));
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- HEADER --- */}

                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 mt-22">
                    <h2 className="testi-header text-[#334155] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Customer Testimonials
                    </h2>

                    <p className="testi-header text-slate-500 text-base md:text-lg font-light leading-relaxed">
                        People trust other people’s experiences. See what our patients say about our diagnostic services.
                    </p>
                </div>

                {/* --- SWIPER CAROUSEL AREA --- */}
                <div className="testi-swiper relative w-full group">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={24}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        slidesPerView={1}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
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
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="w-full py-4 px-2" // Removed massive bottom padding to perfectly center arrows
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="!h-auto flex">
                                {/* !h-auto and flex forces the slide to match the tallest card's height */}

                                {/* --- TESTIMONIAL CARD --- */}
                                <div className="bg-white rounded-3xl w-full p-8 md:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full relative group/card hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300">

                                    {/* Large Quote Icon */}
                                    <Quote className="absolute top-6 right-8 w-14 h-14 text-[#27B199]/10 rotate-180 pointer-events-none group-hover/card:text-[#27B199]/20 transition-colors duration-300" />

                                    {/* Star Rating */}
                                    <div className="flex items-center gap-1 mb-6 relative z-10">
                                        {renderStars(testimonial.rating)}
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed mb-8 flex-grow relative z-10">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Customer Profile (Pushed to bottom via mt-auto) */}
                                    <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6 relative z-10">
                                        <div className="relative">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md"
                                            />
                                            {/* Small green verified dot */}
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#27B199] border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="text-[#1F2B7B] font-bold text-base md:text-lg leading-tight">
                                                {testimonial.name}
                                            </h4>
                                            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                                                Verified Patient
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons (Now perfectly centered vertically with the cards) */}
                    <button className="swiper-nav-btn swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 xl:-translate-x-14 z-10 w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#27B199] hover:border-[#27B199] transition-all cursor-pointer hidden md:flex hover:scale-105">
                        <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                    <button className="swiper-nav-btn swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 xl:translate-x-14 z-10 w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#27B199] hover:border-[#27B199] transition-all cursor-pointer hidden md:flex hover:scale-105">
                        <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                </div>

                {/* --- PAGINATION CONTAINER --- */}
                {/* Moved outside the relative Swiper wrapper so it doesn't offset the vertical centering of the arrows */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    <div className="bg-slate-500 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center justify-center">
                        {activeIndex + 1}/{testimonials.length}
                    </div>
                    <div className="custom-swiper-pagination flex items-center gap-1.5"></div>
                </div>

            </div>

            {/* Global Styles for Swiper Overrides */}
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

export default Testimonials;