import { CircularProgress } from '@mui/material';

export default function PageLoader() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#e7f5ff] to-[#FFF]">
      <CircularProgress size={50} />
    </div>
  );
}
