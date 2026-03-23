import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Instagram, Facebook, Twitter, Linkedin, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const bgGlowRef = useRef(null);
    const accreditRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Staggered reveal for the main text columns
            gsap.fromTo(".footer-item",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: footerRef.current, start: "top 85%" }
                }
            );

            // 2. Animated width for the title underlines (Luxury detail)
            gsap.fromTo(".footer-line", 
                { scaleX: 0 },
                { 
                    scaleX: 1, duration: 1.5, ease: "expo.inOut", transformOrigin: "left center", stagger: 0.1,
                    scrollTrigger: { trigger: footerRef.current, start: "top 85%" }
                }
            );

            // 3. Reveal for Accreditations & Bottom sections
            gsap.fromTo([".footer-accredit", ".footer-bottom"],
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out", delay: 0.4,
                    scrollTrigger: { trigger: footerRef.current, start: "top 85%" }
                }
            );

            // 4. Ambient Background Glow Pulse
            gsap.to(bgGlowRef.current, {
                scale: 1.2,
                opacity: 0.15,
                duration: 5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });

            // 5. Gentle float for the Accreditations box
            gsap.to(accreditRef.current, {
                y: -5,
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 1
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

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
        <footer ref={footerRef} className="bg-[#0f172a] text-white pt-24 pb-10 px-6 relative overflow-hidden border-t border-white/5">

            {/* --- Ambient Luxury Background --- */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#27b199 1px, transparent 1px), linear-gradient(to right, #27b199 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>
            <div 
                ref={bgGlowRef}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#27b199] rounded-full blur-[150px] pointer-events-none z-0 opacity-10 translate-x-1/3 -translate-y-1/3"
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* --- TOP TIER: 4 Columns --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-20">

                    {/* Column 1: Quick Links */}
                    <div className="flex flex-col">
                        <h4 className="footer-item text-xl font-light tracking-wide mb-3">Quick Links</h4>
                        <div className="footer-line h-[2px] w-12 bg-gradient-to-r from-[#27b199] to-transparent mb-8"></div>

                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="footer-item group relative inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-light w-fit"
                                >
                                    <ChevronRight className="w-3.5 h-3.5 mr-2 text-[#27b199] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    <span>{link.name}</span>
                                    {/* Luxury Underline Effect */}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#27b199] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: National Reference Lab */}
                    <div className="flex flex-col">
                        <h4 className="footer-item text-xl font-light tracking-wide mb-3">National Reference Lab</h4>
                        <div className="footer-line h-[2px] w-12 bg-gradient-to-r from-[#27b199] to-transparent mb-8"></div>

                        <div className="flex flex-col gap-6 text-slate-400 text-sm font-light leading-relaxed">
                            <div className="footer-item flex items-start gap-4 group">
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#27b199]/20 group-hover:border-[#27b199]/50 transition-colors mt-0.5 shrink-0">
                                    <MapPin className="w-4 h-4 text-[#27b199]" />
                                </div>
                                <span>H.No. 31, Street No. 5,<br />Prakash Nagar, Begumpet,<br />Hyderabad, Telangana - 500016</span>
                            </div>
                            <div className="footer-item flex items-center gap-4 group">
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#27b199]/20 group-hover:border-[#27b199]/50 transition-colors shrink-0">
                                    <Clock className="w-4 h-4 text-[#27b199]" />
                                </div>
                                <span>Monday - Sunday : 24 Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Corporate Office */}
                    <div className="flex flex-col">
                        <h4 className="footer-item text-xl font-light tracking-wide mb-3">Corporate Office</h4>
                        <div className="footer-line h-[2px] w-12 bg-gradient-to-r from-[#27b199] to-transparent mb-8"></div>

                        <div className="flex flex-col gap-6 text-slate-400 text-sm font-light leading-relaxed">
                            <div className="footer-item flex items-start gap-4 group">
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#27b199]/20 group-hover:border-[#27b199]/50 transition-colors mt-0.5 shrink-0">
                                    <MapPin className="w-4 h-4 text-[#27b199]" />
                                </div>
                                <span>286/A, Sri Mahaan Heights, 4th floor,<br />Road Number 12, Banjara Hills,<br />Hyderabad, Telangana - 500034</span>
                            </div>
                            <div className="footer-item flex items-center gap-4 group pr-4">
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#27b199]/20 group-hover:border-[#27b199]/50 transition-colors shrink-0">
                                    <Clock className="w-4 h-4 text-[#27b199]" />
                                </div>
                                <div className="flex justify-between w-full">
                                    <span>Mon - Sat</span>
                                    <span className="text-[#27b199]">9:30 - 18:00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Scan for eDOS */}
                    <div className="flex flex-col items-start lg:items-center">
                        <div className="w-full text-left lg:text-center">
                            <h4 className="footer-item text-xl font-light tracking-wide mb-3">Scan for eDOS</h4>
                            <div className="footer-line h-[2px] w-12 bg-gradient-to-r from-[#27b199] to-transparent mb-8 lg:mx-auto"></div>
                        </div>

                        {/* Luxury QR Container with Scanner Effect */}
                        <div className="footer-item relative p-1.5 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 shadow-[0_15px_30px_rgba(0,0,0,0.3)] group overflow-hidden border border-white/10 backdrop-blur-sm hover:border-[#27b199]/50 transition-colors duration-500">
                            
                            <div className="bg-white p-2.5 rounded-xl relative overflow-hidden">
                                <img
                                    src="/home/eDOSwithouttext.webp"
                                    alt="Scan for eDOS QR Code"
                                    className="w-32 h-32 object-contain relative z-10"
                                />
                                {/* Laser Scanner Line Animation */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#27b199] shadow-[0_0_15px_#27b199] opacity-60 z-20 animate-[scan_3s_ease-in-out_infinite]"></div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- MIDDLE TIER: Accreditations --- */}
                <div className="footer-accredit flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-t border-b border-white/10 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-10 bg-[#27b199] hidden md:block"></div>
                        <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-300">Accreditations</h3>
                    </div>
                    
                    <div 
                        ref={accreditRef}
                        className="flex items-center justify-center p-4 px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                    >
                        <img
                            src="/home/accrediations.webp"
                            alt="Accreditations"
                            className="h-16 object-contain opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500 drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* --- BOTTOM TIER: Socials & Copyright --- */}
                <div className="footer-bottom flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                    
                    {/* Copyright */}
                    <div className="text-slate-500 text-xs font-light tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} <span className="text-[#27b199] font-bold">TrustLab Diagnostics.</span> All rights reserved.
                    </div>

                    {/* Social Connect */}
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mr-2">Connect</span>
                        
                        {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                            <a 
                                key={i} 
                                href="#" 
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#27b199] hover:border-[#27b199] hover:shadow-[0_0_15px_rgba(41,169,151,0.5)] transition-all duration-300 group"
                            >
                                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            {/* Custom Animation for QR Scanner */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan {
                    0% { transform: translateY(-10px); opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { transform: translateY(140px); opacity: 0; }
                }
            `}} />
        </footer>
    );
};

export default Footer;