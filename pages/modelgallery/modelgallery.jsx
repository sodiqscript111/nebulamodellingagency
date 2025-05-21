import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const models = [
    {
        name: 'Amara',
        image: 'https://i.ibb.co/gMf0TgDB/profile-1737110547-173d62d3441dd08972149a41a27cebcc.jpg',
        height: "5'9\"",
        age: 23,
        measurements: "34-24-35",
        portfolioLink: "https://example.com/amara"
    },
    {
        name: 'Zion',
        image: 'https://i.ibb.co/VWBc78Wf/profile-1739805533-154fb707c57bfacc5ada04993ce5e67f.jpg',
        height: "6'1\"",
        age: 26,
        measurements: "40-32-38",
        portfolioLink: "https://example.com/zion"
    },
    {
        name: 'Nina',
        image: 'https://i.ibb.co/JffGk39/profile-1743428693-e3f39c26f1c4bb956cae26e4c972f46c-jpg-v-1743428756.jpg',
        height: "5'7\"",
        age: 22,
        measurements: "33-23-34",
        portfolioLink: "https://example.com/nina"
    },
    {
        name: 'Tobi',
        image: 'https://i.ibb.co/GfkczhsT/profile-1744291727-2127ae2e03c15f8cb620eb5200c0e5b3.jpg',
        height: "6'0\"",
        age: 25,
        measurements: "39-31-37",
        portfolioLink: "https://example.com/tobi"
    },
    {
        name: 'Kamsi',
        image: 'https://i.ibb.co/wZ3nKtcV/profile-1665360014-a12ab112a5a09d13dc2d08553065ee82-jpg-v-1676316796.jpg',
        height: "5'10\"",
        age: 24,
        measurements: "36-25-35",
        portfolioLink: "https://example.com/kamsi"
    },
    {
        name: 'Lana',
        image: 'https://i.ibb.co/ycTDw0f0/profile-1722238848-a9d140db5b914c29f0b973b71e63a9fa.jpg',
        height: "5'8\"",
        age: 23,
        measurements: "34-24-34",
        portfolioLink: "https://example.com/lana"
    },
    {
        name: 'Fola',
        image: 'https://i.ibb.co/GvsMvtxY/profile-1726574689-f5d3c585debb349dcad337d02373b53f.jpg',
        height: "5'9\"",
        age: 22,
        measurements: "33-24-35",
        portfolioLink: "https://example.com/fola"
    }
];

export default function ModelGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRef = useRef();
    const lastScrollTime = useRef(0);
    const scrollCooldown = 300;

    const handleScroll = (e) => {
        const now = Date.now();
        if (now - lastScrollTime.current < scrollCooldown) return;
        lastScrollTime.current = now;

        if (e.deltaY > 0 && currentIndex < models.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            );
        });
        return () => ctx.revert();
    }, [currentIndex]);

    const infoTextStyle = {
        fontFamily: '"Lay Grotesk", sans-serif',
        fontSize: '18px',
        lineHeight: '13.2px',
        fontWeight: 400,
        color: '#000000'
    };

    const nameStyle = {
        ...infoTextStyle,
        fontWeight: 700,
        fontSize: '20px',
        marginBottom: '8px',
        cursor: 'default',
        userSelect: 'none'
    };

    return (
        <div
            onWheel={handleScroll}
            className="relative w-full h-screen bg-white text-black flex items-center justify-center overflow-hidden"
        >
            {/* Previous image hint on mobile */}
            {models[currentIndex - 1] && (
                <img
                    src={models[currentIndex - 1].image}
                    alt="previous"
                    className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-4/5 opacity-50 z-0 rounded-xl pointer-events-none select-none"
                    style={{ height: '120px', objectFit: 'cover' }}
                />
            )}

            {/* Next image hint on mobile */}
            {models[currentIndex + 1] && (
                <img
                    src={models[currentIndex + 1].image}
                    alt="next"
                    className="md:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 opacity-50 z-0 rounded-xl pointer-events-none select-none"
                    style={{ height: '120px', objectFit: 'cover' }}
                />
            )}

            {/* Main Image */}
            <img
                ref={imageRef}
                src={models[currentIndex].image}
                alt={models[currentIndex].name}
                className="w-5/6 max-w-md md:w-2/3 object-cover rounded-2xl shadow-xl z-10 select-none pointer-events-none"
                style={{ height: '550px' }}
            />

            {/* Mobile Overlay */}
            <div
                className="fixed bottom-0 left-0 w-full md:hidden flex flex-col items-center gap-1 px-4 py-4 backdrop-blur-lg bg-white/70 z-20"
                style={{
                    fontFamily: '"Lay Grotesk", sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000000',
                    userSelect: 'none'
                }}
            >
                <div>{models[currentIndex].name}</div>
                <a
                    href={models[currentIndex].portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline font-medium"
                    style={{ color: '#000000' }}
                >
                    View Portfolio
                </a>
            </div>

            {/* Desktop Sidebar Name List */}
            <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
                {models.map((model, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            ...infoTextStyle,
                            fontWeight: index === currentIndex ? 700 : 400,
                            opacity: index === currentIndex ? 1 : 0.4,
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        {model.name}
                    </div>
                ))}
            </div>

            {/* Desktop Side Images */}
            <div className="relative hidden md:flex items-center justify-center w-2/3" style={{ height: '600px' }}>
                {models[currentIndex - 1] && (
                    <img
                        src={models[currentIndex - 1].image}
                        alt="prev"
                        className="absolute w-1/4 opacity-40 rounded-lg select-none pointer-events-none"
                        style={{
                            top: '-40px',
                            left: '10%',
                            zIndex: 5,
                            objectFit: 'cover',
                            height: '400px'
                        }}
                    />
                )}

                {models[currentIndex + 1] && (
                    <img
                        src={models[currentIndex + 1].image}
                        alt="next"
                        className="absolute w-1/4 opacity-40 rounded-lg select-none pointer-events-none"
                        style={{
                            bottom: '-40px',
                            right: '10%',
                            zIndex: 5,
                            objectFit: 'cover',
                            height: '400px'
                        }}
                    />
                )}
            </div>

            {/* Desktop Info Panel */}
            <div
                className="hidden md:flex flex-col gap-4 absolute right-4 top-1/2 transform -translate-y-1/2 max-w-xs select-none"
                style={{ color: '#000000' }}
            >
                <h3 style={nameStyle}>{models[currentIndex].name}</h3>
                <p style={infoTextStyle}><strong>Height: </strong>{models[currentIndex].height}</p>
                <p style={infoTextStyle}><strong>Age: </strong>{models[currentIndex].age}</p>
                <p style={{ ...infoTextStyle, marginBottom: '16px' }}>
                    <strong>Measurements: </strong>{models[currentIndex].measurements}
                </p>
                <a
                    href={models[currentIndex].portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        ...infoTextStyle,
                        textDecoration: 'underline',
                        color: '#000000',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    View Portfolio
                </a>
            </div>
        </div>
    );
}
