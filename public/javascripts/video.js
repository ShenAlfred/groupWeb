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
jwplayer("standard_video").setup(video_player.setStandOption(videoUrl, videoPhoto, 400, "100%"));
