const database = require("./database");

const getUsers = (req, res) => {
    database
        .query('SELECT * FROM users')
        .then((users) => {
            res.json(users)
            // res.status(200).send('user found')
        })
        .catch((err) => {
            if (err = null) {
                res.status(200).send('user found')
            } else {
                console.error(err);
                res.status(500).send("Error retrieving data from database");
            }
        })
}

const getUserByID = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query('SELECT * FROM users where id = ?', [id])
        .then(([users]) => {
            if (users[0] != null) {
                res.json(users[0])
            } else {
                res.status(400).send('Not Found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        })
}

//  users (firstname, lastname, email, city, language)

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  };

module.exports = {
    getUsers,
    getUserByID,
    postUser,
  };