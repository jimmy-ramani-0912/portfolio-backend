import UsersModel from "../Models/user.js";
import bcrypt from "bcryptjs";
import { createerror } from "../Utils/error.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const HashPassword = bcrypt.hashSync(req.body.password, salt);

    const User = new UsersModel({
      name: req.body.name,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      password: HashPassword,
    });

    await User.save();
    res.status(201).send({
      status: 201,
      message: "User Registered successfully! 😊😊😊",
      data: { User },
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const GetUser = await UsersModel.findOne({
      email: req.body.email,
    });
    if (!GetUser) return next(createerror(404, "User Not Found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      GetUser.password
    );

    if (!isPasswordCorrect)
      return next(createerror(405, "Password is Wrong and Please Try Again!"));

    const token = jwt.sign(
      { id: GetUser._id, isAdmin: GetUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = GetUser._doc;
    res
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //   })
      .status(200)
      .json({
        status: 200,
        message: "User Logged-In Successfully",
        data: { accessToken: token, details: { ...otherDetails } },
      });
  } catch (error) {
    next(error);
  }
};
