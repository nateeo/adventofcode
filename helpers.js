import { performance } from "perf_hooks";
import { readFileSync } from "fs";

export const getInput = (num) => {
  return readFileSync(`${num}.txt`).toString();
};

let time = 0;

export const start = () => {
  time = performance.now();
};

export const stop = () => {
  console.log("time taken:", performance.now() - time, "ms");
  time = 0;
};
