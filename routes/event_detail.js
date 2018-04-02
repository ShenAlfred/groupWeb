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
                title: data.title,
                description: data.newsDesc,
                keywords: '商赢,商赢官网,商赢集团,商赢控股,商赢环球,商赢电商,商赢金控,商赢金服',
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

