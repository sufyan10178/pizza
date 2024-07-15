import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

function AddToCart({ pizzas }) {
  const { pizzaId } = useParams();
  const pizza = pizzas.find((p) => p.id === parseInt(pizzaId));

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: 20 }}>
      {pizza ? (
        <Card>
          <CardMedia
            style={{ height: 300 }}
            image={pizza.image}
            title={pizza.title}
          />
          <CardContent>
            <Typography component="h2" variant="h5">
              {pizza.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {pizza.description}
            </Typography>
            <Typography variant="h6" style={{ marginTop: 20 }}>
              Price: $10
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography component="h2" variant="h5">
          Pizza not found.
        </Typography>
      )}
    </Container>
  );
}

export default AddToCart;
