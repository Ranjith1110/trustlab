import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Instagram, Facebook, Twitter, Linkedin, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        let ctx;

        // Delay GSAP initialization to allow page transitions to clean up
        const initTimer = setTimeout(() => {
            ctx = gsap.context(() => {

                // 1. Clean, staggered fade-up for columns
                gsap.fromTo(".footer-col",
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: footerRef.current, start: "top 90%" }
                    }
                );

                // 2. Simple fade-in for Accreditations
                gsap.fromTo(".footer-accredit",
                    { opacity: 0 },
                    {
                        opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3,
                        scrollTrigger: { trigger: footerRef.current, start: "top 90%" }
                    }
                );

                // 3. Bottom bar slide up
                gsap.fromTo(".footer-bottom",
                    { y: 20, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5,
                        scrollTrigger: { trigger: footerRef.current, start: "top 90%" }
                    }
                );

                ScrollTrigger.refresh();

            }, footerRef);
        }, 150);

        return () => {
            clearTimeout(initTimer);
            if (ctx) ctx.revert();
        };

    }, [location.pathname]);

    const quickLinks = [
        { name: 'Home', url: '#' },
        { name: 'Newsroom', url: '#' },
        { name: 'Services', url: '#' },
        { name: 'Collaborate', url: '#' },
        { name: 'Contact Us', url: '#' },
        { name: 'Our Locations', url: '#' },
        { name: 'Careers', url: '#' }
    ];

    return (
        <footer ref={footerRef} className="bg-[#0f172a] text-slate-300 pt-20 pb-8 px-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">

                {/* --- TOP TIER: 4 Columns --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Column 1: Quick Links */}
                    <div className="footer-col">
                        <h4 className="text-white text-lg font-medium tracking-wide mb-6">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="group flex items-center text-slate-400 hover:text-[#29a997] transition-colors text-sm font-light"
                                >
                                    <ChevronRight className="w-3.5 h-3.5 mr-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: National Reference Lab */}
                    <div className="footer-col">
                        <h4 className="text-white text-lg font-medium tracking-wide mb-6">National Reference Lab</h4>
                        <div className="flex flex-col gap-5 text-slate-400 text-sm font-light leading-relaxed">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#29a997] shrink-0 mt-1" />
                                <span>H.No. 31, Street No. 5,<br />Prakash Nagar, Begumpet,<br />Hyderabad, Telangana - 500016</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-[#29a997] shrink-0" />
                                <span>Mon - Sun : 24 Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Corporate Office */}
                    <div className="footer-col">
                        <h4 className="text-white text-lg font-medium tracking-wide mb-6">Corporate Office</h4>
                        <div className="flex flex-col gap-5 text-slate-400 text-sm font-light leading-relaxed">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#29a997] shrink-0 mt-1" />
                                <span>286/A, Sri Mahaan Heights, 4th floor,<br />Road Number 12, Banjara Hills,<br />Hyderabad, Telangana - 500034</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-[#29a997] shrink-0" />
                                <span>Mon - Sat : 9:30 - 18:00</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Scan for eDOS */}
                    <div className="footer-col flex flex-col items-start lg:items-end">
                        <div className="w-full lg:w-auto">
                            <h4 className="text-white text-lg font-medium tracking-wide mb-6">Scan for eDOS</h4>
                            <div className="bg-white p-2 rounded-xl inline-block shadow-sm hover:shadow-md transition-shadow">
                                <img
                                    src="/home/eDOSwithouttext.webp"
                                    alt="Scan for eDOS QR Code"
                                    className="w-28 h-28 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- MIDDLE TIER: Accreditations --- */}
                <div className="footer-accredit flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-b border-slate-800 mb-8">
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500">Accreditations</h3>

                    <div className="flex items-center gap-8">
                        {/* Ensure images have no background and rely on brightness to invert to white */}
                        <img
                            src="/home/accrediations.webp"
                            alt="Accreditations"
                            className="h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                </div>

                {/* --- BOTTOM TIER: Socials & Copyright --- */}
                <div className="footer-bottom flex flex-col-reverse md:flex-row items-center justify-between gap-6">

                    {/* Copyright */}
                    <div className="text-slate-500 text-xs font-light tracking-wide">
                        &copy; {new Date().getFullYear()} <span className="text-white font-medium">TrustLab Diagnostics.</span> All rights reserved.
                    </div>

                    {/* Social Connect (Clean, icon-only design) */}
                    <div className="flex items-center gap-5">
                        <a href="#" className="text-slate-400 hover:text-[#29a997] transition-colors duration-300" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-[#29a997] transition-colors duration-300" aria-label="Facebook">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-[#29a997] transition-colors duration-300" aria-label="Twitter">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-[#29a997] transition-colors duration-300" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;