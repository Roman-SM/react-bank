export interface UserAuthProvider {
  id: string;
  email: string;
  isConfirm: boolean;
}
export interface RawDataTransactions {
  transactions: {
    id: string;
    date: string;
    sum: number;
    type: string;
    typeEvent: string;
  }[];
}
export interface RawDataNotifications {
  notifications: {
    id: string;
    date: string;
    type: string;
    text: string;
  }[];
}
export interface InputPropsCode {
  text: string;
  name: string;
  value: string;
  variant?: string;
  placeholder: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}
export interface InputPropsEmail {
  name: string;
  value: string;
  variant?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}
export interface LinkProps {
  text: string;
  textLink: string;
  link: string;
}
export interface InputPropsPassword {
  text?: string;
  name: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}
export interface ConfirmProps {
  modalOpen: (open: boolean) => void;
}
