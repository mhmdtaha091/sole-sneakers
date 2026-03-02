import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './Catalog.css';

export default function Catalog() {
    const { addToCart } = useCart();
    const [selectedBrand, setSelectedBrand] = useState('All');

    const filteredProducts = selectedBrand === 'All'
        ? products
        : products.filter(p => p.brand === selectedBrand);

    return (
        <div className="catalog-page container">
            <div className="catalog-header">
                <h1>Sneaker Catalog</h1>
                <p className="text-muted">Explore our curated collection of premium kicks.</p>
            </div>

            <div className="catalog-layout">
                <aside className="filters">
                    <div className="filter-header">
                        <Filter size={20} />
                        <h3>Filters</h3>
                    </div>

                    <div className="filter-group">
                        <h4>Brand</h4>
                        <ul className="filter-list">
                            {['All', 'Nike', 'Adidas', 'Jordan', 'New Balance'].map(brand => (
                                <li key={brand}>
                                    <button
                                        className={selectedBrand === brand ? 'active' : ''}
                                        onClick={() => setSelectedBrand(brand)}
                                    >
                                        {brand}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4>Price Range</h4>
                        <input type="range" min="100" max="500" className="range-slider" />
                        <div className="range-labels">
                            <span>$100</span>
                            <span>$500+</span>
                        </div>
                    </div>
                </aside>

                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card card">
                            {product.isNew && <span className="badge">New Release</span>}
                            <Link to={`/product/${product.id}`} className="product-image">
                                <img src={product.image} alt={product.name} />
                            </Link>
                            <div className="product-info">
                                <div className="product-brand">{product.brand}</div>
                                <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
                                <div className="product-bottom">
                                    <span className="product-price">${product.price}</span>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                                        title="Quick Add"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
