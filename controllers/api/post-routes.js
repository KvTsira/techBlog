const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Post.findAll({
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((recordSet) => res.json(recordSet))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(404).json({ message: "No post found at this id" });
      }

      res.json(recordSet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.session.user_id,
  })
    .then((recordSet) => res.json(recordSet))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(404).json({ message: "No post found at this id" });
        return;
      }

      res.json(recordSet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(404).json({ message: "No post found at this id" });
        return;
      }

      res.json(recordSet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
