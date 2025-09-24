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

  switch (op) {
    case 'add':
    case 'addition':
    case 'sum':
    case '+':
      result = left + right;
      explanation = `Adding ${left} + ${right} = ${result}`;
      break;
    case 'subtract':
    case 'subtraction':
    case 'minus':
    case '-':
      result = left - right;
      explanation = `Subtracting ${left} - ${right} = ${result}`;
      break;
    case 'multiply':
    case 'multiplication':
    case '*':
    case 'x':
    case '×':
      result = left * right;
      explanation = `Multiplying ${left} × ${right} = ${result}`;
      break;
    case 'divide':
    case 'division':
    case '/':
    case '÷':
      if (right === 0) {
        throw new Error('Cannot divide by zero');
      }
      result = left / right;
      explanation = `Dividing ${left} ÷ ${right} = ${result}`;
      break;
    default:
      throw new Error('Unknown operation');
  }

  return {
    result,
    explanation,
    formatted: `The answer is ${result}`,
  };
};