import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { SharedTextFieldProps } from '../../../../utils/variables';
import { CompletePhysicianProfileType } from '../../completeProfileSchema';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CompleteProfileFormOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CompletePhysicianProfileType>();
  return (
    <div className="w-full flex flex-col gap-[37px]">
      <h1 className="text-primary-teal text-[20px] leading-[28px] ">
        Personal Information
      </h1>
      <div>
        <TextField
          {...register('phoneNumber')}
          required
          fullWidth
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          placeholder="+251 9XX XXX XXX"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          {...SharedTextFieldProps}
        />
      </div>
      <div>
        <FormControl fullWidth error={!!errors.gender}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            {...register('gender')}
            defaultValue=""
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender?.message}</p>
          )}
        </FormControl>
      </div>
      <div>
        <TextField
          {...register('dateOfBirth')}
          required
          fullWidth
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          label="Date of Birth"
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </div>
    </div>
  );
}
