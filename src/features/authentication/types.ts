export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  origin: string;
}

export type RegisterRequestData = Omit<RegisterFormData, 'confirmPassword'>;
