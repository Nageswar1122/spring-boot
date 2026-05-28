import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { loginUser, registerUser } from "@/api/authApi";
import { updateProfileApi } from "@/api/userApi";

/* ================= TYPES ================= */

interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: Address;
  profileId?: number;
}

interface Admin {
  adminid?: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  userId: number | null; // ✅ NEW
  token: string | null;
  isAuthenticated: boolean;

  // user auth
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  logout: () => void;

  // admin auth
  admin: Admin | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string) => Promise<boolean>;
  adminLogout: () => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);

  /* ===== LOAD SESSION ===== */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("bb_user");
      const storedToken = localStorage.getItem("bb_token");
      const storedAdmin = localStorage.getItem("bb_admin");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken && storedToken !== "undefined") {
        setToken(storedToken);
      }
      if (storedAdmin && storedAdmin !== "undefined") {
        setAdmin(JSON.parse(storedAdmin));
      }
    } catch {
      localStorage.clear();
    }
  }, []);

  /* ================= USER LOGIN ================= */
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);

      const loggedUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        profileId: data.profileId,
      };

      setUser(loggedUser);
      setToken(data.token);

      localStorage.setItem("bb_user", JSON.stringify(loggedUser));
      localStorage.setItem("bb_token", data.token);

      return true;
    } catch {
      return false;
    }
  };

  /* ================= REGISTER ================= */
  const register = async (name: string, email: string, password: string) => {
    try {
      await registerUser(name, email, password);
      return true;
    } catch {
      return false;
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async (updates: Partial<User>) => {
    if (!user || !user.profileId) return;

    const updated = await updateProfileApi(user.profileId, user, updates);

    const mergedUser: User = {
      ...user,
      name: updated.name,
      phone: updated.phone,
      address: {
        street: updated.street,
        city: updated.city,
        state: updated.state,
        zipCode: updated.zipcode,
        country: updated.country,
      },
    };

    setUser(mergedUser);
    localStorage.setItem("bb_user", JSON.stringify(mergedUser));
  };

  /* ================= ADMIN LOGIN ================= */
  const adminLogin = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/admins/login?email=${email}`,
        { method: "POST" }
      );

      if (!res.ok) return false;

      const adminData = await res.json();

      setAdmin(adminData);
      localStorage.setItem("bb_admin", JSON.stringify(adminData));

      return true;
    } catch {
      return false;
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("bb_admin");
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setUser(null);
    setToken(null);
    setAdmin(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId: user?.id ?? null, // ✅ NEW
        token,
        isAuthenticated: !!token,

        login,
        register,
        updateProfile,
        logout,

        admin,
        isAdminAuthenticated: !!admin,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
