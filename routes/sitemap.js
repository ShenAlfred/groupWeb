var express = require('express');
var router = express.Router();
var http = require('http');
var navigationBar, activeIndex;

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

router.get('/', function(req, res, next) {

    res.render('mainview/sitemap', {
        title: '集团简介_关于商赢-商赢集团官网',
        description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
        keywords: '集团简介,商赢,商赢集团',
        navigationBar: navigationBar,
        activeIndex: activeIndex
    });
});

module.exports = router;
