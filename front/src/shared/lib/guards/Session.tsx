import { AuthState } from "@shared/types";

export const loadSession = (): AuthState => {
  try {
    const session = localStorage.getItem("sessionAuth");
    if (!session) return { token: null, user: null };
    const parsed = JSON.parse(session);
    return {
      token: parsed?.token ?? null,
      user: parsed?.user ?? null,
    };
  } catch {
    return { token: null, user: null };
  }
};
