var swiper_mask = $(".swiper-mask");
var staff_slide = $(".staff-slide");
var swiper_box = $(".swiper-box");
var index, parent_index;

var swiper = [
    {
        object: null,
        id: '#staff-swiper0',
        initial: function() {
            this.object = new Swiper('#staff-swiper0', {
            });
        }
    },
    {
        object: null,
        id: '#staff-swiper1',
        initial: function() {
            this.object = new Swiper('#staff-swiper1', {
            });
        }
    },
    {
        object: null,
        id: '#staff-swiper2',
        initial: function() {
            this.object = new Swiper('#staff-swiper2', {
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
    swiper[parent_index].initial();
    swiper[parent_index].object.swipeTo(index, 0, false);
    $("#staff-swiper"+parent_index).siblings('.swiper-button-prev').click(function() {
        swiper[parent_index].object.swipePrev();
    });
    $("#staff-swiper"+parent_index).siblings('.swiper-button-next').click(function() {
        swiper[parent_index].object.swipeNext();
    })
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
