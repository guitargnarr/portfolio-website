import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return <ShadcnButton onClick={onClick}>{children}</ShadcnButton>;
}
