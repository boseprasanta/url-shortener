var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../configuration/config');
var base58=require('../base58');
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
var Url=require('../models/url');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Url Shortner' });
});
router.post('/api/shorten', function(req, res){
  var longUrl = req.body.url;
  var shortUrl = '';

  
  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      shortUrl = config.webhost + base58.encode(doc._id);
      res.send({'shortUrl': shortUrl});
    } else {
      var newUrl = Url({
        long_url: longUrl
      });
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
        shortUrl = config.webhost + base58.encode(newUrl._id);

        res.send({'shortUrl': shortUrl});
      });
    }

  });

});
router.get('/:encoded_id', function(req, res){
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      
      res.redirect('https://'+doc.long_url);
    } else {
      
      res.redirect(config.webhost);
    }
  });

});

module.exports = router;
