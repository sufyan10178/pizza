import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Container } from '@mui/material';

const Order = ({ pizzas }) => {
  const { pizzaId } = useParams();
  const pizza = pizzas.find((p) => p.id === parseInt(pizzaId));

  if (!pizza) {
    return (
      <Container>
        <Typography variant="h4" style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
          Pizza Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
        Order Your Pizza
      </Typography>
      <Card style={{ maxWidth: 345, margin: 'auto' }}>
        <CardMedia
          style={{ height: 140 }}
          image={pizza.image}
          title={pizza.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {pizza.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {pizza.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10 ,backgroundColor:'#ff5722'}}
            
          >
            Confirm Order
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Order;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Button, Grid, Container, TextField } from '@mui/material';
// import bbqChickenImage from '../assets/bbq_chicken.png';
// import sliceImage from '../assets/slice.jpg';
// import hawaiianImage from '../assets/hawaiian.png';


// const pizzas = [
//   { id: 2, title: 'Pepperoni', description: 'A classic American pizza with pepperoni', image: sliceImage ,price: '$10'},
//       { id: 3, title: 'BBQ Chicken', description: 'Grilled chicken with BBQ sauce', image: bbqChickenImage,price: '$12' },
//       { id: 4, title: 'Hawaiian', description: 'Pizza with ham and pineapple', image: hawaiianImage,price: '$14' },

//   // Add the rest of the pizzas here
// ];

// const Order = () => {
//   const { pizzaId } = useParams();
//   const pizza = pizzas.find(pizza => pizza.id === parseInt(pizzaId));

//   // Add a check for undefined pizza
//   if (!pizza) {
//     return <Typography variant="h4">Pizza not found</Typography>;
//   }

//   return (
//     <Container style={{ marginTop: 20 }}>
//     <Grid container spacing={3} justifyContent="center">
//       <Grid item xs={12} sm={8} md={6}>
//         <Card style={{ maxWidth: 600, margin: 'auto' }}>
//           <CardMedia
//             style={{ height: 300 }}
//             image={pizza.image}
//             title={pizza.title}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {pizza.title}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {pizza.description}
//             </Typography>
//             <Typography variant="h6" style={{ marginTop: 10 }}>
//               {pizza.price}
//             </Typography>
//             <form style={{ marginTop: 20 }}>
//               <TextField
//                 margin="dense"
//                 name="name"
//                 label="Name"
//                 type="text"
//                 fullWidth
//                 required
//               />
//               <TextField
//                 margin="dense"
//                 name="address"
//                 label="Address"
//                 type="text"
//                 fullWidth
//                 required
//               />
//               <TextField
//                 margin="dense"
//                 name="phone"
//                 label="Phone Number"
//                 type="tel"
//                 fullWidth
//                 required
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 style={{ marginTop: 20  , backgroundColor:'#ff5722' }}
//                 fullWidth
              
//               >
//                 Place Order
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   </Container>
//   );
// };

// export default Order;