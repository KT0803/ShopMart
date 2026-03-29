import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to place an order!");
      return navigate('/login');
    }
    navigate('/payment');
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Your Cart</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: '16px', border: 'var(--glass-border)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Your cart is entirely empty.</p>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: 'var(--glass-border)', padding: '20px' }}>
          {cart.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.name}</span>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Total: <span style={{ color: 'var(--accent-main)' }}>${total.toFixed(2)}</span></h2>
            <button className="btn-primary" onClick={handleCheckout} style={{ padding: '12px 24px', fontSize: '1.1rem' }}>Checkout Now</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
