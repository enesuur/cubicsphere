const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { checkUser } = require("../middlewares/authMiddleware");
const { 
  createPhysicalEvent,
  createOnlineEvent,
  updatePhysicalEvent,
  getEvent,
  getEventsByCategory,
  getFilteredEvents,
  deleteEvent }
= require("../controllers/eventController");
const {
  getUser,
  updatePassword,
  updateAvatar,
  updateResidency,
  updateUser,
  updateBiography,
  getUserAvatar,
  deleteUser
} = require("../controllers/userController");
const retrieveUser = require("../controllers/retrieveUser");
const displayUsers = require("../api/userApi");
const processImage = require("../middlewares/sharpMiddleware");
const uploadImg = require("../middlewares/multerMiddleware");
const handleSearch = require("../controllers/searchController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/user/:username", getUser);
route.get("/retrieve-user", checkUser,retrieveUser);
route.get("/user/:username/avatar", getUserAvatar);
route.patch("/user/:username/update-password", checkUser, updatePassword);
route.patch("/user/:username/update-avatar", [checkUser,uploadImg.single("avatar"),processImage], updateAvatar);
route.patch("/user/:username/update-residency", checkUser, updateResidency);
route.patch("/user/:username/update-user", checkUser, updateUser);
route.patch("/user/:username/update-biography", checkUser, updateBiography);
route.delete("/user/delete-user", checkUser, deleteUser);


// Event route handler
route.get("/event/:slug",checkUser,getEvent);
route.post("/event/create-physical-event", [checkUser,uploadImg.single("eventImage"),processImage], createPhysicalEvent);
route.post("/event/create-online-event", [checkUser,uploadImg.single("eventImage"),processImage], createOnlineEvent);
route.put("/event/update-physical-event", [checkUser,uploadImg.single("eventImage"),processImage], updatePhysicalEvent);
route.delete("/event/delete-event", checkUser, deleteEvent);
route.get("/events/get-events-by-category", checkUser, getEventsByCategory);
route.get("/events/filter-events", checkUser, getFilteredEvents);


// search route handler

route.get("/search",handleSearch);

module.exports = route;
