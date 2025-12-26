
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
    const logoRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Logo Animation: Fade + slight upward motion
        gsap.fromTo(
            logoRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 2, ease: "power2.out", delay: 0.5 }
        );

        // Links Animation: Staggered fade-in from top
        if (linksRef.current) {
            gsap.fromTo(
                Array.from(linksRef.current.children),
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 1
                }
            );
        }
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center text-white mix-blend-difference">
            <div className="flex items-center">
                <h1 ref={logoRef} className="text-9xl font-bold tracking-wide cursor-pointer hover:opacity-80 transition-opacity">
                    NEBULA
                </h1>
            </div>
            <div ref={linksRef} className="hidden md:flex space-x-7 text-4xl tracking-widest font-bold">
                {['MODELS', 'ABOUT', 'CONTACT', 'NEWS'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:opacity-70 transition-opacity decoration-transparent"
                    >
                        {item}
                    </a>
                ))}
            </div>
            {/* Mobile Menu Icon Placeholder - kept simple for now per requirements */}
            <div className="md:hidden text-sm font-bold tracking-widest cursor-pointer">
                MENU
            </div>
        </nav>
    );
};
