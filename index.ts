import readline from "readline/promises";

import rules from "./rules";
import { indexedRule, rule } from "./types";

let terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function fizzBuzz(num: number, rules: rule[]): string {
  //i.e. apply each rule
  let result = rules.reduce((result: string[], rule) => rule(result, num), []);

  return result.join("") || num.toString();
}

async function main() {
  let max = Number(await terminal.question("Max Number: "));
  if (!max || max < 1) {
    console.log("Please specify a positive integer");
    process.exit(1);
  }

  let rules = parseRules();

  for (let i = 1; i <= max; i++) {
    console.log(fizzBuzz(i, rules));
  }
  console.log("");
  process.exit(0);
}

function parseRules(): rule[] {
  let args = process.argv.slice(2);

  return args
    .map((e) => rules[e] || makeRule(e) || false)
    .filter(Boolean)
    .sort((a, b) => a.index - b.index)
    .map((e) => e.rule);
}

function makeRule(arg: string): indexedRule | false {
  if (!arg.includes("=")) return false;

  let [num, replacement] = arg.split("=");
  let parsedNum = Number(num);

  if (!parsedNum || parsedNum < 1) return false;

  return {
    index: parsedNum,
    rule(list, num) {
      if (num % parsedNum === 0) list.push(replacement);
      return list;
    },
  };
}

main();
