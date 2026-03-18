import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
    const sectionRef = useRef(null);
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Grouping the locations into columns exactly as you requested
    const locations = [
        [
            "Blood Test in Hyderabad", "Blood Test in Secunderabad", "Blood Test in Tarnaka", 
            "Blood Test in Banjara Hills", "Blood Test in Jubliee Hills", "Blood Test in Hi-Tech City", 
            "Blood Test in Begumpet", "Blood Test in Ameerpet", "Blood Test in Punjagutta", 
            "Blood Test in Sanathnagar", "Blood Test in Erragadda", "Blood Test in Borabanda", 
            "Blood Test in Moti Nagar", "Blood Test in Prakash Nagar"
        ],
        [
            "Blood Test in Gachibowli", "Blood Test in Nanakramguda", "Blood Test in Madhapur", 
            "Blood Test in Kothaguda", "Blood Test in Film Nagar", "Blood Test in Yousufguda", 
            "Blood Test in Srinagar colony", "Blood Test in Kukatpally", "Blood Test in Allwyn Colony", 
            "Blood Test in Bachupally", "Blood Test in KPHB Colony", "Blood Test in Nizampet", 
            "Blood Test in Pragathi Nagar", "Blood Test in Moosapet"
        ],
        [
            "Blood Test in Chilkalguda", "Blood Test in Kavadiguda", "Blood Test in Padmarao Nagar", 
            "Blood Test in Pan bazar", "Blood Test in Parsigutta", "Blood Test in Patny", 
            "Blood Test in Rani Gunj", "Blood Test in RP Road", "Blood Test in Sindhi Colony", 
            "Blood Test in Sitaphalmandi", "Blood Test in Warsiguda", "Blood Test in Addagutta", 
            "Blood Test in Tukaramgate", "Blood Test in Malkajgiri"
        ],
        [
            "Blood Test in Bowenpally", "Blood Test in Karkhana", "Blood Test in Marredpally", 
            "Blood Test in Sikh Village", "Blood Test in Trimulgherry", "Blood Test in Vikrampuri", 
            "Blood Test in Nagaram", "Blood Test in Dammaiguda", "Blood Test in Rampally", 
            "Blood Test in Alwal"
        ]
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 4000);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Newsletter Card Reveal
            gsap.fromTo(".newsletter-card", 
                { y: 50, opacity: 0 },
                { 
                    y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );

            // 2. Location Columns Staggered Reveal
            gsap.fromTo(".location-col", 
                { y: 30, opacity: 0 },
                { 
                    y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: ".locations-grid", start: "top 85%" }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-24 pb-16 px-6 bg-[#fcfdfe] overflow-hidden">
            
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#29a997 1px, transparent 1px), linear-gradient(to right, #29a997 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                
                {/* --- TOP: NEWSLETTER CARD --- */}
                <div className="newsletter-card relative bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_30px_60px_rgba(15,23,42,0.15)] overflow-hidden mb-24">
                    
                    {/* Decorative Background Glow in the card */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#29a997] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#29a997] to-[#f5ed00]"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                        
                        {/* Left Side: Content */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                                <Mail className="w-5 h-5 text-[#29a997]" />
                                <span className="text-[#29a997] text-[10px] font-bold tracking-[0.3em] uppercase">
                                    Stay Connected
                                </span>
                            </div>
                            
                            <h2 className="text-white text-3xl md:text-4xl font-light leading-snug mb-4">
                                Sign up for our <span className="font-bold">newsletter</span>
                            </h2>
                            
                            <p className="text-slate-400 text-sm md:text-base font-light">
                                Stay updated with our latest news and offers. Subscribe to our newsletter today!
                            </p>
                        </div>

                        {/* Right Side: Form */}
                        <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
                            {isSubscribed ? (
                                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-4 animate-in fade-in zoom-in duration-500">
                                    <CheckCircle2 className="w-8 h-8 text-[#29a997]" />
                                    <div className="text-left">
                                        <h4 className="text-white font-bold text-lg">Subscribed!</h4>
                                        <p className="text-slate-400 text-sm">Thank you for joining our newsletter.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-grow group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#29a997] transition-colors pointer-events-none" />
                                        <input 
                                            type="email" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your Email Address" 
                                            className="w-full pl-14 pr-5 py-4 lg:py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:bg-white/10 focus:outline-none focus:border-[#29a997] transition-all placeholder:text-gray-500 text-sm"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="py-4 lg:py-5 px-8 bg-[#29a997] hover:bg-white text-white hover:text-[#0f172a] rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-colors flex items-center justify-center gap-2 shrink-0 group"
                                    >
                                        Subscribe
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM: 4-COLUMN LOCATIONS GRID --- */}
                <div className="locations-grid">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-[2px] w-8 bg-[#29a997]" />
                        <h3 className="text-[#0f172a] text-lg font-bold uppercase tracking-widest">
                            Our Service Areas
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {locations.map((column, colIndex) => (
                            <div key={colIndex} className="location-col flex flex-col gap-3">
                                {column.map((location, locIndex) => (
                                    <a 
                                        key={locIndex} 
                                        href={`#${location.replace(/\s+/g, '-').toLowerCase()}`}
                                        className="group flex items-start gap-2.5 text-slate-500 hover:text-[#29a997] transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 mt-0.5 opacity-40 group-hover:opacity-100 shrink-0 transition-opacity" />
                                        <span className="text-sm font-medium leading-relaxed">
                                            {location}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Newsletter;