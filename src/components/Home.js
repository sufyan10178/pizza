import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Container } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home({
  carouselImages, pizzas, handleClickOpen, handleDelete, handleChange, handleSave, open, handleClose, currentPizza,
}) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...sliderSettings}>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Pizza ${index + 1}`} style={{ width: '100%', height: '65vh', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>
      <Container>
        <Typography variant="h4" style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
          Our Pizzas
        </Typography>
        <Grid container spacing={3}>
          {pizzas.map((pizza) => (
            <Grid item xs={12} sm={6} md={4} key={pizza.id}>
              <Card style={{ maxWidth: 345, margin: 'auto' }}>
                <CardMedia
                  style={{ height: 140 }}
                  image={pizza.image}
                  title={pizza.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {pizza.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {pizza.description}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <IconButton style={{color:'#f57953'}} onClick={() => handleClickOpen(pizza)}>
                      <Edit />
                    </IconButton>
                    <IconButton style={{color:'#f57953'}} onClick={() => handleDelete(pizza.id)}>
                      <Delete />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: '#ff5722' }}
                      component={Link}
                      to={`/add-to-cart/${pizza.id}`}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentPizza.id ? 'Edit Pizza' : 'Add Pizza'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={currentPizza.title}
            onChange={handleChange} />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={currentPizza.description}
            onChange={handleChange} />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={currentPizza.image}
            onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <footer style={{ backgroundColor: '#ff5722', color: '#fff', padding: '20px 0', marginTop: '25px' }}>
        <Container>
          <Typography variant="h6" align="center" gutterBottom>
            Pizza
          </Typography>
          <Typography variant="subtitle1" align="center" color="inherit" component="p">
            © 2024 Pizza Inc.
          </Typography>
          <Typography variant="body2" align="center" color="inherit" component="p">
            Contact us: info@pizza.com | +92 3014220585
          </Typography>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
