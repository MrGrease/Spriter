const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/erorrResponse");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log("token is invalid")
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  else
  {
    console.log("token is valid")
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("no user found")
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;
    console.log("auth check pass")
    next();
  } catch (err) {
    console.log("error"+err)
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};