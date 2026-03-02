import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div className="nav-brand">
                    <Link to="/">SOLE<span>.</span></Link>
                </div>

                <ul className="nav-links">
                    <li><Link to="/catalog">Men</Link></li>
                    <li><Link to="/catalog">Women</Link></li>
                    <li><Link to="/catalog" className="text-gradient">New Arrivals</Link></li>
                    <li><Link to="/catalog" style={{ color: 'var(--accent-green)' }}>Sale</Link></li>
                </ul>

                <div className="nav-actions">
                    <button className="icon-btn"><Search size={20} /></button>
                    <button className="icon-btn"><User size={20} /></button>
                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
