
import React, { useState, useEffect, useRef } from 'react';
import vid1 from '../assets/pictures/nebula_for1.mp4';
import vid2 from '../assets/pictures/nebular_for2.mp4';
import vid3 from '../assets/pictures/nebular_for4.mp4';
import vid4 from '../assets/pictures/nebular_fo63.mp4';

const works = [
    { video: vid1, brand: "SAINT LAURENT" },
    { video: vid2, brand: "VERSACE" },
    { video: vid3, brand: "BALENCIAGA" },
    { video: vid4, brand: "PRADA" }
];

interface WorkCardProps {
    work: { video: string; brand: string };
    isMobile: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, isMobile }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const playVideo = async () => {
            try {
                await video.play();
            } catch (err) {
                console.log("Autoplay prevented or interrupted", err);
            }
        };

        if (isMobile) {
            playVideo();
        } else {
            video.pause();
        }
    }, [isMobile]);

    const handleMouseEnter = async () => {
        if (!isMobile && videoRef.current) {
            try {
                await videoRef.current.play();
            } catch (err) {
                console.log("Play failed on hover", err);
            }
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile && videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div
            className="flex flex-col space-y-4 group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="aspect-[9/16] w-full overflow-hidden relative bg-gray-100">
                <video
                    ref={videoRef}
                    src={work.video}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform duration-700 group-hover:scale-105 will-change-transform"
                />
            </div>
            <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold tracking-widest font-galgo">
                    NEBULA FOR {work.brand}
                </h3>
            </div>
        </div>
    );
};

export const WorkSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="w-full bg-white text-black py-32 px-4 md:px-8">
            <div className="max-w-[1920px] mx-auto">
                <div className="flex flex-col items-start mb-20 px-4">
                    <span className="text-sm md:text-base tracking-[0.2em] font-light text-gray-500 uppercase mb-2">
                        OUR
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold font-galgo tracking-wide uppercase">
                        WORKS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
                    {works.map((work, index) => (
                        <WorkCard key={index} work={work} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </div>
    );
};
