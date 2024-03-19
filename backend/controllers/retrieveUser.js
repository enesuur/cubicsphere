async function retrieveUser(req, res) {
  try {
    const {username,name,lastname,profileImg,residency,role,birthday} = res.locals.user;
    console.log();
    return res.status(200).send({
      user: {
        username,
        name,
        lastname,
        profileImg,
        residency,
        role,
        birthday
      }
    });
    
  } catch (error) {
    console.log(error, error.message);
    console.log("Something went wrong on retrieving user.");
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = retrieveUser;
