import { Link } from 'react-router-dom';

export default function Guest() {
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <Link to="/register" className="text-3xl text-green-600 hover:underline">
        Get Started
      </Link>
    </div>
  );
}
