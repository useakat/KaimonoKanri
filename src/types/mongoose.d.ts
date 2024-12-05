declare module 'mongoose' {
  import { ObjectId } from 'mongodb';

  interface QueryResult<T> extends Promise<T> {
    sort(criteria: string | { [key: string]: 1 | -1 }): QueryResult<T>;
  }

  export interface Document {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Model<T extends Document> {
    new(doc?: Partial<T>): T;
    create<D extends Document>(doc: Partial<D>): Promise<D>;
    findById(id: string | ObjectId): QueryResult<T | null>;
    findByIdAndUpdate(
      id: string | ObjectId,
      update: Partial<T>,
      options?: { new?: boolean; runValidators?: boolean }
    ): QueryResult<T | null>;
    findByIdAndDelete(id: string | ObjectId): QueryResult<T | null>;
    findOne(filter?: object): QueryResult<T | null>;
    find(filter?: object): QueryResult<T[]>;
    updateOne(filter: object, update: object): Promise<any>;
    deleteOne(filter: object): Promise<any>;
  }

  export interface Schema<T = any> {
    pre(method: string, fn: Function): void;
    post(method: string, fn: Function): void;
    index(fields: Record<string, any>, options?: Record<string, any>): void;
  }

  export interface SchemaDefinition {
    [path: string]: any;
  }

  export interface SchemaOptions {
    timestamps?: boolean;
    collection?: string;
    strict?: boolean;
    toJSON?: { virtuals?: boolean };
    toObject?: { virtuals?: boolean };
    [key: string]: any;
  }

  export class Schema<T = any> {
    constructor(definition: SchemaDefinition, options?: SchemaOptions);
    pre(method: string, fn: Function): void;
    post(method: string, fn: Function): void;
    index(fields: Record<string, any>, options?: Record<string, any>): void;
  }

  export function model<T extends Document>(
    name: string,
    schema: Schema,
    collection?: string
  ): Model<T>;

  export const models: {
    [key: string]: Model<any>;
  };

  export const Types: {
    ObjectId: typeof ObjectId;
    [key: string]: any;
  };

  // Default export
  export default {
    Schema,
    model,
    models,
    Types
  };
}
