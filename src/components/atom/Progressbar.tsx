import React, { useRef, useEffect } from 'react';

interface Props {
  current: number;
  total: number;
}

const Progressbar: React.FC<Props> = ({ current, total }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (current > total || !progressRef.current) return;
    progressRef.current.style.width = `${(current / total) * 100}%`;
  }, [current, total]);

  return (
    <div className="w-full">
      <div className="h-1 rounded-full overflow-hidden bg-GRAY">
        <div
          className="h-full transition duration-700 ease-in-out bg-PRIMARY"
          ref={progressRef}
        />
      </div>
    </div>
  );
};

export default Progressbar;
