import AuthBanner from '../features/authentication/components/AuthBanner';
import { Divider } from '@mui/material';
import LoginForm from '../features/authentication/components/LoginForm';
import TextButton from '../ui/shared/TextButton';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const prevRoute = searchParams.get('prev') || 'register';

  return (
    <div className="flex min-h-screen py-20 w-full bg overflow-hidden bg-gradient-to-br from-[#DEF1FF] to-[#FFF] justify-center items-center">
      <div className="flex w-[968px] rounded-[30px]">
        {/* Left Image */}
        <div className="hidden md:flex h-full rounded-l-[30px] overflow-hidden">
          <img
            src="./images/login_image.png"
            className="w-full h-full object-cover "
            alt="Login Illustration"
          />
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 bg-white rounded-r-[30px]">
          <div className="w-full max-w-md">
            <AuthBanner />

            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-teal mb-6">
              Sign In
            </h2>

            <LoginForm />

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
              Don’t have an account?
              <TextButton
                text="Sign Up"
                onClick={() => navigate(`/${prevRoute}`)}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
