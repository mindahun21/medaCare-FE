import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { SharedTextFieldProps } from '../../../utils/variables';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  ethiopianRegions,
  InstitutionRequestSchemaType,
  institutionTypes,
  subcityOptions,
} from '../InstitutionRequestSchema';

export default function InstitutionRequestFormOne() {
  const selectedRegion = useWatch({ name: 'region' });
  const availableSubcities = subcityOptions[selectedRegion] || [];
  const {
    register,
    formState: { errors },
  } = useFormContext<InstitutionRequestSchemaType>();
  return (
    <div className="w-full flex flex-col items-start gap-[37px]">
      <h1 className="text-primary-teal font-medium text-[21px] leading-[28px]">
        Basic Institution Information
      </h1>
      <TextField
        {...register('institutionName')}
        required
        fullWidth
        type="text"
        id="institutionName"
        name="institutionName"
        label="Institution Name"
        placeholder="Enter your institution name"
        error={!!errors.institutionName}
        helperText={errors.institutionName?.message}
        {...SharedTextFieldProps}
      />
      <div className="w-full">
        <FormControl fullWidth>
          <InputLabel id="institution-type">Institution Type</InputLabel>
          <Select
            labelId="institution-type"
            id="institution-type"
            {...register('institutionType')}
            defaultValue=""
            label="Institution Type"
          >
            <MenuItem value="">Select institution type</MenuItem>
            {institutionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
          {errors.institutionType && (
            <p className="text-red-500 text-xs">
              {errors.institutionType?.message}
            </p>
          )}
        </FormControl>
      </div>
      <TextField
        {...register('email')}
        required
        fullWidth
        type="text"
        id="email"
        name="email"
        label="Email"
        placeholder="Enter your institution email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...SharedTextFieldProps}
      />
      <TextField
        fullWidth
        disabled
        defaultValue="Ethiopian"
        label="Country"
        id="country"
      />
      <div className="w-full">
        <FormControl fullWidth>
          <InputLabel id="rigion-state">Rigion/state</InputLabel>
          <Select
            labelId="rigion-state"
            id="rigion"
            {...register('region')}
            defaultValue=""
            label="Rigion/state"
          >
            <MenuItem value="">Select region/state</MenuItem>{' '}
            {ethiopianRegions.map((type) => (
              <MenuItem key={type} value={type}>
                {type
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
          {errors.region && (
            <p className="text-red-500 text-xs">
              {errors.institutionType?.message}
            </p>
          )}
        </FormControl>
      </div>
      <div className="w-full">
        <FormControl fullWidth disabled={availableSubcities.length === 0}>
          <InputLabel id="district-label">Sub-city/District</InputLabel>
          <Select
            labelId="district-label"
            id="sub-city"
            {...register('subcity')}
            defaultValue=""
            label="sub-city/District"
          >
            <MenuItem value="">Select Sub-city/District</MenuItem>
            {availableSubcities.map((subcity) => (
              <MenuItem key={subcity} value={subcity}>
                {subcity}
              </MenuItem>
            ))}
          </Select>
          {errors.subcity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.subcity.message}
            </p>
          )}
        </FormControl>
      </div>
      <TextField
        required
        fullWidth
        {...register('street')}
        type="text"
        id="street"
        name="street"
        label="Street"
        placeholder="Enter your street"
        error={!!errors.street}
        helperText={errors.street?.message}
        {...SharedTextFieldProps}
      />
    </div>
  );
}
