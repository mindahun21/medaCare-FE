import { User } from '../../types/user';

export interface Physician {
  id: number;
  specialization: string | null;
  licenseNumber: string | null;
  availabilitySchedule: string | null;
  education: string | null;
  gender: string;
  dateOfBirth: string;
  age: number;
  experience: number | null;
  languagesSpoken: string | null;
  rating: number;
  email: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  orgnanizationAffiliated: boolean | null;
  accountRequestStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  healthcareProvider: Institution | null;
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
  fileUploads?: string[];
  fileUploadsReference?: number[];
  _links: {
    [key: string]: {
      href: string;
      hreflang?: string;
      title?: string;
      type?: string;
      deprecation?: string;
      profile?: string;
      name?: string;
      templated?: boolean;
    };
  };
}

export interface Institution {
  id: number;
  name: string;
  type: string;
  country: string;
  regionOrState: string;
  subCityOrDistrict: string;
  street: string;
  registrationLicenseNumber: string | null;
  yearEstablished: number | null;
  aboutInstitution: string | null;
  rating: number;
  email: string;
  primaryContactPersonName: string | null;
  primaryContactPersonRole: string | null;
  offeredServices: string | null;
  availableFacilities: string | null;
  offeredSpecializations: string | null;
  createdAt: string;
  updatedAt: string;
  requestStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  documentInvalid: boolean;
  licenseNotValid: boolean;
  identityUnverified: boolean;
  professionallyQualified: boolean;
  rejectionReasonNote: string;
  businessDocumentUrl: string;
  medicalLicenseUrl: string;
  fileUploads?: {
    [key: string]: string;
  };
  _links: {
    [key: string]: {
      href: string;
      hreflang?: string;
      title?: string;
      type?: string;
      deprecation?: string;
      profile?: string;
      name?: string;
      templated?: boolean;
    };
  };
}

export interface Patient {
  id: number;
  dateOfBirth: string;
  age: number;
  address: string;
  contactNumber: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  medicalHistory: string;
  pastDiagnosis: string;
  bloodType: string;
  allergies: string;
  medications: string;
  preferredLanguage: string;
  occupation: string;
  maritalStatus: string;
  heightInMeters: number;
  weightInKg: number;
  gender: string;
  specializationPreference: string[];
  appointments: Appointment[];
  createdAt: string;
  updatedAt: string;
  user: User;
  medicalRecord: MedicalRecord[];
  bmi: number;
}

export interface MedicalRecord {
  diagnosis: string;
  prescription: string;
  notes: string;
  createdAt: string;
  createdOn: string;
  updatedAt: string;
  updatedOn: string;
}

export interface UploadedFiles {
  id: string | number;
  key: string;
  type: string;
  fileName: string;
  url: string;
}

export interface WorkingHour {
  id: number;
  fullDateTime: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  offeredDurationsMinutes: number[];
}

export interface Appointment {
  id: number;
  status: string;
  createdOn: string;
  consultationType: string;
  meetingDetails: string;
  meetingLink: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  appointmentDateTz: string;
  appointmentDate: string;
  physician?: Physician;
  patient: Patient;
}
