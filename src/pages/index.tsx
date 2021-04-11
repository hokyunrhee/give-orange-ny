import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import Main from 'src/components/template/Main';
import Slide from 'src/components/template/Slide';
import Progressbar from 'src/components/atom/Progressbar';

import { Item } from 'src/types';

import fs from 'fs';
import path from 'path';

const MBTI_TYPES = {
  ISTJ: 1,
  ISFJ: 2,
  INFJ: 3,
  INTJ: 4,
  ISTP: 5,
  ISFP: 6,
  INFP: 7,
  INTP: 8,
  ESTP: 9,
  ESFP: 10,
  ENFP: 11,
  ENTP: 12,
  ESTJ: 13,
  ESFJ: 14,
  ENFJ: 15,
  ENTJ: 16,
};

interface Props {
  questions: Item[];
}

export default function Home({ questions }: Props) {
  const router = useRouter();

  const slideRef = useRef<HTMLDivElement>(null);

  const [slide, setSlide] = useState(0);

  const [mbti, setMbti] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });

  const moveToNext = () => {
    setSlide((prev) => prev + 1);
  };

  useEffect(() => {
    if (!slideRef.current) return;
    slideRef.current.style.transform = `translateX(-${slide}00%)`;
  }, [slide]);

  return (
    <div className="relative flex-grow flex flex-col justify-center overflow-x-hidden">
      {slide > 0 && slide <= questions.length && (
        <div className="absolute top-20 left-0 right-0">
          <div className="w-[330px] mx-auto">
            <Progressbar current={slide} total={questions.length} />
          </div>
        </div>
      )}

      <div
        className="flex-grow flex items-center transition duration-500 ease-in-out"
        ref={slideRef}
      >
        <Main onClick={moveToNext} />

        {questions.map((item) => (
          <Slide
            key={item.no}
            item={item}
            onClick={moveToNext}
            mbti={mbti}
            setMbti={setMbti}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/question.json');

  const json = fs.readFileSync(filePath, 'utf8');

  const { questions } = JSON.parse(json);

  return {
    props: { questions },
  };
}
