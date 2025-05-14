import { TextField } from '@mui/material';
import AuthBanner from '../features/authentication/components/AuthBanner';
import Header from '../ui/guest/Header';
import { SharedTextFieldProps } from '../utils/variables';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authentication/AuthSelectors';
import { resetPassword } from '../features/authentication/services/authApi';
import SubmitButton from '../ui/shared/SubmitButton';
import { useAppDispatch } from '../data/hooks';
import { useMessage } from '../contexts/MessageContext';
import { fetchUser } from '../data/authSlice';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { showMessage } = useMessage();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async () => {
      await dispatch(fetchUser());
      showMessage({ type: 'success', text: 'Password reset successfully' });

      navigate('/home/dashboard');
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setError(err?.message || 'Password reset Failed');
      showMessage({ type: 'error', text: 'Password reset Failed' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!newPassword) {
      setError('Password is required');
      return;
    }
    if (!user?.email) {
      return;
    }
    mutation.mutate({ email: user.email, password: newPassword });
  };
  return (
    <div className="flex flex-col min-h-screen pb-20 w-full bg overflow-hidden bg-gradient-to-br from-[#DEF1FF] to-[#FFF] justify-center items-center">
      <Header />
      <div className="w-[500px] gap-[25px] px-[34px] mt-[108px] pb-20  rounded-[17px] bg-white flex flex-col items-center ">
        <div className="flex w-[968px] rounded-[30px]">
          <div className="flex flex-col justify-center items-center min-w-96 sm:w-[400px] gap-3 m-auto px-4">
            <AuthBanner />
            <form onSubmit={handleSubmit} className=" w-full">
              <h2 className="text-3xl font-bold text-center text-primary-teal">
                Reset your password
              </h2>
              <p className="text-sm md:text-md text-neutrals-500 pt-5">
                Password reset is required for your Account. please enter new
                strong password
              </p>
              <div className="py-10">
                <TextField
                  id="new-password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={!!error}
                  helperText={error}
                  {...SharedTextFieldProps}
                />
              </div>

              <SubmitButton
                isPending={mutation.isPending}
                text="Reset Password"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
