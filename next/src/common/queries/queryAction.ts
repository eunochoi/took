import type { ActionResult } from '@/common/actions/types';

export type QueryActionRunner = <T>(action: () => Promise<ActionResult<T>>) => Promise<T>;

export const unwrapQueryAction: QueryActionRunner = async (action) => {
  const result = await action();
  if (!result.ok) throw new Error(result.message);
  return result.data;
};
