import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { IBaseRepository } from './interfaces';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(data: T): Promise<T> {
    const createdDoc = new this.model(data);
    await createdDoc.save();
    return createdDoc;
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async update(
    id: string | Types.ObjectId,
    updateData: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
