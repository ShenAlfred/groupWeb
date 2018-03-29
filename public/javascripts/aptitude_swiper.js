var swiper_mask = $(".swiper-mask");
var aptitude_slide = $(".aptitude-slide");

var swiper = {
    object: null,
    initialSlide: 0,
    initial: function() {
        this.object = new Swiper('#aptitude-swiper',{
            initialSlide: this.initialSlide,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    }
};


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
    swiper.initialSlide = parseInt(index);
    swiper.initial();
});