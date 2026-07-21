import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Button({ 
  href, 
  onClick,
  children, 
  variant = 'primary',
  size = 'lg',
  className = '',
  type = 'button'
}: { 
  href?: string; 
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  size?: 'sm' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  const sizeClasses = size === 'sm' ? "h-10 px-6 text-xs" : "h-14 px-10 text-sm";
  const baseStyles = `group relative inline-flex w-fit items-center justify-center overflow-hidden font-medium uppercase tracking-widest transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${sizeClasses} ${className}`;
  
  const variants = {
    primary: "bg-foreground text-background",
    secondary: "border border-foreground bg-transparent text-foreground",
    light: "bg-background text-foreground"
  };

  const innerContent = (
    <>
      {/* Sweep Fill Animation */}
      <span className="absolute inset-0 translate-y-[101%] bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"></span>
      
      {/* Content Container */}
      <span className="relative flex items-center justify-center gap-3 transition-colors duration-700 group-hover:text-white">
        <span className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1">
          {children}
        </span>
        <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100" />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {innerContent}
    </button>
  );
}
