import { IProduct } from '../models/Product';

export type FilterQuery<T> = {
  [P in keyof T]?: T[P] | {
    $regex: string;
    $options: string;
  };
};

export type ProductFilterQuery = FilterQuery<IProduct>;
