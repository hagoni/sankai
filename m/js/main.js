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
    doc.ready(function() {
        (function() {
            var mvSlide = new Swiper('.main_visual .swiper-container', {
                pagination: {
                    el: '.mv_paging',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function(index, className){
                    		return '<li class="' + className + '"><a href="#none"></a></li>';
                    }
                },
            });
            var prideSlide = new Swiper('.pride_slide .swiper-container', {
                navigation: {
                    nextEl: '.pride_next',
                    prevEl: '.pride_prev',
                },
            });
            var comfortSlide = new Swiper('.comfort_slide .swiper-container', {
                pagination: {
                    el: '.comfort_paging',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function(index, className){
                    		return '<li class="' + className + '"><a href="#none"></a></li>';
                    }
                },
            });
            new FlowSlider($('.sns_slide .swiper-container'), {
                pps: 50,
            });
        }());

		$.ajax({
    		url:'http://view3landing.ivyro.net/_outline/instagram.php',
    		data: {
    			hashTag : '산카이'
    		},
    		dataType: 'jsonp',
    		type: 'get',
    		success:function(res){
    			var html = "";
    			for (var i = 0; i < 20; i++) {
    				var data = res.entry_data.TagPage[0].tag.media.nodes[i];
    				html += '<li class="swiper-slide" style="background-image:url(\''+data.display_src+'\');background-size:cover;">';
    				html += '<a href="https://www.instagram.com/p/'+data.code+'" target="_blank" style="display:block;width:100%;height:100%"></a>';
    				html += '</li>';
    			}
    			$('.sns_slide .swiper-wrapper').append(html);

                new FlowSlider($('.sns_slide .swiper-container'), {
                    pps: 50,
                });

    		}
    	});
    });
}(jQuery));
