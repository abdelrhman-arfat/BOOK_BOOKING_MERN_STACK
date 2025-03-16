export type TResponse<T> = {
  data: {
    results: T[];
  };
  refetch: () => void;
};
