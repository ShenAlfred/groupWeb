var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../config');
var request = require('../common/request');
var activeIndex, activeIndex_two;


var getTrends = function() {
    return new Promise(function(resolve, reject) {
       var req = http.get(config.baseUrl + '/api/newsList/1', function(req, res) {
           var result = Buffer.allocUnsafe(0);
           req.on('data', function(chunk){
               result = Buffer.concat([result, chunk], result.length + chunk.length);
           });
           req.on('end', function(){
               var _json = JSON.parse(result);
               contentDetail = _json;
               contentDetail.level_name = 'news';
               contentDetail.level2_name = 'trends';
               contentDetail.currentViewIndex = _json.iPage;
               if(_json.iPage < _json.pageCount){
                   if(_json.pageCount >= 5){
                       if(_json.iPage < 5) {
                           contentDetail.begin = 1;
                           contentDetail.end = 5;
                       }else{
                           contentDetail.end = _json.iPage+1;
                           contentDetail.begin = contentDetail.end-4
                       }
                   }else{
                       contentDetail.begin = 1;
                       contentDetail.end = _json.pageCount;
                   }
               }else {
                   contentDetail.end = _json.pageCount;
                   contentDetail.begin = contentDetail.end-4;
                   if(contentDetail.begin < 1)
                       contentDetail.begin = 1;
               }
               resolve(contentDetail);
           });
       });
        req.on('error', function(err){
            reject(err);
        });
        req.end();
    });
};

router.get('/', function(req, res, next) {
    var key = req.originalUrl;
    request.navigationBar().then(function(navigationBar) {
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
        getTrends().then(function(contentDetail) {
            res.render('mainview/trends', Object.assign(
                {
                    content: contentDetail,
                    navigationBar: navigationBar,
                    activeIndex: activeIndex,
                    activeIndex_two: activeIndex_two,
                    wherePage: 'news-trends'
                }, config.tdk[key]
            ));
        })

    });


});

module.exports = router;


