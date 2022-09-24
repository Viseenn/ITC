const jwt = require("jsonwebtoken");

const accessTokenSecretKey = "itc-secret-key";

function generateAccessToken(userPayload) {
  return jwt.sign(userPayload, accessTokenSecretKey, {
    subject: userPayload.fullname,
    expiresIn: "20m",
  });
}

module.exports = {
  generateAccessToken,
};