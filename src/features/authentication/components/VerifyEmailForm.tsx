import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../data/hooks';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/authApi';
import { fetchUser, setToken } from '../../../data/authSlice';
import { useMessage } from '../../../contexts/MessageContext';
import { SharedTextFieldProps } from '../../../utils/variables';
import SubmitButton from '../../../ui/shared/SubmitButton';

export default function VerifyEmailForm() {
  const { showMessage } = useMessage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: async (data) => {
      const token = data.data?.data?.token;
      const expiresAt = data.data?.data?.expiresAt;
      dispatch(setToken({ token: token, expiresAt: expiresAt }));
      await dispatch(fetchUser());
      showMessage({ type: 'success', text: 'Account verified successfully' });

      navigate('/profile/complete');
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setError(err?.message || 'Verification failed');
      showMessage({ type: 'error', text: 'Verification failed' });
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
      return;
    }
    mutation.mutate({ email: email, token: tokenInput });
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full">
      <h2 className="text-3xl font-bold text-center text-primary-teal">
        Verify Your Email
      </h2>
      <p className="text-sm md:text-md text-neutrals-500 pt-5">
        A verification email has been sent to your provided email address.
        Please check your inbox (and spam folder) for the email containing the
        verification token.
      </p>
      <div className="py-10">
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

      <SubmitButton isPending={mutation.isPending} text="Verify Email" />
    </form>
  );
}
