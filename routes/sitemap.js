var express = require('express');
var router = express.Router();
var request = require('../common/request');
var activeIndex;

router.get('/', function(req, res, next) {
    request.navigationBar().then(function(navigationBar) {
        res.render('mainview/sitemap', {
            navigationBar: navigationBar,
            activeIndex: activeIndex
        });
    });
});

module.exports = router;
