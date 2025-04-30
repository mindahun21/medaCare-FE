import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/authApi';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RegisterFormData } from '../../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../data/hooks';
import { setEmail } from '../../../data/authSlice';
import { useMessage } from '../../../contexts/MessageContext';
import { AxiosError } from 'axios';
import { SharedTextFieldProps } from '../../../utils/variables';
import SubmitButton from '../../../ui/shared/SubmitButton';

type ValidationErrorResponse = {
  status: 'error';
  message: string;
  errors?: Record<string, string>;
};

export default function RegisterForm() {
  const { showMessage } = useMessage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  type RegisterFormErrors = Partial<
    Record<keyof RegisterFormData, string> & {
      noneField: string;
    }
  >;
  const [form, setForm] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    origin: 'SELF_REGISTERED',
    role: 'PHYSICIAN',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showMessage({
        type: 'success',
        text: 'Registration successful, now verify your email.',
      });
      const email = form.email;
      dispatch(setEmail(email));
      navigate('/verify-email');
    },
    onError: (err) => {
      const axiosError = err as AxiosError<ValidationErrorResponse>;
      const response = axiosError.response?.data;
      if (response?.errors) {
        setErrors(response.errors);
      }
      if (response?.message) {
        setErrors((prev) => ({
          ...prev,
          noneField: response.message,
        }));
      }

      const fallbackMessage =
        response?.message || 'Something went wrong, please try again.';
      showMessage({ type: 'error', text: fallbackMessage });
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...data } = form;
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 md:space-y-5 py-10"
    >
      {errors.noneField && (
        <div className=" flex justify-center ">
          <p className="text-red-500 text-center text-2xl ">
            {errors.noneField}
          </p>
        </div>
      )}
      <div>
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          {...SharedTextFieldProps}
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
          {...SharedTextFieldProps}
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
          {...SharedTextFieldProps}
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
          {...SharedTextFieldProps}
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
          {...SharedTextFieldProps}
        />
      </div>

      <SubmitButton isPending={mutation.isPending} text="Sign Up" />
    </form>
  );
}
