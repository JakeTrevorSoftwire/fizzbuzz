export type rule = (list: string[], num: number) => string[];

export type indexedRule = { index: number; rule: rule };
