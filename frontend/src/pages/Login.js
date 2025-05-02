import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth='xs'>
      <Typography variant='h4' gutterBottom>
        Login
      </Typography>
      <form>
        <TextField label='Email' fullWidth margin='normal' variant='outlined' />
        <TextField
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          variant='outlined'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
