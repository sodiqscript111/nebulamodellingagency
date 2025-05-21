
import { Link } from 'react-router-dom';
import './homepage.css';

export default function HomePage() {
    return (
        <div className="homepage">
            <nav className="mininav" aria-label="Model categories navigation">
                <ul>
                    <li><Link to="/models" className="text-black hover:text-pink-400">All</Link></li>
                    <li>Male</li>
                    <li>Female</li>
                    <li>Curvy</li>
                    <li>Get in touch</li>
                </ul>
            </nav>
        </div>
    );
}
