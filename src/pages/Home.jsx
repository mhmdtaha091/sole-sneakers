import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ArrowRight } from 'lucide-react';
import ShoeModel from '../components/ShoeModel';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content container">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            WALK<br />
                            <span className="text-gradient">ON AIR</span>
                        </h1>
                        <p className="hero-subtitle">
                            Engineered for the streets. Designed for the bold.
                            Step into the future of urban footwear.
                        </p>
                        <div className="hero-actions">
                            <Link to="/catalog" className="glow-btn">Shop Now</Link>
                            <Link to="/catalog" className="secondary-btn">View Collection <ArrowRight size={18} /></Link>
                        </div>
                    </div>
                    <div className="hero-3d">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <Suspense fallback={null}>
                                <ShoeModel />
                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </section>

            {/* Marquee Section */}
            <section className="marquee-wrapper">
                <div className="marquee">
                    <div className="marquee-content">
                        LATEST DROPS &bull; LIMITED EDITION &bull; EXCLUSIVE ACCESS &bull; NEXT-GEN MATERIALS &bull; BOLD DESIGN &bull; LATEST DROPS &bull; LIMITED EDITION &bull;
                    </div>
                    <div className="marquee-content" aria-hidden="true">
                        LATEST DROPS &bull; LIMITED EDITION &bull; EXCLUSIVE ACCESS &bull; NEXT-GEN MATERIALS &bull; BOLD DESIGN &bull; LATEST DROPS &bull; LIMITED EDITION &bull;
                    </div>
                </div>
            </section>

            {/* Featured Section placeholder */}
            <section className="featured container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Trending Now</h2>
                <p className="text-muted">Discover the most coveted pairs this week.</p>
                <div style={{ marginTop: '3rem' }}>
                    <Link to="/catalog" className="glow-btn-green glow-btn text-black">Explore The Catalog</Link>
                </div>
            </section>
        </div>
    );
}
