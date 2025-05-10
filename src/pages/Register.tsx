import RegisterForm from '../features/authentication/components/RegisterForm';
import { Link } from 'react-router-dom';
import AuthBanner from '../features/authentication/components/AuthBanner';
import { Divider } from '@mui/material';
import Header from '../ui/guest/Header';
export default function Register() {
  return (
    <div className="flex flex-col min-h-screen pb-20 w-full bg overflow-hidden bg-gradient-to-br from-[#DEF1FF] to-[#FFF] justify-center items-center">
      <Header />
      <div className="flex pb-20 w-full md:w-[950px] h-[1000px] mt-[108px] rounded-[30px]">
        {/* Left Image Section */}
        <div className="hidden md:flex w-1/2 h-full overflow-hidden rounded-l-[30px]">
          <img
            src="./images/login_image.png"
            className="w-full h-full object-cover overflow-hidden "
            alt="Registration Illustration"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 max-md:rounded-[30px] md:rounded-r-[30px] bg-white">
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

            <p className="text-primary-teal text-center text-lg md:text-xl mb-14">
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
    </div>
  );
}
