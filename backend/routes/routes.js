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
  getUserEvents,
  deleteEvent, 
  getEventImage,
  updateOnlineEvent,
  getUserOnlineEvents,
  getUserPhysicalEvents,
  getLatestEvents,
  getEventAttenders,
  attendToEvent,
  acceptAttender,
  rejectAttender,
  getRequestedEvents,
  searchEvents,
  latestAttenders
}
= require("../controllers/eventController");
const {
  getUser,
  updatePassword,
  updateAvatar,
  updateResidency,
  updateUser,
  updateBiography,
  updateSocialAccounts,
  getUserAvatar,
  deleteUser,
  getUserById
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
route.post("/user/find-user-by-id", getUserById);
route.get("/user/:username", getUser);
route.get("/retrieve-user", checkUser,retrieveUser);
route.get("/user/:username/avatar", getUserAvatar);
route.patch("/user/:username/update-password", checkUser, updatePassword);
route.patch("/user/:username/update-avatar", [checkUser,uploadImg.single("avatar"),processImage], updateAvatar);
route.patch("/user/:username/update-residency", checkUser, updateResidency);
route.patch("/user/:username/update-user", checkUser, updateUser);
route.patch("/user/:username/update-biography", checkUser, updateBiography);
route.patch("/user/:username/update-socials", checkUser, updateSocialAccounts);
route.delete("/user/delete-user", checkUser, deleteUser);


// Event route handler
route.post("/event/get-requested-events",checkUser,getRequestedEvents)
route.post("/event/accept-attender",checkUser,acceptAttender);
route.delete("/event/reject-attender",checkUser,rejectAttender);
route.get("/event/get-event-attenders",checkUser,getEventAttenders);
route.post("/event/attend-to-event",checkUser,attendToEvent);
route.get("/event/user-online-events",checkUser,getUserOnlineEvents);
route.get("/event/user-physical-events",checkUser,getUserPhysicalEvents);
route.get("/event/user-events",checkUser,getUserEvents);
route.get("/event/latest-events",getLatestEvents);
route.get("/event/img/:eventId",getEventImage);
route.post("/event/latest-attenders",latestAttenders);
route.post("/event/create-physical-event", [checkUser,uploadImg.single("eventImage"),processImage], createPhysicalEvent);
route.post("/event/create-online-event", [checkUser,uploadImg.single("eventImage"),processImage], createOnlineEvent);
route.put("/event/update-physical-event", [checkUser,uploadImg.single("eventImage"),processImage], updatePhysicalEvent);
route.put("/event/update-online-event", [checkUser,uploadImg.single("eventImage"),processImage], updateOnlineEvent);
route.delete("/event/delete-event", checkUser, deleteEvent);
route.get("/events/get-events-by-category", checkUser, getEventsByCategory);
route.get("/event/filter-events", checkUser, getFilteredEvents);
route.get("/event/:slug",checkUser,getEvent);



// search route handler

route.get("/search",handleSearch);

module.exports = route;
