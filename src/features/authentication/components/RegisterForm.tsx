import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/authApi';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RegisterFormData } from '../types';

export default function RegisterForm() {
  type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;
  const [form, setForm] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert('Registered successfully!');
    },
    onError: (err) => {
      alert('Registration failed. Try again.');
      console.error(err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs: RegisterFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';

    if (!form.email) errs.email = 'Email is required';
    else if (!emailRegex.test(form.email)) errs.email = 'Invalid email format';

    if (!form.password) errs.password = 'Password is required';
    else if (!passwordRegex.test(form.password))
      errs.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol';

    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  const sharedTextFieldProps: Partial<TextFieldProps> = {
    fullWidth: true,
    variant: 'outlined',
    autoComplete: 'off',
    sx: {
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
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 w-full space-y-5 md:space-y-10"
    >
      <div>
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          {...sharedTextFieldProps}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          {...sharedTextFieldProps}
        />
      </div>
      <div>
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          {...sharedTextFieldProps}
        />
      </div>
      <div>
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
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
          {...sharedTextFieldProps}
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
          {...sharedTextFieldProps}
        />
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={mutation.isPending}
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
        {mutation.isPending ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          'Sign Up'
        )}
      </Button>
    </form>
  );
}
