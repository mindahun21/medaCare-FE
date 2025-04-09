import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authApi';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      alert('Login successful!');
    },
    onError: (err) => {
      alert('Login failed. Please try again.');
      console.error(err);
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!form.email) errs.email = 'Email is required';
    else if (!emailRegex.test(form.email)) errs.email = 'Invalid email format';

    if (!form.password) errs.password = 'Password is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 w-full space-y-5 md:space-y-10"
    >
      <div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={form.email}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          autoComplete="off"
          sx={{
            '& label': {
              fontWeight: 700,
              fontSize: '1rem',
            },
            '& label.Mui-focused': {
              color: 'var(--color-primary-teal)',
            },
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              color: 'var(--color-primary-teal)',
              '& fieldset': {
                borderColor: 'var(--color-primary-teal)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--color-primary-teal)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-primary-teal)',
                borderWidth: 2,
              },
            },
          }}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
          autoComplete="off"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: 'var(--color-primary-teal)' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& label': {
              fontWeight: 700,
              fontSize: '1rem',
            },
            '& label.Mui-focused': {
              color: 'var(--color-primary-teal)',
            },
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              color: 'var(--color-primary-teal)',
              '& fieldset': {
                borderColor: 'var(--color-primary-teal)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--color-primary-teal)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-primary-teal)',
                borderWidth: 2,
              },
            },
          }}
        />
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={mutation.isLoading}
        sx={{
          fontWeight: 600,
          py: 1.5,
          borderRadius: '0.3rem',
          backgroundColor: 'var(--color-secondary-burgandy)',
          '&:hover': {
            backgroundColor: 'var(--color-secondary-burgandy)',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        }}
      >
        {mutation.isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
}
