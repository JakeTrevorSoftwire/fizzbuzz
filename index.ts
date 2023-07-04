import readline from "readline/promises";

let terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type rule = (list: string[], num: number) => string[];

type indexedRule = { index: number; rule: rule };

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

function parseRules(): rule[] {
  let args = process.argv.slice(2);

  //too gross?
  let activeRules = args
    .map((e) => rules[e] || makeRule(e) || false)
    .filter(Boolean);

  return activeRules.sort((a, b) => a.index - b.index).map((e) => e.rule);
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

// console.log(fizzBuzz(3 * 7 * 13));
