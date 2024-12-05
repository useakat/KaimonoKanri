import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import type { FilterQuery } from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: FilterQuery<typeof Product> = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      // Use regex for more flexible search
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).sort({ updatedAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products GET Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Products POST Error:', error);
    
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation Error', details: (error as any).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
