var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../config');
var request = require('../common/request');
var links, bannerList, industriesList, news, video,industriesLink,aboutLink, aboutText;


var homePage = function() {
    var data = {};
    return new Promise(function(resolve, reject) {
        var req = http.get(config.baseUrl + '/api/homePage', function(res) {
            var result = Buffer.allocUnsafe(0);
            res.on('data', function(chunk){
                result = Buffer.concat([result, chunk], result.length + chunk.length);
            });
            res.on('end', function(){
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
                data = {
                    news: news,
                    video: video,
                    aboutLink: aboutLink,
                    aboutText: aboutText,
                    bannerList: bannerList,
                    industriesList: industriesList,
                    industriesLink: industriesLink
                };
                resolve(data);
            });
        });
        req.on('error', function(err){
            reject(err);
        });
        req.end();
    });
};

var link = function() {
    return new Promise(function(resolve, reject) {
        var req = http.get(config.baseUrl + '/api/link', function(res) {
            var result = Buffer.allocUnsafe(0);
            res.on('data', function (chunk) {
                result = Buffer.concat([result, chunk], result.length + chunk.length);
            });
            res.on('end', function () {
                var _json = JSON.parse(result);
                links = _json.resultList;
                resolve(links);
            });
        });
        req.on('error', function(err){
            reject(err);
        });
        req.end();
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    request.navigationBar().then(function(navigationBar) {
        homePage().then(function(data) {
            link().then(function(links) {
                res.render('index/index', {
                    title: '商赢集团官方网站-商者无域，相融共赢',
                    description: '商赢控股集团有限公司成立于2014年9月，总部位于上海，集团发展至今，业务范围已拓展到资本、金融、电商等多个领域，构建了商赢环球（600146）、商赢金控、商赢电商三大平台。',
                    keywords: '商赢,商赢官网,商赢集团,商赢控股,商赢环球,商赢电商,商赢金控,商赢金服',
                    bannerList: data.bannerList,
                    navigationBar: navigationBar,
                    industriesList: data.industriesList,
                    news: data.news,
                    video: data.video,
                    activeIndex: 0,
                    aboutLink: data.aboutLink,
                    aboutText: data.aboutText,
                    industriesLink: data.industriesLink,
                    links: links
                });
            });
        });
    });
});

module.exports = router;
