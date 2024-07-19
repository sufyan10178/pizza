import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import AddToCart from './components/AddToCart';
import MyCart from './components/MyCart';
import { CartProvider, useCart } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Badge,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { Add, ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';

import image1 from './assets/slider5.png';
import slideimage from './assets/slideImage.jpg';
import image3 from './assets/slice.jpg';
import hawaiianImage from './assets/hawaiian.png';
import veggieImage from './assets/veggie.png';
import bbqChickenImage from './assets/bbq_chicken.png';
import ProtectedRoute from './ProtectedRoute';

const theme = createTheme();

function App() {
  const [carouselImages, setCarouselImages] = useState([image1, slideimage, image3]);

  const loadPizzasFromStorage = () => {
    const storedPizzas = localStorage.getItem('pizzas');
    return storedPizzas
      ? JSON.parse(storedPizzas)
      : [
          { id: 1, title: 'Margherita', description: 'Classic delight with 100% real mozzarella cheese', image: 'https://as2.ftcdn.net/v2/jpg/02/66/75/97/1000_F_266759706_9MfrbbBd2SleNS2YNWyg5qZulSspYYHX.jpg' },
          { id: 2, title: 'Pepperoni', description: 'A classic American pizza with pepperoni', image: image3 },
          { id: 3, title: 'BBQ Chicken', description: 'Grilled chicken with BBQ sauce', image: bbqChickenImage },
          { id: 4, title: 'Hawaiian', description: 'Pizza with ham and pineapple', image: hawaiianImage },
          { id: 5, title: 'Veggie', description: 'Loaded with a variety of vegetables', image: veggieImage },
        ];
  };

  const CartIcon = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleCartClick = () => {
      navigate('/mycart');
    };

    return (
      <IconButton color="inherit" onClick={handleCartClick}>
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
    );
  };

  const [pizzas, setPizzas] = useState(loadPizzasFromStorage);

  useEffect(() => {
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
  }, [pizzas]);

  const [open, setOpen] = useState(false);
  const [currentPizza, setCurrentPizza] = useState({ id: '', title: '', description: '', image: '' });

  const handleClickOpen = (pizza) => {
    setCurrentPizza(pizza);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPizza({ id: '', title: '', description: '', image: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentPizza({ ...currentPizza, [name]: value });
  };

  const handleSave = () => {
    if (currentPizza.id) {
      setPizzas(pizzas.map((pizza) => (pizza.id === currentPizza.id ? currentPizza : pizza)));
    } else {
      const newPizza = { ...currentPizza, id: pizzas.length + 1 };
      setPizzas([...pizzas, newPizza]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setPizzas(pizzas.filter((pizza) => pizza.id !== id));
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component="a" href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component="a" href="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component="a" href="/contact">
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component="a" href="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component="a" href="/signup">
          <ListItemText primary="Signup" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <AppBar position="static" style={{ backgroundColor: '#ff5722' }}>
                <Toolbar>
                  {isSmallScreen && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Pizza
                  </Typography>
                  {!isSmallScreen && (
                    <>
                      <Button color="inherit" href="/">
                        Home
                      </Button>
                      <Button color="inherit" href="/about">
                        About
                      </Button>
                      <Button color="inherit" href="/contact">
                        Contact
                      </Button>
                      <Button color="inherit" href="/login">
                        Login
                      </Button>
                      <Button color="inherit" href="/signup">
                        Signup
                      </Button>
                    </>
                  )}
                  <IconButton color="inherit" onClick={() => handleClickOpen({ id: '', title: '', description: '', image: '' })}>
                    <Add />
                  </IconButton>
                  <CartIcon />
                </Toolbar>
              </AppBar>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
              </Drawer>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      carouselImages={carouselImages}
                      pizzas={pizzas}
                      handleClickOpen={handleClickOpen}
                      handleDelete={handleDelete}
                      handleChange={handleChange}
                      handleSave={handleSave}
                      open={open}
                      handleClose={handleClose}
                      currentPizza={currentPizza}
                    />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-to-cart/:pizzaId" element={<AddToCart pizzas={pizzas} />} />
                <Route path="/mycart" element={<MyCart />} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
