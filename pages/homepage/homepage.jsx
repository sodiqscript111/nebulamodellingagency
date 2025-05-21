import { Link } from 'react-router-dom';
import './homepage.css';
import homepageVideo from '../../src/assets/homepage.mp4';

export default function HomePage() {
    return (
        <div className="homepage">
            <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
                tabIndex={-1}
            >
                <source src={homepageVideo} type="video/mp4" />
                {/* Fallback text for unsupported browsers */}
                Your browser does not support the video tag.
            </video>

            <nav className="mininav" aria-label="Model categories navigation">
                <ul>
                    <li><Link to="/models" className="text-black hover:text-pink-400">All</Link></li>
                    <li><Link to="/males">Male</Link></li>
                    <li><Link to="/females">Female</Link></li>
                    <li>Curvy</li>
                    <li>Get in touch</li>
                </ul>
            </nav>
        </div>
    );
}
