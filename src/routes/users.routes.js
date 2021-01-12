const { Router } = require("express");
const dbConnection = require("../database");

const authorData = {
  author: "Damian Zsiros",
  author_web: "http://damian-zsiros.herokuapp.com/",
};

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/users");
});

router.get("/users", (req, res) => {
  dbConnection.query("SELECT * FROM USERS", (err, rows, fields) => {
    if (!err) {
      res.json({
        data: rows,
        author_data: authorData,
      });
    } else {
      console.error(err);
      return;
    }
  });
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  dbConnection.query(
    "SELECT * FROM USERS WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          data: rows,
          author_data: authorData,
        });
      } else {
        console.error(err);
        return;
      }
    }
  );
});

router.get("/users/:nationality", (req, res) => {
  const nationality = req.params.nationality;
  dbConnection.query(
    "SELECT * FROM users WHERE nationality = ?",
    [nationality],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          data: rows,
          author_data: authorData,
        });
      } else {
        console.error(err);
        return;
      }
    }
  );
});

router.post("/users", (req, res) => {
  const { fisrt_name, second_name, surname, age, nationality } = req.body;
  dbConnection.query(
    "INSERT INTO USERS (fisrt_name,second_name,surname,age,nationality) VALUES(?,?,?,?,?)",
    [fisrt_name, second_name, surname, age, nationality],
    (err) => {
      if (!err) {
        res.json({
          message: "User saved",
          author_data: authorData,
        });
      } else {
        console.error(err);
        return;
      }
    }
  );
});

router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { fisrt_name, second_name, surname, age, nationality } = req.body;
  const query =
    "UPDATE users SET fisrt_name = ?,second_name = ?,surname = ?,age = ?,nationality = ?  WHERE id = ? ";
  dbConnection.query(
    query,
    [fisrt_name, second_name, surname, age, nationality, id],
    (err) => {
      if (!err) {
        res.json({
          message: "User updated",
          author_data: authorData,
        });
      } else {
        console.error(err);
        return;
      }
    }
  );
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  dbConnection.query(query, [id], (err) => {
    if (!err) {
      res.json({
        message: "User deleted",
        author_data: authorData,
      });
    } else {
      console.error(err);
      return;
    }
  });
});

module.exports = router;
