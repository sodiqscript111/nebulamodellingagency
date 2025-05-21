
import ModelGallery from '../../nebullamodellingagency/pages/modelgallery/modelgallery.jsx'
import './App.css'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../../nebullamodellingagency/pages/homepage/homepage.jsx";

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
