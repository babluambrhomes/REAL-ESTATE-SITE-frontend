export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pending?: boolean;
  pendingLabel?: string;
};

export interface HeaderSidebarProps {
  open: boolean;
  onClose: () => void;
}
