/**************************************************************************************************
 * DimensionFix | container를 기준으로 레이어의 보여지는 영역을 조정합니다.
 *
 * @class DimensionFix
 * @constructor
 * @version 1.0
 *
 * @param {Object} container 기준이 되는 요소
 * @param {Object} el 내부 요소
 * @param {Number} el_w 이미지 넓이
 * @param {Number} el_h 이미지 높이
 * @param {Object} options 옵션 객체
 *
 **************************************************************************************************/
(function($) {

	'use strict';

	window.DimensionFix = function(container, el, el_w, el_h, options) {

		var _this = this;

		var opt = {hAlign: 'center', vAlign: 'center'};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

		this.setDimension = function() {
			var dim = _this.compute();
			el.css({width: dim.w, height: dim.h, marginLeft: dim.l, marginTop: dim.t});
		};

		this.getDimension = function() {
			return {w: container.width(), h: container.height()};
		};

		this.compute = function() {
			var dimension = _this.getDimension();
			var container_w = dimension.w,
				container_h = dimension.h;
			var container_ratio = container_h / container_w,
				el_ratio = el_h / el_w;
			var w, h, l, t;
			if(el_ratio >= container_ratio) {
				w = container_w;
				h = Math.ceil(el_h * (container_w / el_w));
				l = 0;
                if(opt.vAlign.indexOf('%') === -1) {
    				switch(opt.vAlign) {
    					case 'top':
    						t = 0;
    						break;
    					case 'bottom':
    						t = Math.ceil(-(h - container_h));
    						break;
    					default:
                            t = Math.ceil(-(h - container_h) / 2);
                            break;
    				}
                } else {
                    t = Math.ceil(-(h - container_h)) * (parseFloat(opt.vAlign, 10) / 100);
                }
			} else {
				h = container_h;
				w = Math.ceil(el_w * (container_h / el_h));
                if(opt.hAlign.indexOf('%') === -1) {
    				switch(opt.hAlign) {
    					case 'left':
    						l = 0;
    						break;
    					case 'right':
    						l = Math.ceil(-(w - container_w));
    						break;
    					default:
                            l = Math.ceil(-(w - container_w) / 2);
                            break;
    				}
                } else {
                    l = Math.ceil(-(w - container_w)) * (parseFloat(opt.hAlign, 10) / 100);
                }
				t = 0;
			}
			return {w: w, h: h, l: l, t: t};
		};

		this.setHandler = function() {
			$(window).resize(this.setDimension);
		};

		this.fix = function() {
			this.setDimension();
			this.setHandler();
		};
	};

}(jQuery));

(function($) {
    doc.ready(function() {
        (function() {
			new DimensionFix($('.main_visual'), $('.main_visual .dimension-fix'), 2000, 1000).fix();
		}());
    });
    //메인 배너 >>

	// $(document).ready(function() {
	//     var tl = new TimelineMax({repeat: -1, repeatDelay: 2.0});
	//     $('.mv01 .mv01_ul li').each(function(i) {
	//         var $t = $(this);
	//         var t = i > 0 ? '+=2.0' : '+=0';
	//         tl.call(function() {
	//             $('.mv01 .mv01_ul li').removeClass('on');
	//             $t.addClass('on');
	//         }, null, null, t);
	//     });
	//     $('.mv01 .mv01_ul li').on('mouseenter', function() {
	//         tl.pause();
	//         $('.mv01 .mv01_ul li').removeClass('on');
	//     });
	//     $('.mv01 .mv01_ul li').on('mouseleave', function() {
	//         tl.play();
	//     });
	// });

	var mv01Pging = $('.mv01_ul li');
	var asdPging = [$('.mv01_ul .li1').html(), $('.mv01_ul .li2').html(), $('.mv01_ul .li3').html()]
	var mv01Slide = new Swiper('.mv01_slide.swiper-container', {
		init: false,
		setWrapperSize: true,
		speed: 10,
			autoplay: {
			delay: 5000,
		},
		pagination: {
			el: '.mv01_ul',
			type: 'bullets',
			clickable: true,
			renderBullet: function(index, className){//mv01Pging.eq(index).html()
				return '<li class="li' + (index + 1) + ' ' + className + '">'+ asdPging[index] +'</li>';
			}
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		observer: true,
		observeParents: true
	});
	mv01Slide.on('init',function(){
		TweenLite.fromTo(".main_visual .mv01 .mv01_slide li:not('.mv01_sl2').swiper-slide-active", 4, {scale:1}, {scale:1.1});
	});
	mv01Slide.init();
	mv01Slide.on('transitionEnd',function(){
		TweenLite.fromTo(".main_visual .mv01 .mv01_slide li:not('.mv01_sl2').swiper-slide-active", 4, {scale:1}, {scale:1.1});
	});
	mv01Slide.autoplay.stop();

    window.instofBannerMotion = new BannerMotion($('.main_visual > .slider-container'), [
        [
            {method: 'call', fx: function() {
				mv01Slide.autoplay.start();
			}}
        ],
        [
			{el: '.mv02_chopstick', set: {opacity: 0, y: -100}, to: {opacity: 1, y: 0}, d: 0.8, t: '+=1'},
        ],
        [
            {el: '.mv03_light1', set: {opacity: 0}, to: {opacity: 1}, d: 0.8},
            {el: '.mv03_light2', set: {opacity: 0}, to: {opacity: 1}, d: 0.8},
			{el: '.mv03_scale', set: {scale: 1}, to: {scale: 1.05}, d: 6},
        ],
    ], {
        autoplay: true,
        act: true,
        unit: '%',
        pagination : $('.mv_paging'),
        prevBtn : $('.mv_btns.mv_prev'),
        nextBtn : $('.mv_btns.mv_next'),
    });
    //메인 배너 <<
    doc.ready(function() {
        instofBannerMotion.activate()
        //서브 배너 >>
        new YMotion([
            [
                {el: '.pride .lyr_title', set: {x: 200, y:50, opacity:0}, to: {y:0, opacity:1, ease: Power1.easeOut}, d: 0.6, t:0},
                {el: '.pride .lyr_stitle', set: {x: 200, y:-50, opacity:0}, to: {y:0, opacity:1, ease: Power1.easeOut}, d: 1.5, t:0.5},
                {el: '.pride .lyr_title', set: {}, to: {x:0}, d: 1, t:1.3, ease: Power3.easeOut},
                {el: '.pride .lyr_stitle', set: {}, to: {x:0}, d: 1, t:1.3, ease: Power3.easeOut},
            ],
            [
                {el: '.comfort .lyr_title', set: {x: 200, y:50, opacity:0}, to: {y:0, opacity:1, ease: Power1.easeOut}, d: 0.6, t:0},
                {el: '.comfort .lyr_stitle', set: {x: 200, y:-50, opacity:0}, to: {y:0, opacity:1, ease: Power1.easeOut}, d: 1.5, t:0.5},
                {el: '.comfort .lyr_title', set: {}, to: {x:0}, d: 1, t:1.3, ease: Power3.easeOut},
                {el: '.comfort .lyr_stitle', set: {}, to: {x:0}, d: 1, t:1.3, ease: Power3.easeOut},
            ],
            [
            ],
            [
                {el: '.smile .lyr_title', set: {x: 200, y:50, opacity:0}, to: {y:0, opacity:1, ease: Power1.easeOut}, d: 0.6, t:0},
                {el: '.smile .lyr_stitle', set: {x: 200, y:-50, opacity:0}, to: {y:0, opacity:1, ease: Power1.easeOut}, d: 1.5, t:0.5},
                {el: '.smile .lyr_title', set: {}, to: {x:0}, d: 1, t:1.3, ease: Power3.easeOut},
                {el: '.smile .lyr_stitle', set: {}, to: {x:0}, d: 1, t:1.3, ease: Power3.easeOut},
            ],
        ]).activate();
        //서브 배너 <<

        //서브 타이틀 위치 제어 >>
        var bg_titles = $('.lyr_title, .lyr_stitle' ,'.comfort').get();
        var bg_title_padding = 150;
        var bg_title_calc = function(){
            var scrollTop = win.scrollTop();
            for(var i in bg_titles){
                var bg_title = $(bg_titles[i]);
                var bg_area = $(bg_title).closest('.title_area');
                bg_title.removeClass('middle, bottom');
                bg_title.data('pos_middle', bg_area.offset().top);
                bg_title.data('pos_bottom', bg_area.offset().top+bg_area.height()-(bg_title.height()+bg_title_padding*2));
            }
            bg_title_handler();
        }
        bg_title_handler_beforeScrollTop = 0;
        var bg_title_handler = function(){
            var scrollTop = win.scrollTop();
            var direction = (bg_title_handler_beforeScrollTop<scrollTop?'down':'up');
            bg_title_handler_beforeScrollTop = scrollTop;
            for(var i in bg_titles){
                var bg_title = $(bg_titles[i]);
                var bg_area = $(bg_title).closest('.title_area');
                if(bg_title.data('pos_bottom')+0 <= scrollTop){
                    $(bg_area).removeClass('middle');
                    $(bg_area).addClass('bottom');
                    $('.title_wrap', bg_area).css('margin-top',bg_area.height()-(bg_title.height()+bg_title_padding));
                }else if(bg_title.data('pos_middle')+0 <= scrollTop){
                    $(bg_area).removeClass('bottom');
                    $(bg_area).addClass('middle');
                    $('.title_wrap', bg_area).css('margin-top','');
                }else{
                    $(bg_area).removeClass('middle bottom');
                    $('.title_wrap', bg_area).css('margin-top','');
                }
            }
        }
        bg_title_calc();
        win.resize(bg_title_calc);
        win.scroll(bg_title_handler);
        //서브 타이틀 위치 제어 <<

        // 영상
        (function() {
           if(typeof Promise !== 'function') return false;

           function setPlayOffset() {
               for(var i=0; i<$headElems.length; i++) {
                   playOffset[i] = $headElems[i].dataOffset.top - window.innerHeight;
               }
           }
           function scrollHandler() {
               var scrollTop = win.scrollTop();
               for(var i=0; i<length; i++) {
                   if(play[i] === false && scrollTop >= playOffset[i] && scrollTop < stopOffset[i]) {
                       player[i].play();
                       play[i] = true;
                   } else if(play[i] === true && (scrollTop < playOffset[i] || scrollTop >= stopOffset[i])) {
                       player[i].pause();
                       play[i] = false;
                   }
                   // player[i].getPaused().then(function(p) {
                   // 	console.log(p);
                   // });
               }
           }
           function resizeHandler() {
               clearTimeout(resizeTimer);
               resizeTimer = setTimeout(function() {
                   setPlayOffset();
                   scrollHandler();
               }, 100);
           }

           var $headElems = [$('.video_area > iframe'), $('.main_video > iframe')],
               player = [],
               playOffset = [],
               stopOffset = [],
               play = [],
               length = $headElems.length,
               resizeTimer = null;

           for(var i=0; i<length; i++) {
               if($headElems[i].length === 0) continue;
               $headElems[i].dataHeight = parseInt($headElems[i].css('height'), 10);
               $headElems[i].dataOffset = $headElems[i].offset();
               stopOffset[i] = $headElems[i].dataOffset.top + $headElems[i].dataHeight;
               player[i] = new Vimeo.Player($headElems[i][0]);
               // player[i].on('ended', function() {
               // 	console.log('end');
               // });
               play[i] = false;
           }

           setPlayOffset();

           win.scroll(scrollHandler);
           win.resize(resizeHandler);
           scrollHandler();
        }());
		new Swiper('.pride_slide .swiper-container', {
			spaceBetween: 100,
			speed: 500,
			autoplay: {
				delay: 5000,
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.pride_next',
				prevEl: '.pride_prev',
			},
		});
    });
}(jQuery));
