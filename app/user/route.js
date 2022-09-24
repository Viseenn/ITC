const express = require("express");
const AuthenticationToken = require("../../middleware/AuthenticationToken");
const {
  handlerGetUser,
  handlerPostUser,
  handlerPutUser,
  handlerDeleteUser,
  handlerGetUserId,
  handlerGetUserFilterName,
} = require("./handler");
const router = express.Router();

//API1 Get Users
router.get("/", handlerGetUser);

//API3 Create Users
router.post("/", handlerPostUser);

//API4 Update Users
router.put("/:id", AuthenticationToken, handlerPutUser);

//API5 Delete Users
router.delete("/:id", AuthenticationToken, handlerDeleteUser);

//API6 Get User Filter Name
router.get("/search", handlerGetUserFilterName);

//API2 Get Users By Id
router.get("/:id", handlerGetUserId);

module.exports = router;
