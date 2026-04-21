import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [method, setMethod] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, clearCart, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ 
          orderItems: cart, 
          shippingAddress: { address: '123 Smart St', city: 'Techville', postalCode: '00000', country: 'US' }, 
          paymentMethod: method, 
          totalPrice: total 
        })
      });
      if (!res.ok) throw new Error('Payment or Order failed');
      
      clearCart();
      navigate('/success');
    } catch (err) {
      alert(err.message);
      setIsProcessing(false);
    }
  };

  if (!user || cart.length === 0) {
    return <div className="page-wrapper" style={{ textAlign: 'center' }}><h2>Nothing to checkout!</h2></div>;
  }

  return (
    <div className="page-wrapper" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>Select Payment Method</h1>
      <div style={{ background: 'var(--bg-card)', padding: '30px', border: 'var(--glass-border)', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '25px', color: 'var(--text-main)' }}>Total Due: <span style={{ color: 'var(--accent-main)'}}>${total.toFixed(2)}</span></h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '35px' }}>
          {['Credit Card', 'PayPal', 'Apple Pay'].map((m) => (
            <label key={m} style={{ display: 'flex', alignItems: 'center', padding: '15px', border: method === m ? '2px solid var(--accent-main)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'pointer', background: method === m ? 'rgba(124, 58, 237, 0.1)' : 'rgba(0,0,0,0.4)', transition: 'all 0.3s ease' }}>
              <input type="radio" name="payment" value={m} checked={method === m} onChange={() => setMethod(m)} style={{ marginRight: '15px', transform: 'scale(1.5)', accentColor: 'var(--accent-main)' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>{m}</span>
            </label>
          ))}
        </div>

        <button className="btn-primary" onClick={handlePayment} disabled={isProcessing} style={{ padding: '15px 30px', fontSize: '1.2rem', width: '100%', opacity: isProcessing ? 0.7 : 1, transform: isProcessing ? 'none' : '' }}>
          {isProcessing ? 'Processing securely...' : `Pay $${total.toFixed(2)} securely`}
        </button>
      </div>
    </div>
  );
};
export default Payment;
