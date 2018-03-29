var swiper_mask = $(".swiper-mask");
var staff_slide = $(".staff-slide");
var swiper_box = $(".swiper-box");
var index, parent_index;

var swiper = [
    {
        object: null,
        initialSlide: 0,
        initial: function() {
            this.object = new Swiper('#staff-swiper0', {
                initialSlide: this.initialSlide,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });
        }
    },
    {
        object: null,
        initialSlide: 0,
        initial: function() {
            this.object = new Swiper('#staff-swiper1', {
                initialSlide: this.initialSlide,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });
        }
    },
    {
        object: null,
        initialSlide: 0,
        initial: function() {
            this.object = new Swiper('#staff-swiper2', {
                initialSlide: this.initialSlide,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });
        }
    }
]

staff_slide.on('click', 'li', function() {
    index = parseInt($(this).attr("data-id"));
    parent_index = $(this).parent().attr("data-id");
    $("body").css({
        overflow: 'overflow'
    });
    swiper_mask.fadeIn();
    swiper_box.eq(parent_index).fadeIn();
    swiper[parent_index].initialSlide = index;
    swiper[parent_index].initial()
});

//关闭swiper 并销毁
swiper_mask.on('click', '.swiper-box-close', function() {
    swiper_mask.fadeOut();
    swiper_box.eq(parent_index).fadeOut();
    $("body").css({
        overflow: 'auto'
    });
    swiper[parent_index].object.destroy();
});
