import { Button, CircularProgress } from '@mui/material';
export default function SubmitButton({
  isPending,
  text,
  onClick,
  type = 'submit',
  icon,
}: {
  isPending: boolean;
  text: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      disabled={isPending}
      onClick={type !== 'submit' ? onClick : undefined}
      sx={{
        fontWeight: 600,
        py: 1.5,
        borderRadius: '0.3rem',
        backgroundColor: 'var(--color-secondary-burgandy)',
        '&:hover': {
          backgroundColor: 'var(--color-secondary-burgandy)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--color-secondary-burgandy-disabled)',
          opacity: 0.8,
        },
      }}
      startIcon={!isPending && icon ? icon : undefined}
    >
      {isPending ? (
        <span className="text-primary-teal">
          <CircularProgress size={20} color="inherit" />
        </span>
      ) : (
        text
      )}
    </Button>
  );
}
