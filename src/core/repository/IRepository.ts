interface Repository<T> {
  insert(item: T):Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  find(column:keyof T,value: string|number): Promise<T|null>
}

export default Repository;
