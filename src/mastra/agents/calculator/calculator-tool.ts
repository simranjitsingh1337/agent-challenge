import { z } from 'zod';

export const calculatorToolSchema = z.object({
  // Accept common synonyms and symbols via string to improve robustness
  operation: z.union([
    z.enum(['add', 'subtract', 'multiply', 'divide']),
    z.string(),
  ]),
  // Coerce numeric strings to numbers
  a: z.coerce.number(),
  b: z.coerce.number(),
});

export type CalculatorToolInput = z.infer<typeof calculatorToolSchema>;

export const calculatorTool = async (context: any) => {
  const { operation, a, b } = context.context || context.args || context;
  const op = String(operation).toLowerCase().trim();
  const left = Number(a);
  const right = Number(b);

  let result: number;
  let explanation: string;

  const isAdd = op === 'add' || op === 'addition' || op === 'sum' || op === '+';
  const isSub = op === 'subtract' || op === 'subtraction' || op === 'minus' || op === '-';
  const isMul = op === 'multiply' || op === 'multiplication' || op === '*' || op === 'x' || op === '×';
  const isDiv = op === 'divide' || op === 'division' || op === '/' || op === '÷';

  if (isAdd) {
    result = left + right;
    explanation = `Adding ${left} + ${right} = ${result}`;
  } else if (isSub) {
    result = left - right;
    explanation = `Subtracting ${left} - ${right} = ${result}`;
  } else if (isMul) {
    result = left * right;
    explanation = `Multiplying ${left} × ${right} = ${result}`;
  } else if (isDiv) {
    if (right === 0) {
      throw new Error('Cannot divide by zero');
    }
    result = left / right;
    explanation = `Dividing ${left} ÷ ${right} = ${result}`;
  } else {
    throw new Error('Unknown operation');
  }

  return {
    result,
    explanation,
    formatted: `The answer is ${result}`,
  };
};