var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../config');
var request = require('../common/request');
var contentDetail, activeIndex, activeIndex_two;

function getNews(id, level, level2) {
    return new Promise(function(resolve, reject) {
        var req = http.get(config.baseUrl + '/api/style/'+id+"?pageSize=6&iPage=1", function(req, res) {
            var result = Buffer.allocUnsafe(0);
            req.on('data', function(chunk){
                result = Buffer.concat([result, chunk], result.length + chunk.length);
            });
            req.on('end', function(){
                var _json = JSON.parse(result);
                contentDetail = _json;
                contentDetail.level_name = level;
                contentDetail.level2_name = level2;
                contentDetail.type = id;
                contentDetail.currentViewIndex = _json.iPage;
                console.log(contentDetail);
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

router.get('/culture/staff/:id', function(req, res, next) {

    var path = req.route.path.split("/");
    var id = req.params.id;

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

        getNews(id, path[2], 'detail').then(function(data) {
            res.render('detail/article', {
                title: data.name,
                description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
                keywords: '员工风采_商赢文化-商赢集团官网',
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

