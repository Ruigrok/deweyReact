const db = require("../client/models");

module.exports = function (app) {

  app.post('/api/library', function (req, res) {
    db.Library.create({
      title: req.body.title,
      author: req.body.author,
      comments: req.body.comments,
      link: req.body.link,
      UserId: req.body.UserId
    }).then(function (results) {
      res.json(results);
    });
  });

  app.get('/api/library/:id', function (req, res) {
    db.Library.findAll({
      where: {
        UserId: req.params.id
      }
    })
      .then(function (results) {
        console.log
        res.json(results);
      });
  });

  app.delete('/api/library/:id', function (req, res) {
    db.Library.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });


  app.put('/api/users/:id', function (req, res) {
    ;
    db.User.update(
      {
        favoriteBook: req.body.favoriteBook,
        currentlyReading: req.body.currentlyReading
      },
      {
        where: { id: req.params.id }
      })
      .then(function (results) {
        res.json(results);
      });
  });

}
