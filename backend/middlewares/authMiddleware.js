const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* USAGE OF THE FUNCTION
If the user already got the token,
user can not make registration request.
user can not make login request.
*/
async function handleSpam(req, res, next) {
  try {
    if (!req.headers.cookie) {
      res.status(400).json({ message: "There isn't any cookie." });
    }

    const tokenCookie = req.headers.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));
    if (!tokenCookie) {
      res.status(400).json({ message: "No token for verification." });
    }

    const token = tokenCookie.split("=")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      res.status(400).json({ message: "You are already logged in!" });
    }

    next();
  } catch (err) {
    res.status(400).send();
  }
}

async function authVerify(req, res, next) {
  try {
    if (!req.headers.cookie) {
      res.status(400).json({ message: "There isn't any cookie." });
    }

    const tokenCookie = req.headers.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));
    if (!tokenCookie) {
      res.status(400).json({ message: "No token for verification." });
    }

    const token = tokenCookie.split("=")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      res.status(400).json({ message: "Please complete your authentication." });
    }

    next();
  } catch (err) {
    res.status(400).send();
  }
}

async function checkUser(req, res, next) {
  try {
    if (!req.headers.cookie) {
      res.locals.user = null;
      return res.status(400).json({ message: "There isn't token a cookie." });
    }
    const tokenCookie = req.headers.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));
    const token = tokenCookie.split("=")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      res.locals.user = null;
      return res.status(401).json({ message: "Unauthorized." });
    }

   res.locals.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Error occured while checking user."});
  }
}

module.exports = {
  handleSpam,
  authVerify,
  checkUser
};
