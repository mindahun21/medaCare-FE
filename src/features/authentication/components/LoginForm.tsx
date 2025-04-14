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
import type { TextFieldProps } from '@mui/material';
import { LoginFormData } from '../types';
import { useAppDispatch } from '../../../data/hooks';
import { setToken } from '../../../data/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  type LoginFormErrors = Partial<Record<'email' | 'password', string>>;
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data.data?.data?.token;
      dispatch(setToken(token));
      navigate('/home');
    },
    onError: (err) => {
      console.log('Login failed. Please try again.', err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs: LoginFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!form.email) errs.email = 'Email is required';
    else if (!emailRegex.test(form.email)) errs.email = 'Invalid email format';

    if (!form.password) errs.password = 'Password is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  const SharedTextFieldProps: Partial<TextFieldProps> = {
    variant: 'outlined',
    fullWidth: true,
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
          id="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          {...SharedTextFieldProps}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          {...SharedTextFieldProps}
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
          'Sign In'
        )}
      </Button>
    </form>
  );
}
