import FeModelGallery from '../pages/females/female.jsx'
import MeModelGallery from '../pages/male/male.jsx'
import ModelGallery from '../pages/modelgallery/modelgallery.jsx'
import './App.css'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/homepage/homepage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/models" element={<ModelGallery />} />
                <Route path="/females" element={<FeModelGallery />} />
                <Route path="/males" element={<MeModelGallery />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
