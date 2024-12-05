import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { isValidationError } from '@/lib/typeGuards';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Product GET Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const body = await req.json();
    const product = await Product.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Product PUT Error:', error);
    
    if (isValidationError(error)) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Product DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
