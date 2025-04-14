import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  TextFieldProps,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../data/hooks';
import { useNavigate } from 'react-router-dom';
import { requestUser, verifyEmail } from '../services/authApi';
import { setToken } from '../../../data/authSlice';

export default function VerifyEmailForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: async (data) => {
      const token = data.data?.data?.token;
      dispatch(setToken(token));
      navigate('/home');
      try {
        const userResponse = await requestUser();
        const userData = userResponse.data?.data;

        if (!userData) {
          console.error('User data not found');
          return;
        }
        console.log('User data:', userData);
        navigate('/home');
      } catch (userErr) {
        console.error('Failed to fetch user:', userErr);
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setError(err?.message || 'Verification failed');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!tokenInput) {
      setError('Verification token is required');
      return;
    }
    if (!email) {
      console.log('Email is required--------------------');
      return;
    }
    mutation.mutate({ email: email, token: tokenInput });
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
      <h2 className="text-3xl font-bold text-center text-primary-teal">
        Verify Your Email
      </h2>

      <div>
        <TextField
          id="token"
          label="Verification Token"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          error={!!error}
          helperText={error}
          {...SharedTextFieldProps}
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
          'Verify Email'
        )}
      </Button>
    </form>
  );
}
