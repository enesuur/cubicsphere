const slugify = require("slugify");
const ObjectId = require("mongoose").Types.ObjectId;
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const path = require("path");
const { measureMemory } = require("vm");
async function createPhysicalEvent(req, res) {
  try {
    const { title, description, startDate, dueDate, quota, address, city, state, country, category } = req.body;
    console.log(category, 1);
    if (
      !title ||
      !description ||
      !startDate ||
      !dueDate ||
      !quota ||
      !address ||
      !city ||
      !state ||
      !country ||
      !category
    ) {
      return res.status(400).json({ message: "Fill all the fields." });
    }

    const slug = slugify(`${title}-${Math.random().toString(36).substring(7)}`, {
      lower: true,
      strict: true,
      replacement: "-",
      trim: true,
      remove: /[*+~.()'"!:@]/g
    });

    const event = await Event.create({
      title: title,
      description: description,
      startDate: startDate,
      dueDate: dueDate,
      quota: quota,
      address: address,
      city: city,
      state: state,
      country: country,
      attendants: [res.locals.user._id],
      organizer: res.locals.user._id,
      eventCoverImgUrl: req.file.path,
      slug: slug,
      category: category
    });

    const updateUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      {
        $push: { events: event._id }
      },
      { new: true }
    );

    return res.status(201).json({ message: "Event has been created succesfully." });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error. // createPhysicalEvent()" });
  }
}

async function createOnlineEvent(req, res) {
  try {
    const { title, description, startDate, dueDate, quota, category } = req.body;

    if (!title || !description || !startDate || !dueDate || !quota || !category) {
      return res.status(400).json({ message: "Fill all the fields." });
    }
    const slug = slugify(`${title}-${Math.random().toString(36).substring(7)}`, {
      lower: true,
      strict: true,
      replacement: "-",
      trim: true,
      remove: /[*+~.()'"!:@]/g
    });

    const event = await Event.create({
      title: title,
      description: description,
      startDate: startDate,
      dueDate: dueDate,
      quota: quota,
      attendants: [res.locals.user._id],
      organizer: res.locals.user._id,
      isOnline: true,
      eventCoverImgUrl: req.file.path,
      slug: slug,
      category: category
    });

    const updateUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      { $push: { events: event._id } },
      { new: true }
    );
    return res.status(201).json({ message: "Event has been created succesfully." });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error. // createOnlineEvent()" });
  }
}

async function updatePhysicalEvent(req, res) {
  try {
    const { title, description, startDate, dueDate, quota, address, city, state, country, category, eventId } =
      req.body;
    if (
      !title ||
      !description ||
      !startDate ||
      !dueDate ||
      !quota ||
      !address ||
      !city ||
      !state ||
      !country ||
      !category ||
      !eventId
    ) {
      return res.status(400).json({ message: "Fill all the fields." });
    }

    const isEventExist = res.locals.user.events.some((id) => new ObjectId(id).equals(eventId));

    if (!isEventExist) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const updateEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title: title,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        quota: quota,
        address: address,
        city: city,
        state: state,
        country: country,
        eventCoverImgUrl: req.file.path,
        category: category
      },
      { new: true }
    );

    if (!updateEvent) {
      return res.status(409).json({ message: "Event update operation failed." });
    }

    return res.status(201).json({ message: "Event was updated successfully." });
  } catch (error) {
    console.log(error, error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", message: "Error occured in updatePhysicalEvent method." });
  }
}

async function updateOnlineEvent(req, res) {
  try {
    const { title, description, startDate, dueDate, quota, category, eventId } = req.body;
    if (!title || !description || !startDate || !dueDate || !quota || !category || !eventId) {
      return res.status(400).json({ message: "Fill all the fields." });
    }

    const isEventExist = res.locals.user.events.some((id) => new ObjectId(id).equals(eventId));

    if (!isEventExist) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const updateEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title: title,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        quota: quota,
        eventCoverImgUrl: req.file.path,
        category: category
      },
      { new: true }
    );

    if (!updateEvent) {
      return res.status(409).json({ message: "Event update operation failed." });
    }

    return res.status(201).json({ message: "Event was updated successfully." });
  } catch (error) {
    console.log(error, error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", message: "Error occured in updatePhysicalEvent method." });
  }
}

async function getUserEvents(req, res) {
  try {
    if (!res.locals.user.events) {
      return res.status(404).json({ message: "No events to show." });
    }
    const events = await Event.find({ _id: { $in: res.locals.user.events } });
    if (events) {
      return res.status(200).json(events);
    } else {
      res.status(404).json({ message: "Your events could not be found." });
    }
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ error: "Internal server error", message: "Error occured in getUserEvents method." });
  }
}

async function getUserPhysicalEvents(req, res) {
  try {
    if (!res.locals.user.events || res.locals.user.events.length === 0) {
      return res.status(404).json({ message: "No events to show." });
    }

    const events = await Event.find({
      $and: [{ _id: { $in: res.locals.user.events } }, { isOnline: false }]
    });

    if (events.length > 0) {
      return res.status(200).json(events);
    } else {
      return res.status(404).json({ message: "No online events found for the user." });
    }
  } catch (error) {
    console.error(error, error.message);
    return res.status(500).json({ error: "Internal server error", message: "Error occurred in getUserEvents method." });
  }
}

async function getUserOnlineEvents(req, res) {
  try {
    if (!res.locals.user.events || res.locals.user.events.length === 0) {
      return res.status(404).json({ message: "No events to show." });
    }

    const events = await Event.find({
      $and: [{ _id: { $in: res.locals.user.events } }, { isOnline: true }]
    });

    if (events.length > 0) {
      return res.status(200).json(events);
    } else {
      return res.status(404).json({ message: "No online events found for the user." });
    }
  } catch (error) {
    console.error(error, error.message);
    return res.status(500).json({ error: "Internal server error", message: "Error occurred in getUserEvents method." });
  }
}

async function deleteEvent(req, res) {
  try {
    const { eventId } = req.body;
    const user = res.locals.user;
    if (!eventId) {
      return res.status(400).json({ message: "Event not found." });
    }

    const updatedEvents = user.events.filter((id) => !new ObjectId(id).equals(eventId));
    user.events = updatedEvents;

    await user.save();

    const result = await Event.deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event was not deleted." });
    }

    return res.status(201).json({ message: "Event has been deleted successfully." });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function getEvent(req, res) {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug });
    if (!event) {
      return res.status(404).json({ message: "Page not found." });
    }
    return res.status(200).json({ event: event });
  } catch (error) {
    console.log(error, error.message);
    return res.status(505).json({ message: "Internal server error." });
  }
}

async function getFeaturedEvents(req, res) {
  try {
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

/* returns array that contain list of event object corresponding to category selection.
 */
async function getEventsByCategory(req, res) {
  try {
    if (!req.query.category) {
      return res.status(400).json({ message: "Fill all the fields." });
    }

    const events = await Event.find({ category: req.query.category });
    if (events.length === 0) {
      return res.status(404).json({ message: "No events." });
    }
    return res.status(200).json({ message: events });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function getEventImage(req, res) {
  try {
    if (!req.params.eventId) {
      return res.status(404).json({ message: "No resources are available." });
    }
    if (req.params.eventId == undefined) {
      return res.status(400).json({ message: "No eventid,object type bla bla" });
    }
    // Burası çözülecek
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (!event.eventCoverImgUrl) {
      return res.status(404).json({ message: "Event image not found." });
    }
    return res.status(200).sendFile(path.resolve(event.eventCoverImgUrl));
  } catch (error) {
    console.error(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function getFilteredEvents(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    function handleRegexOperation(x) {
      const letters = {
        ı: "[ıIiİ]",
        I: "[ıIiİ]",
        i: "[ıIiİ]",
        İ: "[ıIiİ]",
        ş: "[şŞsS]",
        ğ: "[ğgGĞ]",
        G: "[ğgGĞ]",
        ü: "[üuÜU]",
        Ü: "[üuÜU]",
        ö: "[öoÖO]",
        Ö: "[öoÖO]"
      };

      return new RegExp(
        x.replace(/[ıIiİşŞğGĞüÜöÖ]/gi, (match) => letters[match]),
        "i"
      );
    }

    const query = {};

    if (req.query.country) {
      query.country = { $regex: handleRegexOperation(req.query.country) };
    }

    if (req.query.city) {
      query.city = { $regex: handleRegexOperation(req.query.city) };
    }

    if (req.query.category) {
      query.category = { $regex: handleRegexOperation(req.query.category) };
    }

    if (req.query.isOnline) {
      query.isOnline = req.query.isOnline === "true";
    }

    if (req.query.quota) {
      query.quota = { $lte: parseInt(req.query.quota) };
    }

    const total = await Event.find(query).countDocuments();
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
      return res.status(404).json({ message: "The page you are looking for does not exist." });
    }

    const data = await Event.find(query).limit(pageSize).skip(skip).exec();

    res.status(200).json({
      data,
      count: data.length,
      page,
      pages,
      message: "Events were retrieved!"
    });
  } catch (e) {
    console.log(e);
  }
}

async function getLatestEvents(req, res) {
  try {
    const latestEvents = await Event.find().sort({ createdAt: -1 }).limit(10);
    if (!latestEvents) {
      return res.status(200).json({ message: "Noone is up here :/" });
    }
    return res.status(200).json(latestEvents);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getEventAttenders(req, res) {
  try {
    const userEvents = await Event.find({ _id: { $in: res.locals.user.events } });

    if (userEvents.length === 0) {
      return res.status(404).json({ message: "You don't have any events." });
    }

    const attendRequestUsers = [];
    for (const userEvent of userEvents) {
      for (const attendRequest of userEvent.attendRequests) {
        attendRequestUsers.push({
          eventTitle: userEvent.title,
          eventId: userEvent._id,
          eventSlug: userEvent.slug,
          user: attendRequest.user,
          status: attendRequest.status
        });
      }
    }

    const userObjectIds = attendRequestUsers.map((attendRequest) => attendRequest.user);
    const attendersArr = await User.find({ _id: { $in: userObjectIds } });
    for (const attender of attendersArr) {
      for (const item of attendRequestUsers) {
        if (item.user.toString() === attender._id.toString()) {
          item.user = {
            _id: attender._id,
            username: attender.username,
            name: attender.name,
            lastname: attender.lastname,
            email: attender.email,
            profileImgUrl: attender.profileImgUrl,
            eventRequests: attender.eventRequests,
            phoneNumber: attender.phoneNumber
          };
        }
      }
    }

    if (attendersArr.length === 0) {
      return res.status(404).json({ message: "You don't have any attend request." });
    }

    return res.status(200).json({ attenders: attendRequestUsers });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function latestAttenders(req, res) {
  try {
    const { eventId } = req.body;
    if (!eventId || eventId === undefined) {
      return res.status(400).json({ message: "No event id provided." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    console.log(event)

    const latestAttendees = event.attendRequests
      .filter((request) => request.status === "accepted")
      .slice(-5)
      .map((request) => request.user);

    const attendees = await User.find({ _id: { $in: latestAttendees } });
  
    return res.status(200).json({ latestAttendees: attendees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function acceptAttender(req, res) {
  try {
    const { attenderId, eventId } = req.body;

    if (!attenderId || !eventId) {
      return res.status(400).json("Fill all the fields.");
    }
    const userEvents = await Event.find({ _id: eventId });

    if (userEvents.length === 0) {
      return res.status(404).json({ message: "You don't have any events with provided ID." });
    }

    const event = userEvents[0];

    if (event.attendants.includes(attenderId)) {
      return res.status(400).json({ message: "Attendee has already been accepted for this event." });
    }
    event.attendRequests.forEach((request) => {
      if (request.user == attenderId) {
        request.status = "accepted";
        event.attendants.push(attenderId);
      }
    });

    const attendent = await User.findById(attenderId);

    if (!attendent) {
      return res.status(404).json({ message: "Attendent not found." });
    }
    attendent.eventRequests.forEach((request) => {
      if (request.event.toString() == eventId) {
        request.status = "accepted";
      }
    });
    await attendent.save();
    await event.save();

    return res.status(201).json({ message: "Attender accepted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function rejectAttender(req, res) {
  try {
    const { attenderId, eventId } = req.body;

    if (!attenderId || !eventId) {
      return res.status(400).json("Fill all the fields.");
    }

    const userEvents = await Event.find({ _id: eventId });

    if (userEvents.length === 0) {
      return res.status(404).json({ message: "You don't have any events with the provided ID." });
    }

    const event = userEvents[0];

    event.attendRequests.forEach((request) => {
      if (request.user == attenderId) {
        request.status = "rejected";
        event.attendants.push(attenderId);
      }
    });

    const attendent = await User.findById(attenderId);

    if (!attendent) {
      return res.status(404).json({ message: "Attendant not found." });
    }

    attendent.eventRequests.forEach((request) => {
      if (request.event.toString() === eventId) {
        request.status = "rejected";
      }
    });

    if (event.attendants.includes(attenderId)) {
      event.attendants = event.attendants.filter((attendant) => attendant.toString() !== attenderId);
    }

    await attendent.save();
    await event.save();

    return res.status(201).json({ message: "Attender rejected successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getRequestedEvents(req, res) {
  try {
    const { eventIds } = req.body;
    const events = await Event.find({ _id: { $in: eventIds } });
    if (!events) {
      return res.status(404).json({ message: "Event not found." });
    }
    return res.status(200).json(events);
  } catch (error) {
    console.log(error, error.message);
    return res.status(505).json({ message: "Internal server error." });
  }
}

async function attendToEvent(req, res) {
  try {
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ message: "No event id provided." });
    }

    const userEvent = res.locals.user.events.find((event) => event._id.equals(eventId));

    if (userEvent) {
      return res.status(400).json({ message: "You are already the organizer of this event." });
    }

    const userEventRequest = res.locals.user.eventRequests.find((request) => request.event.equals(eventId));

    if (userEventRequest) {
      return res.status(400).json({ message: "You have already sent a request for this event." });
    }

    res.locals.user.events.forEach((event) => {
      if (event._id.equals(eventId)) {
        event.status = "pending";
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      {
        $push: {
          eventRequests: {
            event: eventId,
            status: "pending"
          }
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Update operation didn't succeed. User not found in DB." });
    }
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found." });
    }

    const isUserInAttendRequests = event.attendRequests.some((request) => request.user.equals(res.locals.user._id));

    if (isUserInAttendRequests) {
      return res.status(400).json({ message: "User already in attend requests." });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $push: {
          attendRequests: {
            user: res.locals.user._id,
            status: "pending"
          }
        }
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Update operation didn't succeed. Event not found in DB." });
    }

    return res.status(200).json({ message: "Attendance request sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  createPhysicalEvent,
  createOnlineEvent,
  updatePhysicalEvent,
  updateOnlineEvent,
  getEvent,
  getEventsByCategory,
  getFilteredEvents,
  getEventImage,
  deleteEvent,
  getUserEvents,
  getUserOnlineEvents,
  getUserPhysicalEvents,
  getLatestEvents,
  getEventAttenders,
  attendToEvent,
  acceptAttender,
  rejectAttender,
  getRequestedEvents,
  latestAttenders
};
