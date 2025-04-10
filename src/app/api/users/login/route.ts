import { connectDB } from '@/src/dbConfig/dbConfog';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/src/modules/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();
// Post request to login a user
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  console.log('Login request body:', reqBody);
  // Check if the request body contains the required fields
  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required.' },
      { status: 400 }
    );
  }
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }
    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password.' },
        { status: 401 }
      );
    }

    //# Optionally, you can generate a JWT token here and send it back to the client
    const tokenData = { id: user._id, email: user.email, name: user.name };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    //* Create a response object
    //? Set the token in the cookies
    //? Set the user data in the cookies
    const response = NextResponse.json({
      message: 'User logged in successfully.',
      status: 200,
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
    });
    response.cookies.set('user', JSON.stringify(tokenData), {
      httpOnly: true,
    });
    response.cookies.set('isLoggedIn', 'true', {
      httpOnly: false,
    });
    console.log('User logged in successfully:', user);
    return response;
  } catch (error: any) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
