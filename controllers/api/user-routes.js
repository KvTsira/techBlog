const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
  User.findAll({})
    .then((recordSet) => res.json(recordSet))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "text", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }

      res.json(recordSet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((recordSet) => {
      req.session.save(() => {
        req.session.user_id = recordSet.id;
        req.session.username = recordSet.username;
        req.session.loggedIn = true;

        res.json(recordSet);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(400).json({ message: "No user found at this username" });
        return;
      }

      const validatePassword = recordSet.checkPassword(req.body.password);

      if (!validatePassword) {
        res.status(400).json({ message: "Incorrect password" });
        return;
      }

      req.session.save(() => {
        req.session.user_id = recordSet.id;
        req.session.username = recordSet.username;
        req.session.loggedIn = true;

        res.json({ user: recordSet, message: "You are no logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }

      res.json(recordSet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((recordSet) => {
      if (!recordSet) {
        res.status(404).json({ message: "No user found at this id" });
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
