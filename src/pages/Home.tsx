
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { DiscoverNav } from '../components/DiscoverNav';
import { WorkSection } from '../components/WorkSection';
import { DiscoverSection } from '../components/DiscoverSection';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="h-screen w-full relative">
                <Hero />
                <DiscoverNav />
            </div>
            <WorkSection />
            <DiscoverSection />
            <Footer />
        </>
    );
};
