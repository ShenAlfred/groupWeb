var express = require('express');
var router = express.Router();
var http = require('http');
var contentDetail;

http.get('http://gsite.shangyingjt.com/api/groupProfile', function(req, res) {
    var result = "";
    req.on('data', function(_result){
        result += _result;
    });
    req.on('end', function(){
        var _json = JSON.parse(result);
        contentDetail = _json.data;
    });
});

router.get('/', function(req, res, next) {

    res.render('about/group_profile', {
        title: '集团简介_关于商赢-商赢集团官网',
        description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
        keywords: '集团简介,商赢,商赢集团',
        content: contentDetail
    });
});

module.exports = router;
