type Result<T, E = Error> =
  | {
      data: T;
      success: true;
    }
  | {
      error: E;
      success: false;
    };

export type { Result };
