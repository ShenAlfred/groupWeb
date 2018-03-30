var swiper_mask = $(".swiper-mask");
var aptitude_slide = $(".aptitude-slide");

var swiper = {
    object: null,
    initial: function() {
        this.object = new Swiper('#aptitude-swiper',{
        });
    }
};

$('.swiper-button-prev').click(function(){
    swiper.object.swipePrev();
})
$('.swiper-button-next').click(function(){
    swiper.object.swipeNext();
})


swiper_mask.on('click', '.swiper-box-close', function() {
    swiper_mask.fadeOut(function() {
        swiper.object.destroy();
    });
    $("body").css({
        overflow: 'auto'
    });
});


aptitude_slide.on('click', 'li', function() {
    index = parseInt($(this).index());
    $("body").css({
        overflow: 'overflow'
    });
    swiper_mask.fadeIn();
    swiper.initial();
    swiper.object.swipeTo(index, 0, false);
});