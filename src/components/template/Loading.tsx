import React from 'react';

const Loading = () => {
  return (
    <div className="flex-shrink-0 w-full flex flex-col items-center">
      <div className="flex character" />
      <p className="font-bold text-xl mt-4 text-PRIMARY">분석중</p>
    </div>
  );
};

export default Loading;
