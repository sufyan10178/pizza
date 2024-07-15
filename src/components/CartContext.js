// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (pizza) => {
//     setCart((prevCart) => [...prevCart, pizza]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (pizza) => {
//     setCart((prevCart) => [...prevCart, pizza]);
//   };

//   const removeFromCart = (pizzaId) => {
//     setCart((prevCart) => prevCart.filter((pizza) => pizza.id !== pizzaId));
//   };
//   const updateQuantity = (pizzaId, newQuantity) => {
//     setCart((prevCart) =>
//       prevCart.map((pizza) =>
//         pizza.id === pizzaId ? { ...pizza, quantity: newQuantity } : pizza
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart , updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   return useContext(CartContext);
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
