import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = { name: false, email: false, message: false };
    tempErrors.name = formData.name === '';
    tempErrors.email = formData.email === '' || !/\S+@\S+\.\S+/.test(formData.email);
    tempErrors.message = formData.message === '';
    setErrors(tempErrors);
    return !Object.values(tempErrors).includes(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
      alert('Form submitted successfully!');
      // Clear form fields
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <Container style={{ marginTop: 40, marginBottom: 40 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contact Us
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              helperText={errors.name ? 'Name is required' : ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? 'Valid email is required' : ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              helperText={errors.message ? 'Message is required' : ''}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" style={{ backgroundColor: '#ff5722' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Contact;

