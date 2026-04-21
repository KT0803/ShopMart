import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', outline: 'none' };

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
      const url = `${baseUrl}/api/auth/${isLogin ? 'login' : 'register'}`;
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      login(data);
      navigate('/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: 'var(--glass-border)', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
        {error && <p style={{ color: '#ef4444', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
        {!isLogin && <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />}
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', padding: '12px' }}>{isLogin ? 'Login' : 'Register'}</button>
        <p style={{ marginTop: '20px', textAlign: 'center', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? " : "Already have an account? "}<span style={{ color: 'var(--accent-main)' }}>{isLogin ? 'Register' : 'Login'}</span>
        </p>
      </form>
    </div>
  );
};
export default Login;
