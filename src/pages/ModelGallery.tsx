
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';

// Importing all images (using a glob import would be cleaner but maintaining explicit control for now as based on previous patterns)
// Ideally in a real app, this would be dynamic or from a CMS. 
// For this demo, I will re-use the imported images and duplicate them to simulate a larger gallery
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

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

// Duplicate to fill space if needed, or just use what we have. 
// Let's use the unique ones.

export const ModelGallery: React.FC = () => {
    const [gridCols, setGridCols] = useState(4);

    const increaseGrid = () => setGridCols(prev => Math.min(8, prev + 1));
    const decreaseGrid = () => setGridCols(prev => Math.max(1, prev - 1));

    return (
        <div className="w-screen min-h-screen bg-black text-white pt-32 px-8">
            <Navbar /> {/* Reusing Navbar though it might overlay content, adding pt-32 to body */}

            <div className="fixed top-24 right-8 z-50 flex space-x-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/20">
                <button
                    onClick={decreaseGrid}
                    className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-black transition-colors"
                >
                    -
                </button>
                <button
                    onClick={increaseGrid}
                    className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-black transition-colors"
                >
                    +
                </button>
            </div>

            <div
                className="grid gap-4 transition-all duration-500 ease-in-out"
                style={{
                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
                }}
            >
                {allImages.map((src, index) => (
                    <div key={index} className="w-full aspect-[3/4] overflow-hidden relative group">
                        <img
                            src={src}
                            alt={`Model ${index + 1}`}
                            className="w-full h-full object-cover transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0 transition-all"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
