import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Button from 'src/components/atom/Button';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import fs from 'fs';
import path from 'path';

import { Profile } from 'src/types';

interface Props {
  profile: Profile;
}

const Result = ({ profile }: Props) => {
  const router = useRouter();

  const [currentUrl, setCurrentUrl] = useState('');

  const clickShare = () => {
    const msg = '링크가 복사됐어요 👋';
    alert(msg);
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="relative flex-grow flex flex-col items-center">
      <section className="w-[320px]">
        <h2 className="font-bold text-center text-[24px] mt-11">
          당신의 기부 성향은...
        </h2>
        <div className="flex justify-center">
          <img
            className="w-[300px] h-[300px]"
            src={`/images/${profile.no}.png`}
            alt={profile.name}
          />
        </div>

        <div className="text-center">
          <p className="text-sm">{profile.desc}</p>
          <h1 className="font-bold text-[24px] mt-4 mb-6">{profile.name}</h1>
        </div>

        <div className="font-bold text-sm mb-16 space-y-1">
          {profile.text.map((item, index) => (
            <p key={index}>{`-${item}`}</p>
          ))}
        </div>

        <div className="flex">
          <div className="w-1/2 text-center">
            <p className="font-bold">환상의 기부 짝꿍</p>
            <div className="flex justify-center">
              <img
                className="w-[156px] h-[156px]"
                src={`/images/${profile.positive[0]}.png`}
                alt={profile.positive[1]}
              />
            </div>
            <div className="px-4">
              <p className="text-sm">{profile.positive[1]}</p>
              <p className="font-bold">{profile.positive[2]}</p>
            </div>
          </div>
          <div className="w-1/2 text-center">
            <p className="font-bold">환장의 기부 짝꿍</p>
            <div className="flex justify-center">
              <img
                className="w-[156px] h-[156px]"
                src={`/images/${profile.negative[0]}.png`}
                alt={profile.negative[1]}
              />
            </div>
            <div className="px-4">
              <p className="text-sm">{profile.negative[1]}</p>
              <p className="font-bold">{profile.negative[2]}</p>
            </div>
          </div>
        </div>

        <div className="my-11">
          <p className="text-lg font-bold text-center mb-4">결과 공유하기</p>
          <div className="space-y-4">
            <CopyToClipboard text={currentUrl} onCopy={clickShare}>
              <Button className="mx-auto border text-WHITE bg-PRIMARY filter hover:bg-[#f39f1b] active:bg-[#f39f1b] transition duration-100 ease-in-out">
                링크복사
              </Button>
            </CopyToClipboard>
            <Button
              onClick={() => router.push('/')}
              className="mx-auto border border-PRIMARY text-GRAY hover:bg-PRIMARY hover:text-WHITE active:bg-PRIMARY active:text-WHITE transition duration-100 ease-in-out"
            >
              다시하기
            </Button>
            <a
              href="https://www.instagram.com/givo.newyork/"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[320px] w-full h-[80px] p-8 flex justify-center items-center text-sm focus:outline-none mx-auto border border-PRIMARY text-GRAY hover:bg-PRIMARY hover:text-WHITE active:bg-PRIMARY active:text-WHITE transition duration-100 ease-in-out"
            >
              GIV.O Instagram
            </a>
          </div>
        </div>

        <div className="mb-11">
          <p className="text-sm font-bold text-center">
            {
              '해당 기부 성향 MBTI 테스트 "쇼미더기부"는 선진 기부 문화 정착을 목표로 하는 유학생 비영리 단체 Give Orange New York에서 제작한 테스트입니다.'
            }
          </p>
        </div>
      </section>
    </div>
  );
};

export default Result;

export async function getStaticPaths() {
  return {
    paths: Array(16)
      .fill(0)
      .map((_, index) => ({ params: { no: String(index + 1) } })),
    fallback: false,
  };
}

type Params = {
  params: {
    no: string;
  };
};

type Profiles = {
  profiles: Profile[];
};

export async function getStaticProps({ params: { no } }: Params) {
  const filePath = path.join(process.cwd(), 'public/result.json');

  const json = fs.readFileSync(filePath, 'utf8');

  const { profiles }: Profiles = JSON.parse(json);

  const profile = profiles[parseInt(no) - 1];

  return { props: { profile } };
}
