import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShoppingCart, ArrowRight, ChevronDown } from 'lucide-react';
import logo from '/trustlogofull.webp';

const Navbar = () => {
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // State to handle which secondary dropdown is open in the full-screen menu
    const [openSecondaryDropdown, setOpenSecondaryDropdown] = useState(null);

    // Desktop top navigation data
    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'Membership', id: 'membership' },
        { name: 'Book a Test', id: 'book-a-test' },
        { 
            name: 'Reports', 
            id: 'reports',
            dropdown: ['Patients', 'Healthcare', 'Professionals', 'Corporate Providers', 'Laboratory Managers']
        },
        { name: 'Collaborate', id: 'collaborate' }
    ];

    // Mobile/Full-Screen secondary navigation data
    const secondaryNavItems = [
        {
            name: 'About Us',
            dropdown: ['Who We Are', 'Board of Directors', 'Board of Advisors', 'Leadership Team', 'Our Doctors']
        },
        {
            name: 'Resources',
            dropdown: ['Our Blogs', 'TrustLab Brochures', 'Our Diagnostic Expertise', 'TRUSTlab in the News', 'Our Scientific Publications']
        },
        {
            name: 'Careers',
            dropdown: ['Life at TrustLab', 'Current Opportunities', 'Join Our Talent Pool']
        },
        { name: 'Contact Us' },
        { name: 'Payment Details' }
    ];

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
            // Open menu
            gsap.to(menuRef.current, { clipPath: 'circle(150% at 100% 0%)', duration: 1, ease: "expo.inOut" });
            gsap.fromTo(".side-link",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.4 }
            );
        } else {
            // Close menu
            gsap.to(menuRef.current, { clipPath: 'circle(0% at 100% 0%)', duration: 0.8, ease: "expo.inOut" });
            // Optionally close all dropdowns when menu closes
            setTimeout(() => setOpenSecondaryDropdown(null), 800);
        }
    };

    const handleSecondaryDropdownClick = (itemName) => {
        setOpenSecondaryDropdown(openSecondaryDropdown === itemName ? null : itemName);
    };

    return (
        <>
            <nav ref={navRef} className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 px-4 md:px-10 py-3 flex items-center justify-between">
                {/* Left: Brand Identity */}
                <div className="flex-1">
                    <img src={logo} alt="TrustLab" className="h-7 sm:h-8 md:h-10 w-auto hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Center: Core Actions (Hidden on Mobile) */}
                <div className="hidden lg:flex flex-[2] justify-center items-center gap-8">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group">
                            {/* Main Link */}
                            <a href={`#${item.id}`} className="relative flex items-center h-6 text-[13px] font-bold text-gray-800 tracking-widest uppercase overflow-hidden cursor-pointer">
                                <span className="inline-flex items-center transition-transform duration-300 group-hover:-translate-y-full">
                                    {item.name} 
                                    {item.dropdown && <ChevronDown className="w-4 h-4 ml-1 opacity-70" />}
                                </span>
                                <span className="absolute left-0 top-full inline-flex items-center transition-transform duration-300 group-hover:-translate-y-full text-[#29a997]">
                                    {item.name} 
                                    {item.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                                </span>
                            </a>

                            {/* Dropdown Menu Container */}
                            {item.dropdown && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-5 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col py-3 overflow-hidden">
                                        {item.dropdown.map((dropItem) => (
                                            <a key={dropItem} href={`#${dropItem.toLowerCase().replace(/[\s,]+/g, '-')}`}
                                                className="px-6 py-2.5 text-[11px] font-bold text-gray-600 hover:bg-[#29a997]/10 hover:text-[#29a997] transition-colors tracking-widest uppercase block"
                                            >
                                                {dropItem}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
                // Added overflow-x-hidden to prevent horizontal scrolling on mobile
                className="fixed inset-0 z-[90] bg-[#0f0f0f] overflow-y-auto overflow-x-hidden"
            >
                {/* Changed justify-center to justify-start md:justify-center to allow top-down scrolling on mobile */}
                {/* Used 100dvh instead of min-h-full to account for mobile browser UI bars */}
                <div className="min-h-[100dvh] flex flex-col justify-start md:justify-center px-6 md:px-[10%] pt-28 pb-16 md:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 md:gap-20">
                        {/* Secondary Navigation */}
                        <div className="flex flex-col gap-4">
                            <p className="text-[#29a997] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-1 md:mb-4">Navigation</p>
                            
                            {secondaryNavItems.map((item) => (
                                <div key={item.name} className="side-link flex flex-col">
                                    {item.dropdown ? (
                                        // Dropdown Button
                                        <button 
                                            onClick={() => handleSecondaryDropdownClick(item.name)}
                                            // Adjusted font sizes: text-2xl for mobile, sm:text-3xl for small tablets, md:text-6xl for desktop
                                            className="text-2xl sm:text-3xl md:text-6xl font-light text-white hover:text-[#f5ed00] transition-colors flex items-center justify-between group w-full text-left py-1"
                                        >
                                            <span className="flex items-center">
                                                {item.name}
                                                <ArrowRight className="ml-2 md:ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-5 h-5 md:w-10 md:h-10 text-[#29a997]" />
                                            </span>
                                            <ChevronDown className={`w-6 h-6 md:w-10 md:h-10 transition-transform duration-300 flex-shrink-0 ${openSecondaryDropdown === item.name ? 'rotate-180 text-[#29a997]' : 'text-white/30'}`} />
                                        </button>
                                    ) : (
                                        // Standard Link
                                        <a href={`#${item.name.toLowerCase().replace(/[\s,]+/g, '-')}`} className="text-2xl sm:text-3xl md:text-6xl font-light text-white hover:text-[#f5ed00] transition-colors flex items-center group w-full text-left py-1">
                                            {item.name}
                                            <ArrowRight className="ml-2 md:ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-5 h-5 md:w-10 md:h-10 text-[#29a997]" />
                                        </a>
                                    )}

                                    {/* Expandable Dropdown Content */}
                                    {item.dropdown && (
                                        <div 
                                            // Increased max-h-[1000px] to ensure it doesn't clip on small screens if text wraps
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${openSecondaryDropdown === item.name ? 'max-h-[1000px] opacity-100 mt-3 md:mt-6 mb-2' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="flex flex-col gap-3 md:gap-4 pl-3 md:pl-8 border-l-2 border-[#29a997]/30">
                                                {item.dropdown.map((subItem) => (
                                                    <a 
                                                        key={subItem} 
                                                        href={`#${subItem.toLowerCase().replace(/[\s,]+/g, '-')}`}
                                                        // Adjusted dropdown font sizes for mobile
                                                        className="text-base sm:text-lg md:text-2xl font-light text-gray-300 hover:text-[#29a997] transition-colors flex items-center"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#29a997]/50 mr-3 flex-shrink-0"></span>
                                                        {subItem}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Contact/Login Info */}
                        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-20 text-white mt-6 md:mt-0">
                            <div className="side-link mb-8 md:mb-10">
                                <h4 className="text-[#f5ed00] text-xs md:text-sm font-bold uppercase mb-2">Member Portal</h4>
                                <p className="text-gray-400 font-light text-sm md:text-base max-w-xs mb-6">Access your diagnostic history and exclusive membership benefits.</p>
                                <button className="w-full md:w-auto px-8 py-4 md:py-3 bg-[#29a997] hover:bg-[#f5ed00] hover:text-black transition-all font-bold text-xs md:text-sm uppercase tracking-widest rounded-full md:rounded-none">
                                    Login to Account
                                </button>
                            </div>
                            <div className="side-link">
                                <h4 className="text-gray-500 text-xs md:text-sm font-bold uppercase mb-2">Support</h4>
                                <p className="text-base sm:text-lg md:text-xl font-light hover:text-[#29a997] transition-colors">support@trustlab.com</p>
                                <p className="text-base sm:text-lg md:text-xl font-light hover:text-[#29a997] transition-colors">+91 123 456 7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;