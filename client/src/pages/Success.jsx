import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="page-wrapper" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '30px', borderRadius: '50%', marginBottom: '30px', border: '2px solid #10b981', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg fill="none" stroke="#10b981" viewBox="0 0 24 24" style={{ width: '80px', height: '80px', strokeWidth: '3' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', color: '#10b981' }}>Thanks for Ordering!</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
        Your payment was processed securely. We've received your order and our team is already getting it ready to be shipped directly to you.
      </p>
      <Link to="/products" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>
        Continue Shopping
      </Link>
    </div>
  );
};
export default Success;
