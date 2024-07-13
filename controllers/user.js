const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const selectionStr = "-passwordHash -__v";
const postUser = async function postUser(req, res) {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });
    user = await user.save();
    res.status(201).json({
      status: "Success",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const getAllUsers = async function getAllUsers(_, res) {
  try {
    const usersList = await User.find().select(selectionStr);
    if (usersList.length === 0) {
      return res.status(200).json({
        status: "Sucesss",
        message: "No users were added yet",
      });
    }
    res.status(200).send(usersList);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const getUser = async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select(selectionStr);
    if (user) {
      res.status(200).json({
        status: "Success",
        user,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "User wasn't found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const loginUser = async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User with this email wasn't found",
      });
    }
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      return res.status(200).json({
        status: "Success",
        email: user.email,
        token,
      });
    }
    res.status(401).json({
      status: "Failed",
      message: "Wrong password",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Email or password is missing",
    });
  }
};

const registerUser = async function registerUser(req, res) {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });
    user = await user.save();
    res.status(201).json({
      status: "Success",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const getCount = async function getCount(_, res) {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({
      status: "Sucesss",
      count: userCount,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const deleteUser = function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          status: "Success",
          message: "User was deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "Success",
          message: "User wasn't found",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        error: err,
      });
    });
};

module.exports = {
  postUser,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  getCount,
  deleteUser
};
