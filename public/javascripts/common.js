/**
 * Created by admin on 2018/3/27.
 */
$(function() {

    var nav_child = $("#common-nav").find("li"),
        two_level_nav = $(".tabChange").find('li'),
        activeIndex = $("#activeIndex").val(),
        activeIndex_two = $("#activeIndex_two").val();

        console.log(activeIndex)
        console.log(activeIndex_two)

        nav_child.eq(activeIndex).addClass('active');
        two_level_nav.eq(activeIndex_two).addClass('active');

})
