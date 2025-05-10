export type Role = {
  id: number;
  name: 'PATIENT' | 'ADMIN' | 'ORG_ADMIN' | 'PHYSICIAN';
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Authority = {
  authority: string;
};

export type PhysicianEntity = {
  id: number;
  specialization: string | null;
  licenseNumber: string | null;
  availabilitySchedule: string | null;
  education: string | null;
  gender: string;
  dateOfBirth: string;
  age: number;
  experience: string | null;
  languagesSpoken: string | null;
  rating: number;
  email: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  orgnanizationAffiliated: string | null;
  accountRequestStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  healthcareProvider: string | null;
  documentInvalid: boolean;
  licenseNotValid: boolean;
  identityUnverified: boolean;
  professionallyQualified: boolean;
  rejectionReasonNote: string;
  profilePhotoUrl: string;
  nationalIdUrl: string;
  resumeUrl: string;
  medicalLicenseUrl: string;
  specializationUrl: string;
  degreeCertificateUrl: string;
  // availabilitySlots: any[];
  // appointments: any[];
};

export type InstitutionEntity = {
  id: number;
  name: string;
  type: 'HOSPITAL' | string;
  country: string;
  regionOrState: string;
  subCityOrDistrict: string;
  street: string;
  registrationLicenseNumber: string;
  yearEstablished: number;
  aboutInstitution: string;
  rating: number;
  email: string;
  primaryContactPersonName: string;
  primaryContactPersonRole: string;
  offeredServices: string;
  availableFacilities: string;
  offeredSpecializations: string;
  createdAt: string;
  updatedAt: string;
  requestStatus: 'APPROVED' | 'PENDING' | 'REJECTED' | string;
  documentInvalid: boolean;
  licenseNotValid: boolean;
  identityUnverified: boolean;
  professionallyQualified: boolean;
  rejectionReasonNote: string;
  businessDocumentUrl: string | null;
  medicalLicenseUrl: string | null;
  companyLogo: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordResetRequired: boolean;
  firstLogin: boolean;
  verified: boolean;
  entity: PhysicianEntity | InstitutionEntity | null;
  origin: string;
  role: Role;
  roleName: 'PATIENT' | 'ADMIN' | 'ORG_ADMIN' | 'PHYSICIAN';
  createdAt: string;
  createdOn: string;
  updatedAt: string;
  updatedOn: string;
  photoLink: string | null;
  active?: boolean;
  enabled: boolean;
  authorities: Authority[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  username?: string;
};

export function isPhysicianEntity(
  entity: PhysicianEntity | InstitutionEntity
): entity is PhysicianEntity {
  return (entity as PhysicianEntity).accountRequestStatus !== undefined;
}

export function isInstitutionEntity(
  entity: PhysicianEntity | InstitutionEntity
): entity is InstitutionEntity {
  return (entity as InstitutionEntity).registrationLicenseNumber !== undefined;
}
