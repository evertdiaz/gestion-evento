var express = require('express');
var router = express.Router();
var User = require('../models').User

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users) {
  	res.send(users)
  })
});

router.post('/:username&:password', function(req, res, ext) {
	User.find({username: req.params.username, password: req.params.password}, function(err, user) {
		if (JSON.stringify(user) != '[]'){
			console.log(user)
			res.send(user)
		}
		else{
			res.send('no_data')
		}
	})
})

module.exports = router;
