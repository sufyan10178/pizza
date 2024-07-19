import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, IconButton, Box } from '@mui/material';
import { useCart } from './CartContext';
import { Add, Remove, Delete, ArrowBack } from '@mui/icons-material';

function MyCart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showTotalPrice, setShowTotalPrice] = useState({});

  const handleUpdateQuantity = (pizzaId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(pizzaId, newQuantity);
    } else {
      handleRemoveFromCart(pizzaId);
    }
  };

  const handleRemoveFromCart = (pizzaId) => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      removeFromCart(pizzaId);
    }
  };

  const handleDetailsClick = (pizzaId) => {
    setShowTotalPrice((prev) => ({
      ...prev,
      [pizzaId]: !prev[pizzaId],
    }));
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: 40, marginBottom: 40 }}>
      <IconButton onClick={() => navigate('/')} style={{ marginBottom: 20 }}>
        <ArrowBack />
      </IconButton>
      <Typography component="h1" align="center" variant="h4" style={{ marginBottom: 20 }}>
        My Cart
      </Typography>
      {cart.map((pizza, index) => (
        <Card key={index} style={{ display: 'flex', marginBottom: 20 }}>
          <CardMedia
            style={{ width: 120, height: 120, margin: '16px' }}
            image={pizza.image}
            title={pizza.title}
          />
          <CardContent style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography component="h2" variant="h6" color="primary">
                {pizza.title} ({pizza.price ? pizza.price : 0} per item) x {pizza.quantity}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <IconButton onClick={() => handleUpdateQuantity(pizza.id, pizza.quantity - 1)}>
                  <Remove />
                </IconButton>
                <Typography>{pizza.quantity}</Typography>
                <IconButton onClick={() => handleUpdateQuantity(pizza.id, pizza.quantity + 1)}>
                  <Add />
                </IconButton>
              </div>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginTop: 10 }}>
              <Typography variant="h6" color="textSecondary">
                Rs. {pizza.totalPrice ? pizza.totalPrice * pizza.quantity : 0}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#604CC3' }}
                onClick={() => handleDetailsClick(pizza.id)}
              >
                Details
              </Button>
              <IconButton onClick={() => handleRemoveFromCart(pizza.id)} style={{ color: '#604CC3' }}>
                <Delete />
              </IconButton>
            </Box>
            {showTotalPrice[pizza.id] && (
              <Box style={{ marginTop: 10 }}>
                <Typography variant="h6" color="Secondary" style={{ backgroundColor: '#DB5F29' }}>
                  Total: Rs. {pizza.totalPrice ? pizza.totalPrice * pizza.quantity : 0}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default MyCart;
