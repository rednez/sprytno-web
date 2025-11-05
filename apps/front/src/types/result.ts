export type ResultOk<T> = { data: T; ok: true; error: null };
export type ResultError<E = Error> = { error: E; ok: false; data: null };

export type Result<T, E = Error> = ResultOk<T> | ResultError<E>;
