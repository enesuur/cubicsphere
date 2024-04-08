async function retrieveUser(req, res) {
  try {
    const {_id,username,name,lastname,email,residency,role,birthday,biography,events,profileImgUrl,eventRequests} = res.locals.user;
    console.log();
    return res.status(200).send({
      user: {
        _id,
        username,
        name,
        lastname,
        email,
        birthday,
        residency,
        biography,
        role,
        events,
        profileImgUrl,
        eventRequests
      }
    });
    
  } catch (error) {
    console.log(error, error.message);
    console.log("Something went wrong on retrieving user.");
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = retrieveUser;
