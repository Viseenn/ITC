const jwt = require("jsonwebtoken");
const accessTokenSecretKey = "itc-secret-key";

function AuthenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    next(new Error("Token not found"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    next(new Error("Token is required"));
  }
  const decoded = jwt.verify(token, accessTokenSecretKey);

  const user = {
    id: decoded.id,
    email: decoded.email,
    fullname: decoded.fullname,
    shortname: decoded.shortname,
    photo: decoded.photo,
    biodata: decoded.biodata,
    angkatan: decoded.angkatan,
    jabatan: decoded.jabatan,
  };

  req.user = user;

  next();
}

module.exports = AuthenticationToken;
