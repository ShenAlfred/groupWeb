$(function() {

    var company_box = $(".company_box"),
        mapmask = $(".mapmask");

    company_box.on('click', function() {

        mapmask.fadeIn();
        var index = $(this).index();
        mapmask.find('.maskbig').eq(index).fadeIn().siblings().fadeOut();
        $('body').css({
            overflow : 'hidden'
        });

    });

    $(".mapclose").on("click",function () {
        mapmask.fadeOut();
        $('body').css({
            overflow : 'auto'
        });
    });

});
