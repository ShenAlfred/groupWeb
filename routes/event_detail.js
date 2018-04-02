var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../config');
var request = require('../common/request');
var contentDetail, activeIndex, activeIndex_two;

function getNews(id) {
    return new Promise(function(resolve, reject) {
        var req = http.get(config.baseUrl + '/api/news/'+id, function(req, res) {
            var result = Buffer.allocUnsafe(0);
            req.on('data', function(chunk){
                result = Buffer.concat([result, chunk], result.length + chunk.length);
            });
            req.on('end', function(){
                var _json = JSON.parse(result);
                contentDetail = _json.data;
                resolve(contentDetail);
            });
        });
        req.on('error', function(err){
            reject(err);
        });
        req.end();
    });
}

router.get('/about/event/:id', function(req, res, next) {

    var path = req.route.path.split("/");
    var id = req.params.id;

    request.navigationBar().then(function(navigationBar) {

        navigationBar.forEach(function(item, index) {
            if( ("/"+path[1]).match(item.url) ) {
                activeIndex = index;
            }
            if(item.barResList.length) {
                item.barResList.forEach(function(item, index) {
                    if( ("/"+path[1]+"-"+path[2]) === item.url) {
                        activeIndex_two = index;
                    }
                })
            }
        });

        getNews(id).then(function(data) {
            res.render('detail/article', {
                title: '集团简介_关于商赢-商赢集团官网',
                description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
                keywords: '集团简介,商赢,商赢集团',
                content: data,
                navigationBar: navigationBar,
                activeIndex: activeIndex,
                activeIndex_two: activeIndex_two,
                wherePage: path[2]+"-detail"
            });
        });

    });



});

module.exports = router;

