import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`max-w-[320px] w-full h-[80px] p-8 flex justify-center items-center text-sm focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
