import RegisterForm from '../features/authentication/components/RegisterForm';
import { Link } from 'react-router-dom';
import AuthBanner from '../features/authentication/components/AuthBanner';
import { Divider } from '@mui/material';
export default function Register() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="./images/login_image.png"
          className="w-full h-full object-cover"
          alt="Registration Illustration"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4">
        <div className="w-full max-w-md">
          <AuthBanner />

          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-teal mb-6">
            Create an Account
          </h2>

          <RegisterForm />

          <div className="w-full my-6">
            <Divider
              sx={{
                color: 'var(--color-secondary-gray)',
                fontWeight: 'medium',
              }}
            >
              Or
            </Divider>
          </div>

          <p className="text-primary-teal text-center text-lg md:text-xl">
            Already have an account?
            <Link
              to="/login?prev=register"
              className="text-secondary-burgandy text-lg md:text-xl hover:underline ps-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
