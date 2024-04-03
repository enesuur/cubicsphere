function displayUserById(req, res, next) {

  return res.status(404).json({ message: "You are not allowed to reach this endpoint." });
}

module.exports = displayUserById;