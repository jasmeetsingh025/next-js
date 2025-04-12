import { getDataFromToken } from '@/src/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/src/modules/userModel';
import { connectDB } from '@/src/dbConfig/dbConfog';
// Connect to the database
connectDB();

export async function GET(request: NextRequest) {
  const token = getDataFromToken(request);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await User.findOne({ _id: token }).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log('User retrieved successfully:', user);
    return NextResponse.json({
      message: 'User retrieved successfully',
      user,
      status: 200,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
