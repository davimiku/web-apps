export type Result<T> = {
  data: T;
  meta: {
    length?: number;
    // pagination, etc.
  };
};
