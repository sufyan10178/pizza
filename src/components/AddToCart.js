// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Typography, Card, CardContent, CardMedia, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, Checkbox, FormGroup, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// function AddToCart({ pizzas }) {
//   const { pizzaId } = useParams();
//   const navigate = useNavigate();
//   const pizza = pizzas.find((p) => p.id === parseInt(pizzaId));
//   const [selectedSize, setSelectedSize] = useState('Small');
//   const [selectedCrust, setSelectedCrust] = useState('');
//   const [selectedToppings, setSelectedToppings] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(420);

//   const basePrices = {
//     Small: 420,
//     Medium: 1400,
//     Large: 1680,
//     ExtraLarge: 1890,
//   };

//   const toppings = [
//     { name: 'Cheese', price: 175 },
//     { name: 'Peri Peri Chicken', price: 175 },
//     { name: 'Tex-Mex Chicken', price: 175 },
//     { name: 'Mughlai Topping', price: 175 },
//     { name: 'Mushroom', price: 105 },
//     { name: 'Jalapeno', price: 105 },
//     { name: 'Pineapple', price: 105 },
//     { name: 'Olive', price: 105 },
//     { name: 'Pickle', price: 105 },
//     { name: 'Capsicum', price: 105 },
//     { name: 'Green Chili', price: 105 },
//   ];

//   useEffect(() => {
//     const toppingPrice = selectedToppings.reduce((acc, topping) => {
//       const toppingObj = toppings.find((t) => t.name === topping);
//       return acc + (toppingObj ? toppingObj.price : 0);
//     }, 0);
//     const basePrice = basePrices[selectedSize];
//     setTotalPrice((basePrice + toppingPrice) * quantity);
//   }, [selectedSize, selectedToppings, quantity]);

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };

//   const handleCrustChange = (event) => {
//     setSelectedCrust(event.target.value);
//   };

//   const handleToppingChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       if (selectedToppings.length < 3) {
//         setSelectedToppings((prev) => [...prev, value]);
//       }
//     } else {
//       setSelectedToppings((prev) => prev.filter((t) => t !== value));
//     }
//   };

//   const handleQuantityChange = (amount) => {
//     setQuantity((prev) => Math.max(1, prev + amount));
//   };

//   const handleClose = () => {
//     navigate('/');
//   };

//   return (
//     <Container component="main" maxWidth="sm" style={{ marginTop: 20 }}>
//       {pizza ? (
//         <Card>
//           <div style={{ position: 'relative' }}>
//             <CardMedia
//               style={{ height: 300 }}
//               image={pizza.image}
//               title={pizza.title}
//             />
//             <IconButton
//               style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </div>
//           <CardContent>
//             <Typography component="h2" variant="h5">
//               {pizza.title}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {pizza.description}
//             </Typography>
//             <Typography variant="h6" style={{ marginTop: 20 }}>
//               Rs. {totalPrice}
//             </Typography>

//             <FormControl component="fieldset" style={{ marginTop: 20 }}>
//               <FormLabel component="legend" style={{ color: '#604CC3' }}>Choose an option</FormLabel>
//               <RadioGroup aria-label="size" name="size" value={selectedSize} onChange={handleSizeChange}>
//                 <FormControlLabel value="Small" control={<Radio />} label="Small Rs. 420 " />
//                 <FormControlLabel value="Medium" control={<Radio />} label="Medium Rs. 1400 " />
//                 <FormControlLabel value="Large" control={<Radio />} label="Large Rs. 1680 " />
//                 <FormControlLabel value="ExtraLarge" control={<Radio />} label="Extra Large Rs. 1890 " />
//               </RadioGroup>
//             </FormControl>

//             <FormControl component="fieldset" style={{ marginTop: 20, marginLeft: 20 }}>
//               <FormLabel component="legend" style={{ color: '#604CC3' }}>Select Crust</FormLabel>
//               <Select
//                 value={selectedCrust}
//                 onChange={handleCrustChange}
//                 displayEmpty
//                 style={{ marginTop: 10, width: '100%' }}
//               >
//                 <MenuItem value="" disabled>Select any 1</MenuItem>
//                 <MenuItem value="Thin Crust">Thin Crust</MenuItem>
//                 <MenuItem value="Cheese Burst">Cheese Burst</MenuItem>
//                 <MenuItem value="Classic Hand Tossed">Classic Hand Tossed</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl component="fieldset" style={{ marginTop: 20 }}>
//               <FormLabel component="legend" style={{ color: '#604CC3' }}>Select Extra Toppings (Optional)</FormLabel>
//               <Typography variant="body2" color="textSecondary">
//                 {selectedToppings.length < 3 ? `Select any 3 (Selected: ${selectedToppings.length})` : `Selected: ${selectedToppings.length}`}
//               </Typography>
//               <FormGroup>
//                 {toppings.map((topping) => (
//                   <FormControlLabel
//                     key={topping.name}
//                     control={
//                       <Checkbox
//                         value={topping.name}
//                         onChange={handleToppingChange}
//                         checked={selectedToppings.includes(topping.name)}
//                         disabled={!selectedToppings.includes(topping.name) && selectedToppings.length >= 3}
//                       />
//                     }
//                     label={`${topping.name} Rs. ${topping.price}`}
//                   />
//                 ))}
//               </FormGroup>
//             </FormControl>

//             <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
//               <Button onClick={() => handleQuantityChange(-1)} style={{ color: '#ff5722' }}>-</Button>
//               <Typography variant="body1" style={{ margin: '0 10px' }}>{quantity}</Typography>
//               <Button onClick={() => handleQuantityChange(1)} style={{ color: '#ff5722' }}>+</Button>
//             </div>

//             <Button
//               variant="contained"
//               color="primary"
//               style={{ marginTop: 20, width: '100%', backgroundColor: '#ff5722' }}
//             >
//               Add to Order Rs. {totalPrice}
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <Typography component="h2" variant="h5">
//           Pizza not found.
//         </Typography>
//       )}
//     </Container>
//   );
// }

// export default AddToCart;







// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Typography, Card, CardContent, CardMedia, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, Checkbox, FormGroup, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useCart } from './CartContext'; // Adjust the path as necessary

// function AddToCart({ pizzas }) {
//   const { pizzaId } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart(); // Using addToCart function from CartContext
//   const pizza = pizzas.find((p) => p.id === parseInt(pizzaId));
//   const [selectedSize, setSelectedSize] = useState('Small');
//   const [selectedCrust, setSelectedCrust] = useState('');
//   const [selectedToppings, setSelectedToppings] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(420);

//   const basePrices = {
//     Small: 420,
//     Medium: 1400,
//     Large: 1680,
//     ExtraLarge: 1890,
//   };

//   const toppings = [
//     { name: 'Cheese', price: 175 },
//     { name: 'Peri Peri Chicken', price: 175 },
//     { name: 'Tex-Mex Chicken', price: 175 },
//     { name: 'Mughlai Topping', price: 175 },
//     { name: 'Mushroom', price: 105 },
//     { name: 'Jalapeno', price: 105 },
//     { name: 'Pineapple', price: 105 },
//     { name: 'Olive', price: 105 },
//     { name: 'Pickle', price: 105 },
//     { name: 'Capsicum', price: 105 },
//     { name: 'Green Chili', price: 105 },
//   ];

//   useEffect(() => {
//     const toppingPrice = selectedToppings.reduce((acc, topping) => {
//       const toppingObj = toppings.find((t) => t.name === topping);
//       return acc + (toppingObj ? toppingObj.price : 0);
//     }, 0);
//     const basePrice = basePrices[selectedSize];
//     setTotalPrice((basePrice + toppingPrice) * quantity);
//   }, [selectedSize, selectedToppings, quantity]);

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };

//   const handleCrustChange = (event) => {
//     setSelectedCrust(event.target.value);
//   };

//   const handleToppingChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       if (selectedToppings.length < 3) {
//         setSelectedToppings((prev) => [...prev, value]);
//       }
//     } else {
//       setSelectedToppings((prev) => prev.filter((t) => t !== value));
//     }
//   };

//   const handleQuantityChange = (amount) => {
//     setQuantity((prev) => Math.max(1, prev + amount));
//   };

//   const handleAddToCart = () => {
//     const selectedPizza = {
//       ...pizza,
//       size: selectedSize,
//       crust: selectedCrust,
//       toppings: selectedToppings,
//       quantity,
//       totalPrice,
//     };
//     addToCart(selectedPizza); // Add selected pizza to the cart using addToCart function from CartContext
//     navigate('/mycart'); // Navigate to the cart page after adding to cart
//   };

//   const handleClose = () => {
//     navigate('/'); // Navigate back to the home page
//   };

//   return (
//     <Container component="main" maxWidth="sm" style={{ marginTop: 20 }}>
//       {pizza ? (
//         <Card>
//           <div style={{ position: 'relative' }}>
//             <CardMedia
//               style={{ height: 300 }}
//               image={pizza.image}
//               title={pizza.title}
//             />
//             <IconButton
//               style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </div>
//           <CardContent>
//             <Typography component="h2" variant="h5">
//               {pizza.title}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {pizza.description}
//             </Typography>
//             <Typography variant="h6" style={{ marginTop: 20 }}>
//               Rs. {totalPrice}
//             </Typography>

//             <FormControl component="fieldset" style={{ marginTop: 20 }}>
//               <FormLabel component="legend" style={{ color: '#604CC3' }}>Choose an option</FormLabel>
//               <RadioGroup aria-label="size" name="size" value={selectedSize} onChange={handleSizeChange}>
//                 <FormControlLabel value="Small" control={<Radio />} label="Small Rs. 420 " />
//                 <FormControlLabel value="Medium" control={<Radio />} label="Medium Rs. 1400 " />
//                 <FormControlLabel value="Large" control={<Radio />} label="Large Rs. 1680 " />
//                 <FormControlLabel value="ExtraLarge" control={<Radio />} label="Extra Large Rs. 1890 " />
//               </RadioGroup>
//             </FormControl>

//             <FormControl component="fieldset" style={{ marginTop: 20, marginLeft: 20 }}>
//               <FormLabel component="legend" style={{ color: '#604CC3' }}>Select Crust</FormLabel>
//               <Select
//                 value={selectedCrust}
//                 onChange={handleCrustChange}
//                 displayEmpty
//                 style={{ marginTop: 10, width: '100%' }}
//               >
//                 <MenuItem value="" disabled>Select any 1</MenuItem>
//                 <MenuItem value="Thin Crust">Thin Crust</MenuItem>
//                 <MenuItem value="Cheese Burst">Cheese Burst</MenuItem>
//                 <MenuItem value="Classic Hand Tossed">Classic Hand Tossed</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl component="fieldset" style={{ marginTop: 20 }}>
//               <FormLabel component="legend" style={{ color: '#604CC3' }}>Select Extra Toppings (Optional)</FormLabel>
//               <Typography variant="body2" color="textSecondary">
//                 {selectedToppings.length < 3 ? `Select any 3 (Selected: ${selectedToppings.length})` : `Selected: ${selectedToppings.length}`}
//               </Typography>
//               <FormGroup>
//                 {toppings.map((topping) => (
//                   <FormControlLabel
//                     key={topping.name}
//                     control={
//                       <Checkbox
//                         value={topping.name}
//                         onChange={handleToppingChange}
//                         checked={selectedToppings.includes(topping.name)}
//                         disabled={!selectedToppings.includes(topping.name) && selectedToppings.length >= 3}
//                       />
//                     }
//                     label={`${topping.name} Rs. ${topping.price}`}
//                   />
//                 ))}
//               </FormGroup>
//             </FormControl>

//             <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
//               <Button onClick={() => handleQuantityChange(-1)} style={{ color: '#ff5722' }}>-</Button>
//               <Typography variant="body1" style={{ margin: '0 10px' }}>{quantity}</Typography>
//               <Button onClick={() => handleQuantityChange(1)} style={{ color: '#ff5722' }}>+</Button>
//             </div>

//             <Button
//               variant="contained"
//               color="primary"
//               style={{ marginTop: 20, width: '100%', backgroundColor: '#ff5722' }}
//               onClick={handleAddToCart}
//             >
//               Add to Order Rs. {totalPrice}
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <Typography component="h2" variant="h5">
//           Pizza not found.
//         </Typography>
//       )}
//     </Container>
//   );
// }

// export default AddToCart;












import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, Checkbox, FormGroup, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './CartContext';

function AddToCart({ pizzas }) {
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  const pizza = pizzas.find((p) => p.id === parseInt(pizzaId));
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedCrust, setSelectedCrust] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(420);

  const basePrices = {
    Small: 420,
    Medium: 1400,
    Large: 1680,
    ExtraLarge: 1890,
  };

  const toppings = [
    { name: 'Cheese', price: 175 },
    { name: 'Peri Peri Chicken', price: 175 },
    { name: 'Tex-Mex Chicken', price: 175 },
    { name: 'Mughlai Topping', price: 175 },
    { name: 'Mushroom', price: 105 },
    { name: 'Jalapeno', price: 105 },
    { name: 'Pineapple', price: 105 },
    { name: 'Olive', price: 105 },
    { name: 'Pickle', price: 105 },
    { name: 'Capsicum', price: 105 },
    { name: 'Green Chili', price: 105 },
  ];

  useEffect(() => {
    const toppingPrice = selectedToppings.reduce((acc, topping) => {
      const toppingObj = toppings.find((t) => t.name === topping);
      return acc + (toppingObj ? toppingObj.price : 0);
    }, 0);
    const basePrice = basePrices[selectedSize];
    setTotalPrice((basePrice + toppingPrice) * quantity);
  }, [selectedSize, selectedToppings, quantity]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleCrustChange = (event) => {
    setSelectedCrust(event.target.value);
  };

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (selectedToppings.length < 3) {
        setSelectedToppings((prev) => [...prev, value]);
      }
    } else {
      setSelectedToppings((prev) => prev.filter((t) => t !== value));
    }
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleAddToOrder = () => {
    const order = {
      ...pizza,
      selectedSize,
      selectedCrust,
      selectedToppings,
      quantity,
      totalPrice
    };
    addToCart(order);
    navigate('/mycart');
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: 20 }}>
      {pizza ? (
        <Card>
          <div style={{ position: 'relative' }}>
            <CardMedia
              style={{ height: 300 }}
              image={pizza.image}
              title={pizza.title}
            />
            <IconButton
              style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <CardContent>
            <Typography component="h2" variant="h5">
              {pizza.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {pizza.description}
            </Typography>
            <Typography variant="h6" style={{ marginTop: 20 }}>
              Rs. {totalPrice}
            </Typography>

            <FormControl component="fieldset" style={{ marginTop: 20 }}>
              <FormLabel component="legend" style={{ color: '#604CC3' }}>Choose an option</FormLabel>
              <RadioGroup aria-label="size" name="size" value={selectedSize} onChange={handleSizeChange}>
                <FormControlLabel value="Small" control={<Radio />} label="Small Rs. 420 " />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium Rs. 1400 " />
                <FormControlLabel value="Large" control={<Radio />} label="Large Rs. 1680 " />
                <FormControlLabel value="ExtraLarge" control={<Radio />} label="Extra Large Rs. 1890 " />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 20, marginLeft: 20 }}>
              <FormLabel component="legend" style={{ color: '#604CC3' }}>Select Crust</FormLabel>
              <Select
                value={selectedCrust}
                onChange={handleCrustChange}
                displayEmpty
                style={{ marginTop: 10, width: '100%' }}
              >
                <MenuItem value="" disabled>Select any 1</MenuItem>
                <MenuItem value="Thin Crust">Thin Crust</MenuItem>
                <MenuItem value="Cheese Burst">Cheese Burst</MenuItem>
                <MenuItem value="Classic Hand Tossed">Classic Hand Tossed</MenuItem>
              </Select>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 20 }}>
              <FormLabel component="legend" style={{ color: '#604CC3' }}>Select Extra Toppings (Optional)</FormLabel>
              <Typography variant="body2" color="textSecondary">
                {selectedToppings.length < 3 ? `Select any 3 (Selected: ${selectedToppings.length})` : `Selected: ${selectedToppings.length}`}
              </Typography>
              <FormGroup>
                {toppings.map((topping) => (
                  <FormControlLabel
                    key={topping.name}
                    control={
                      <Checkbox
                        value={topping.name}
                        onChange={handleToppingChange}
                        checked={selectedToppings.includes(topping.name)}
                        disabled={!selectedToppings.includes(topping.name) && selectedToppings.length >= 3}
                      />
                    }
                    label={`${topping.name} Rs. ${topping.price}`}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
              <Button onClick={() => handleQuantityChange(-1)} style={{ color: '#ff5722' }}>-</Button>
              <Typography variant="body1" style={{ margin: '0 10px' }}>{quantity}</Typography>
              <Button onClick={() => handleQuantityChange(1)} style={{ color: '#ff5722' }}>+</Button>
            </div>

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, width: '100%', backgroundColor: '#ff5722' }}
              onClick={handleAddToOrder}
            >
              Add to Order Rs. {totalPrice}
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
