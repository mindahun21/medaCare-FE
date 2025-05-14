import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { AddPhysicianType } from '../schema';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SharedTextFieldProps } from '../../../utils/variables';

export default function AddPhysicianFormOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddPhysicianType>();

  return (
    <div className="w-full flex flex-col gap-[37px]">
      <h1 className="text-primary-teal text-[20px] leading-[28px]">
        Physician Information
      </h1>

      <TextField
        {...register('firstName')}
        required
        fullWidth
        id="firstName"
        label="First Name"
        placeholder="Enter first name"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('lastName')}
        required
        fullWidth
        id="lastName"
        label="Last Name"
        placeholder="Enter last name"
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('email')}
        required
        fullWidth
        type="email"
        id="email"
        label="Email"
        placeholder="example@domain.com"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('phoneNumber')}
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        placeholder="+251 9XX XXX XXX"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
        {...SharedTextFieldProps}
      />

      <FormControl fullWidth error={!!errors.gender}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          defaultValue=""
          label="Gender"
          {...register('gender')}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        {errors.gender && (
          <p className="text-red-500 text-xs">{errors.gender.message}</p>
        )}
      </FormControl>

      <TextField
        {...register('dateOfBirth')}
        required
        fullWidth
        type="date"
        id="dateOfBirth"
        label="Date of Birth"
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth?.message}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <TextField
        {...register('specialization')}
        required
        fullWidth
        id="specialization"
        label="Specialization"
        placeholder="e.g. Cardiologist"
        error={!!errors.specialization}
        helperText={errors.specialization?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('languagesSpoken')}
        required
        fullWidth
        id="languagesSpoken"
        label="languages spoken"
        placeholder="e.g. Amharic, English"
        error={!!errors.languagesSpoken}
        helperText={errors.languagesSpoken?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('licenseNumber')}
        required
        fullWidth
        id="licenseNumber"
        label="License Number"
        placeholder="Enter license number"
        error={!!errors.licenseNumber}
        helperText={errors.licenseNumber?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('education')}
        required
        fullWidth
        id="education"
        label="Education"
        placeholder="Enter education background"
        error={!!errors.education}
        helperText={errors.education?.message}
        {...SharedTextFieldProps}
      />

      <TextField
        {...register('experience')}
        required
        fullWidth
        type="number"
        id="experience"
        label="Experience (Years)"
        placeholder="e.g. 5"
        error={!!errors.experience}
        helperText={errors.experience?.message}
        {...SharedTextFieldProps}
      />
    </div>
  );
}
