import apiClient from '../../../services/apiClient';
import { LoginFormData, RegisterRequestData } from '../../../types/auth';

export async function registerUser(formData: RegisterRequestData) {
  const response = await apiClient.post('auth/signup', formData);

  return response;
}

export async function loginUser(formData: LoginFormData) {
  const response = await apiClient.post('auth/login', formData);

  return response;
}

export async function verifyEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const response = await apiClient.post(
    `auth/verify-email?email=${email}&token=${token}`
  );

  return response;
}

export async function resendEmail({ email }: { email: string }) {
  const response = await apiClient.post(
    `auth/email/verification?email=${email}`
  );
  return response;
}

export async function sendInstitutionrequest(formData: FormData) {
  const response = await apiClient.post('institutions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function resetPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await apiClient.patch(`auth/password-reset`, {
    email: email,
    password: password,
  });

  return response;
}
