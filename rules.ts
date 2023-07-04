import { rule, indexedRule } from "./types";

let fizz = (result: string[], num: number) => {
  if (num % 3 === 0) result.push("Fizz");
  return result;
};

let buzz = (result: string[], num: number) => {
  if (num % 5 === 0) result.push("Buzz");
  return result;
};

let bang = (result: string[], num: number) => {
  if (num % 7 === 0) result.push("Bang");
  return result;
};

let bong = (result: string[], num: number) => {
  if (num % 11 === 0) result = ["Bong"];
  return result;
};

let fezz = (result: string[], num: number) => {
  if (num % 13 === 0) {
    // modify this to work out the splice index...?
    if (result[0] == "Fizz") result.splice(1, 0, "Fezz");
    else result.unshift("Fezz");
  }
  return result;
};

let rev = (result: string[], num: number) => {
  if (num % 17 === 0) result = result.reverse();
  return result;
};

function ir(index: number, rule: rule) {
  return { index, rule };
}

let rules: Record<string, indexedRule> = {
  "3": ir(3, fizz),
  "5": ir(5, buzz),
  "7": ir(7, bang),
  "11": ir(11, bong),
  "13": ir(13, fezz),
  "17": ir(17, rev),
};

export default rules;
