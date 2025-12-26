
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
// Asset imports
import img1 from '../assets/pictures/035c6245-3109-4bd7-84cd-4e6be6c1ca60.jpg';
import img2 from '../assets/pictures/04f4d580-91de-49d7-a70a-9d536b0c5620.jpg';
import img3 from '../assets/pictures/2a0dd265-b457-43ad-aae3-ab3678d1aa6c.jpg';
import img4 from '../assets/pictures/67ddf32c-2967-49e4-ad64-e12c11ff9724.jpg';
import img5 from '../assets/pictures/6d9990b6-766f-47f8-b6bc-7c32e86bb815.jpg';
import img6 from '../assets/pictures/73993427-9154-4b78-8520-8e30a45cb805.jpg';
import img7 from '../assets/pictures/74490b53-3976-4c4d-ac8b-34c133fdcc67.jpg';
import img8 from '../assets/pictures/7bfd95bf-7835-4868-b22d-1925115c75b2.jpg';
import img9 from '../assets/pictures/8ed2cd0b-3977-4e88-881c-ef6738f36750.jpg';
import img10 from '../assets/pictures/ae12a61b-c1ba-4284-af78-89cf3bc56009.jpg';
import img11 from '../assets/pictures/b1c5ef51-d70a-4b44-83f4-d04f2301e375.jpg';
import img12 from '../assets/pictures/d1d11592-c71e-4ef5-afd7-24cfcc67dcf1.jpg';
import img13 from '../assets/pictures/e9f536a5-6221-4570-b14b-055464bf9d0f.jpg';
import img14 from '../assets/pictures/ed9c7611-f111-4b3b-aafa-c1328d8678ff.jpg';
import img15 from '../assets/pictures/fe412663-601f-47c4-8ac9-8f89557697ca.jpg';

const baseImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

// Generate more points for a denser sphere
const images = [...baseImages, ...baseImages, ...baseImages, ...baseImages].slice(0, 50);

interface Point3D {
    x: number;
    y: number;
    z: number;
    img: string;
}

export const SphericalGallery: React.FC = () => {
    const [points, setPoints] = useState<Point3D[]>([]);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Fibonacci Sphere Algorithm
        const result: Point3D[] = [];
        const numPoints = images.length;
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle
        const radius = 800;

        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            result.push({
                x: x * radius,
                y: y * radius * 0.8,
                z: z * radius,
                img: images[i]
            });
        }
        setPoints(result);
    }, []);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        lastMousePos.current = { x: clientX, y: clientY };
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging.current) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

        const isTouch = 'touches' in e;
        const sensitivity = isTouch ? 0.002 : 0.005; // Slower on mobile

        const deltaX = clientX - lastMousePos.current.x;
        const deltaY = clientY - lastMousePos.current.y;

        setRotation(prev => ({
            x: prev.x - deltaY * sensitivity,
            y: prev.y + deltaX * sensitivity
        }));

        lastMousePos.current = { x: clientX, y: clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    const visiblePoints = useMemo(() => {
        return points.map(p => {
            // Apply Rotation Y
            const x1 = p.x * Math.cos(rotation.y) - p.z * Math.sin(rotation.y);
            const z1 = p.x * Math.sin(rotation.y) + p.z * Math.cos(rotation.y);

            // Apply Rotation X
            const y2 = p.y * Math.cos(rotation.x) - z1 * Math.sin(rotation.x);
            const z2 = p.y * Math.sin(rotation.x) + z1 * Math.cos(rotation.x);

            return { ...p, x: x1, y: y2, z: z2 };
        }).sort((a, b) => b.z - a.z);
    }, [points, rotation]);

    return (
        <div
            className="w-full h-screen bg-black overflow-hidden relative perspective-container cursor-grab active:cursor-grabbing touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <Navbar />

            <div className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none">
                {visiblePoints.map((point, index) => {
                    const scale = (point.z + 1500) / 2000;
                    const opacity = Math.max(0.1, (point.z + 1000) / 1800);

                    // Don't render items too far back to keep performance up and visual clarity,
                    // But allow more rotation visibility since user can turn it around
                    if (point.z < -500) return null;

                    return (
                        <div
                            key={index}
                            className="absolute will-change-transform pointer-events-auto"
                            style={{
                                transform: `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`,
                                zIndex: Math.floor(point.z + 1000),
                                opacity: opacity
                            }}
                        >
                            <div className="w-[200px] h-[300px] relative overflow-hidden bg-gray-900 cursor-pointer hover:brightness-110 group shadow-2xl">
                                <img
                                    src={point.img}
                                    alt="Model"
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-galgo text-lg tracking-widest block text-center border border-white/30 py-1 hover:bg-white hover:text-black transition-colors">
                                        VIEW PORTFOLIO
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Hint overlay */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] pointer-events-none">
                DRAG TO EXPLORE
            </div>
        </div>
    );
};
