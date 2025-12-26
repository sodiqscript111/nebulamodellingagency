
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const DiscoverNav: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const children = Array.from(containerRef.current.children);
            // Staggered fade in from left
            gsap.fromTo(
                children,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power2.out",
                    delay: 1.5
                }
            );
        }

    }, []);

    return (
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 text-white mix-blend-difference hidden md:flex flex-col items-start">
            <span ref={containerRef} className="flex flex-col items-start space-y-4">
                <span className="text-2xl tracking-[0.2em] font-light mb-4 block opacity-80">
                    DISCOVER THE
                </span>
                {['MODEL', 'TALENT', 'CREATIVE', 'ATHLETE'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-5xl font-bold tracking-wide hover:opacity-60 transition-all duration-500 block relative group"
                    >
                        {item}
                    </a>
                ))}
            </span>
        </div>
    );
};
