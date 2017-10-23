const db = require("../client/models");

module.exports = function (app) {

// Create new discussion in database and associate it with a group
app.post('/api/groups/:group/discussions', function (req, res) {
    db.Discussion.create({
      name: req.body.name,
      GroupId: req.params.group
    }).then(function (results) {
      res.json(results)
    });
  });
  
  // Get a specific Group's discussions
  app.get('/api/groups/:group/discussions', function (req, res) {
    db.Group.findById(req.params.group)
      .then(function (group) {
        group.getDiscussions()
          .then(function (discussions) {
            res.json(discussions)
          })
      });
  });
  
  // Delete discussion in database whenever a group member deletes it
  app.delete('/api/groups/:group/discussions/:discussion', function (req, res) {
    db.Discussion.destroy({
      where: {
        id: req.params.discussion
      }
    }).then(function (results) {
      res.json(results);
    });
  });
  
  // Update discussion name
  app.put('/api/groups/:group/discussions/:discussion', function (req, res) {
    db.Discussion.update(
      {
        name: req.body.name
      },
      {
        where: {
          id: req.params.discussion
        }
      }).then(function (results) {
        res.json(results)
      });
  });

}

