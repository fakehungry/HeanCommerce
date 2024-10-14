export interface Api<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}
