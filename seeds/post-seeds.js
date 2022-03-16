const { Post } = require("../models");

const postdata = [
  {
    title: "Donec posuere metus vitae ipsum.",
    text: "text body",
    user_id: 10,
  },
  {
    title: "Morbi non quam nec dui luctus rutrum.",
    text: "text body",
    user_id: 8,
  },
  {
    title:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    text: "text body",
    user_id: 1,
  },
  {
    title: "Nunc purus.",
    text: "text body",
    user_id: 4,
  },
  {
    title: "Pellentesque eget nunc.",
    text: "text body",
    user_id: 7,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    text: "text body",
    user_id: 4,
  },
  {
    title: "In hac habitasse platea dictumst.",
    text: "text body",
    user_id: 1,
  },
  {
    title: "Morbi non quam nec dui luctus rutrum.",
    text: "text body",
    user_id: 1,
  },
  {
    title: "Duis ac nibh.",
    text: "text body",
    user_id: 9,
  },
  {
    title: "Curabitur at ipsum ac tellus semper interdum.",
    text: "text body",
    user_id: 5,
  },
  {
    title: "In hac habitasse platea dictumst.",
    text: "text body",
    user_id: 3,
  },
  {
    title: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    text: "text body",
    user_id: 10,
  },
  {
    title: "Donec dapibus.",
    text: "text body",
    user_id: 8,
  },
  {
    title: "Nulla tellus.",
    text: "text body",
    user_id: 3,
  },
  {
    title:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    text: "text body",
    user_id: 3,
  },
  {
    title:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
    text: "text body",
    user_id: 7,
  },
  {
    title: "In hac habitasse platea dictumst.",
    text: "text body",
    user_id: 6,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
