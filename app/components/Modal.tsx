import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
