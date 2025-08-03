import { RequestHandler } from "express";
import { getQR } from "../bot.js";
import { User } from "../models/index.js";
import { SignupDTO } from "../dto/signup.dto.js";
import { AuthService } from "../services/index.js";
import { SigninDTO } from "../dto/signin.dto.js";

const getAuthQR: RequestHandler = (req, res) => {
  const qr = getQR();
  if (!qr)
    return res
      .status(404)
      .json({ message: "QR not available or already connected" });
  //   res.json({ qr });
  res.sendFile("./public/qr.png");
};

const signup: RequestHandler = async (req, res) => {
  const signupDTO: SignupDTO = req.body;
  console.log(signupDTO);
  try {
    const userExists = await User.findOne({
      username: signupDTO.username,
    });

    if (userExists) {
      res.status(400).json({
        error: "user already exists",
      });
      return;
    }

    const user = (
      await User.create({
        name: signupDTO.name,
        surname: signupDTO.surname,
        username: signupDTO.username,
        password: AuthService.hashPassword(signupDTO.password),
      })
    ).toObject();

    const { accessToken, refreshToken } = AuthService.generateTokens({
      _id: user._id.toString(),
      name: user.name ?? undefined,
      surname: user.surname ?? undefined,
      username: user.username,
    });

    res.status(200).json({
      message: "user signed up successfuly",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const signin: RequestHandler = async (req, res) => {
  const signinDTO: SigninDTO = req.body;

  try {
    const user = (
      await User.findOne({
        username: signinDTO.username,
      })
    )?.toObject();

    if (!user) {
      res.status(400).json({
        error: "invalid credentials",
      });
      return;
    }

    if (!AuthService.comparePassword(signinDTO.password, user.password)) {
      res.status(400).json({
        error: "invalid credentials",
      });
      return;
    }

    const { accessToken, refreshToken } = AuthService.generateTokens({
      _id: user._id.toString(),
      username: user.username,
      name: user.name ?? undefined,
      surname: user.surname ?? undefined,
    });

    res.status(200).json({
      message: "user signed in successfuly",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};



export { signup, signin, getAuthQR };
