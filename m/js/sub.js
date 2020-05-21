(function($) {
    $(document).ready(function() {

        var lnbSwiper = new Swiper('.lnb_wrap.swiper-container', {
            initialSlide: $('.lnb li.on').index(),
            slidesPerView: 'auto',
            freeMode: true
        });


        // function scrollHandler() {
        //     var scrollTop = win.scrollTop();
        //     if(fixed === false && scrollTop >= offset) {
        //         $topElement.addClass('scroll');
        //         fixed = true;
        //     } else if(fixed === true && scrollTop < offset) {
        //         $topElement.removeClass('scroll');
        //         fixed = false;
        //     }
        // }
        //
        // var $topElement = $('.lnb_wrap'),
        //     offset = $('.lnb_wrap').offset().top,
        //     fixed = false;
        //
        // win.scroll(scrollHandler);
        // scrollHandler();
    });
}(jQuery))
