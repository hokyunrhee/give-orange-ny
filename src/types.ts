type Answer = {
  text: string;
  type: string;
  value: number;
};

export type Item = {
  answer: Answer[];
  no: number;
  question: string;
  type: string;
};

export type Profile = {
  no: number;
  type: string;
  desc: string;
  name: string;
  text: string[];
  positive: [number, string, string];
  negative: [number, string, string];
};
