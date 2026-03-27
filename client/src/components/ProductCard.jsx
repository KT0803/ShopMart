import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AuthContext);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', flexGrow: 1 }}>{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
