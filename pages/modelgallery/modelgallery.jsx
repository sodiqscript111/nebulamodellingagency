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
    const prevIndexRef = useRef(0);

    const containerRef = useRef(null);
    const desktopMainImageRef = useRef(null);
    const mobileMainImageRef = useRef(null);
    const desktopInfoRef = useRef(null);
    const desktopPrevImageRef = useRef(null);
    const desktopNextImageRef = useRef(null);
    const mobilePrevHintRef = useRef(null);
    const mobileNextHintRef = useRef(null);
    const nameListRefs = useRef([]);
    nameListRefs.current = [];

    const lastScrollTime = useRef(0);
    const scrollCooldown = 400;

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
        const direction = currentIndex > prevIndexRef.current ? 1 : (currentIndex < prevIndexRef.current ? -1 : 0);

        const currentMainImage = window.innerWidth >= 768 ? desktopMainImageRef.current : mobileMainImageRef.current;

        const ctx = gsap.context(() => {
            if (currentMainImage) {
                const yStart = direction === 1 ? 70 : (direction === -1 ? -70 : (prevIndexRef.current === 0 && currentIndex === 0 ? 50 : 0));
                const rotationStart = direction === 1 ? 8 : (direction === -1 ? -8 : 0);
                const scaleStart = 0.9;

                gsap.fromTo(
                    currentMainImage,
                    { y: yStart, opacity: 0, scale: scaleStart, rotation: rotationStart },
                    { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'power3.out', delay: 0.05 }
                );
            }

            if (desktopInfoRef.current && window.innerWidth >= 768) {
                gsap.fromTo(
                    gsap.utils.toArray(desktopInfoRef.current.children),
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.25 }
                );
            }

            const sideImageCommonProps = { opacity: 0.3, scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 };
            if (desktopPrevImageRef.current && window.innerWidth >= 768) {
                gsap.fromTo(desktopPrevImageRef.current,
                    { opacity: 0, x: -25, scale: 0.9 },
                    { ...sideImageCommonProps, x: 0 }
                );
            }
            if (desktopNextImageRef.current && window.innerWidth >= 768) {
                gsap.fromTo(desktopNextImageRef.current,
                    { opacity: 0, x: 25, scale: 0.9 },
                    { ...sideImageCommonProps, x: 0 }
                );
            }

            if (mobilePrevHintRef.current && window.innerWidth < 768) {
                gsap.fromTo(mobilePrevHintRef.current,
                    { opacity: 0, y: -15 },
                    { opacity: 0.5, y: 0, duration: 0.5, ease: 'sine.out', delay: 0.1 }
                );
            }
            if (mobileNextHintRef.current && window.innerWidth < 768) {
                gsap.fromTo(mobileNextHintRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 0.5, y: 0, duration: 0.5, ease: 'sine.out', delay: 0.1 }
                );
            }

        }, containerRef.current || undefined);

        prevIndexRef.current = currentIndex;

        return () => ctx.revert();
    }, [currentIndex]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let startY = 0;

        const onTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const onTouchEnd = (e) => {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;

            if (Math.abs(diff) > 40) {
                const now = Date.now();
                if (now - lastScrollTime.current < scrollCooldown) return;
                lastScrollTime.current = now;

                if (diff > 0 && currentIndex < models.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                } else if (diff < 0 && currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                }
            }
        };

        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchend', onTouchEnd);
        };
    }, [currentIndex, models.length, scrollCooldown]);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        const ctx = gsap.context(() => {
            nameListRefs.current.forEach((nameEl, idx) => {
                if (nameEl) {
                    gsap.to(nameEl, {
                        fontWeight: idx === currentIndex ? 700 : 400,
                        opacity: idx === currentIndex ? 1 : 0.5,
                        scale: idx === currentIndex ? 1.1 : 1,
                        x: idx === currentIndex ? 8 : 0,
                        color: idx === currentIndex ? '#000000' : '#333333',
                        duration: 0.35,
                        ease: 'sine.out'
                    });
                }
            });
        });
        return () => ctx.revert();
    }, [currentIndex, models.length]);

    useEffect(() => {
        const parallaxContainer = containerRef.current;
        if (!parallaxContainer) return;

        let currentMainImageForParallax = null;

        const updateTarget = () => {
            currentMainImageForParallax = window.innerWidth >= 768
                ? desktopMainImageRef.current
                : mobileMainImageRef.current;
        }
        updateTarget();

        const handleMouseMove = (e) => {
            if (!currentMainImageForParallax || window.getComputedStyle(currentMainImageForParallax).display === 'none') {
                updateTarget();
                if (!currentMainImageForParallax) return;
            }

            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = parallaxContainer;

            const xPercent = (clientX / offsetWidth - 0.5);
            const yPercent = (clientY / offsetHeight - 0.5);

            gsap.to(currentMainImageForParallax, {
                rotationY: xPercent * 6,
                rotationX: yPercent * -6,
                transformPerspective: 1000,
                duration: 0.8,
                ease: 'power1.out',
                overwrite: 'auto'
            });
        };

        const handleMouseLeave = () => {
            if (currentMainImageForParallax) {
                gsap.to(currentMainImageForParallax, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: 'power1.out'
                });
            }
        };

        parallaxContainer.addEventListener('mousemove', handleMouseMove);
        parallaxContainer.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', updateTarget);


        return () => {
            parallaxContainer.removeEventListener('mousemove', handleMouseMove);
            parallaxContainer.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', updateTarget);
            if (currentMainImageForParallax) {
                gsap.set(currentMainImageForParallax, { rotationY: 0, rotationX: 0, x:0, y:0 });
            }
        };
    }, []);

    const infoTextStyle = {
        fontFamily: '"Lay Grotesk", sans-serif',
        fontSize: '18px',
        lineHeight: '1.4',
        fontWeight: 400,
        color: '#333333'
    };

    const nameStyle = {
        ...infoTextStyle,
        fontWeight: 700,
        fontSize: '20px',
        marginBottom: '10px',
        cursor: 'default',
        userSelect: 'none',
        color: '#000000'
    };

    const addToNameRefs = (el) => {
        if (el && !nameListRefs.current.includes(el)) {
            nameListRefs.current.push(el);
        }
    };


    return (
        <div
            ref={containerRef}
            onWheel={handleScroll}
            className="relative w-full h-screen bg-white text-black flex items-center justify-center overflow-hidden select-none"
        >
            {models[currentIndex - 1] && (
                <img
                    ref={mobilePrevHintRef}
                    src={models[currentIndex - 1].image}
                    alt="previous"
                    className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-4/5 opacity-50 z-0 rounded-xl pointer-events-none"
                    style={{ height: '100px', objectFit: 'cover' }}
                />
            )}
            {models[currentIndex + 1] && (
                <img
                    ref={mobileNextHintRef}
                    src={models[currentIndex + 1].image}
                    alt="next"
                    className="md:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 opacity-50 z-0 rounded-xl pointer-events-none"
                    style={{ height: '100px', objectFit: 'cover' }}
                />
            )}

            <div className="hidden md:flex items-center justify-center w-full max-w-6xl gap-10 px-4">
                {models[currentIndex - 1] && (
                    <img
                        ref={desktopPrevImageRef}
                        src={models[currentIndex - 1].image}
                        alt="prev"
                        className="w-1/6 opacity-30 rounded-lg pointer-events-none"
                        style={{ height: '380px', objectFit: 'cover' }}
                    />
                )}

                <img
                    ref={desktopMainImageRef}
                    src={models[currentIndex].image}
                    alt={models[currentIndex].name}
                    className="w-1/2 max-w-md object-cover rounded-2xl shadow-2xl z-10 pointer-events-none"
                    style={{ height: '550px' }}
                />

                {models[currentIndex + 1] && (
                    <img
                        ref={desktopNextImageRef}
                        src={models[currentIndex + 1].image}
                        alt="next"
                        className="w-1/6 opacity-30 rounded-lg pointer-events-none"
                        style={{ height: '380px', objectFit: 'cover' }}
                    />
                )}
            </div>

            <img
                ref={mobileMainImageRef}
                src={models[currentIndex].image}
                alt={models[currentIndex].name}
                className="md:hidden w-4/5 max-w-[350px] object-cover rounded-2xl shadow-xl z-10 pointer-events-none fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+20px)]"
                style={{ height: 'auto', aspectRatio: '3/4' }}
            />


            <div
                className="fixed bottom-0 left-0 w-full md:hidden flex flex-col items-center gap-1.5 px-6 py-5 z-20 rounded-t-lg"
                style={{
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <div style={{ ...nameStyle, fontSize: '18px', marginBottom: '4px', color: '#000' }}>
                    {models[currentIndex].name}
                </div>
                <a
                    href={models[currentIndex].portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline font-medium"
                    style={{ color: '#000' }}
                >
                    View Portfolio
                </a>
            </div>


            <div className="hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2 space-y-3">
                {models.map((model, index) => (
                    <div
                        key={model.name}
                        ref={addToNameRefs}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            ...infoTextStyle,
                            fontWeight: 400,
                            opacity: 0.5,
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                            padding: '4px 0',
                        }}
                    >
                        {model.name}
                    </div>
                ))}
            </div>

            <div ref={desktopInfoRef} className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 transform -translate-y-1/2 max-w-xs">
                <h3 style={nameStyle}>{models[currentIndex].name}</h3>
                <p style={infoTextStyle}><strong>Height: </strong>{models[currentIndex].height}</p>
                <p style={infoTextStyle}><strong>Age: </strong>{models[currentIndex].age}</p>
                <p style={{ ...infoTextStyle, marginBottom: '12px' }}>
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
                        fontWeight: 500
                    }}
                >
                    View Portfolio
                </a>
            </div>
        </div>
    );
}
