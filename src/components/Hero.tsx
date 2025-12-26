
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import desktopImage from '../assets/pictures/desktopheaderpicture.jpg';
import mobileVideoUrl from '../assets/pictures/mobilebackground_video.webp'; // Img tag for webp

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Listener
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    useEffect(() => {
        // Soft fade-in with slight scale-down
        gsap.fromTo(
            bgRef.current,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1.0, duration: 2.5, ease: "power2.out" }
        );
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">
            <div ref={bgRef} className="absolute inset-0 w-full h-full">
                {isMobile ? (
                    <img
                        src={mobileVideoUrl}
                        alt="Mobile Background"
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <img
                        src={desktopImage}
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-90"
                    />
                )}
                {/* Overlay gradient for better text readability if needed, though 'restrained elegance' implies minimal overlay */}
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
            </div>

            {/* Mobile Vertical Navigation Overlay (Hero Overlay) */}
            <div className="md:hidden absolute left-8 top-1/2 transform -translate-y-1/2 z-40 text-white mix-blend-difference flex flex-col items-start">
                <span className="text-2xl tracking-[0.2em] font-light mb-4 block opacity-80">
                    DISCOVER THE
                </span>
                {['MODEL', 'TALENT', 'CREATIVE', 'ATHLETE'].map((item, index) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-4xl font-bold tracking-wide mb-2 block animate-fade-in-up"
                        style={{ animationDelay: `${1.5 + index * 0.1}s` }}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </div>
    );
};
