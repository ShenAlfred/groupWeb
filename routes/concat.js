var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('../common/request');
var activeIndex, activeIndex_two;

router.get('/', function(req, res, next) {
    var key = req.originalUrl;
    request.navigationBar().then(function(navigationBar) {
        navigationBar.forEach(function(item, index) {
            if(req.baseUrl.match(item.url.split(/[-]?.html/)[0])) {
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
        request.contentDetail('/api/aboutUs').then(function(contentDetail) {
            res.render('mainview/concat', Object.assign(
                {
                    content: contentDetail,
                    navigationBar: navigationBar,
                    activeIndex: activeIndex,
                    activeIndex_two: activeIndex_two,
                    popmapWidth: 400,
                    popmapHeight: 210,
                    mapWidth: 300,
                    mapHeight: 154,
                    wherePage: 'about-concat'
                }, config.tdk[key]
            ));
        });
    });
});

module.exports = router;


