import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : null);
    const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : null);

    if (!product) {
        return <div className="container" style={{ paddingTop: '120px' }}><h2>Product Not Found</h2><Link to="/catalog">Back to Catalog</Link></div>;
    }

    return (
        <div className="product-page container">
            <div className="product-layout">

                {/* Left: Image / Showcase */}
                <div className="product-showcase">
                    <div className="showcase-bg">
                        <div className="glow-orb"></div>
                    </div>
                    <img src={product.image} alt={product.name} className="main-image" />
                </div>

                {/* Right: Info */}
                <div className="product-details">
                    <div className="detail-brand">{product.brand}</div>
                    <h1 className="detail-name">{product.name}</h1>

                    <div className="detail-meta">
                        <div className="detail-price">${product.price}</div>
                        <div className="detail-rating">
                            <Star size={18} fill="var(--accent-blue)" color="var(--accent-blue)" />
                            <span>{product.rating} / 5.0</span>
                        </div>
                    </div>

                    <p className="detail-desc">{product.description}</p>

                    <div className="selector-section">
                        <h3 className="selector-title">Select Size (US)</h3>
                        <div className="size-grid">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="selector-section">
                        <h3 className="selector-title">Select Color</h3>
                        <div className="color-flex">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                    aria-label={`Color ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="glow-btn add-btn"
                            onClick={() => addToCart(product, selectedSize, selectedColor)}
                        >
                            <ShoppingBag size={20} />
                            Add to Cart
                        </button>
                        <button className="wishlist-btn">
                            <Heart size={24} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
