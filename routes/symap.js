var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {

    const width = parseInt(req.query.w);
    const height = parseInt(req.query.h);
    const lng = req.query.mapPoint.split(',')[0];
    const lat = req.query.mapPoint.split(',')[1];

    res.render('sitemap/symap', {
        mapWidth: width,
        mapHeight: height,
        mapLng: lng,
        mapLat: lat
    });
});

module.exports = router;
