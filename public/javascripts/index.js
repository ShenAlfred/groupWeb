/**
 * Created by admin on 2018/3/22.
 */

$(function() {

    new Swiper('.swiper-container',{
        loop: true,
        pagination : '.pagination',
        autoplay:3000,
        speed:1000,
        paginationClickable :true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    });

    $(".QR").mouseenter(function () {
        $(".er").css("display","block");
        $(".er").hover(function () {
            $(".er").css("display","block");
        },function () {
            $(".er").css("display","none");
        });
    });

    var video_player = {
        changePlayer: function(isIE) {
            var standard_video = document.getElementById("standard_video");
            var ie_video = document.getElementById("ie_video");
            if(isIE) {
                ie_video.style.display = 'block';
                standard_video.style.display = "none";
            }else {
                ie_video.style.display = 'none';
                standard_video.style.display = "block";
            }
        },
        setIeSrc: function (width, height, src) {
            var html = '<embed id="video_embed" width="'+ width +'" height="'+ height +'" autostart=true src="'+ src +'" />'
            var video_embed = $("#ie_video");
            video_embed.html(html);
        },
        setStandOption: function(_file, _image, _height, _width) {
            return {
                flashplayer: './lib/jwplayer.flash.swf',
                stretching: 'fill',
                file: _file,
                image: _image,
                height: _height,
                width: _width
            }
        }
    }
    var videoUrl = $("#videosUrl").val(),
        videoPhoto = $("#coverPhotoUrl").val();
    jwplayer("standard_video").setup(video_player.setStandOption(videoUrl, videoPhoto, 180, "100%"));

    $("#tabHeader h2").eq(0).addClass("active");
    $("#tabDetail .tabState").eq(0).addClass("active");
    $("#tabHeader h2").on("click",function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $("#tabDetail .tabState").eq(index).addClass("active").siblings().removeClass("active");
    })

});

