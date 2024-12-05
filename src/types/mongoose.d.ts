declare module 'mongoose' {
  import { ObjectId } from 'mongodb';

  interface QueryResult<T> extends Promise<T> {
    sort(criteria: string | { [key: string]: 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending' }): QueryResult<T>;
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
    findOne(filter?: FilterQuery<T>): QueryResult<T | null>;
    find(filter?: FilterQuery<T>): QueryResult<T[]>;
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<UpdateResult>;
    deleteOne(filter: FilterQuery<T>): Promise<DeleteResult>;
  }

  interface UpdateResult {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: ObjectId | null;
    upsertedCount: number;
    matchedCount: number;
  }

  interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
  }

  type FilterQuery<T> = {
    [P in keyof T]?: T[P] | { $regex: string } | { $in: T[P][] } | { $exists: boolean };
  };

  type UpdateQuery<T> = {
    $set?: Partial<T>;
    $inc?: { [P in keyof T]?: number };
    $push?: { [P in keyof T]?: T[P] extends Array<infer U> ? U : never };
    $pull?: { [P in keyof T]?: T[P] extends Array<infer U> ? U : never };
  };

  interface SchemaTypeOptions<T> {
    type?: T;
    required?: boolean | [boolean, string];
    default?: T | (() => T);
    unique?: boolean;
    trim?: boolean;
    min?: number | [number, string];
    max?: number | [number, string];
    enum?: T[];
    sparse?: boolean;
    set?: (value: T) => T | null;
    [key: string]: unknown;
  }

  export interface SchemaDefinition {
    [path: string]: SchemaTypeOptions<unknown> | Schema | SchemaType | typeof SchemaType | SchemaDefinition;
  }

  export interface SchemaOptions {
    timestamps?: boolean;
    collection?: string;
    strict?: boolean;
    toJSON?: { virtuals?: boolean };
    toObject?: { virtuals?: boolean };
    [key: string]: unknown;
  }

  export class SchemaType {
    constructor(path: string, options?: SchemaTypeOptions<unknown>);
  }

  type PreMiddlewareFunction = (next: (error?: Error) => void) => void | Promise<void>;
  type PostMiddlewareFunction = (doc: Document, next: (error?: Error) => void) => void | Promise<void>;

  export class Schema {
    constructor(definition?: SchemaDefinition, options?: SchemaOptions);
    pre(method: string, fn: PreMiddlewareFunction): void;
    post(method: string, fn: PostMiddlewareFunction): void;
    index(fields: Record<string, number | string>, options?: Record<string, unknown>): void;
  }

  export function model<T extends Document>(
    name: string,
    schema: Schema,
    collection?: string
  ): Model<T>;

  export const models: {
    [key: string]: Model<Document>;
  };

  export const Types: {
    ObjectId: typeof ObjectId;
    [key: string]: unknown;
  };

  interface ConnectOptions {
    bufferCommands?: boolean;
    [key: string]: unknown;
  }

  const mongoose: {
    Schema: typeof Schema;
    model: typeof model;
    models: typeof models;
    Types: typeof Types;
    connect: (uri: string, options?: ConnectOptions) => Promise<typeof mongoose>;
  };

  export default mongoose;
}
