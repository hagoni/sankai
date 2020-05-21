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
            function scrollHandler() {
                var scrollTop = win.scrollTop();
                if(fixed === false && scrollTop >= offset) {
                    $topElement.addClass('scroll');
                    fixed = true;
                } else if(fixed === true && scrollTop < offset) {
                    $topElement.removeClass('scroll');
                    fixed = false;
                }
            }

            var $topElement = $('.lnb_wrap'),
                offset = $('.lnb_wrap').offset().top,
                fixed = false;

            win.scroll(scrollHandler);
            scrollHandler();
        }());

		(function() {
			if($('.chapters').length === 0) return false;

            var lnbSwiper = new Swiper('.lnb_wrap.swiper-container', {
                initialSlide: $('.lnb li.on').index(),
                slidesPerView: 'auto',
                freeMode: true
            });

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
                        lnbSwiper.slideTo(i);
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
        (function() {
			var bnrSlide = new Swiper('.bnr_slide .swiper-container', {
            });
			var bnrBotSlide = new Swiper('.bnr_bot_slide .swiper-container', {
				touchRatio: 0.33,
				centeredSlides: true,
				slidesPerView: 3,
				slideToClickedSlide: true,
            });
			bnrSlide.controller.control = bnrBotSlide;
			bnrBotSlide.controller.control = bnrSlide;
            var salesSlide = new Swiper('.sales_slide .swiper-container', {
				autoplay: {
                    delay: 3000,
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
                    		return '<li class="' + className + '"><a href="#none"></a></li>';
                    }
                },
            });
            var ownerSlide = new Swiper('.owner_slide .swiper-container', {
				autoplay: {
                    delay: 3000,
                },
				navigation: {
                    nextEl: '.owner_next',
                    prevEl: '.owner_prev',
                },
            });
            var menuImgSlide = new Swiper('.menu_img_slide .swiper-container', {
                speed: 500,
                autoplay: {
                    delay: 3000,
                },
                effect: 'fade',
                fadeEffect: {
                	crossFade: true
                },
            });
            var menuSlide = new Swiper('.menu_slide .swiper-container', {
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: '.menu_next',
                    prevEl: '.menu_prev',
                },
            });
            new FlowSlider($('.menu_flow_slide .swiper-container'), {
                pps: 50,
            });
            $('.happy_list li a').click(function (event) {
                $(this).parents('li').siblings().children('.text_wrap').hide(300);
                $(this).siblings('.text_wrap').show(300);
                $('.happy_list .arr.on').removeClass('on');
                $(this).children('.arr').addClass('on');
            });
            var salesSlide = new Swiper('.comp_slide .swiper-container', {
				autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.comp_paging',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function(index, className){
                    		return '<li class="' + className + '"><a href="#none"></a></li>';
                    }
                },
            });
			var chanSlide = new Swiper('.chan_slide .swiper-container', {
				slidesPerView: 'auto',
				autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.chan_paging',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function(index, className){
                    		return '<li class="' + className + '"><a href="#none"></a></li>';
                    }
                },
            });
			// new Tabbing($('.cost_tab'), $('.cost_conts'), function(i, prevI) {
	   		// });
			var cost_conts = new Swiper('.cost_conts.swiper-container',{
				pagination: {
                    el: '.cost_tab',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function(index, className){
							switch (index) {
								case 0:
									var name = '창업절차';
									break;
								case 1:
									var name = '수익성 분석';
									break;
								case 2:
									var name = '창업비용';
									break;
								default:
									var name = '창업절차';
									break;
							}
                    		return '<li class="' + className + '"><a href="#none">' + name + '</a></li>';
                    }
                },
			});
            // var cost2Slide = new Swiper('.cost2_slide .swiper-container', {
            //     observer: true,
            //     observeParents: true,
			// 	navigation: {
            //         nextEl: '.cost2_next',
            //         prevEl: '.cost2_prev',
            //     },
            // });
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
		            container.animate({opacity: 0, marginTop: initTop - 100}, 300, function() {
		                $(this).remove();
						$('html, body').removeClass('not_scroll');
		                open = false;
		            });
		            e.preventDefault();
		        };

		        this.initialize();
		    };

		}(jQuery));

		new Modal();

		new Swiper('.happy_sns.swiper-container', {
			slidesPerView : 2, // 동시에 보여줄 슬라이드 갯수
			spaceBetween : 10, // 슬라이드간 간격
			slidesPerGroup : 2, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
			slidesPerColumn: 2,
			loopFillGroupWithBlank : true,
			autoplay: {
				delay: 3000,
			},
			pagination : { // 페이징
				el : '.paging_ul',
				clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
				renderBullet: function (index, className) {
				  return '<li class="' + className + '"><a href="#none">' + (index + 1) + '</a></li>';
				},
			},
			navigation : { // 네비게이션
				nextEl : '.paging_next', // 다음 버튼 클래스명
				prevEl : '.paging_prev', // 이번 버튼 클래스명
			},
		});

		new Swiper('.mobile_pop .swiper-container',{
			autoplay: {
				delay: 3000,
			},
		});
    });
}(jQuery));
