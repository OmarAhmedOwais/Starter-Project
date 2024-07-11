import { Model, Document, Query } from 'mongoose';

export class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  create(item: Partial<T>): Promise<T> {
    console.log('item',item)
    return this.model.create(item);
  }

  findById(id: string): Query<T | null, T> {
    return this.model.findById(id);
  }

  findAll(query?: object): Query<T[], T> {
    return this.model.find(query || {});
  }

  findOne(query: object): Query<T | null, T> {
    return this.model.findOne(query);
  }

  update(id: string, item: Partial<T>): Query<T | null, T> {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }

  delete(id: string): Query<T | null, T> {
    return this.model.findByIdAndDelete(id);
  }
}
