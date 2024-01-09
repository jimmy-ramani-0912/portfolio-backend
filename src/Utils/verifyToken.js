import jwt from "jsonwebtoken";
import { createerror } from "./error.js";

export const verifyToken = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, process.env.JWT, (err, GetUser) => {
      if (err) {
        return next(createerror(403, "Token Is Not Valid!"));
      } else {
        req.GetUser = GetUser;
        next();
      }
    });
  } else {
    return next(createerror(401, "You are Not Authenticated!"));
  }
};
