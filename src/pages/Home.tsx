
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { DiscoverNav } from '../components/DiscoverNav';
import { WorkSection } from '../components/WorkSection';
import { DiscoverSection } from '../components/DiscoverSection';

export const Home: React.FC = () => {
    return (
        <>
            <div className="h-screen w-full relative">
                <Hero />
                <DiscoverNav />
            </div>
            <WorkSection />
            <DiscoverSection />
        </>
    );
};
