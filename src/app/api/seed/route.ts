import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { seedProducts } from '@/data/seedProducts';

export async function POST() {
  try {
    await dbConnect();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert seed data
    await Product.insertMany(seedProducts);
    
    return NextResponse.json({ 
      message: '商品データを正常にシードしました',
      count: seedProducts.length 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'データのシードに失敗しました' },
      { status: 500 }
    );
  }
}
