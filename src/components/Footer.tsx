
import React from 'react';


export const Footer: React.FC = () => {
    return (
        <footer className="relative w-full h-[80vh] bg-black overflow-hidden flex flex-col justify-end">
            {/* Background Video */}
            {/* Background - Pure Black */}
            <div className="absolute inset-0 z-0 bg-black"></div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 md:px-8 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div className="flex flex-col space-y-2 mb-8 md:mb-0">
                        <h3 className="text-white font-galgo text-2xl tracking-widest uppercase mb-4">Socials</h3>
                        {['Instagram', 'LinkedIn', 'Twitter', 'Email'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors text-lg font-light tracking-wide uppercase"
                            >
                                {social}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-gray-500 text-sm tracking-[0.2em] font-light uppercase">
                            © 2025 NEBULA MODELLING AGENCY
                        </span>
                    </div>
                </div>

                {/* Huge Text */}
                <div className="w-full overflow-hidden border-t border-white/10 pt-4">
                    <h1 className="text-[15vw] leading-[0.8] font-bold font-galgo tracking-tighter text-white mix-blend-overlay hover:mix-blend-normal transition-all duration-700 cursor-default select-none text-center">
                        NEBULA
                    </h1>
                </div>
            </div>
        </footer>
    );
};
