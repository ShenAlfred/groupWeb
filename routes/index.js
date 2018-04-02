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
                for(var i =0; i<bannerList.length; i++) {
                    if(bannerList[i].url.match(/shangyingjt/g)) {
                        bannerList[i].url = bannerList[i].url.split(".html")[0];
                    }
                }
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
    var key = req.originalUrl;
    request.navigationBar().then(function(navigationBar) {
        homePage().then(function(data) {
            link().then(function(links) {
                console.log(config.tdk)
                console.log(key)
                res.render('index/index', Object.assign(
                    {
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
                    },config.tdk[key]
                ));
            });
        });
    });
});

module.exports = router;
