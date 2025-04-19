import { useMessage } from '../contexts/MessageContext';
import { twMerge } from 'tailwind-merge';

const messageColors = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
  warning: 'bg-yellow-600 text-black',
};

export default function GlobalMessage() {
  const { message, clearMessage } = useMessage();

  if (message && message.duration !== 0) {
    setTimeout(() => {
      clearMessage();
    }, message.duration || 5000);
  }

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
    </div>
  );
}
