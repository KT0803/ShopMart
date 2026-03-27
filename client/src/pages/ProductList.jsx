import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Electronics', 'Audio', 'Accessories', 'Office', 'Cameras', 'Gaming'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = new URL('http://127.0.0.1:5001/api/products');
        if (keyword) url.searchParams.append('keyword', keyword);
        if (category) url.searchParams.append('category', category);

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="page-wrapper">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Explore Products</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Find the perfect gear for your lifestyle.</p>
      
      {/* Search and Filters */}
      <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input 
          type="text" 
          placeholder="Search for products (e.g. AirPods, MacBook)..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--bg-card)', color: '#fff', fontSize: '1.1rem', outline: 'none', transition: 'border-color 0.3s ease' }}
        />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            onClick={() => setCategory('')} 
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--accent-main)', color: category === '' ? '#fff' : 'var(--accent-main)', background: category === '' ? 'var(--accent-main)' : 'transparent', cursor: 'pointer', fontWeight: '600' }}
          >
            All
          </button>
          {categories.map((c) => (
            <button 
              key={c}
              onClick={() => setCategory(c)} 
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', color: category === c ? '#fff' : 'var(--text-muted)', background: category === c ? 'var(--accent-main)' : 'transparent', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products && products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px', background: 'var(--bg-card)', borderRadius: '16px', border: 'var(--glass-border)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No products found matching your search.</p>
              <button 
                onClick={() => { setKeyword(''); setCategory(''); }} 
                className="btn-primary" 
                style={{ marginTop: '20px', padding: '10px 20px' }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
