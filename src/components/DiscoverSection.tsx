
import React from 'react';
import { Link } from 'react-router-dom';
import modelImg from '../assets/pictures/035c6245-3109-4bd7-84cd-4e6be6c1ca60.jpg';
import talentImg from '../assets/pictures/04f4d580-91de-49d7-a70a-9d536b0c5620.jpg';
import creativeImg from '../assets/pictures/2a0dd265-b457-43ad-aae3-ab3678d1aa6c.jpg';
import athleteImg from '../assets/pictures/67ddf32c-2967-49e4-ad64-e12c11ff9724.jpg';

const categories = [
    { title: "MODEL", image: modelImg },
    { title: "TALENT", image: talentImg },
    { title: "CREATIVE", image: creativeImg },
    { title: "ATHLETE", image: athleteImg }
];

export const DiscoverSection: React.FC = () => {
    return (
        <div className="w-full bg-black text-white py-32 px-4 md:px-8">
            <div className="max-w-[1920px] mx-auto">
                <div className="flex flex-col items-start mb-20 px-4">
                    <span className="text-sm md:text-base tracking-[0.2em] font-light text-gray-400 uppercase mb-2">
                        DISCOVER
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold font-galgo tracking-wide uppercase">
                        MODELS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
                    {categories.map((cat, index) => (
                        <Link to={cat.title === "MODEL" ? "/all-models" : "/models"} key={index} className="flex flex-col space-y-4 group cursor-pointer block">
                            <div className="aspect-[9/12] w-full overflow-hidden relative bg-gray-900">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 transition-all"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl md:text-3xl font-bold tracking-widest font-galgo">
                                    {cat.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
