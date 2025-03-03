
import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  variant = 'filled', 
  size = 'md', 
  fullWidth = false, 
  leftIcon,
  rightIcon,
  className,
  ...props 
}) => {
  // Base classes
  let baseClasses = "rounded-full font-medium transition-all active:scale-95 flex items-center justify-center";
  
  // Variant classes
  const variantClasses = {
    filled: "bg-app-blue text-white hover:bg-blue-600",
    outline: "border border-app-blue text-app-blue hover:bg-app-light-blue",
    ghost: "text-app-blue hover:bg-app-light-blue"
  };
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6"
  };
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className || ''}`;
  
  return (
    <button className={combinedClasses} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default PrimaryButton;
