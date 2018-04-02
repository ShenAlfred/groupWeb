var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('../common/request');
var activeIndex, activeIndex_two;

router.get('/', function(req, res, next) {
    var key = req.originalUrl;
    request.navigationBar().then( function(navigationBar) {
        navigationBar.forEach(function(item, index) {
            if(req.baseUrl.match(item.url.split(/[-]?.html/)[0].split("-")[0])) {
                activeIndex = index;
            }
            if(item.barResList.length) {
                item.barResList.forEach(function(item, index) {
                    if(req.baseUrl === item.url.split(/[-]?.html/)[0]) {
                        activeIndex_two = index;
                    }
                })
            }
        });
        request.contentDetail('/api/column/13').then(function(contentDetail) {
            res.render('mainview/banking', Object.assign(
                {
                    content: contentDetail,
                    navigationBar: navigationBar,
                    activeIndex: activeIndex,
                    activeIndex_two: activeIndex_two,
                    wherePage: 'property-banking'
                },config.tdk[key]
            ));
        });
    });
});

module.exports = router;


