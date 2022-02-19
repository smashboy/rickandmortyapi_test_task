export const assert = (condition: any, message: string) => {
  if (!condition) throw new Error(message);
};

export type PickSingleKeyValue<O, K extends keyof O> = Pick<O, K>[K];
