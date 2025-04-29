import React, { createContext, useReducer } from "react";
import { loadSession } from "../../util/session";

interface User {
  id: string;
  email: string;
  isConfirm: boolean;
}

type AuthState = {
  token: string | null;
  user: User | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: User } }
  | { type: "LOGOUT" };

export const AuthContext = createContext<
  { states: AuthState; dispatches: React.Dispatch<AuthAction> } | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("sessionAuth");
      return {
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [states, dispatches] = useReducer(authReducer, undefined, loadSession);

  return (
    <AuthContext.Provider value={{ states, dispatches }}>
      {children}
    </AuthContext.Provider>
  );
};
