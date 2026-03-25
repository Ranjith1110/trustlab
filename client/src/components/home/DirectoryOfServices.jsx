import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Droplet, Dna, Activity, AlertCircle, Stethoscope, ShieldAlert, HeartPulse, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DirectoryOfServices = () => {
    const sectionRef = useRef(null);
    const contentRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const services = [
        {
            id: 'blood-tests',
            title: 'Blood Tests',
            icon: Droplet,
            desc: 'Comprehensive blood panels to monitor your overall health, detect infections, and check vital organ functions accurately.',
            img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
            price: '₹499'
        },
        {
            id: 'genetic-testing',
            title: 'Genetic Testing',
            icon: Dna,
            desc: 'Advanced DNA analysis to identify inherited conditions, helping you personalize your preventive care and wellness plan.',
            img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1000&q=80',
            price: '₹4,999'
        },
        {
            id: 'hormone-tests',
            title: 'Hormone Tests',
            icon: Activity,
            desc: 'Precise evaluations of hormonal imbalances affecting your metabolism, mood, sleep, and reproductive health.',
            img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
            price: '₹1,299'
        },
        {
            id: 'allergy-tests',
            title: 'Allergy Tests',
            icon: AlertCircle,
            desc: 'Identify specific triggers for food, environmental, and seasonal allergies to help you live a comfortable, symptom-free life.',
            img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
            price: '₹2,499'
        },
        {
            id: 'cancer-screening',
            title: 'Cancer Screening',
            icon: Stethoscope,
            desc: 'Early detection of specific tumor markers to catch potential malignancies at their earliest and most treatable stages.',
            img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
            price: '₹3,499'
        },
        {
            id: 'covid-testing',
            title: 'Covid Testing',
            icon: ShieldAlert,
            desc: 'Fast and highly accurate RT-PCR and rapid antigen testing solutions for travel, work clearance, and peace of mind.',
            img: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1000&q=80',
            price: '₹799'
        },
        {
            id: 'preventive-health',
            title: 'Preventive Health Checkups',
            icon: HeartPulse,
            desc: 'Holistic full-body evaluations tailored to your specific age and lifestyle to proactively manage your long-term well-being.',
            img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80',
            price: '₹1,999'
        }
    ];

    // Safely add refs
    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
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

        // 2. GSAP ScrollTrigger Setup
        const ctx = gsap.context(() => {

            // Header Entrance
            gsap.fromTo(".dos-header",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );

            // Animate cards on scroll & update active sidebar item
            contentRefs.current.forEach((section, index) => {

                // Fade in the card as it scrolls into view
                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        }
                    }
                );

                // Update Active Index based on scroll position
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveIndex(index);
                        }
                    }
                });
            });

        }, sectionRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    // Function to handle clicking sidebar items (Smooth scroll to section)
    const handleScrollTo = (index) => {
        const target = contentRefs.current[index];
        if (target) {
            // Offset for the sticky header/navbar
            const yOffset = target.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="dos-header text-[#27B199] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                        Our Diagnostics
                    </p>
                    <h2 className="dos-header text-[#334155] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Choose Your Procedure
                    </h2>
                </div>

                {/* --- SPLIT LAYOUT --- */}
                <div className="flex flex-col lg:flex-row gap-12 relative items-start">

                    {/* --- LEFT: Sticky Sidebar --- */}
                    <div className="w-full lg:w-1/3 sticky top-28 z-20 hidden md:block">
                        <div className="flex flex-col relative">

                            {/* Decorative active line indicator on the left side */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="w-full bg-[#27B199] transition-all duration-500 ease-out rounded-full"
                                    style={{
                                        height: `${100 / services.length}%`,
                                        transform: `translateY(${activeIndex * 100}%)`
                                    }}
                                />
                            </div>

                            {/* Service Buttons */}
                            {services.map((service, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => handleScrollTo(index)}
                                        className={`flex items-center gap-4 py-4 pl-8 pr-4 text-left transition-all duration-300 rounded-r-2xl group ${isActive
                                                ? 'bg-[#27B199] text-white shadow-lg shadow-[#1F2B7B]/20 ml-1'
                                                : 'text-slate-500 hover:bg-white hover:text-[#1F2B7B] ml-0'
                                            }`}
                                    >
                                        <service.icon
                                            className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-[#FEED02]' : 'text-slate-400 group-hover:text-[#27B199]'}`}
                                            strokeWidth={isActive ? 2 : 1.5}
                                        />
                                        <span className={`text-sm lg:text-base font-semibold tracking-wide ${isActive ? '' : 'group-hover:font-bold'}`}>
                                            {service.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- Mobile Horizontal Sticky Bar --- */}
                    <div className="w-full md:hidden sticky top-16 z-30 bg-[#f8fafc]/95 backdrop-blur-md pt-4 pb-4 -mx-4 px-4 border-b border-slate-200 overflow-x-auto no-scrollbar">
                        <div className="flex gap-3 w-max">
                            {services.map((service, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => handleScrollTo(index)}
                                        className={`flex items-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${isActive
                                                ? 'bg-[#27B199] text-white shadow-md'
                                                : 'bg-white text-slate-500 border border-slate-200'
                                            }`}
                                    >
                                        <service.icon className={`w-4 h-4 ${isActive ? 'text-[#FEED02]' : 'text-slate-400'}`} strokeWidth={2} />
                                        {service.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- RIGHT: Dynamic Scrolling Content --- */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-16 lg:gap-32">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                id={`service-${index}`}
                                ref={addToRefs}
                                className="bg-white rounded-3xl p-6 lg:p-10 shadow-[0_15px_40px_-15px_rgba(31,43,123,0.1)] border border-slate-100 flex flex-col"
                            >
                                {/* Package Counter Overlay */}
                                <p className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-4">
                                    {index + 1} of {services.length}
                                </p>

                                {/* Service Image */}
                                <div className="w-full aspect-video md:aspect-[16/7] rounded-2xl overflow-hidden mb-8 relative group">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Medical Inner Shadow */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(31,43,123,0.1)] pointer-events-none rounded-2xl"></div>
                                </div>

                                {/* Content Area */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

                                    <div className="flex-1">
                                        <h3 className="text-[#1F2B7B] text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">
                                            {service.desc}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start md:items-end gap-4 shrink-0 border-t md:border-t-0 border-slate-100 pt-6 md:pt-0">
                                        <p className="text-slate-500 text-sm font-medium">
                                            Starting from <span className="text-2xl font-bold text-[#1F2B7B] ml-1">{service.price}</span>
                                        </p>
                                        <button className="group flex items-center gap-2 bg-[#27B199] hover:bg-[#1e9982] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-[0_8px_20px_rgba(39,177,153,0.25)] hover:shadow-[0_10px_25px_rgba(39,177,153,0.4)] hover:-translate-y-0.5">
                                            Book Appointment
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DirectoryOfServices;