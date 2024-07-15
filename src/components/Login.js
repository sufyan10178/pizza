


import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();



  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleGoogleLogin = () => {
    const clientId = "906357184910-a0qjc5babdci5a2jml4kgi6e4a2o7du9.apps.googleusercontent.com";
    const redirectUri = "https://localhost:3001";
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    const state = generateRandomString(16);

    const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}&include_granted_scopes=true&prompt=consent`;

    window.location.href = googleOAuthURL;
  };







  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formValues.email ? "" : "Email is required";
    tempErrors.password = formValues.password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const storedData = JSON.parse(localStorage.getItem('signupData'));
      if (storedData && storedData.email === formValues.email && storedData.password === formValues.password) {
        alert("Login successful!");
        localStorage.setItem('isLoggedIn', true);
        navigate("/home");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 20 , textAlign: 'center' }}>
      <Typography component="h1" variant="h5">
        Welcome!
      </Typography>
      <Typography component="p">
        Sign up or log in to continue
      </Typography>
      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: 20, backgroundColor: '#80C4E9', color: 'black' }}
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </Button>
      <Typography variant="body2" align="center" style={{ margin: '20px 0' }}>
        or
      </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formValues.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formValues.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20, marginBottom: 20 , backgroundColor:'#604CC3'}}
          >
            Log In
          </Button>
        </form>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          component={Link}
          to="/signup"
          style={{ marginBottom: 20 }}
        >
          Sign Up
        </Button>
      </div>
    </Container>
  );
}

export default Login;
