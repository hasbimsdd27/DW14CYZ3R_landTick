require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      raw: true,
      where: {
        email
      }
    });
    if (!user) {
      throw new err();
    } else {
      let verifikasi = bcrypt.compareSync(password, user.password);
      if (!verifikasi) {
        throw new err();
      } else {
        const token = jwt.sign(
          { user_id: user.id, user_name: user.name, user_email: user.email },
          process.env.SECRET_KEY
        );
        res.status(200).send({
          message: "login success",
          data: { email: user.email, name: user.name, token, level: user.level }
        });
      }
    }
  } catch (err) {
    res.status(401).send({ message: "invalid username or password" });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, gender, phone, address, identity } = req.body;
  try {
    let userData = await User.findOne({
      where: {
        email
      }
    });
    if (!userData) {
      let hash = bcrypt.hashSync(password, 10);
      await User.create({
        name,
        email,
        password: hash,
        level: "user",
        gender,
        phone,
        address,
        identity,
        createdAtd: new Date(),
        updatedAt: new Date()
      });
      userData2 = await User.findOne({
        where: {
          name,
          email,
          phone,
          address,
          identity
        }
      });
      const token = jwt.sign(
        {
          user_id: userData2.id,
          user_name: userData2.name,
          user_email: userData2.email
        },
        process.env.SECRET_KEY
      );

      res.status(201).send({
        message: "Register success",
        data: { email: userData2.email, name: userData2.name, token }
      });
    } else {
      throw new err();
    }
  } catch (err) {
    res.status(409).send({ message: "email already registered" });
  }
};
