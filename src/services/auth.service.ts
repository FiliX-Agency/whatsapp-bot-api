import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

export interface TokenPayload {
  _id: string;
  username: string;
  name?: string;
  surname?: string;
}

const hashPassword = (rawPassword: string) => {
  const hashedPasswrod = bcrypt.hashSync(rawPassword, SALT_ROUNDS);

  return hashedPasswrod;
};

const comparePassword = (rawPassword: string, hashedPasswrod: string) => {
  return bcrypt.compareSync(rawPassword, hashedPasswrod);
};

const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(
    {
      _id: payload._id,
      username: payload.username,
      name: payload.surname,
      surname: payload.surname,
    },
    ACCESS_TOKEN_SECRET_KEY!,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    {
      _id: payload._id,
    },
    ACCESS_TOKEN_SECRET_KEY!,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

export { hashPassword, comparePassword, generateTokens };
