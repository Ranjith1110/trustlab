import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Search,
    FileText,
    Activity,
    Stethoscope,
    RotateCcw,
    ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DirectoryOfServices = () => {
    const sectionRef = useRef(null);

    // State for inputs
    const [formData, setFormData] = useState({
        keyword: '',
        testName: '',
        disease: '',
        speciality: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            keyword: '',
            testName: '',
            disease: '',
            speciality: ''
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", formData);
        // Add your search logic/API call here
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(".dir-header",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );

            // Form Elements Staggered Animation
            gsap.fromTo(".form-element",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out",
                    scrollTrigger: { trigger: ".form-container", start: "top 85%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert(); // Cleanup GSAP
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 px-6 bg-[#f8fafc] w-full overflow-hidden">

            {/* Background Accent Lines (Matches Hero feel) */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#27b199 1px, transparent 1px), linear-gradient(to right, #27b199 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="dir-header text-center mb-14">
                    <h4 className="text-[#27b199] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">
                        Search Library
                    </h4>
                    <h2 className="text-[#0f172a] text-4xl md:text-5xl font-light">
                        Directory of <span className="font-bold">Services</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
                        Find the exact tests and profiles you need. Search by keyword, specific disease, or medical speciality.
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="form-container bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] relative overflow-hidden">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#27b199] to-[#0f172a]"></div>

                    <form onSubmit={handleSearch} className="flex flex-col gap-8">

                        {/* 4-Column Grid for Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* 1. Keyword Input */}
                            <div className="form-element relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Keyword</label>
                                <div className="relative flex items-center">
                                    <Search className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors" />
                                    <input
                                        type="text"
                                        name="keyword"
                                        value={formData.keyword}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Blood, MRI"
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* 2. Test Name Input */}
                            <div className="form-element relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Test Name</label>
                                <div className="relative flex items-center">
                                    <FileText className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors" />
                                    <input
                                        type="text"
                                        name="testName"
                                        value={formData.testName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Lipid Profile"
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* 3. Disease Dropdown */}
                            <div className="form-element relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Disease</label>
                                <div className="relative flex items-center">
                                    <Activity className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors z-10" />
                                    <select
                                        name="disease"
                                        value={formData.disease}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Disease</option>
                                        <option value="diabetes">Diabetes</option>
                                        <option value="thyroid">Thyroid</option>
                                        <option value="hypertension">Hypertension</option>
                                        <option value="anemia">Anemia</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* 4. Speciality Dropdown */}
                            <div className="form-element relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Speciality</label>
                                <div className="relative flex items-center">
                                    <Stethoscope className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-[#27b199] transition-colors z-10" />
                                    <select
                                        name="speciality"
                                        value={formData.speciality}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#27b199] focus:ring-4 focus:ring-[#27b199]/10 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Speciality</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="endocrinology">Endocrinology</option>
                                        <option value="pathology">Pathology</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-element flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-4 pt-6 border-t border-gray-100">

                            {/* Reset Button */}
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] text-gray-500 hover:text-[#0f172a] hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group"
                            >
                                <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                                Reset Filters
                            </button>

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-10 py-4 bg-[#27b199] hover:bg-[#0f172a] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_20px_rgba(41,169,151,0.2)] hover:shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all flex items-center justify-center gap-2 group"
                            >
                                Search Directory
                                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default DirectoryOfServices;