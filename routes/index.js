var express = require('express');
var router = express.Router();
var http = require('http');
var bannerList, navigationBar, industriesList, news, video,links, industriesLink;
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

http.get('http://gsite.shangyingjt.com/api/homePage', function(req, res) {
    var result = '';
    req.on('data', function(_result){
        result += _result;
    });
    req.on('end', function(){
        var _json = JSON.parse(result);
        bannerList = _json.data.bannerList;
        industriesList = _json.data.industriesList;
        industriesList.forEach(function(item, index) {
            industriesList[index].url = item.url.split('.')[0];
        });
        news = _json.data.news;
        news.url = news.url.split('.')[0];
        video = _json.data.video;
        video.url = video.url.split('.')[0];
        aboutLink = _json.data.aboutCommpanUrl.split(".")[0];
        aboutText = _json.data.aboutCommpanyDesc;
        industriesLink = industriesList[0].url.split('.')[0];
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
      activeIndex: 0,
      aboutLink: aboutLink,
      aboutText: aboutText,
      industriesLink: industriesLink,
      links: links
  });
});

module.exports = router;
