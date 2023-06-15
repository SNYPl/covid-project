const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = String(req.get("Authorization")).split(" ")[1];

  // console.log(token);
  // if (!token) {
  //   return res.sendStatus(403);
  // }
  // try {
  //   const data = jwt.verify(token, "secret");
  //   req.userId = data.id;
  //   req.userRole = data.role;
  //   console.log(data);
  //   return next();
  // } catch (err) {
  //   return res.send(err);
  // }
  next();
};
