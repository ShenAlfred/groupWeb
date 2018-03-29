    var viewIndex = parseInt($("#viewIndex").val());
    var pageCount = parseInt($("#pageCount").val());
    $('.pagingtion_btn').on('click',function(e) {
        var id = $("#dataId").val();
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
            .removeClass('.page_btn')

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
                // if(viewIndex == response.iPage) {
                //     $('.pagingtion_btn.num').eq(viewIndex).addClass('button_text').removeClass('.page_btn');
                // }
            }
        });

    });

