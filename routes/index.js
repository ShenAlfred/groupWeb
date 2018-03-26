var express = require('express');
var router = express.Router();
var http = require('http');
var bannerList, navigationBar, industriesList, news, video,links;
var aboutLink, aboutText;

http.get('http://gsite.shangyingjt.com/api/navigationBar', function(req, res) {
    var result = "";
    req.on('data', function(_result){
        result += _result;
    });
    req.on('end', function(){
        var _json = JSON.parse(result);
        navigationBar = _json.data;
        navigationBar.forEach(function(item,index) {
            navigationBar[index].url = item.url.split(".")[0];
            if(navigationBar[index].barResList.length > 0) {
                navigationBar[index].barResList.forEach(function(item, i) {
                    navigationBar[index].barResList[i].url = item.url.split(".")[0];
                });
            }
        });
    });
});

http.get('http://gsite.shangyingjt.com/api/homePage', function(req, res) {
    var result = '';
    req.on('data', function(_result){
        result += _result;
    });
    req.on('end', function(){
        var _json = JSON.parse(result);
        bannerList = _json.data.bannerList;
        industriesList = _json.data.industriesList;
        news = _json.data.news;
        video = _json.data.video;
        aboutLink = _json.data.aboutCommpanUrl;
        aboutText = _json.data.aboutCommpanyDesc;
    });
});

http.get('http://gsite.shangyingjt.com/api/link', function(req, res) {
    var result = '';
    req.on('data', function(_result){
        result += _result;
    });

    req.on('end', function() {
        var _json = JSON.parse(result);
        links = _json.resultList;
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index', {
      title: '商赢集团官方网站-商者无域，相融共赢',
      description: '商赢控股集团有限公司成立于2014年9月，总部位于上海，集团发展至今，业务范围已拓展到资本、金融、电商等多个领域，构建了商赢环球（600146）、商赢金控、商赢电商三大平台。',
      keywords: '商赢,商赢官网,商赢集团,商赢控股,商赢环球,商赢电商,商赢金控,商赢金服',
      bannerList: bannerList,
      navigationBar: navigationBar,
      industriesList: industriesList,
      news: news,
      video: video,
      aboutLink: aboutLink,
      aboutText: aboutText,
      links: links
  });
});

module.exports = router;
