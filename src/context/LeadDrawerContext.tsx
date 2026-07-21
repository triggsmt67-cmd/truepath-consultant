"use client";

import React, { createContext, useContext, useState } from "react";

interface LeadDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const LeadDrawerContext = createContext<LeadDrawerContextType | undefined>(undefined);

export function LeadDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <LeadDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </LeadDrawerContext.Provider>
  );
}

export function useLeadDrawer() {
  const context = useContext(LeadDrawerContext);
  if (context === undefined) {
    throw new Error("useLeadDrawer must be used within a LeadDrawerProvider");
  }
  return context;
}
