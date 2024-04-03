const slugify = require("slugify");
const ObjectId = require("mongoose").Types.ObjectId;
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const path = require("path")
async function createPhysicalEvent(req, res) {
  try {
    const { title, description, startDate, dueDate, quota, address, city, state, country, category} = req.body;
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
    console.log(req.body)

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
    if(!res.locals.user.events){
      return res.status(404).json({message: "No events to show."});
    }
    const events = await Event.find({ _id: { $in: res.locals.user.events } });
    if(events) {
      return res.status(200).json(events);
    }else {
      res.status(404).json({message: "Your events could not be found."})
    }
  } catch (error) {
    console.log(error, error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", message: "Error occured in getUserEvents method." });
  }
}

async function getUserPhysicalEvents(req, res) {
  try {
    if (!res.locals.user.events || res.locals.user.events.length === 0) {
      return res.status(404).json({ message: "No events to show." });
    }

    const events = await Event.find({
      $and: [
        { _id: { $in: res.locals.user.events } },
        { isOnline: false }
      ]
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
      $and: [
        { _id: { $in: res.locals.user.events } },
        { isOnline: true }
      ]
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

    if (!eventId) {
      return res.status(400).json({ message: "Event not found." });
    }

    const isEventExist = res.locals.user.events.some((id) => new ObjectId(id).equals(eventId));

    if (!isEventExist) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const result = await Event.deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event was not deleted." });
    }

    return res.status(201).json({ message: "Event has been deleted succesfully." });
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
async function getEventsByCategory(req,res){
  try {
    if(!req.query.category){
      return res.status(400).json( { message: "Fill all the fields."})
    }

    const events = await Event.find({ category: req.query.category })
    if(events.length === 0){
      return res.status(404).json({ message: "No events."})
    }
    return res.status(200).json({ message: events});
    
  }catch(error){
    console.log(error,error.message);
    return res.status(500).json({ message: "Internal server error."})
  }
}

async function getEventsByLocation(req,res){
  try {
    const { address,city,state,country} = req.query;
    // 
  }catch(error){
    console.log(error,error.message);
    return res.status(500).json({ message: "Internal server error."})
  }
}

async function getEventImage(req, res) {
  try {
    if (!req.params.eventId) {
      return res.status(404).json({ message: "No resources are available." });
    }

    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (!event.eventCoverImgUrl) {
      return res.status(404).json({ message: "Event image not found." });
    }
    console.log(event.eventCoverImgUrl)
    return res.status(200).sendFile(path.resolve(event.eventCoverImgUrl));
  } catch (error) {
    console.error(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}


async function getFilteredEvents(req,res){
  try{
    const { address, city,state,country, isOnline,quota, category} = req.query;
    if(address || city || state || country ||isOnline || quota || category ){
      const filter = {};
      if(address){
        filter.address = address;
      }
      if(city){
        filter.city = city;
      }
      if(state){
        filter.state = state;
      }
      if(country){
        filter.country = country;
      }
      if(isOnline){
        filter.isOnline = isOnline === "true";
      }
      if(quota){
        filter.quota = parseInt(quota);
      }
      if(category){
        filter.category = category;
      }

      if(Object.keys(filter).length > 0){
        const events = await Event.find(filter);
        if(events.length === 0){
          res.status(404).json({ message: "No events to show."})
        }
        return res.status(200).json({ events: events});
      }

    }
    return res.status(400).json({ message: "No filter option provided." });
  }catch(error){
    console.log(error,error.message);
    return res.status(500).json({ message: "Internal server error."})
  }
}

async function getLatestEvents(req,res){
  try {
    const latestEvents = await Event.find().sort({ createdAt: -1 }).limit(10);
    if(!latestEvents){
      return res.status(200).json({ message: "Noone is up here :/"});
    }
    return res.status(200).json(latestEvents);
  }catch(error){
    return res.status(500).json({ message: "Internal server error"});
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
  getLatestEvents
};
