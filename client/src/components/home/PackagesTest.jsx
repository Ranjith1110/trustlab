import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PackagesTest = () => {
    const [activeTab, setActiveTab] = useState('Packages');
    const sectionRef = useRef(null);
    const cardsContainerRef = useRef(null);

    // Dummy Data
    const contentData = {
        Packages: [
            { id: 1, name: "Premium Full Body Package", oldPrice: "4,400", newPrice: "2,200", params: 85 },
            { id: 2, name: "Advanced Cardiac Package", oldPrice: "3,600", newPrice: "1,800", params: 12 },
            { id: 3, name: "Women Wellness Gold", oldPrice: "5,000", newPrice: "2,500", params: 64 },
            { id: 4, name: "Senior Citizen Special", oldPrice: "3,200", newPrice: "1,600", params: 72 },
        ],
        Profiles: [
            { id: 1, name: "Comprehensive Liver Profile", oldPrice: "1,800", newPrice: "900", params: 11 },
            { id: 2, name: "Diabetes Screening Profile", oldPrice: "1,400", newPrice: "700", params: 6 },
            { id: 3, name: "Thyroid Care Profile", oldPrice: "1,200", newPrice: "600", params: 3 },
            { id: 4, name: "Lipid/Heart Profile", oldPrice: "1,600", newPrice: "800", params: 9 },
        ],
        Tests: [
            { id: 1, name: "HbA1c (Glycosylated Hb)", oldPrice: "800", newPrice: "400", params: 1 },
            { id: 2, name: "Vitamin D (25-OH)", oldPrice: "2,000", newPrice: "1,000", params: 1 },
            { id: 3, name: "Complete Blood Count", oldPrice: "600", newPrice: "300", params: 24 },
            { id: 4, name: "Iron Deficiency Test", oldPrice: "1,000", newPrice: "500", params: 4 },
        ]
    };

    // Initial scroll reveal
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".section-header", 
                { y: 50, opacity: 0 },
                { 
                    y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );

            gsap.fromTo(".tab-btn", 
                { y: 20, opacity: 0 },
                { 
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate cards on tab change
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".test-card", 
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.2)" }
            );
        }, cardsContainerRef);

        return () => ctx.revert();
    }, [activeTab]);

    return (
        <section ref={sectionRef} className="relative py-24 px-6 bg-[#f8fafc] w-full overflow-hidden">
            
            {/* Background Accent Lines (Matches DirectoryOfServices) */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#29a997 1px, transparent 1px), linear-gradient(to right, #29a997 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="section-header text-center mb-12">
                    <h4 className="text-[#29a997] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">
                        Diagnostic Categories
                    </h4>
                    <h2 className="text-[#0f172a] text-4xl md:text-5xl font-light">
                        Personalized <span className="font-bold">Health Plans</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
                        Comprehensive diagnostic packages curated by medical experts. Select a category below to explore options tailored to your needs.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center gap-3 mb-14 overflow-x-auto no-scrollbar py-2 px-4">
                    {['Packages', 'Profiles', 'Tests'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-btn whitespace-nowrap px-8 md:px-10 py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 border ${
                                activeTab === tab 
                                ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-[0_10px_20px_rgba(15,23,42,0.2)]' 
                                : 'bg-white text-gray-400 border-gray-200 hover:border-[#29a997] hover:text-[#29a997] shadow-sm'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contentData[activeTab].map((item) => (
                        <div
                            key={item.id}
                            className="test-card group relative bg-white border border-gray-100 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(41,169,151,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden"
                        >
                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#29a997] to-[#f5ed00] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* 50% Off Badge */}
                            <div className="absolute top-6 right-6 bg-[#ef4444]/10 text-[#ef4444] font-black text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 border border-[#ef4444]/20">
                                <Activity className="w-3 h-3" />
                                50% OFF
                            </div>

                            <div className="flex-grow mt-4">
                                {/* Title */}
                                <h3 className="text-[#0f172a] font-bold text-lg md:text-xl leading-snug mb-6 group-hover:text-[#29a997] transition-colors pr-12">
                                    {item.name}
                                </h3>

                                {/* Parameters Indicator */}
                                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#29a997] shadow-sm">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Includes</span>
                                        <span className="text-xs font-black text-[#0f172a]">{item.params} Parameters</span>
                                    </div>
                                </div>

                                {/* Pricing Section */}
                                <div className="flex flex-col mb-8">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Cost</span>
                                    <div className="flex items-end gap-3">
                                        <span className="text-[#29a997] font-black text-3xl">₹{item.newPrice}</span>
                                        <span className="text-gray-300 line-through text-sm font-medium mb-1">₹{item.oldPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full py-4 bg-gray-50 hover:bg-[#0f172a] text-[#0f172a] hover:text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 group/btn border border-gray-200 hover:border-[#0f172a]">
                                View Details
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Interactive Footer CTA */}
                <div className="mt-14 flex flex-col items-center">
                    <button className="group px-10 py-4 bg-white border border-gray-200 rounded-xl text-[#0f172a] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#29a997] hover:text-white hover:border-[#29a997] shadow-sm hover:shadow-[0_10px_20px_rgba(41,169,151,0.2)] transition-all duration-500 flex items-center gap-3">
                        Explore All {activeTab}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PackagesTest;