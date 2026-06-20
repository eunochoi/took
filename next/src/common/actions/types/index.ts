export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; message: string };
