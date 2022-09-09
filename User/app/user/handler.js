const { User, Sequelize } = require("../../models");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");

module.exports = {
  handlerGetUser: async (req, res) => {
    const users = await User.findAll({
      attributes: ["id", "fullname", "shortname", "photo"],
    });
    res.status(200).json({
      status: "success",
      message: "Successfully get all users",
      data: users,
    });
  },
  handlerGetUserId: async (req, res) => {
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
  },
  handlerPostUser: async (req, res) => {
    const { email, password, fullname, shortname, biodata, angkatan, jabatan } = req.body;
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
      attributes: { exclude: ["password", "photo", "createdAt", "updatedAt"] },
    });
    res.status(200).json({
      status: "success",
      message: "Successfully create user",
      data: data,
    });
  },
  handlerPutUser: async (req, res) => {
    const { id } = req.params;
    const { fullname, shortname, biodata, angkatan, jabatan } = req.body;
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
      res.status(200).json({
        status: "success",
        message: "Successfully update user",
      });
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
  handlerGetUserFilterName: async (req, res) => {
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
  },
};
