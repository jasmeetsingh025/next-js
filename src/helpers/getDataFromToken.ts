import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  if (!token) return null;
  //! below line is used to decode the token
  //# but it's not recomended to use :any type without checking the type
  //? because it can cause runtime errors
  //? and it's better to use a type guard or a type assertion
  try {
    const decode: { id: string } = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as { id: string };
    return decode.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
