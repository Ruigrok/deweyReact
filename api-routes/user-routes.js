const db = require("../client/models");

module.exports = function (app) {

  // Get a user based on their email
  app.get('/api/users/:email', function (req, res) {
    db.User.findOne({
      where: { email: req.params.email },
      include: [db.Library]
    }).then(function (user) {
      res.json(user);
    });
  });

  // Create a new user
  app.post('/api/users', function (req, res) {
    db.User.create(req.body)
      .then(function (results) {
        res.json(results)
      });
  });

}

