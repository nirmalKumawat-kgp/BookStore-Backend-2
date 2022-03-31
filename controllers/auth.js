const { User } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

// Register Controller
exports.registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }
  console.log(req.body.name);
  let user = await User.findOne({ where: { email: email } });
  if (user) {
    next(new ErrorResponse("User Already Exists", 401));
  }

  if (!user) {
    try {
      user = await User.create({
        name,
        email,
        password,
      });
      await user.save();
      // const cart = await Cart.create({ UserId: user.id });
      // await cart.save();
      sendToken(user, res, 201);
    } catch (error) {
      next(new ErrorResponse(error.message, 400));
    }
  }
};

// Login Controller
exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Invalid Credentials"));
  }

  let user = await User.findOne({ where: { email: email } });

  if (!user) {
    return next(new ErrorResponse("User does not exists", 404));
  }
  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 404));
  }

  sendToken(user, res, 200);
};

//function to get signed Token from User Model
const sendToken = (user, response, statusCode) => {
  const token = user.getSignedToken();
  response.status(statusCode).json({
    success: true,
    token: token,
  });
};
