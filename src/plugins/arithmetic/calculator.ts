import type { ResultItem } from "../../core/types";

function tokenize(input: string): (number | string)[] {
  const tokens: (number | string)[] = [];
  let i = 0;
  while (i < input.length) {
    if (/\s/.test(input[i])) {
      i++;
      continue;
    }
    if (/[\d.]/.test(input[i])) {
      let num = "";
      while (i < input.length && /[\d.]/.test(input[i])) num += input[i++];
      tokens.push(parseFloat(num));
    } else if ("+-*/()".includes(input[i])) {
      tokens.push(input[i++]);
    } else {
      throw new Error(`Unexpected character: ${input[i]}`);
    }
  }
  return tokens;
}

function parse(tokens: (number | string)[]): number {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function consume() {
    return tokens[pos++];
  }

  function parseExpr(): number {
    let left = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = consume();
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseTerm(): number {
    let left = parseFactor();
    while (peek() === "*" || peek() === "/") {
      const op = consume();
      const right = parseFactor();
      left = op === "*" ? left * right : left / right;
    }
    return left;
  }

  function parseFactor(): number {
    if (peek() === "-") {
      consume();
      return -parseFactor();
    }
    if (peek() === "+") {
      consume();
      return parseFactor();
    }
    if (peek() === "(") {
      consume();
      const val = parseExpr();
      if (peek() !== ")") throw new Error("Expected )");
      consume();
      return val;
    }
    const token = consume();
    if (typeof token !== "number") throw new Error(`Expected number, got ${token}`);
    return token;
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new Error("Unexpected token");
  return result;
}

export function compute(input: string): ResultItem[] {
  const tokens = tokenize(input);
  const result = parse(tokens);

  const isInt = Number.isFinite(result) && Math.abs(result) < 1e15;
  const formatted =
    isInt && Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toPrecision(10)).toString();

  return [{ label: "Result", value: formatted, type: "text" }];
}
