import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Main from 'src/components/template/Main';
import Slide from 'src/components/template/Slide';
import Loading from 'src/components/template/Loading';
import Progressbar from 'src/components/atom/Progressbar';

import { Item } from 'src/types';

import fs from 'fs';
import path from 'path';

const MBTI_TYPES: { [type: string]: number } = {
  ESTJ: 1,
  ESTP: 2,
  ESFJ: 3,
  ESFP: 4,
  ENFJ: 5,
  ENFP: 6,
  ENTJ: 7,
  ENTP: 8,
  ISTJ: 9,
  ISTP: 10,
  ISFJ: 11,
  ISFP: 12,
  INFJ: 13,
  INFP: 14,
  INTJ: 15,
  INTP: 16,
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

  useLayoutEffect(() => {
    if (!slideRef.current) return;
    slideRef.current.style.transform = `translateX(-${slide}00%)`;
  }, [slide]);

  useEffect(() => {
    let id: number;
    if (slide > questions.length) {
      id = window.setTimeout(() => {
        const { EI, SN, TF, JP } = mbti;

        const result = `${EI >= 2 ? 'E' : 'I'}${SN >= 2 ? 'S' : 'N'}${
          TF >= 2 ? 'T' : 'F'
        }${JP >= 2 ? 'J' : 'P'}`;

        const type = MBTI_TYPES[result];
        router.push(`report/${type}`);
      }, 2000);
    }
    return () => clearTimeout(id);
  }, [mbti, questions.length, router, slide]);

  return (
    <>
      <Head>
        <title>{`기부 성향 테스트`}</title>
      </Head>
      <div className="relative flex-grow flex flex-col justify-center overflow-x-hidden">
        {slide > 0 && slide <= questions.length && (
          <div className="my-20">
            <div className="w-[320px] mx-auto">
              <Progressbar current={slide} total={questions.length} />
            </div>
          </div>
        )}

        <div
          className={`flex-grow flex items-center ${
            slide > 1 &&
            slide <= questions.length &&
            `transition duration-500 ease-in-out`
          }`}
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

          <Loading />
        </div>
      </div>
    </>
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
