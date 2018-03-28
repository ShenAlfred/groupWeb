var express = require('express');
var router = express.Router();
var http = require('http');
var contentDetail, navigationBar, activeIndex, activeIndex_two, page;

http.get('http://gsite.shangyingjt.com/api/navigationBar', function(req, res) {
    var result = "";
    req.on('data', function(_result){
        result += _result;
    });
    req.on('end', function(){
        var _json = JSON.parse(result);
        navigationBar = _json.data;
        navigationBar.forEach(function(item,index) {
            if(/\//.test(item.url)) {
                navigationBar[index].url = item.url;
            }
            else if( !(/http:\/\//.test(item.url))) {
                navigationBar[index].url = "/"+item.url.split(".")[0];
            }
            if(navigationBar[index].barResList.length > 0) {
                navigationBar[index].barResList.forEach(function(item, i) {
                    if( !(/http:\/\//.test(item.url)) ) {
                        navigationBar[index].barResList[i].url = "/"+item.url.split(".")[0];
                    }
                });
            }
        });
    });
});

function getMews(url, level, level2) {
    return new Promise(function(resolve, reject) {
        var req = http.get(url, function(req, res) {
            var result = "";
            req.on('data', function(_result){
                result += _result;
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
        apiUrl = 'http://gsite.shangyingjt.com/api/newsList/2?pageSize=4&iPage='+ page_num;
    }
    if(path[2] == "trends") {
        apiUrl = 'http://gsite.shangyingjt.com/api/newsList/1?pageSize=4&iPage='+ page_num;
    }
    if(path[2] == "video") {
        apiUrl = 'http://gsite.shangyingjt.com/api/videoList/?pageSize=6&iPage='+ page_num;
    }

    getMews(apiUrl,path[1],path[2]).then(function(data) {
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
        })
        res.render('mainview/'+path[2], {
            title: '集团简介_关于商赢-商赢集团官网',
            description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
            keywords: '集团简介,商赢,商赢集团',
            content: data,
            navigationBar: navigationBar,
            activeIndex: activeIndex,
            activeIndex_two: activeIndex_two,
            wherePage: 'news-'+path[2]
        });
    });
});

module.exports = router;



