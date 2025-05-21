
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
            </Routes>
        </BrowserRouter>
    );
}

export default App
