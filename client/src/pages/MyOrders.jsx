import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
        const res = await fetch(`${baseUrl}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="page-wrapper">
      <h1 style={{ marginBottom: '30px' }}>My Order History</h1>
      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: '16px', border: 'var(--glass-border)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: 'var(--bg-card)', padding: '25px', borderRadius: '16px', border: 'var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-main)', textTransform: 'uppercase', marginBottom: '5px' }}>Order ID: {order._id}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>
                  {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>${order.totalAmount.toFixed(2)}</p>
                <span style={{ display: 'inline-block', marginTop: '10px', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-main)', border: '1px solid var(--accent-main)' }}>
                  {order.orderStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
