const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  validateUserCreatePayload,
  validateUserUpdatePayload,
} = require("../../validator/User");

module.exports = {
  handlerGetUser: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "fullname", "shortname", "photo"],
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get all users",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetUserId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findAll({
        where: { id: id },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Successfully get user by id",
          data: user,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  handlerPostUser: async (req, res, next) => {
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
      validateUserCreatePayload(req.body);
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
      next(error);
    }
  },
  handlerPutUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullname, shortname, biodata, angkatan, jabatan } = req.body;
      validateUserUpdatePayload({
        id,
        fullname,
        shortname,
        biodata,
        angkatan,
        jabatan,
      });
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        await user.update({
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
          message: "Successfully update user",
          data: data,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      await user.destroy();
      res.status(200).json({
        status: "success",
        message: "Successfully delete user",
      });
    }
  },
  handlerGetUserFilterName: async (req, res, next) => {
    try {
      const { name } = req.query;
      const user = await User.findAll({
        where: { fullname: { [Sequelize.Op.like]: `%${name}%` } },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Successfully get user by name",
          data: user,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
