import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import  useAuth  from './AuthContext';
const About = () => {

 
  return (
  
    <Container style={{ marginTop: 40, marginBottom: 40 }}>
      <Typography variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <Paper elevation={3} style={{ padding: 30, backgroundColor: '#f9f9f9' }}>
        <Typography variant="body1" paragraph style={{ marginBottom: 20, lineHeight: 1.6 }}>
          Welcome to Pizza Inc., where our passion for pizza drives us to create the most delicious and mouth-watering pizzas in town. We believe in using the freshest ingredients and traditional recipes to bring you the best pizza experience.
        </Typography>
        <Typography variant="body1" paragraph style={{ marginBottom: 20, lineHeight: 1.6 }}>
          Our story began in 2000 when our founder, John Doe, decided to share his love for pizza with the world. From a small pizzeria in downtown, we have grown into a beloved pizza chain known for our commitment to quality and customer satisfaction.
        </Typography>
        <Typography variant="body1" paragraph style={{ marginBottom: 20, lineHeight: 1.6 }}>
          At Pizza Inc., we offer a wide variety of pizzas, from classic favorites like Margherita and Pepperoni to unique creations that will tantalize your taste buds. We also have a range of sides, salads, and desserts to complement your meal.
        </Typography>
        <Typography variant="body1" paragraph style={{ marginBottom: 20, lineHeight: 1.6 }}>
          We are dedicated to providing a warm and welcoming atmosphere for our customers, whether you dine in, take out, or order delivery. Thank you for choosing Pizza Inc., and we hope you enjoy every bite!
        </Typography>
      </Paper>
      
    </Container>
   
     
  );
 
};


export default About;
