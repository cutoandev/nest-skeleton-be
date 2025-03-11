import { Types, FilterQuery, UpdateQuery } from 'mongoose';

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findById(id: string | Types.ObjectId): Promise<T | null>;
  findAll(filter?: FilterQuery<T>): Promise<T[]>;
  update(
    id: string | Types.ObjectId,
    updateData: UpdateQuery<T>,
  ): Promise<T | null>;
  delete(id: string | Types.ObjectId): Promise<T | null>;
}
