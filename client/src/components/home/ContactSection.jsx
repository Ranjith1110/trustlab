import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Phone, MessageSquare, Send, CheckCircle2, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const blobRef = useRef(null);
    const cornerBadgeRef = useRef(null);
    
    // Form State
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        setIsSubmitted(true);
        
        // Reset form after a few seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', phone: '', message: '' });
        }, 5000);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Scroll Reveal for Text
            gsap.fromTo(".contact-anim", 
                { y: 30, opacity: 0 },
                { 
                    y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 2. Scroll Reveal for Form Elements
            gsap.fromTo(".form-item", 
                { x: -20, opacity: 0 },
                { 
                    x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)", delay: 0.2,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 3. Dynamic Image Entrance
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.9, y: 50, rotation: -2 },
                { 
                    opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.4, ease: "expo.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 4. Continuous Ambient Animation: Background Blob Pulse
            gsap.to(blobRef.current, {
                scale: 1.1,
                opacity: 0.7,
                duration: 4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });

            // 5. Continuous Ambient Animation: Floating Corner Badge
            gsap.to(cornerBadgeRef.current, {
                y: -8,
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 0.5
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-6 bg-[#fcfdfe] overflow-hidden">
            
            {/* Ambient Background Blob */}
            <div 
                ref={blobRef}
                className="absolute top-0 right-0 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#27b199]/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4"
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: Content & Form */}
                    <div className="flex flex-col w-full max-w-xl mx-auto lg:mx-0">
                        
                        {/* Eyebrow Label */}
                        <div className="contact-anim flex items-center gap-3 mb-5 md:mb-6">
                            <div className="h-[2px] w-8 bg-[#27b199]" />
                            <span className="text-[#27b199] text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                                <Headphones className="w-4 h-4" /> 24/7 Support
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="contact-anim text-[#0f172a] text-3xl md:text-4xl font-light leading-snug mb-4">
                            We're always here to talk to you. <br className="hidden sm:block" />
                            Call us Now - <span className="font-bold text-[#27b199]">74400 75400</span>
                        </h2>

                        {/* Subheading */}
                        <p className="contact-anim text-slate-500 text-sm md:text-base mb-8 md:mb-10 leading-relaxed max-w-lg">
                            Our dedicated team is available around the clock to provide you with all the information and support you need.
                        </p>

                        {/* Form Container */}
                        <div className="contact-anim bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#27b199] to-[#0f172a]"></div>

                            {isSubmitted ? (
                                // Success State
                                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-[#27b199]/10 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-[#27b199]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0f172a] mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 text-sm">Our team will be contacting you shortly.</p>
                                </div>
                            ) : (
                                // Form
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
                                    
                                    {/* Name Input */}
                                    <div className="form-item relative group">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                        <div className="relative">
                                            {/* Icon perfectly centered vertically */}
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors pointer-events-none" />
                                            <input 
                                                type="text" 
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe" 
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="form-item relative group">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                                        <div className="relative">
                                            {/* Icon perfectly centered vertically */}
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors pointer-events-none" />
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91 00000 00000" 
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Input */}
                                    <div className="form-item relative group">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Your Message</label>
                                        <div className="relative">
                                            {/* Icon pinned to exactly top-4 to align with first line of text */}
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors pointer-events-none" />
                                            <textarea 
                                                name="message"
                                                required
                                                rows="3"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="How can we help you?" 
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all placeholder:text-gray-300 resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button 
                                        type="submit" 
                                        className="form-item mt-2 w-full py-4 bg-[#0f172a] hover:bg-[#27b199] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg hover:shadow-[0_10px_20px_rgba(41,169,151,0.2)] transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        Send Message
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Image */}
                    <div className="relative w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
                        <div 
                            ref={imageRef}
                            className="relative w-full max-w-[400px] lg:max-w-[480px] aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500"
                        >
                            {/* Main Image */}
                            <img 
                                src="/home/custom.webp" 
                                alt="TrustLab Customer Support" 
                                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                            />
                            
                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 to-transparent pointer-events-none"></div>

                            {/* Animated Decorative Corner */}
                            <div 
                                ref={cornerBadgeRef}
                                className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-24 h-24 md:w-32 md:h-32 bg-[#fcfdfe] rounded-tl-[1.5rem] md:rounded-tl-[2rem] z-10 flex items-center justify-center"
                            >
                                <div className="w-full h-full rounded-tl-[1.5rem] md:rounded-tl-[2rem] border-t-[6px] border-l-[6px] md:border-t-[8px] md:border-l-[8px] border-[#fcfdfe] overflow-hidden">
                                     <div className="w-full h-full bg-[#27b199] rounded-tl-[1rem] md:rounded-tl-[1.5rem] flex items-center justify-center text-white shadow-inner">
                                        <Headphones className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;