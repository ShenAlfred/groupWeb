var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {

    const width = parseInt(req.query.w);
    const height = parseInt(req.query.h);
    const lng = req.query.mapPoint.split(',')[0];
    const lat = req.query.mapPoint.split(',')[1];

    res.render('sitemap/symap', {
        title: '集团简介_关于商赢-商赢集团官网',
        description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
        keywords: '集团简介,商赢,商赢集团',
        mapWidth: width,
        mapHeight: height,
        mapLng: lng,
        mapLat: lat
    });
});

module.exports = router;
