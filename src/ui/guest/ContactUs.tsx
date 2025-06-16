import { TextField, TextFieldProps } from '@mui/material';
import PrimaryButton from '../shared/PrimaryButton';

export default function ContactUs() {
  const SharedTextFieldProps: Partial<TextFieldProps> = {
    variant: 'outlined',
    fullWidth: true,
    autoComplete: 'off',
    sx: {
      '& label': {
        fontWeight: 600,
        fontSize: '16px',
      },
      '& label.Mui-focused': {
        color: 'var(--color-primary-teal)',
      },
      '& .MuiOutlinedInput-root': {
        bgcolor: 'white',
        color: 'var(--color-primary-teal)',
        '& fieldset': {
          borderColor: '#32bdff',
          borderWidth: 2,
        },
        '&:hover fieldset': {
          borderColor: '#32bdff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#32bdff',
          borderWidth: 2,
        },
      },
    },
  };
  return (
    <section
      id="contact-us"
      className="flex flex-col items-center bg-white pt-[116px] pb-[124px] px-4"
    >
      <div className="flex flex-col items-center mb-[25px]">
        <h1 className="text-[42px] font-bold leading-[54px] ">
          Reach our
          <span className="gradient-primary px-2">Help Desk</span>
          for support
        </h1>

        <p className="text-[16px] leading-[25px] font-semibold text-neutrals-300  text-center pt-[33px]">
          Questions? Need assistance? Our dedicated support team is here to help
          you every step of the way:
        </p>
        <div className="pt-[54px] flex w-full gap-5">
          <TextField
            label="First Name"
            name="firstName"
            {...SharedTextFieldProps}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            {...SharedTextFieldProps}
          />
          <PrimaryButton text="CONTACT US" className="px-32 text-[15px] " />
        </div>
      </div>
    </section>
  );
}
