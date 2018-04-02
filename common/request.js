var config = require('./../config');
var http = require('http');

const request = {
    navigationBar: function () {
        return new Promise(function(resolve, reject) {
           var req = http.get(config.baseUrl + '/api/navigationBar', function(res) {
               var result = Buffer.allocUnsafe(0);
               res.on('data', function(chunk){
                   result = Buffer.concat([result, chunk], result.length + chunk.length);
               });
               res.on('end', function(){
                   var _json = JSON.parse(result);
                   navigationBar = _json.data;
                   navigationBar.forEach(function(item,index) {
                       if(item.url.indexOf('http://') >= 0) {
                           navigationBar[index].outLink = 1;
                       }else if(item.url == "/") {
                           navigationBar[index].url = item.url;
                       }
                       else if(!(/http:\/\//.test(item.url))) {
                           navigationBar[index].url = "/"+item.url.split(".")[0];
                       }
                       if(navigationBar[index].barResList.length > 0) {
                           navigationBar[index].barResList.forEach(function(item, i) {
                               if(item.url.indexOf('http://') >= 0) {
                                   navigationBar[index].barResList[i].outLink = 1;
                               }
                               else if(!(/http:\/\//.test(item.url))) {
                                   navigationBar[index].barResList[i].url = "/"+item.url.split(".")[0];
                               }
                           });
                       }
                   });
                   resolve(navigationBar);
               });
           });
           req.on('error', function(err){
               reject(err);
           });
           req.end();
        });
    },
    contentDetail: function(api, type) {
        var contentDetail;
        return new Promise(function(resolve, reject) {
            var req = http.get(config.baseUrl + api, function(res) {
                var result = Buffer.allocUnsafe(0);
                res.on('data', function(chunk){
                    result = Buffer.concat([result, chunk], result.length + chunk.length);
                });
                res.on('end', function(){
                    var _json = JSON.parse(result);
                    if(type) {
                        contentDetail = _json.resultList;
                    }else {
                        contentDetail = _json.data;
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
};

module.exports = request;
