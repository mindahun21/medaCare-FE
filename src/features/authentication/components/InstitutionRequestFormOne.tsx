import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { SharedTextFieldProps } from '../../../utils/variables';

export default function InstitutionRequestFormOne() {
  return (
    <div className="w-full flex flex-col items-start gap-[37px]">
      <h1 className="text-primary-teal font-medium text-[21px] leading-[28px]">
        Basic Institution Information
      </h1>
      <TextField
        required
        fullWidth
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        label="Institution Name"
        placeholder="Enter your institution name"
        {...SharedTextFieldProps}
      />
      <div className="w-full">
        <FormControl fullWidth>
          <InputLabel id="institution-type">Institution Type</InputLabel>
          <Select
            labelId="institution-type"
            id="institution-type"
            // {...register('gender')}
            defaultValue=""
            label="Institution Type"
          >
            <MenuItem value="hospital">Hospital</MenuItem>
          </Select>
          {/* {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender?.message}</p>
          )} */}
        </FormControl>
      </div>
      <div className="w-full">
        <FormControl fullWidth>
          <InputLabel id="rigion-state">Rigion/state</InputLabel>
          <Select
            labelId="rigion-state"
            id="rigion-state"
            // {...register('gender')}
            defaultValue=""
            label="Rigion/state"
          >
            <MenuItem value="hospital">Addis Ababa</MenuItem>
          </Select>
          {/* {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender?.message}</p>
          )} */}
        </FormControl>
      </div>
      <div className="w-full">
        <FormControl fullWidth>
          <InputLabel id="district-label">Sub-city/District</InputLabel>
          <Select
            labelId="district-label"
            id="district"
            // {...register('gender')}
            defaultValue=""
            label="sub-city/District"
          >
            <MenuItem value="hospital">Addis Ababa</MenuItem>
          </Select>
          {/* {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender?.message}</p>
          )} */}
        </FormControl>
      </div>
      <TextField
        required
        fullWidth
        type="text"
        id="street"
        name="street"
        label="Street"
        placeholder="Enter your street"
        {...SharedTextFieldProps}
      />
    </div>
  );
}
