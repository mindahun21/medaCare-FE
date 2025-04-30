import apiClient from '../../../services/apiClient';
import { LoginFormData, RegisterRequestData } from '../../../types/auth';
import { InstitutionRequestSchemaType } from '../InstitutionRequestSchema';

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

export async function sendInstitutionrequest(
  formData: Partial<InstitutionRequestSchemaType>
) {
  const response = await apiClient.post('institutions', formData);
  return response;
}
