$(document).ready(function () {

    // Jérôme //
    var stickyNavTop = $('.menuGen').offset().top;

    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('.menuGen').addClass('sticky');
        } else {
            $('.menuGen').removeClass('sticky');
        }
    };
    stickyNav();

    $(window).scroll(function () {
        stickyNav();
    });


    // David //
    var offset = $("#sidebar").offset();
    var topPadding = 200;

    $(window).scroll(function () {
        if ($(window).scrollTop() > offset.top) {
            $("#sidebar").stop().animate({
                marginTop: $(window).scrollTop() - offset.top + topPadding
            });
        } else {
            $("#sidebar").stop().animate({
                marginTop: 0
            });
        }
    });

    //  //




});