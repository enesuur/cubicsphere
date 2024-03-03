const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
async function register(req, res) {
  const { email, password, username, name, lastname } = req.body;

  try {
    if (!email || !password || !username || !name || !lastname) {
      return res.status(400).json({ message: "Fill all fields." });
    }

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      res.status(400).json({ message: "Please provide a valid email address." });
    }

    if (username.length < 1 || username.length > 32) {
      res.status(400).json({ message: "Username must be between 1 and 32 characters in length." });
    }

    if (password.length < 6 || password.length > 512) {
      return res.status(400).json({ message: "The password must be a minimum of 6 characters in length." });
    }

    if (name.length < 1 || name.length > 512) {
      res.status(400).json({ message: "Name must be between 1 and 32 characters in length." });
    }

    if (lastname.length < 1 || lastname.length > 512) {
      res.status(400).json({ message: "Last name must be between 1 and 32 characters in length." });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(409).json({ message: "The email address is already in use." });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(409).json({ message: "The username is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
      name: name,
      lastname: lastname,
      phoneNumber:"XXX-XXX-XXXX",
      profileImgUrl:"./uplodas/dummyAvatar.jpeg",
      birthday: new Date('1990-01-01'),
      biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    const token = jwt.sign(
      {
        id: user._id
      },
      SECRET_KEY
    );

    res
      .cookie("token", token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 })
      .json({ message: "User was registered successfully!" });
  } catch (error) {
    console.error("Error in registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function login(req, res) {
  const { email, password, username } = req.body;
  try {
    if (!(email || username) || !password) {
      return res.status(400).json({ message: "Fill all fields." });
    }
    if ((email || username) && password) {
      let user;
      if (email) {
        user = await User.findOne({ email });
      } else if (username) {
        user = await User.findOne({ username });
      }

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          const token = jwt.sign(
            {
              id: user._id
            },
            SECRET_KEY
          );
          res.cookie("token", token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 }).json({message: "You succesfully logged in."});
        } else {
          res.status(400).json({ message: "Your password is mismatched!" });
        }
      }
    }
  } catch (error) {
    console.log("Error in login user.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

function logout(req, res) {
  res.cookie("token", "", {httpOnly: true, maxAge: 1}).json({ message: "You succesfully logged out!"});
}
module.exports = {
  register,
  login,
  logout
};
