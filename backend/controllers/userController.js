const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/userModel");
const mongoose = require('mongoose');

async function updateUser(req, res) {
  try {
    if (!req.body || !req.body.phoneNumber || !req.body.name || !req.body.lastname) {
      return res.status(400).json({ message: "Fill all the fields." });
    }
    const { phoneNumber, name, lastname, biography } = req.body;
    const user = await User.findByIdAndUpdate(
      res.locals.user._id,
      {
        phoneNumber: phoneNumber,
        name: name,
        lastname: lastname,
        biography: biography
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(201).json({ message: "User was updated succesfully!" });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong on updateUser()");
    return res.status(401).json({ message: "Need authorization for updating profile." });
  }
}

async function updateResidency(req, res) {
  try {
    if (!req.body || !req.body.country || !req.body.city) {
      return res.status(400).json({ message: "Fill all the fields." });
    }
    const { country, city } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      { "residency.country": country, "residency.city": city },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(201).json({ message: "Residency updated succesfully!" });
  } catch (error) {
    console.log(error, error.message);
    console.log("Something went wrong on updateResidency()");
    res.status(500).json({ message: "Internal server error." });
  }
}

async function getUser(req, res) {
  try {
    if (!req.params.username) {
      return res.status(404).json({ message: "User not found." });
    }
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      user: {
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        profileImg: user.profileImgUrl,
        residency: user.residency,
        biography: user.biography,
        role: user.role,
        birthday: user.birthday,
        events: user.events,
        twitter: user.twitter,
        instagram: user.instagram,
        snapchat: user.snapchat,
        residency: user.residency,
        eventRequests: user.eventRequests
      }
    });
  } catch (error) {
    console.log(error, error.message);
    console.log("Something went wrong on getUser()");
    res.status(404).json({ message: "Internal server error." });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "No user id provided." });
    }
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
  
    return res.status(200).json({
      username: foundUser.username
    });
  } catch (error) {
    // console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function updatePassword(req, res) {
  try {
    if (!req.body || !req.body.newPassword || !req.body.verifyNewPassword) {
      return res.status(400).json({ message: "Fill all the fields." });
    }
    const { newPassword, verifyNewPassword } = req.body;
    if (newPassword !== verifyNewPassword) {
      return res.status(400).json({ message: "Passwords mismatched." });
    }
    if (newPassword.length < 6 || newPassword.length > 512) {
      return res.status(400).json({ message: "The password must be a minimum of 6 characters in length." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(res.locals.user._id, { password: hashedPassword }, { new: true });
    if (!updatedUser) {
      return res.status(400).json({ message: "User not found." });
    }
    return res.status(201).json({ message: "Password was updated succesfully." });
  } catch (error) {
    console.log(error, error.message);
    console.log("Something went wrong on updatePassword()");
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "There is no file updated." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      { profileImgUrl: req.file.path },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "User not found." });
    }
    return res
      .status(201)
      .json({ message: "Profile photo was updated succesfully.", profileImgUrl: updatedUser.profileImgUrl });
  } catch (error) {
    console.error(error, error.message);
    console.log("Something went wrong on updateProfileImg()");
    return res.status(500).json({ message: "An error occurred while updating profile image" });
  }
}

async function getUserAvatar(req, res) {
  try {
    if (!req.params.username) {
      return res.status(404).json({ message: "No resources are available." });
    }

    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.profileImgUrl) {
      return res.status(404).json({ message: "User avatar not found." });
    }
    return res.status(200).sendFile(path.resolve(user.profileImgUrl));
  } catch (error) {
    console.error(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function updateBiography(req, res) {
  try {
    if (!req.body || !req.body.biography) {
      return res.status(400).json({ message: "Fill all the fields." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      { biography: req.body.biography },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "User not found." });
    }
    return res.status(201).json({ message: "Biography was updated succesfully." });
  } catch (error) {
    console.error(error, error.message);
    console.log("Something went wrong on updateProfileImg()");
    return res.status(500).json({ message: "An error occurred while updating profile image" });
  }
}

async function updateSocialAccounts(req, res) {
  try {
    if (!req.body || !req.body.twitter || !req.body.instagram || !req.body.snapchat) {
      return res.status(400).json({ message: "Fill all the fields." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      {
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        snapchat: req.body.snapchat
      },
      { new: true }
    );

    console.log(updatedUser);
    if (!updatedUser) {
      return res.status(400).json({ message: "User not found." });
    }
    return res.status(201).json({ message: "Social accounts were updated successfully." });
  } catch (error) {
    console.error(error, error.message);
    console.log("Something went wrong on updateSocialAccounts");
    return res.status(500).json({ message: "An error occurred while updating profile image" });
  }
}

async function deleteUser(req, res) {
  try {
    const result = await User.deleteOne({ _id: new ObjectId(res.locals.user._id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.cookie("token", "", { httpOnly: true, maxAge: 1 });
    return res.status(201).json({ message: "User has been deleted succesfully." });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  getUser,
  getUserAvatar,
  updateUser,
  updatePassword,
  updateAvatar,
  updateResidency,
  updateBiography,
  deleteUser,
  updateSocialAccounts,
  getUserById
};
