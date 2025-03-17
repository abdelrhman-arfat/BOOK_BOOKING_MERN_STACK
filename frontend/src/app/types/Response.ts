export type TResponse<T> = {
  data?: {
    results: T[];
  };
  total?: number;
  currentPage?: number;
  totalPages?: number;
  success?: boolean;
  message?: string;
  refetch: () => void;
};
