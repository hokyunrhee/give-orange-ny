import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative antialiased flex-grow max-w-[320px] w-full flex flex-col text-GRAY">
      {children}

      <div className="text-center mb-8">
        <div className="flex justify-center">
          <img className="h-8" src="/logo.png" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
