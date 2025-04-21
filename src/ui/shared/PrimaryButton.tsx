interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
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
      className={` w-auto bg-secondary-burgandy hover:bg-secondary-burgandy-hover text-[15px] text-white font-bold py-2 px-4 leading-[27px] tracking-[0.48px] rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap
 ${className}`}
    >
      {text}
    </button>
  );
}
