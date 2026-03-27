import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '20px', background: 'linear-gradient(to right, #7c3aed, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Welcome to ShopMart
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
        Discover the most premium electronics, audio equipment, and workspace accessories engineered for perfection. 
      </p>
      <Link to="/products" className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem', borderRadius: '12px' }}>
        Explore All Products
      </Link>
    </div>
  );
};

export default Home;
