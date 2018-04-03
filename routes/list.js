var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../config');
var request = require('../common/request');
var contentDetail, activeIndex, activeIndex_two;

function getMews(url, level, level2) {
    return new Promise(function(resolve, reject) {
        var req = http.get(url, function(req, res) {
            var result = Buffer.allocUnsafe(0);
            req.on('data', function(chunk){
                result = Buffer.concat([result, chunk], result.length + chunk.length);
            });
            req.on('end', function(){
                var _json = JSON.parse(result);
                contentDetail = _json;
                contentDetail.level_name = level;
                contentDetail.level2_name = level2;
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
}


router.get('/:id', function(req, res, next) {
    var page_num = req.params.id;
    var path = req.baseUrl.split('/');
    var apiUrl = "";
    if(path[2] == "media") {
        apiUrl = config.baseUrl + '/api/newsList/2?pageSize=4&iPage='+ page_num;
    }
    if(path[2] == "trends") {
        apiUrl = config.baseUrl + '/api/newsList/1?pageSize=4&iPage='+ page_num;
    }
    if(path[2] == "video") {
        apiUrl = config.baseUrl + '/api/videoList/?pageSize=6&iPage='+ page_num;
    }
    if(path[2] == "staff") {
        apiUrl = config.baseUrl + '/api/style?pageSize=3&iPage=' + page_num;
    }

    request.navigationBar().then(function(navigationBar) {

        navigationBar.forEach(function(item, index) {
            if( ("/"+path[1]).match(item.url.split("-")[0]) ) {
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

        getMews(apiUrl,path[1],path[2]).then(function(data) {
            res.render('mainview/'+path[2], Object.assign(
                {
                    content: data,
                    navigationBar: navigationBar,
                    activeIndex: activeIndex,
                    activeIndex_two: activeIndex_two,
                    wherePage: path[1]+'-'+path[2]
                },config.tdk["/"+path[1]+"-"+path[2]]
            ));
        });
    });
});

module.exports = router;



