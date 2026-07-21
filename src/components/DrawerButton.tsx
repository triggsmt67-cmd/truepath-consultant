"use client";

import Button from "@/components/Button";
import { useLeadDrawer } from "@/context/LeadDrawerContext";

export default function DrawerButton({ 
  children, 
  variant = "primary",
  className = ""
}: { 
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  const { openDrawer } = useLeadDrawer();
  
  return (
    <Button variant={variant} className={className} onClick={openDrawer}>
      {children}
    </Button>
  );
}
