export interface DataStorage<T> {
  sync(items: T[]): Promise<void>;
  getAll(): Promise<T[]>;
}
