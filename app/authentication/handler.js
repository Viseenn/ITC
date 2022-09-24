const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  validateUserRegisterPayload,
  validateUserLoginPayload,
} = require("../../validator/User");
const { generateAccessToken } = require("../../utils/TokenManager.js");

module.exports = {
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      validateUserLoginPayload(req.body);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const passwordValid = bcrypt.compareSync(password, user.password);

      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        shortname: user.shortname,
        photo: user.photo,
        biodata: user.biodata,
        angkatan: user.angkatan,
        jabatan: user.jabatan,
      });

      res.status(200).json({
        status: "success",
        message: "Successfully login user",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  handlerRegisterUser: async (req, res, next) => {
    try {
      const {
        email,
        password,
        fullname,
        shortname,
        biodata,
        angkatan,
        jabatan,
      } = req.body;
      validateUserRegisterPayload(req.body);
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashPassword,
        fullname,
        shortname,
        biodata,
        angkatan,
        jabatan,
      });
      const data = await User.findAll({
        where: { id: user.id },
        attributes: {
          exclude: ["password", "photo", "createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        status: "success",
        message: "Successfully create user",
        data: data,
      });
    } catch (error) {
      res.status(404).json({
        message: "Error",
      });
    }
  },
};
