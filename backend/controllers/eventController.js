const slugify = require("slugify");
const ObjectId = require("mongoose").Types.ObjectId;
const Event = require("../models/eventModel");
const User = require("../models/userModel");

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
    const { slug } = req.body;
    const event = await Event.findOne({ slug });
    if (!event) {
      return res.status(404).json({ message: "Page not found." });
    }
    res.send(200).json({ event: event });
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

module.exports = {
  createPhysicalEvent,
  createOnlineEvent,
  updatePhysicalEvent,
  updateOnlineEvent,
  getEvent,
  getEventsByCategory,
  getFilteredEvents,
  deleteEvent
};
