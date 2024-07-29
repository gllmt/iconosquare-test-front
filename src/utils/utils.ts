export type Event = {
  index: number;
  value1: number;
  old_value1: number;
  value2: number;
  old_value2: number;
  comment: string;
  [key: string]: any;
};

export function createRandomEvent(index: number): Event {
  return {
    index,
    value1: Math.round(Math.random() * 10000),
    old_value1: -1,
    value2: Math.round(Math.random() * 10000),
    old_value2: -1,
    comment: `Random comment ${index}`,
  };
}
