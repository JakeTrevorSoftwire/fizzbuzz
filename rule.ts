import { applicator } from "./types";

export class rule {
  apply: applicator;
  index: number;
  constructor(rule: applicator, index: number) {
    this.apply = rule;
    this.index = index;
  }
}

export class basicRule extends rule {
  constructor(arg: string) {
    if (!arg.includes("=")) throw "Invalid rule specification";

    let [num, replacement] = arg.split("=");
    let parsedNum = Number(num);

    if (!parsedNum || parsedNum < 1) throw "Invalid rule index";

    super((list: string[], num: number) => {
      if (num % parsedNum === 0) list.push(replacement);
      return list;
    }, parsedNum);
  }
}
