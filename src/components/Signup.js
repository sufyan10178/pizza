import React, { useState } from 'react';
import { Container, Typography, TextField, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Signup() {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
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
    if (step === 2) {
      tempErrors.firstName = formValues.firstName ? "" : "First name is required";
      tempErrors.lastName = formValues.lastName ? "" : "Last name is required";
      tempErrors.phoneNumber = formValues.phoneNumber ? "" : "Phone number is required";
      tempErrors.password = formValues.password ? "" : "Password is required";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (step === 1) {
        setStep(2);
      } else {
        // Store signup data in local storage
        localStorage.setItem('signupData', JSON.stringify(formValues));
        console.log("Form Submitted:", formValues);
        alert("Signup successful! Please log in.");
        navigate("/login");
      }
    }
  };

  const renderInitial = () => (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
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
      <Button
        fullWidth
        variant="outlined"
    
        component={Link}
        to="/login"
        style={{ marginBottom: 20 ,backgroundColor:'#604CC3' ,color:'white'}}
      >
        Log in
      </Button>
      <Button
        fullWidth
        variant="outlined"
        
        onClick={() => setStep(1)}
        style={{backgroundColor:'#604CC3' , color:'white'}}
      >
        Sign up
      </Button>
    </div>
  );

  const renderSignupEmail = () => (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <IconButton onClick={() => setStep(0)} style={{ marginBottom: 20 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography component="h1" variant="h5">
        What’s your email?
      </Typography>
      <Typography variant="body2" color="textSecondary" style={{ marginBottom: 20 }}>
        We'll check if you have an account
      </Typography>
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ marginTop: 20, marginBottom: 20 , backgroundColor:'#604CC3' }}
      >
        Continue
      </Button>
    </form>
  );

  const renderSignupDetails = () => (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <IconButton onClick={() => setStep(1)} style={{ marginBottom: 20 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="fname"
        value={formValues.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        value={formValues.lastName}
        onChange={handleChange}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="tel"
        value={formValues.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
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
        style={{ marginTop: 20, marginBottom: 20  }}
      >
        Sign Up
      </Button>
    </form>
  );

  return (
    <Container component="main" maxWidth="xs">
      {step === 0 ? renderInitial() : step === 1 ? renderSignupEmail() : renderSignupDetails()}
    </Container>
  );
}

export default Signup;
