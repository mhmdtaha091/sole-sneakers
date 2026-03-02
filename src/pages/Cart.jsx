import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import './Cart.css';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page container empty-cart">
                <h2>Your Cart is Empty</h2>
                <p className="text-muted">Looks like you haven't added any premium kicks yet.</p>
                <Link to="/catalog" className="glow-btn" style={{ marginTop: '2rem', display: 'inline-block' }}>
                    Shop the Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="cart-title">Your Cart ({cartCount})</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.cartId} className="cart-item card">
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="item-details">
                                <div className="item-header">
                                    <div>
                                        <div className="item-brand">{item.brand}</div>
                                        <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                                    </div>
                                    <div className="item-price">${item.price}</div>
                                </div>

                                <div className="item-meta">
                                    <span>Size: {item.size}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Color:
                                        <span
                                            style={{
                                                width: '16px', height: '16px', borderRadius: '50%',
                                                background: item.color, border: '1px solid #333'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}><Minus size={16} /></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}><Plus size={16} /></button>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.cartId)}
                                        title="Remove Item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-card card">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span className="text-muted">Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span className="text-muted">Shipping</span>
                            <span style={{ color: 'var(--accent-green)', fontWeight: '700' }}>FREE</span>
                        </div>

                        <div className="summary-row">
                            <span className="text-muted">Estimated Tax</span>
                            <span>${(cartTotal * 0.08).toFixed(2)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>${(cartTotal * 1.08).toFixed(2)}</span>
                        </div>

                        <button className="glow-btn checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
