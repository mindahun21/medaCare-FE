interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function TextButton({
  text,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` w-auto text-secondary-burgandy hover:text-secondary-burgandy-hover hover:underline font-bold py-2 px-7 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
}
