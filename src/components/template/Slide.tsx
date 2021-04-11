import React, { useState } from 'react';

import Button from 'src/components/atom/Button';

import { Item } from 'src/types';

type MBTI = {
  [key: string]: number;
  EI: number;
  SN: number;
  TF: number;
  JP: number;
};

interface Props {
  item: Item;
  onClick: () => void;
  mbti: MBTI;
  setMbti: (mbti: MBTI) => void;
}

const Slide: React.FC<Props> = ({
  item,
  onClick: moveToNext,
  mbti,
  setMbti,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);

    const target = event.target as HTMLButtonElement;
    const value = target.getAttribute('data-value') ?? 0;

    setMbti({ ...mbti, [item.type]: mbti[item.type] + +value });

    moveToNext();
  };

  return (
    <div className="flex-shrink-0 w-full flex flex-col">
      <div className="my-auto">
        <p className="text-center font-bold text-[24px] px-4 min-h-[108px]">
          {item.question}
        </p>

        <div className="my-20 space-y-4">
          <Button
            onClick={onClick}
            className="mx-auto border border-PRIMARY text-GRAY hover:bg-PRIMARY hover:text-WHITE active:bg-PRIMARY active:text-WHITE transition duration-100 ease-in-out"
            data-no={item.no}
            data-value="1"
            disabled={isClicked}
          >
            {item.answer[0].text}
          </Button>
          <Button
            onClick={onClick}
            className="mx-auto border border-PRIMARY text-GRAY hover:bg-PRIMARY hover:text-WHITE active:bg-PRIMARY active:text-WHITE transition duration-100 ease-in-out"
            data-no={item.no}
            data-value="0"
            disabled={isClicked}
          >
            {item.answer[1].text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
