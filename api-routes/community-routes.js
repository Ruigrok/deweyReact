const db = require("../client/models");

module.exports = function (app) {

  // Get user user's groups and discussions
  app.get('/api/groups/:email', function (req, res) {
    db.User.findOne({
      where: { email: req.params.email },
    })
      .then(function (user) {
        user.getGroups({
          include: [db.Discussion]
        })
          .then(function (groups) {
            res.json(groups);
          });
      });
  });

  // Get all groups to display in JoinGroup component
  app.get('/api/allgroups', function (req, res) {
    db.Group.findAll({
      include: [{
        model: db.User,
        through: {
          attributes: ['name', 'description']
        }
      }]
    })
      .then(function (results) {
        res.json(results);
      })
  });

  // Create a new group and associate the user to that group
  app.post('/api/groups', function (req, res) {
    db.Group.create({
      name: req.body.name,
      description: req.body.description
    })
      .then(function (group) {
        var groupID = group.id;
        db.User.findOne({
          where: { email: req.body.user },
        })
          .then(function (user) {
            user.addGroup(groupID)
          })
        res.json(group)
      })
  });

  // Remove a user from a group
  app.delete('/api/groups/:group/:user', function (req, res) {
    db.User.findOne({
      where: { email: req.params.user }
    }).then(function (user) {
      user.removeGroup(req.params.group)
    }).then(function (results) {
      res.json(results);
    })
  });

  // Delete a group for all users
  app.delete('/api/groups/:group', function (req, res) {
    db.Group.destroy({
      where: { id: req.params.group }
    }).then(function (results) {
      res.json(results);
    })
  });

  // Add user to a group
  app.post('/api/groups/:group/users/:user', function (req, res) {
    db.User.findOne({
      where: { email: req.params.user },
    })
      .then(function (user) {
        user.addGroup(req.params.group)
      }).then(function (results) {
        res.json(results);
      })
  });

  // Get all members of a group
  app.get('/api/groups/:group/members', function (req, res) {
    db.Group.findById(req.params.group)
      .then(function (group) {
        group.getUsers()
          .then(function (users) {
            res.json(users)
          })
      })
  });

}