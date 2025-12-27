// context/UserContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { profile } from "@/services/user-service";
import toast from "react-hot-toast";
import { getLocalStorageItem } from "@/lib/localStorage";
import { getConfigurations } from "@/services/public-service";

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  fetchUserProfile: () => Promise<void>;
  configurations?: any
  isLoggedIn?: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [configurations, setConfigurations] = useState<any>(null);

  const loadConfigurations = () => {
    getConfigurations().then((res: any) => {
      setConfigurations(res.data);
    }).then((err) => {

    });
  }

  const fetchUserProfile = async () => {
    try {
      const res: any = await profile();
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      toast.error("Failed to load user profile");
    }
  };

  useEffect(() => {
    const token = getLocalStorageItem("authToken");
    if (token) {
      fetchUserProfile();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    loadConfigurations();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserProfile, configurations, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
