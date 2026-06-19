"use client";
import { createContext, useContext } from "react";
import { Session } from "next-auth";

type UserContextType = {
  session: Session | null;
};

const UserContext = createContext<UserContextType>({
  session: null,
});

export const UserProvider: React.FC<{
  session: Session | null;
  children: React.ReactNode;
}> = ({ session, children }) => {
  return (
    <UserContext.Provider value={{ session }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
