import React from 'react';

import fs from 'fs';
import path from 'path';

interface Props {}

const report = ({ profiles }) => {
  return <div className="flex-shrink-0 w-full flex flex-col"></div>;
};

export default report;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/result.json');

  const json = fs.readFileSync(filePath, 'utf8');

  const { profiles } = JSON.parse(json);

  return {
    props: { profiles },
  };
}
