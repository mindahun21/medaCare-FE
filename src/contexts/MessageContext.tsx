import { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../types/message';

interface MessageContextValue {
  message: Message | null;
  showMessage: (msg: Message) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextValue | undefined>(
  undefined
);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<Message | null>(null);

  const showMessage = (msg: Message) => {
    setMessage(msg);
    if (msg.duration !== 0) {
      setTimeout(() => setMessage(null), msg.duration || 5000);
    }
  };

  const clearMessage = () => setMessage(null);

  return (
    <MessageContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error('useMessage must be used inside a MessageProvider');
  return ctx;
};
