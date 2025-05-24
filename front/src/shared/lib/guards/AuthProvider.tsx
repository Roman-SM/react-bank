import React, { createContext, useReducer } from "react";
import { loadSession } from "./Session";
import { AuthAction, AuthState } from "@shared/types";

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
