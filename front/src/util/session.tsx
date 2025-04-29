interface User {
  id: string;
  email: string;
  isConfirm: boolean;
}

type AuthState = {
  token: string | null;
  user: User | null;
};

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
