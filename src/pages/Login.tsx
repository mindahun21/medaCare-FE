import LoginForm from '../features/authentication/components/LoginForm';
import { Link } from 'react-router-dom';
import AuthBanner from '../features/authentication/components/AuthBanner';

export default function Login() {
  return (
    <div className="h-screen flex flex-col justify-center items-center sm:w-[400px] gap-6 m-auto ">
      <AuthBanner />
      <h2 className="text-3xl font-bold text-center text-primary-teal ">
        Sign In
      </h2>

      <LoginForm />
      <div className="mt-5">
        <p className="text-primary-teal  text-2xl ">
          Don't have an account?
          <Link
            to="/register"
            className="text-secondary-burgandy text-3xl hover:underline ps-3"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
