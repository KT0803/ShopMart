import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  const login = (userData) => { setUser(userData); localStorage.setItem('user', JSON.stringify(userData)); };
  const logout = () => { setUser(null); setCart([]); localStorage.removeItem('user'); localStorage.removeItem('cart'); };
  
  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  const clearCart = () => { setCart([]); localStorage.removeItem('cart'); };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  );
};
