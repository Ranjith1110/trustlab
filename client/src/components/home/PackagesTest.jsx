import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Microscope, FlaskConical, ClipboardList } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3D Background: Floating Particles
function ParticleBackground() {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));
    
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#29a997" size={0.006} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
}

const PackagesTest = () => {
    const [activeTab, setActiveTab] = useState('Packages');
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // 4 Dummy Cards for each category as requested
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

    useEffect(() => {
        // Initial Section Animation
        gsap.fromTo(".section-header", 
            { y: 50, opacity: 0 },
            { 
                y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
            }
        );
    }, []);

    // Staggered Animation whenever the Tab changes
    useEffect(() => {
        gsap.fromTo(".test-card", 
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "expo.out" }
        );
    }, [activeTab]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-[#fcfdfe] py-24 px-6 overflow-hidden">
            
            {/* 3D Visual Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <ParticleBackground />
                    </Suspense>
                </Canvas>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Heading Area */}
                <div className="section-header text-center mb-16">
                    <h4 className="text-[#29a997] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Diagnostic Categories</h4>
                    <h2 className="text-[#0f172a] text-4xl md:text-6xl font-light">
                        Personalized <span className="font-bold">Health Plans</span>
                    </h2>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center gap-3 mb-16 overflow-x-auto no-scrollbar py-2">
                    {['Packages', 'Profiles', 'Tests'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 border ${
                                activeTab === tab 
                                ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-2xl' 
                                : 'bg-white text-gray-400 border-gray-200 hover:border-[#29a997] hover:text-[#29a997]'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid - Showing 4 Cards per category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contentData[activeTab].map((item) => (
                        <div
                            key={item.id}
                            className="test-card group relative bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(41,169,151,0.1)] transition-all duration-500 hover:-translate-y-3 flex flex-col"
                        >
                            {/* 50% Off Badge - Top Right */}
                            <div className="absolute -top-3 -right-2 bg-red-500 text-white font-black text-[10px] px-3 py-1.5 rounded-lg shadow-lg z-20">
                                50% OFF
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-[#0f172a] font-bold text-xl leading-tight mb-5 group-hover:text-[#29a997] transition-colors">
                                    {item.name}
                                </h3>

                                {/* Parameters Badge (Blue circle style from ref) */}
                                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 mb-8">
                                    <div className="w-10 h-10 rounded-full border-2 border-blue-900 flex items-center justify-center text-blue-900 font-black text-sm">
                                        {item.params}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Includes</span>
                                        <span className="text-[10px] font-black text-gray-700 uppercase">Parameters</span>
                                    </div>
                                </div>

                                {/* Pricing Section */}
                                <div className="flex items-end gap-3 mb-8">
                                    <span className="text-gray-300 line-through text-lg font-medium">₹{item.oldPrice}</span>
                                    <span className="text-[#29a997] font-black text-3xl">₹{item.newPrice}</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full py-4 bg-[#1e3a8a] hover:bg-[#0f172a] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 group/btn">
                                More Details
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Interactive Footer CTA */}
                <div className="mt-10 flex flex-col items-center">
                    <div className="h-[1px] w-24 bg-gray-200 mb-8"></div>
                    <button className="group px-12 py-5 border-2 border-[#0f172a] rounded-full text-[#0f172a] font-bold uppercase tracking-widest text-xs hover:bg-[#0f172a] hover:text-white transition-all duration-500">
                        Explore All {activeTab}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PackagesTest;