
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModelGallery } from './pages/ModelGallery';

import { SphericalGallery } from './pages/SphericalGallery';

import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white selection:bg-white selection:text-black">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/models" element={<ModelGallery />} />
                    <Route path="/all-models" element={<SphericalGallery />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
