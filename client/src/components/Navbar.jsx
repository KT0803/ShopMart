import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, cart } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/" className="nav-brand">Shop<span>Mart</span></Link>
      <div className="nav-links">
        <Link to="/products">Explore</Link>
        <Link to="/cart">Cart {cart.length > 0 && <span style={{ background: 'var(--accent-main)', borderRadius: '50%', padding: '2px 8px', marginLeft: '5px', fontSize: '0.8rem', color: '#fff' }}>{cart.length}</span>}</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <button onClick={logout} className="btn-primary" style={{ padding: '8px 18px', marginLeft: 12, background: '#ef4444' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn-primary" style={{ padding: '8px 18px', marginLeft: 12 }}>Sign In</Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
