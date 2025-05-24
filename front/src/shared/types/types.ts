import { UserAuthProvider } from "./interfaces";

export type NotificationList = {
  date: string;
  type: string;
  text: string;
};
export type AuthState = {
  token: string | null;
  user: UserAuthProvider | null;
};
export type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: UserAuthProvider } }
  | { type: "LOGOUT" };

export type BackButtonProps = {
  title?: string;
  retreat?: "retreat";
  backBalance?: boolean;
};
export type ButtonProps = {
  text: string;
  variant?: "filled" | "outline" | "outline-red";
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
};
export type TitleProps = {
  title: string;
  description: string;
  variantContainer?: "welcome-page-container";
  variantText?: "welcome-page-text";
  variantDescr?: "welcome-page-description";
};
export type NotificationWarningType = {
  date: string;
  type: string;
  status: string;
  text: string;
  email: string;
};
export type NotificationDepositType = {
  date: string;
  email: string;
  text: string;
  typeNotification: string;
  status: string;
  sum: number;
};
export type NotificationTransferType = {
  date: string;
  emailSender: string;
  emailRecipient: string;
  typeNotification: string;
  text: string;
  sum: string;
  status: string;
  typeTransfer: string;
};
