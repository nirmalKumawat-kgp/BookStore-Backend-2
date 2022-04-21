require("dotenv").config({ path: "../config.env" });
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.isAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(decodedToken.id);

    //   console.log(user);

    if (!user) {
      next(new ErrorResponse("You are not authorized to this route", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
