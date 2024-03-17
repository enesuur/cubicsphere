const Event = require("../models/eventModel");
const User = require("../models/userModel");

async function handleSearch(req, res) {
  try {
    const query = req.query.q.trim();

    if (!query) {
      return res.status(400).json({ message: "Search something..." });
    }

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

    const regexQuery = new RegExp(
      query.replace(/[ıIiİşŞsSğGĞüÜöÖ]/g, (match) => letters[match] || match),
      "i"
    );


    const events = await Event.find({
      $or: [
        { title: { $regex: regexQuery } },
        { category: { $regex: regexQuery } },
        { address: {  $regex: regexQuery } },
        { city: { $regex: regexQuery } },
        { state: { $regex: regexQuery } },
        { country: { $regex: regexQuery } }
      ]
    });

    const users = await User.find({ username: { $regex: regexQuery } });

    res.json({ events: events, users: users });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = handleSearch;
