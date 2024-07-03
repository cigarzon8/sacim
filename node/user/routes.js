
var express = require('express');
var router = express.Router();
const User = require('../model/User');

router.get('/', async function(req, res) {
  const users = await User.findAll();

  const usersData = users.map(user => user.toJSON());

  console.log('users',usersData)
  res.render('list', {datalist:usersData});
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;

