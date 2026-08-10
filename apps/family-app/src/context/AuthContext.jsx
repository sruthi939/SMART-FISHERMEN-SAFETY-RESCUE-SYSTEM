import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user] = useState({ id: 'u-fam-01', name: 'Lakshmi Kumar', role: 'family' });
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
