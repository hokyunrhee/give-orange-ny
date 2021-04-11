import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex-grow max-w-[360px] w-full flex flex-col text-GRAY">
      {children}
    </div>
  );
};

export default AppLayout;
