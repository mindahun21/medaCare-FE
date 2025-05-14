import { useEffect, useRef, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SendIcon from '@mui/icons-material/Send';
import apiClient from '../../services/apiClient';
import { marked } from 'marked';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export default function ConsultationChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const stored = sessionStorage.getItem('chatMessages');
    if (stored && JSON.parse(stored).length > 0) {
      setMessages(JSON.parse(stored));
      console.log(JSON.parse(stored));
      console.log('hear hear ....');
    } else {
      const initial: Message[] = [
        { sender: 'bot', text: 'Hi Abebe!' },
        { sender: 'bot', text: 'How can I assist you?' },
      ];
      setMessages(initial);
      sessionStorage.setItem('chatMessages', JSON.stringify(initial));
    }
  }, [open]);

  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    // Auto-scroll to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: 'user', text: message },
    ];
    setMessages(newMessages);
    setMessage('');
    setLoading(true);

    try {
      const response = await apiClient.post(
        'assistance/consultation',
        message,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
      const botResponse = response.data || 'Sorry, something went wrong.';
      console.log(response.data);
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    } catch {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Failed to get response.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-red-50">
      {/* Chat Window */}
      {open && (
        <div className="transition-all duration-500 fixed bottom-6 right-6 z-40 w-[400px] h-[780px] max-h-[100vh] flex flex-col rounded-lg overflow-hidden bg-white shadow-2xl">
          <div className="min-h-[67px] h-[67px] flex gap-4 items-center px-[30px] bg-[#EFF9FF]">
            <button className="text-[#A55D68]" onClick={() => setOpen(false)}>
              <ArrowDownwardIcon />
            </button>
            <p className="text-primary-teal font-medium">AI Chat Assistant</p>
          </div>

          <div
            ref={containerRef}
            className="flex-grow flex flex-col px-[20px] overflow-y-auto py-4 scrollbar-hide "
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end mb-3 gap-3 ${
                  msg.sender === 'bot' ? '' : 'flex-row-reverse'
                }`}
              >
                <div
                  className="w-[52px] h-[52px] rounded-full overflow-hidden bg-no-repeat bg-cover flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundImage: "url('/images/bot_bg.png')" }}
                >
                  <img
                    src={
                      msg.sender === 'bot'
                        ? '/images/bot_avatar.png'
                        : '/images/user_avatar.png'
                    }
                    className="w-[40px] h-[40px] object-cover"
                    alt="Avatar"
                  />
                </div>
                <div className="bg-[#EFF9FF] rounded-xl p-[15px] max-w-[80%]">
                  <div
                    className="text-sm text-gray-800 whitespace-pre-wrap markdown-body"
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="h-[56px] mx-[20px] mb-[20px] flex gap-4 bg-white rounded-full shadow-[0_-6px_12px_rgba(0,0,0,0.03),0_6px_12px_rgba(0,0,0,0.08)] px-4">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              maxLength={250}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Write your message..."
              className="w-full bg-transparent outline-none focus:outline-none active:outline-none border-none text-gray-800 placeholder:text-gray-400 py-2"
            />
            <button
              className="text-secondary-burgandy disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!open && (
        <button
          className="w-20 h-20 bg-no-repeat bg-cover fixed bottom-6 right-6 z-50 transition-all duration-500"
          onClick={() => setOpen(true)}
          style={{ backgroundImage: "url('/images/bot_bg.png')" }}
        >
          <img
            src="/images/bot_avatar.png"
            className="absolute inset-0 m-auto w-16 h-16 object-cover"
            alt="Bot"
          />
        </button>
      )}
    </div>
  );
}
