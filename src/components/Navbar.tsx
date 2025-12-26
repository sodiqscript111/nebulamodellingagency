
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const logoRef = useRef<HTMLHeadingElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Logo Animation: Fade + slight upward motion
        gsap.fromTo(
            logoRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 2, ease: "power2.out", delay: 0.5 }
        );
    }, []);

    useEffect(() => {
        // Close menu on route change
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (isMenuOpen) {
            // Disable scroll
            document.body.style.overflow = 'hidden';
            gsap.fromTo(menuRef.current,
                { opacity: 0, y: '-100%' },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
            );
        } else {
            // Enable scroll
            document.body.style.overflow = 'unset';
            if (menuRef.current && menuRef.current.style.opacity !== '0') {
                gsap.to(menuRef.current, {
                    opacity: 0,
                    y: '-100%',
                    duration: 0.8,
                    ease: "power3.inOut"
                });
            }
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'WORKS', path: '/#works' }, // Hash links might need custom handling if on same page
        { name: 'DISCOVER', path: '/#' },   // Placeholder
        { name: 'MODELS', path: '/all-models' },
        { name: 'CONTACT', path: '/#' }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center text-white mix-blend-difference">
                <div className="flex items-center z-50">
                    <Link to="/">
                        <h1 ref={logoRef} className="text-9xl md:text-9xl font-bold tracking-wide cursor-pointer hover:opacity-80 transition-opacity font-galgo">
                            NEBULA
                        </h1>
                    </Link>
                </div>

                <div
                    onClick={toggleMenu}
                    className="z-50 cursor-pointer group flex flex-col items-center justify-center w-12 h-12 space-y-2"
                >
                    {/* Simple Hamburger / Close Icon logic */}
                    <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
                    <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
                </div>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div ref={menuRef} className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center opacity-0 pointer-events-none"
                style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}>
                <div className="flex flex-col items-center space-y-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-8xl md:text-8xl font-bold font-galgo tracking-widest text-white hover:text-gray-300 transition-all duration-500 hover:scale-105"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-10 left-0 w-full text-center text-gray-500 text-sm tracking-[0.2em] uppercase">
                    NEBULA MODELLING AGENCY
                </div>
            </div>
        </>
    );
};
