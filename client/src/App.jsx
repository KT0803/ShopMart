import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Success from './pages/Success';
import MyOrders from './pages/MyOrders';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
