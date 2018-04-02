var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('../common/request');
var activeIndex, activeIndex_two;

router.get('/', function(req, res, next) {

    request.navigationBar().then(function(navigationBar) {

        navigationBar.forEach(function(item, index) {
            if(req.baseUrl.match(item.url.split(/[-]?.html/)[0])) {
                activeIndex = index;
            }
            if(item.barResList.length) {
                item.barResList.forEach(function(item, index) {
                    if(req.baseUrl === item.url.split(/[-]?.html/)[0]) {
                        activeIndex_two = index;
                    }
                })
            }
        });

        request.contentDetail('/api/groupProfile').then(function(contentDetail) {
            for(var i=0; i<contentDetail.moduleList.length; i++) {
                contentDetail.moduleList[i].url = contentDetail.moduleList[i].url.split('.')[0];
            }

            res.render('mainview/architecture', {
                title: '集团简介_关于商赢-商赢集团官网',
                description: '商赢集团通过资本助力，科技创新，以打造“消费新生态，金融新生态”为企业使命，立志成为公众信赖，值得托付的全球化多平台产融集团，实现“商者无域，相融共赢”的企业愿景！',
                keywords: '集团简介,商赢,商赢集团',
                content: contentDetail,
                navigationBar: navigationBar,
                activeIndex: activeIndex,
                activeIndex_two: activeIndex_two,
                wherePage: 'about-architecture'
            });
        });

    });
});

module.exports = router;
