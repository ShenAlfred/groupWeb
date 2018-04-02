var express = require('express');
var router = express.Router();
var request = require('../common/request');

router.get('/', function(req, res, next) {

    request.contentDetail('/api/groupProfile').then(function(contentDetail) {

        res.render('about/group_profile', {
            content: contentDetail
        });

    });

});

module.exports = router;
