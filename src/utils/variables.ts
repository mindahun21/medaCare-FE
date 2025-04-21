import { TextFieldProps } from '@mui/material';

export const SharedTextFieldProps: Partial<TextFieldProps> = {
  variant: 'outlined',
  fullWidth: true,
  autoComplete: 'off',
  sx: {
    '& label': {
      fontWeight: 700,
      fontSize: '1rem',
    },
    '& label.Mui-focused': {
      color: 'var(--color-primary-teal)',
    },
    '& .MuiOutlinedInput-root': {
      bgcolor: 'white',
      color: 'var(--color-primary-teal)',
      '& fieldset': {
        borderColor: 'var(--color-neutrals-300)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--color-primary-teal)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--color-primary-teal)',
        borderWidth: 2,
      },
    },
  },
};
