    var viewIndex = parseInt($("#viewIndex").val());
    var pageCount = parseInt($("#pageCount").val());
    var id = $("#dataId").val();
    var swiper_mask = $(".swiper-mask");
    var staff_swiper = $("#staff-swiper");
    var staff_slide = $(".staff-slide");

    var swiper = {
        object: null,
        initial: function() {
            this.object = new Swiper('#staff-swiper',{
            });
        }
    };

    //初始化加载
    $.support.cors=true;
    $.ajax({
        type: 'get',
        dataType:"json",
        url: 'http://gsite.shangyingjt.com/api/style/'+id+"?pageSize=6&iPage="+1,
        success: function (response) {
            for(var j=0; j<response.data.picUrlList.length; j++) {
                staff_swiper.find('.swiper-wrapper').append('<div class="swiper-slide"><div class="swiper-img-box"><img src="'+ response.data.picUrlList[j] +'" /><span></span></div></div>')
            }

            staff_slide.on('click', 'li', function() {
                var index = $(this).index();
                swiper_mask.fadeIn();
                $("body").css({
                    overflow: 'overflow'
                });
                swiper.initial();
                swiper.object.swipeTo(index, 0, false);
            });
        }
    });
    $('.swiper-button-prev').click(function(){
        swiper.object.swipePrev();
    })
    $('.swiper-button-next').click(function(){
        swiper.object.swipeNext();
    })
    //关闭swiper 并销毁
    swiper_mask.on('click', '.swiper-box-close', function() {
        swiper_mask.fadeOut(function() {
            swiper.object.destroy();
        });
       $("body").css({
           overflow: 'auto'
       });
    });
    //分页点击
    $('.pagingtion_btn').on('click',function(e) {
        if ($(this).hasClass('prev')) {
            viewIndex--;
        } else if ($(this).hasClass('next')) {
            viewIndex++;
        } else if ($(this).hasClass('home')) {
            viewIndex = 1;
        } else if ($(this).hasClass('last')) {
            viewIndex = pageCount;
        } else if ($(this).hasClass('num')) {
            viewIndex = parseInt($(this).html());
        } else {
            return;
        }
        if(viewIndex > 1 ) {
            $(".home").removeClass("button_text").addClass('page_btn');
            $(".prev").removeClass("button_text").addClass('page_btn');
        }
        if(viewIndex <=1 ) {
            viewIndex = 1;
            $(".home").removeClass("page_btn").addClass('button_text');
            $(".prev").removeClass("page_btn").addClass('button_text');
        }
        if(viewIndex != pageCount) {
            $(".next").removeClass("button_text").addClass('page_btn');
            $(".last").removeClass("button_text").addClass('page_btn');
        }
        if(viewIndex == pageCount) {
            viewIndex = pageCount;
            $(".next").removeClass("page_btn").addClass('button_text');
            $(".last").removeClass("page_btn").addClass('button_text');
        }

        $('.pagingtion_btn.num').addClass('page_btn')
            .removeClass('button_text').eq(viewIndex-1)
            .addClass('button_text')
            .removeClass('.page_btn');

        $.support.cors=true;
        $.ajax({
            type: 'get',
            dataType:"json",
            url: 'http://gsite.shangyingjt.com/api/style/'+id+"?pageSize=6&iPage="+viewIndex,
            success: function (response) {
                var staff_slide = $(".staff-slide");
                staff_slide.empty();
                for(var i =0; i<response.data.picUrlList.length; i++) {
                    var li =$("<li><img src='"+response.data.picUrlList[i] +"' alt="+ response.data.name +"/></li>");
                    staff_slide.append(li);
                }

                staff_swiper.find('.swiper-wrapper').empty();
                for(var j=0; j<response.data.picUrlList.length; j++) {
                    staff_swiper.find('.swiper-wrapper').append('<div class="swiper-slide"><div class="swiper-img-box"><img src="'+ response.data.picUrlList[j] +'" /><span></span></div></div>')
                }
                swiper.initial();
            }
        });

    });

