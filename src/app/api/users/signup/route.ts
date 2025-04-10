import { connectDB } from '@/src/dbConfig/dbConfog';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/src/modules/userModel';
import bcryptjs from 'bcryptjs';

connectDB();

//Post request to create a new user
export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();
    // Check if the request body contains the required fields
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required.' },
        { status: 400 }
      );
    }
    // Check if the user already exists
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 409 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log('User created successfully:', newUser);
    // Optionally, you can send a welcome email or perform other actions here
    // For now, just return a success message
    return NextResponse.json({
      message: 'User created successfully.',
      status: 201,
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
