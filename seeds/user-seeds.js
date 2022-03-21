const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userdata = [
  {
    username: "lilleh",
    password: "password123",
  },
  {
    username: "levani",
    password: "password123",
  },
  {
    username: "svetlana",
    password: "password123",
  },
  {
    username: "gurami",
    password: "password123",
  },
  {
    username: "rufa",
    password: "password123",
  },
  {
    username: "natela",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
