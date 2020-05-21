/**************************************************************************************************
 * PreLoader | 프리로더입니다.
 *
 * @class PreLoader
 * @constructor
 * @version 1.0
 *
 * @param {Array} assets 불러올 자원 배열
 * @param {Function} callback 콜백 함수
 *
 **************************************************************************************************/
window.PreLoader = function(assets, callback) {

	'use strict';

	if(this instanceof PreLoader === false) {
		return new PreLoader(assets, callback);
	}

	if(typeof assets !== 'object') return false;

	var _this = this;

	var LENGTH = assets.length;

	var	unit = 100 / LENGTH,
		progress = 0,
		loaded = false,
		imgs = [];

	this.initialize = function() {
		for(var i=0; i<assets.length; i++) {
			imgs[i] = new Image();
			this.setHandler(imgs[i]);
			imgs[i].src = assets[i];
		}
	};

	this.setHandler = function(img) {
		img.onload = this.calculate;
		img.onerror = this.report;
	};

	this.calculate = function() {
		progress += unit;
		if(Math.ceil(progress) >= 100) {
			if(loaded === false) _this.load();
			loaded = true;
		}
	};

	this.report = function() {
		if(typeof console === 'object') console.log(this.src + ' 이미지를 불러올 수 없습니다.');
		_this.calculate();
	}

	this.load = function() {
		if(typeof callback === 'function') callback();
	};

	this.initialize();
};


/**************************************************************************************************
 * FlowSlider | 흐르는 슬라이더입니다.
 *
 * @class FlowSlider
 * @constructor
 * @version 1.0
 *
 * @param {Object} container jQuery 객체
 * @param {Object} options 옵션 객체
 *
 **************************************************************************************************/
(function($) {

	'use strict';

	window.FlowSlider = function(container, options) {

		if(this instanceof FlowSlider === false) {
			return new FlowSlider(container, options);
		}

		var _this = this;

		var container = typeof container === 'object' ? container : $('#' + container),
			opt = {autoPlay: true, axis: 'x', pps: 60, unit: 'px', itemsPerView: 4, reverse: false, stopOver: true};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

		var wrapper = container.children(':first-child'),
			items = wrapper.children(),
			initLength = items.length,
			length = initLength;

		if(items.length === 0) return false;

		var	containerDim,
			itemDim,
			scrollMax,
			animProp,
            init = true;

		var tl;

		var assetsLoaded = false,
			preLoadTimer = null,
			playTryCount = 0;

		var resizeTimer = null;

		this.initialize = function() {
			animProp = opt.axis === 'x' ? 'scrollLeft' : 'scrollTop';
			this.assetsPreload(function() {
				assetsLoaded = true;
				_this.setSliderProps();
				_this.setTimeline();
				_this.setHandler();
				_this.flow();
			});
		};

		this.assetsPreload = function(callback) {
			var assets = [];
			container.find('*').each(function(i) {
				if($(this).prop('tagName') === 'IMG') assets.push($(this).attr('src'));
			});
			if(assets.length > 0) new PreLoader(assets, callback);
			else callback();
		};

		this.setSliderProps = function() {
			containerDim = opt.axis === 'x' ? container.width() : container.height();
			itemDim = opt.unit === 'px' ? opt.axis === 'x' ? items.eq(0).outerWidth(true) : items.eq(0).outerHeight(true) : containerDim / opt.itemsPerView;
            if(init === true) {
                var appendCount = itemDim * initLength > containerDim ? 1 : Math.ceil(containerDim / (itemDim * initLength));
				if(appendCount === Infinity) return false;
                for(var i=0; i<appendCount; i++) {
                    items.clone().addClass('flow-items-clone').appendTo(wrapper);
                }
                scrollMax = itemDim * initLength;
            } else {
				if(opt.unit !== 'px') scrollMax = itemDim * initLength;
                if(itemDim * length < containerDim + scrollMax) {
                    var appendCount = Math.ceil(((containerDim + scrollMax) - (itemDim * length)) / scrollMax);
					if(appendCount === Infinity) return false;
                    for(var i=0; i<appendCount; i++) {
                        items.not('.flow-items-clone').clone().addClass('flow-items-clone').appendTo(wrapper);
                    }
                }
            }
            items = wrapper.children();
            length = items.length;
			opt.axis === 'x' ? wrapper.width(itemDim * length) : wrapper.height(itemDim * length);
            if(opt.unit !== 'px') opt.axis === 'x' ? items.width(itemDim) : items.height(itemDim);
            init = false;
		};

		this.setTimeline = function() {
			tl = new TimelineMax({paused: true, repeat: -1});
			var from = {}, to = {ease: Power0.easeNone};
			from[animProp] = opt.reverse === false ? 0 : scrollMax;
			to[animProp] = opt.reverse === false ? scrollMax : 0;
			tl.fromTo(container, scrollMax / opt.pps, from, to);
		};

		this.setHandler = function() {
			$(window).resize(this.handler.resize);
			if(opt.stopOver === true) {
				container.mouseenter(function() {
					if(opt.autoPlay === true) tl.pause();
				}).mouseleave(function() {
					if(opt.autoPlay === true) tl.play();
				});
			}
		};

		this.handler = {
			resize: function() {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					if(assetsLoaded === true) {
						_this.setSliderProps();
						_this.tlReset();
					}
				}, 100);
			}
		};

		this.tlReset = function() {
			tl.recent().vars.startAt[animProp] = opt.reverse === false ? 0 : scrollMax;
			tl.recent().vars[animProp] = opt.reverse === false ? scrollMax : 0;
			tl.duration(scrollMax / opt.pps);
			tl.invalidate();
		};

		this.flow = function() {
			if(opt.autoPlay === true) tl.play();
		};

		this.play = function() {
			clearTimeout(preLoadTimer);
			if(assetsLoaded === false) {
				if(playTryCount > 50) throw new Error('이미지 로딩이 끝나지 않아 play method를 호출할 수 없습니다.');
				preLoadTimer = setTimeout(function() {
					playTryCount++;
					_this.play();
				}, 100);
				return false;
			}
			if(tl.paused() === true) tl.play();
			opt.autoPlay = true;
		};

		this.stop = function() {
			if(tl.paused() === false) tl.pause();
			opt.autoPlay = false;
		};

		// FlowSlider class 초기화 함수를 호출합니다.
		this.initialize();
	};

}(jQuery));

(function($) {
    $(document).ready(function() {

		(function() {
			if($('.chapters').length === 0) return false;

            function setAnchorsOffset() {
                var limit = doc.innerHeight() - win.innerHeight();
                for(var i=0, j=0; i<length; i++) {
                    if($chapters.eq(i).length > 0) offsets[i] = $chapters.eq(i).offset().top - diff;
                    else offsets[i] = i > 0 ? offsets[i - 1] : 0;
                    if(offsets[i] > limit) {
                        offsets[i] = limit - length + j;
                        j++;
                    }
                    offsets[i] = Math.floor(offsets[i]);
                }
                offsets[length] = limit + 1;
            }

            function scrollHandler() {
                var scrollTop = win.scrollTop();
                if(scrollTop < offsets[0]) {
                    $anchors.parent('li').filter('.on').removeClass('on');
                    index = -1;
                    return false;
                }
                for(var i=0; i<length; i++) {
                    if((i !== index) && (scrollTop >= offsets[i] && scrollTop < offsets[i + 1])) {
                        $anchors.parent('li').filter('.on').removeClass('on');
						$anchors.parent('li').eq(i).addClass('on');
                        index = i;
                        break;
                    }
                }
            }

			function hashHandler() {
				if(location.hash) {
					var hash = parseInt(location.hash.split('#')[1], 10);
					if(isNaN(hash) === true) return false;
					if($anchors.eq(hash - 1).length > 0) {
                        if($('#sitemapWrap').is(':visible') === true) $('.bindSitemapSpread').trigger('click');
                        $anchors.eq(hash - 1).trigger('click');
                    }
				}
			}

            function scrollAnim(e) {
                TweenLite.to('html, body', 0.5, {scrollTop: offsets[$(this).parent('li').index()], ease: Expo.easeOut});
                e.preventDefault();
            }

			var $chapters = $('.chapters'),
                $anchors = $('.lnb a');

            var length = $anchors.length,
                offsets = [],
                index = 0,
                diff = $('.lnb_wrap').height(),
                resizeTimer = null;

            $anchors.click(scrollAnim);
            win.scroll(scrollHandler);
            win.resize(function() {
                clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					setAnchorsOffset();
                    scrollHandler();
				}, 100);
            });
			win.on('hashchange load', function() {
				hashHandler();
			});
            win.on('load', function() {
                setAnchorsOffset();
                scrollHandler();
            });

            setAnchorsOffset();
            scrollHandler();
		}());

    });
}(jQuery));

(function($) {
    doc.ready(function() {
        $('.sales').attr('data-motion-offset','2');
        $('.story').attr('data-motion-offset','3');
		$('.owner').attr('data-motion-offset','4');
        var blurSize = 10;
        new YMotion([
            [//1 성공사례
            ],
            [//2 높은 매출
                {el: '.sales_img img', set: {webkitFilter:"blur("+blurSize+"px)",filter:"blur("+blurSize+"px)", opacity:0, scale:0.8}, to: {opacity:1, scale:1}, d:1},
                {method: 'call', fx:function(){
                    var blurElement = {a:blurSize};//start the blur at 0 pixels
                    TweenMax.to(blurElement, 1, {a:0, onUpdate:function(){
                        TweenMax.set('.sales_img img', {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
                    }});
                }, t:0.1},
            ],
            [//3 브랜드 경쟁력
                {el: '.story_img img', set: {webkitFilter:"blur("+blurSize+"px)",filter:"blur("+blurSize+"px)", opacity:0, scale:0.8}, to: {opacity:1, scale:1}, d:1},
                {method: 'call', fx:function(){
                    var blurElement = {a:blurSize};//start the blur at 0 pixels
                    TweenMax.to(blurElement, 1, {a:0, onUpdate:function(){
                        TweenMax.set('.story_img img', {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
                    }});
                }, t:0.1},
				{el: '.el3_1', set: {opacity:0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5},
				{el: '.el3_2', set: {opacity:0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5, t: '-=0.2'},
				{el: '.el3_3', set: {opacity:0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5, t: '-=0.2'},
            ],
            [
				{el: '.el4_1', set: {opacity:0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5},
				{el: '.el4_2', set: {opacity:0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5, t: '-=0.2'},
				{el: '.el4_3', set: {opacity:0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5, t: '-=0.2'},
            ],
            [//5 메뉴 리뉴얼
            ],
            [//6 본사 지원
            ],
            [//7 창업 경쟁력
            ],
            [//8 창업은 어떻게?
            ],
            [//9 가맹문의
            ],
        ]).activate();

		TweenMax.to($('.owner .arr1'), 0.3, {y: -15, yoyo: true, repeat: -1});
		TweenMax.to($('.owner .arr2'), 0.3, {y: -15, yoyo: true, repeat: -1});
		TweenMax.to($('.owner .arr3'), 0.3, {y: 15, yoyo: true, repeat: -1});
		TweenMax.to($('.menu_img_slide .swiper-container .sl_img'), 24.0, {rotationZ: 360, ease: Power0.easeNone, repeat: -1});

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

           var $headElems = [$('.story .video_area > iframe'), $('.sl_bg > iframe'), $('.comp_con .video_area > iframe')],
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

        (function () {
			var bnrSlide = new Swiper('.bnr_slide .swiper-container', {
				allowTouchMove:false,
				effect: 'fade',
                fadeEffect: {
                	crossFade: true
                },
            });
			var bnrBotSlide = new Swiper('.bnr_bot_slide .swiper-container', {
				slidesPerView: 5,
				centeredSlides: true,
				touchRatio: 0.2,
				slideToClickedSlide: true,
            });
			bnrSlide.controller.control = bnrBotSlide;
			bnrBotSlide.controller.control = bnrSlide;

            var salesPging = $('.sales_paging li');
            var salesSlide = new Swiper('.sales_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: '.sales_next',
                    prevEl: '.sales_prev',
                },
                pagination: {
            		el: '.sales_paging',
            		type: 'bullets',
            		clickable: true,
            		renderBullet: function(index, className){
            			return '<li class="' + className + '">'+ salesPging.eq(index).html() +'</li>';
            		}
        	    },
				allowTouchMove: false,
            });
            var menuImgSlide = new Swiper('.menu_img_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
                autoplay: {
                    delay: 3000,
                },
                effect: 'fade',
                fadeEffect: {
                	crossFade: true
                },
            });
			var ownerSlide = new Swiper('.owner_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: '.owner_next',
                    prevEl: '.owner_prev',
                },
            });
            var menuSlide = new Swiper('.menu_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: '.menu_next',
                    prevEl: '.menu_prev',
                },
            });
            new FlowSlider($('.menu_fslide .swiper-container'), {
                pps: 50,
				stopOver: false
            });
			new Swiper('.happy_slide .swiper-container', {
				slidesPerView : 3, // 동시에 보여줄 슬라이드 갯수
				slidesPerColumn: 2,
				spaceBetween : 30, // 슬라이드간 간격
				slidesPerGroup : 3, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
				// grabCursor: true,
				// 그룹수가 맞지 않을 경우 빈칸으로 메우기
				// 3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듬
				loopFillGroupWithBlank : true,
				autoplay: {
					delay: 3000,
				},
				pagination : { // 페이징
					el : '.happy_paging',
					clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
					renderBullet: function (index, className) {
			          return '<li class="' + className + '"><a href="#none">' + (index + 1) + '</a></li>';
			        },
				},
				navigation : { // 네비게이션
					nextEl : '.happy_next', // 다음 버튼 클래스명
					prevEl : '.happy_prev', // 이번 버튼 클래스명
				},
			});
            $('.happy_list li a').click(function (event) {
                $(event.target).parents('li').siblings().children('.f_stxt').hide(300,function() {
                     $(event.target).siblings('.f_stxt').show(300);
                     $(event.target).parents('li').siblings().children('.f_stxt').hide(300);
                });
                $('.happy_list .arr.on').removeClass('on');
                $(this).children('.arr').addClass('on');
            });
            var compSlide = new Swiper('.comp_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: '.comp_next',
                    prevEl: '.comp_prev',
                },
            });
			new Tabbing($('.cost_tab'), $('.cost_conts'), function(i, prevI) {
	   		});
            var costChartSlide = new Swiper('.cont2 .chart_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
				effect: 'fade',
                fadeEffect: {
                	crossFade: true
                },
                autoplay: {
                    delay: 15000,
                },
                navigation: {
                    nextEl: '.chart_next',
                    prevEl: '.chart_prev',
                },
				observer: true,
				observeParents: true
            });
			var costTableSlide = new Swiper('.cont2 .table_slide .swiper-container', {
                spaceBetween: 100,
                speed: 500,
                autoplay: {
                    delay: 15000,
                },
				observer: true,
				observeParents: true
            });
			costChartSlide.controller.control = costTableSlide;
			costTableSlide.controller.control = costChartSlide;
        }());

		(function($) {

		    'use strict';

		    window.Modal = function() {

		        var _this = this,
		            body = $('body'),
		            container,
		            blockBg,
		            initTop,
		            slider,
		            open = false;

		        this.initialize = function() {
		            body.on('click', '.bnr_a', function(e) {
		                if(open === false) {
		                    _this.modalOpen($(this).data('key'), $(this).data('idx'));
		                    open = true;
		                }
		                e.preventDefault();
		            });
		            body.on('click', '.pop_close', this.modalX);
		        };

		        this.modalOpen = function(key, i) {
		            $.post(location.href, {modal: true, key: key, idx:i}, function(response) {
		                if($('#popup').length === 0) {
		                    body.append($(response).filter('#modal_pop').length > 0 ? $(response).filter('#modal_pop').html() : $(response).find('#modal_pop').html());
		                    container = $('#popup');
		                    initTop = parseFloat(container.css('margin-top'), 10);
		                    container.css({display: 'block', opacity: 0, marginTop: initTop + 100});
		                    container.animate({opacity: 1, marginTop: initTop}, 800);
							$('html, body').addClass('not_scroll');
		                }
		            });
		        };

		        this.modalX = function(e) {
					$(container).remove();
					$('html, body').removeClass('not_scroll');
					open = false;
		            // container.animate({opacity: 0, marginTop: initTop - 100}, 300, function() {
					// 	$(this).remove();
					// 	$('html, body').removeClass('not_scroll');
					// 	open = false;
		            // });
		            e.preventDefault();
		        };

		        this.initialize();
		    };

		}(jQuery));

		new Modal();
    });
}(jQuery));
