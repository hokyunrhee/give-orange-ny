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
