const express = require("express");
const { handlerLoginUser, handlerRegisterUser } = require("./handler");
const routerA = express.Router();

//API8 Register User
routerA.post("/register", handlerRegisterUser);

//API7 Login User
routerA.post("/login", handlerLoginUser);

module.exports = routerA;
