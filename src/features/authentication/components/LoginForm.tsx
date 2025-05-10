import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authApi';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { LoginFormData } from '../../../types/auth';
import { useAppDispatch } from '../../../data/hooks';
import { fetchUser, setToken } from '../../../data/authSlice';
import { useMessage } from '../../../contexts/MessageContext';
import { AxiosError } from 'axios';
import { SharedTextFieldProps } from '../../../utils/variables';
import SubmitButton from '../../../ui/shared/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectUserRole } from '../AuthSelectors';
import { useSelector } from 'react-redux';
import { isPhysicianEntity } from '../../../types/user';

type ErrorResponse = {
  status: string;
  message: string;
};

export default function LoginForm() {
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  type LoginFormErrors = Partial<
    Record<'email' | 'password' | 'noneField', string>
  >;
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const user = useSelector(selectUser);
  const role = useSelector(selectUserRole);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      const token = data.data?.data?.token;
      const expiresAt = data.data?.data?.expiresAt;
      dispatch(setToken({ token: token, expiresAt: expiresAt }));
      await dispatch(fetchUser());
      const firstLogin = user?.firstLogin;

      if (
        role === 'PHYSICIAN' &&
        user?.entity &&
        isPhysicianEntity(user?.entity)
      ) {
        const status = user?.entity?.accountRequestStatus;
        if (firstLogin) {
          navigate('/profile/complete');
          showMessage({ type: 'info', text: 'Your profile not complete yet!' });

          return;
        }

        if (status === 'PENDING') {
          navigate('/');
          showMessage({
            type: 'info',
            text: 'Your account request has been submitted and is pending approval.',
          });
          return;
        }
        if (status === 'REJECTED') {
          navigate('/');

          showMessage({
            type: 'warning',
            text: 'Your account has been rejected.',
          });
        }
      }
      showMessage({ type: 'success', text: 'Login Successful!' });
      navigate('/home/dashboard');
    },
    onError: (err) => {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as ErrorResponse;

      if (axiosError) {
        if (axiosError.response?.status === 401) {
          setErrors((prev) => ({
            ...prev,
            noneField: 'Email or password is incorrect',
          }));
        } else if (errorData.message) {
          showMessage({
            type: 'error',
            text: errorData.message,
          });
          setErrors((prev) => ({
            ...prev,
            noneField: errorData.message,
          }));
        }
      }
      showMessage({ type: 'error', text: 'Something went wrong!' });
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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-5 md:space-y-10 py-10"
    >
      {errors.noneField && (
        <p className="text-red-500 text-center">{errors.noneField}</p>
      )}
      <div>
        <TextField
          id="email"
          name="email"
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
          name="password"
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

      <SubmitButton text="Sign In" isPending={mutation.isPending} />
    </form>
  );
}
