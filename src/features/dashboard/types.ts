export interface Physician {
  id: number;
  specialization: string;
  licenseNumber: string;
  availabilitySchedule: string;
  education: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  experience: number;
  languagesSpoken: string;
  rating: number;
  email: string;
  firstName: string;
  lastName: string;
  orgnanizationAffiliated: boolean;
  accountRequestStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  fileUploads: string[];
  fileUploadsReference: number[];
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
  requestStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  fileUploads: {
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
