import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  email: string;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, action?: "login" | "signup", name?: string, phone?: string, countryCode?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "nova_ledger_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        if (parsed.email && parsed.token) {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  async function login(
    email: string,
    action: "login" | "signup" = "login",
    name?: string,
    phone?: string,
    countryCode?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action, name, phone, countryCode }),
      });
      const data = (await res.json()) as { success?: boolean; token?: string; email?: string; error?: string };

      if (!res.ok || !data.success || !data.token) {
        return { success: false, error: data.error ?? "La connexion a échoué. Veuillez réessayer." };
      }

      const session: User = { email: data.email ?? email, token: data.token };
      setUser(session);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true };
    } catch {
      return { success: false, error: "Erreur réseau. Veuillez vérifier votre connexion." };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
