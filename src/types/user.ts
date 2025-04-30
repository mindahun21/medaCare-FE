export type Role = {
  id: number;
  name: 'PATIENT' | 'ADMIN' | 'INSTITUTION' | 'PHYSICIAN';
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Authority = {
  authority: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  firstLogin: boolean;
  verified: boolean;
  gender?: string;
  origin: string;
  role: Role;
  createdAt: string;
  createdOn: string;
  updatedAt: string;
  updatedOn: string;
  active: boolean;
  enabled: boolean;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  username: string;
};
