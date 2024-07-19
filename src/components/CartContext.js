// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart, updateQuantity } from './redux/cartSlice';

// const CartContext = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);

//   const handleRemove = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleQuantityChange = (id, quantity) => {
//     dispatch(updateQuantity({ id, quantity }));
//   };

//   return (
//     <div>
//       <h1>Cart</h1>
//       {cart.map((item) => (
//         <div key={item.id}>
//           <h2>{item.title}</h2>
//           <p>Quantity: {item.quantity}</p>
//           <button onClick={() => handleRemove(item.id)}>Remove</button>
//           <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
//           <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartContext;


import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (pizzaId, newQuantity) => {
        setCart((prevCart) =>
          prevCart.map((pizza) =>
            pizza.id === pizzaId ? { ...pizza, quantity: newQuantity } : pizza
          )
        );
      };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , updateQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};