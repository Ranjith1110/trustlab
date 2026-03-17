import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import logo from '/trustlogofull.webp';

const Navbar = () => {
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline();
        // Soft fade-in and slide down
        tl.fromTo(navRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
        );
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            gsap.to(menuRef.current, { clipPath: 'circle(150% at 100% 0%)', duration: 1, ease: "expo.inOut" });
            gsap.fromTo(".side-link",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.4 }
            );
        } else {
            gsap.to(menuRef.current, { clipPath: 'circle(0% at 100% 0%)', duration: 0.8, ease: "expo.inOut" });
        }
    };

    return (
        <>
            <nav ref={navRef} className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 px-4 md:px-10 py-3 flex items-center justify-between">
                {/* Left: Brand Identity */}
                <div className="flex-1">
                    <img src={logo} alt="TrustLab" className="h-8 md:h-10 w-auto hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Center: Core Actions (Hidden on Mobile) */}
                <div className="hidden lg:flex flex-[2] justify-center items-center gap-10">
                    {['Membership', 'Book a Test', 'Reports', 'Collaborate'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`}
                            className="relative text-[13px] font-bold text-gray-800 tracking-widest uppercase group overflow-hidden">
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                            <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-[#29a997]">{item}</span>
                        </a>
                    ))}
                </div>

                {/* Right: Premium CTA & Utility */}
                <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
                    <div className="relative cursor-pointer group">
                        <ShoppingCart className="w-5 h-5 text-gray-800 group-hover:text-[#29a997] transition-colors" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#f5ed00] text-[9px] font-black flex items-center justify-center rounded-full text-black">0</div>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-200 group"
                    >
                        <span className="hidden sm:block text-xs font-black tracking-tighter uppercase group-hover:text-[#29a997] transition-colors">Explorer</span>
                        <div className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5">
                            <span className={`w-6 h-[2px] bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-[4px] bg-white' : ''}`}></span>
                            <span className={`w-6 h-[2px] bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-[4px] bg-white' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Premium Full-Screen Overlay */}
            <div
                ref={menuRef}
                style={{ clipPath: 'circle(0% at 100% 0%)' }}
                className="fixed inset-0 z-[90] bg-[#0f0f0f] flex items-center px-6 md:px-[10%] overflow-y-auto pt-24 pb-12 md:py-0"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12 md:gap-20 mt-32 md:mt-0">
                    {/* Secondary Navigation */}
                    <div className="flex flex-col gap-4">
                        <p className="text-[#29a997] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2 md:mb-4">Navigation</p>
                        {['About Us', 'Resources', 'Careers', 'Contact Us', 'Payment Details'].map((item) => (
                            <a key={item} href="#" className="side-link text-3xl md:text-6xl font-light text-white hover:text-[#f5ed00] transition-colors flex items-center group">
                                {item}
                                <ArrowRight className="ml-2 md:ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-6 h-6 md:w-10 md:h-10 text-[#29a997]" />
                            </a>
                        ))}
                    </div>

                    {/* Contact/Login Info - Now visible on all screens */}
                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-20 text-white">
                        <div className="side-link mb-8 md:mb-10">
                            <h4 className="text-[#f5ed00] text-xs md:text-sm font-bold uppercase mb-2">Member Portal</h4>
                            <p className="text-gray-400 font-light text-sm md:text-base max-w-xs mb-6">Access your diagnostic history and exclusive membership benefits.</p>
                            <button className="w-full md:w-auto px-8 py-4 md:py-3 bg-[#29a997] hover:bg-[#f5ed00] hover:text-black transition-all font-bold text-xs md:text-sm uppercase tracking-widest rounded-full md:rounded-none">
                                Login to Account
                            </button>
                        </div>
                        <div className="side-link">
                            <h4 className="text-gray-500 text-xs md:text-sm font-bold uppercase mb-2">Support</h4>
                            <p className="text-lg md:text-xl font-light hover:text-[#29a997] transition-colors">support@trustlab.com</p>
                            <p className="text-lg md:text-xl font-light hover:text-[#29a997] transition-colors">+91 123 456 7890</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;