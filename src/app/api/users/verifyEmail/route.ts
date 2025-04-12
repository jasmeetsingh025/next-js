import { connectDB } from '@/src/dbConfig/dbConfog';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/src/modules/userModel';

connectDB();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { token } = reqBody;

  // Check if the request body contains the required fields
  if (!token) {
    return NextResponse.json(
      { message: 'Email and token are required.' },
      { status: 400 }
    );
  }

  try {
    // Find the user by token and verify the token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Verify the token (this is a placeholder, implement your own verification logic)
    if (user.verificationToken !== token) {
      return NextResponse.json(
        { message: 'Invalid or expired token.' },
        { status: 400 }
      );
    }

    // Update the user's email verification status
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token after verification
    user.verificationTokenExpiry = undefined;
    await user.save();

    console.log('Email verified successfully:', user);
    return NextResponse.json({
      message: 'Email verified successfully.',
      status: 200,
      success: true,
    });
  } catch (error: any) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
