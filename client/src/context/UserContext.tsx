import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
