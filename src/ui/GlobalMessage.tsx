import { useEffect } from 'react';
import { useMessage } from '../contexts/MessageContext';
import { twMerge } from 'tailwind-merge';
import CloseIcon from '@mui/icons-material/Close';

const messageColors = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
  warning: 'bg-yellow-600 text-black',
};

export default function GlobalMessage() {
  const { message, clearMessage } = useMessage();

  useEffect(() => {
    if (!message || message.duration === 0) return;

    const timeout = setTimeout(() => {
      clearMessage();
    }, message.duration || 8000);

    return () => clearTimeout(timeout);
  }, [message, clearMessage]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {message && (
        <div
          className={twMerge(
            'px-6 py-4 rounded-lg shadow-lg max-w-sm',
            messageColors[message.type]
          )}
        >
          <div className="text-lg font-medium">{message.text}</div>
        </div>
      )}
      <button
        className="absolute top-1 right-2 border border-white flex items-center text-white rounded-full cursor-pointer"
        onClick={() => clearMessage()}
      >
        <CloseIcon sx={{ height: 16, width: 16 }} />
      </button>
    </div>
  );
}
