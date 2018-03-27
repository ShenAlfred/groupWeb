var express = require('express');
var router = express.Router();
var http = require('http');
var contentDetail, navigationBar, activeIndex, activeIndex_two;

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

function getNews(id) {
    return new Promise(function(resolve, reject) {
        var req = http.get('http://gsite.shangyingjt.com/api/news/'+id, function(req, res) {
            var result = "";
            req.on('data', function(_result){
                result += _result;
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

router.get('/news/media/:id', function(req, res, next) {

    var path = req.route.path.split("/");
    var id = req.params.id;

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
});

module.exports = router;

