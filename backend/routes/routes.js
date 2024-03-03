const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { checkUser } = require("../middlewares/authMiddleware");
const { 
  createPhysicalEvent,
  createOnlineEvent,
  updatePhysicalEvent,
  getEvent,
  deleteEvent }
= require("../controllers/eventController");
const {
  getUser,
  updatePassword,
  updateAvatar,
  updateResidency,
  updateUser,
  updateBiography,
  getUserAvatar
} = require("../controllers/userController");
const displayUsers = require("../api/userApi");
const processImage = require("../middlewares/sharpMiddleware");
const uploadImg = require("../middlewares/multerMiddleware");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/user", displayUsers);
route.get("/user/:username", getUser);
route.get("/user/:username/avatar", getUserAvatar);
route.patch("/user/:username/update-password", checkUser, updatePassword);
route.patch("/user/:username/update-avatar", [checkUser,uploadImg.single("avatar"),processImage], updateAvatar);
route.patch("/user/:username/update-residency", checkUser, updateResidency);
route.patch("/user/:username/update-user", checkUser, updateUser);
route.patch("/user/:username/update-biography", checkUser, updateBiography);

// Event route handler
route.get("/event/:slug",checkUser,getEvent);
route.post("/event/create-physical-event", [checkUser,uploadImg.single("eventImage"),processImage], createPhysicalEvent);
route.post("/event/create-online-event", [checkUser,uploadImg.single("eventImage"),processImage], createOnlineEvent);
route.put("/event/update-physical-event", [checkUser,uploadImg.single("eventImage"),processImage], updatePhysicalEvent);
route.delete("/event/delete-event", [checkUser], deleteEvent);


module.exports = route;
