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


(function($) {

    'use strict';

    window.BannerMotion = function($container, motionItems, options) {

        if(this instanceof BannerMotion === false) {
			return new BannerMotion($container, motionItems, options);
		}

        var _this = this;

		var $container = typeof $container === 'object' ? $container : $('#' + $container),
			opt = {autoplay: true, act: true, startIndex: 0, interval: 10000, duration: 1000, easing: 'easeInOutQuart', repeat: true, carousel: true};

        for(var prop in options) {
			opt[prop] = options[prop];
		}

        var $wrapper = $container.children('ul:first-child'),
			$items = $wrapper.children('li'),
			$paging,
            length = $items.length,
            prevIndex = 0,
			index = 0,
            itemsDim,
            diff = [],
            cloneClass = 'slider-clone',
            timerId,
			timerCleared = true,
			clearLists = [],
			resizeTimer = null,
            tween = false,
        	assetsLoaded = false,
			interval = [],
            sortTl = [],
            tempTl = [],
			queued = false,
        	sliderAutoplay = false,
			params = {};

        this.initialize = function() {
            if(typeof opt.onInit === 'function') opt.onInit();
            index = prevIndex = opt.startIndex;
            this.assetsPreload();
            if(opt.act === true) {
				this.setElements();
				this.setTimeline();
			} else {
                for(var i=0; i<length; i++) interval[i] = opt.interval;
            }
            if(opt.carousel === true) {
                $items.eq(length - 1).clone().addClass(cloneClass).prependTo($wrapper);
                $items.eq(0).clone().addClass(cloneClass).appendTo($wrapper);
            }
			if(typeof opt.pagination === 'object') {
				if(opt.pagination.children('li').length === 0) {
                    opt.pagination.empty();
					for(var i=0; i<length; i++) {
                        if(typeof opt.pagingRender === 'undefined') {
                            if(i === index) opt.pagination.append('<li class="on"><a href="#none">' + (i + 1) + '</a></li>');
                            else opt.pagination.append('<li><a href="#none">' + (i + 1) + '</a></li>');
                        } else {
                            opt.pagination.append(opt.pagingRender(i, index));
                        }
					}
				}
				$paging = opt.pagination.children();
			}
			$items.eq(index).addClass('on');
            this.setSliderProps();
			this.setHandler();
			this.timerCtrl();
			params = {
				interval: interval,
				duration: opt.duration,
				length: length
			};
            if(typeof opt.onReady === 'function') opt.onReady(index, prevIndex, params);
		};

        this.assetsPreload = function() {
			var $firstItem = $items.eq(index), bgRegExp = /(url)|[\(\)\'\"]/g, assets = [];
			if($firstItem.css('background-image') !== 'none') assets.push($firstItem.css('background-image').replace(bgRegExp, ''));
			$firstItem.find('*').each(function(i) {
				if($(this).css('background-image') !== 'none') assets.push($(this).css('background-image').replace(bgRegExp, ''));
				if($(this).prop('tagName') === 'IMG') assets.push($(this).attr('src'));
			});
			if(assets.length > 0) {
				new PreLoader(assets, function() {
					assetsLoaded = true;
				});
			} else {
				assetsLoaded = true;
			}
		};

        this.setElements = function() {
			for(var i=0; i<motionItems.length; i++) {
				for(var j=0, o; j<motionItems[i].length; j++) {
					o = motionItems[i][j];
                    if(typeof o.method === 'undefined') {
						if(typeof o.set === 'undefined' || o.el.length === 0) continue;
						TweenMax.set(o.el, o.set);
                    } else {
                        switch(o.method) {
                            case 'add':
								if(typeof o.items === 'object') {
	                                for(var k=0; k<o.items.length; k++) {
										if(typeof o.items[k].set === 'undefined' || o.items[k] instanceof TimelineMax === true || o.items[k].el.length === 0) continue;
										TweenMax.set(o.items[k].el, o.items[k].set);
									}
								}
                                break;
                            default:
                                break;
                        }
                    }
				}
			}
			if(assetsLoaded === true) $('#initcloser').remove();
		};

		this.setTimeline = function() {
			for(var i=0; i<motionItems.length; i++) {
				tempTl[i] = new TimelineMax({paused: true});
				for(var j=0, o; j<motionItems[i].length; j++) {
                    o = motionItems[i][j];
					if(typeof o.method === 'undefined' && typeof o.to === 'undefined') continue;
                    if(typeof o.method === 'undefined') {
						if(o.el.length === 0) continue;
						typeof o.t === 'undefined' ? tempTl[i].to(o.el, o.d, o.to) : tempTl[i].to(o.el, o.d, o.to, o.t);
                    } else {
                        switch(o.method) {
							case 'addLabel':
								tempTl[i][o.method](o.label);
								break;
                            case 'add':
								var a = [];
								if(typeof o.items === 'object') {
									for(var k=0; k<o.items.length; k++) {
										if(o.items[k] instanceof TimelineMax === true || o.items[k].el.length === 0) continue;
										a[k] = TweenMax.to(o.items[k].el, o.items[k].d, o.items[k].to);
									}
								}
								if(typeof o.tl === 'object') a.push(o.tl);
								typeof o.t === 'undefined' ? tempTl[i][o.method](a) : tempTl[i][o.method](a, o.t);
                                break;
							case 'call':
								typeof o.t === 'undefined' ? tempTl[i][o.method](o.fx) : tempTl[i][o.method](o.fx, null, null, o.t);
								break;
							case 'onPause':
                                tempTl[i][o.method] = o.fx;
								break;
                            default:
                                break;
                        }
                    }
				}
			}

            $items.each(function(i) {
				if(typeof $items.eq(i).data('interval') === 'number') {
					interval[i] = $items.eq(i).data('interval');
				} else if(typeof tempTl[$items.eq(i).data('index') - 1] === 'object' && tempTl[$items.eq(i).data('index') - 1].totalDuration() <= 3600) {
					interval[i] = (tempTl[$items.eq(i).data('index') - 1].totalDuration() + 5) * 1000;
				} else {
					interval[i] = opt.interval;
				}
				sortTl[i] = typeof $(this).data('index') === 'number' ? tempTl[$(this).data('index') - 1] : '움직이지 않을래';
			});
			if(typeof sortTl[0] === 'object') sortTl[0].delay(0.4);
		};

        this.setSliderProps = function() {
			itemsDim = parseInt($container.css('width'), 10);
            $wrapper.width(itemsDim * (length + (opt.carousel === true ? 2 : 0)));
            $wrapper.children('li').width(itemsDim);
            for(var i=0; i<length; i++) {
				if(opt.carousel === true) {
					if(i > 0) diff[i] = diff[0] - (itemsDim * i);
					else diff[i] = -itemsDim;
				} else {
					diff[i] = -(itemsDim * i);
				}
            }
            if(tween === false) TweenLite.set($wrapper, {x: diff[index]});
		};

        this.setHandler = function() {
			if(typeof opt.pagination === 'object') {
				$paging.children().click(this.toIdx);
				clearLists.push($paging.children());
			}
			if(typeof opt.prevBtn === 'object') {
				opt.prevBtn.click(this.toPrev);
				clearLists.push(opt.prevBtn);
			}
			if(typeof opt.nextBtn === 'object') {
				opt.nextBtn.click(this.toNext);
				clearLists.push(opt.nextBtn);
			}
            $(window).resize(this.resize);
		};

        this.setTimer = function() {
			if(timerCleared === true) {
				timerId = setTimeout(_this.timer, interval[index]);
				timerCleared = false;
			}
		};

        this.clearTimer = function() {
			if(timerCleared === false) {
				clearTimeout(timerId);
				timerCleared = true;
			}
		};

        this.timer = function() {
			_this.toNext();
		};

        this.toPrev = function() {
			if(tween === false) {
				index--;
				if(opt.repeat === false && index === -1) {
					index++;
					_this.clearTimer();
					return false;
				}
				index = index === -1 ? length - 1 : index;
				if(index !== prevIndex) {
                    _this.slide(_this.getTranslate('toPrev'));
                }
			}
		};

        this.toNext = function() {
			if(tween === false) {
				index++;
				if(opt.repeat === false && index === length) {
					index--;
					_this.clearTimer();
					return false;
				}
				index = index === length ? 0 : index;
				if(index !== prevIndex) {
                    _this.slide(_this.getTranslate('toNext'));
                }
			}
		};

        this.toIdx = function(e) {
			if(tween === false) {
				index = typeof e === 'object' ? $(this).closest('li').index() : e;
				if(index !== prevIndex) {
                    _this.slide(_this.getTranslate('toIdx'));
                }
			}
			if(typeof e === 'object') e.preventDefault();
		};

        this.slide = function(value) {
			tween = true;
			if(sliderAutoplay === true) this.clearTimer();
			if(typeof opt.pagination === 'object') {
				$paging.filter('.on').removeClass('on').trigger('off');
				$paging.eq(index).addClass('on').trigger('on');
			}
			$items.filter('.on').removeClass('on');
			$items.eq(index).addClass('on');
			if(typeof opt.onBefore === 'function') opt.onBefore(index, prevIndex, params);
			TweenMax.to($wrapper, opt.duration / 1000, {x: value, ease: opt.easing, onComplete: function() {
                TweenLite.set($wrapper, {x: diff[index]});
                if(opt.act === true) {
                    if(typeof sortTl[prevIndex] === 'object') sortTl[prevIndex].pause(0);
					if(typeof sortTl[prevIndex] === 'object' && typeof sortTl[prevIndex]['onPause'] === 'function') sortTl[prevIndex]['onPause']();
                    if(typeof sortTl[index] === 'object') sortTl[index].play();
                }
                if(typeof opt.onAfter === 'function') opt.onAfter(index, prevIndex, params);
				if(sliderAutoplay === true) _this.setTimer();
				prevIndex = index;
				tween = false;
            }});
		};

        this.getTranslate = function(method) {
			var value;
			if(opt.carousel === true && method === 'toPrev' && index === length - 1) {
				value = diff[0] + itemsDim;
			} else if(opt.carousel === true && method === 'toNext' && index === 0) {
				value = diff[length - 1] - itemsDim;
			} else {
				value = diff[index];
			}
			return value;
		};

		this.resize = function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
                _this.setSliderProps();
				if(typeof opt.onResize === 'function') opt.onResize();
			}, 100);
		};

        this.timerCtrl = function() {
			this.clearT = function() {
				if(sliderAutoplay === true) _this.clearTimer();
			}
			this.setT = function() {
				if(sliderAutoplay === true) _this.setTimer();
			}
			for(var i=0; i<clearLists.length; i++) {
				clearLists[i].bind('mouseenter focusin', this.clearT);
				clearLists[i].bind('mouseleave focusout', this.setT);
			}
		};

        this.stop = function(cb) {
            if(typeof cb === 'function') cb(index);
			sliderAutoplay = false;
			this.clearTimer();
			if(typeof sortTl[index] === 'object') sortTl[index].pause();
		};

        this.play = function(cb) {
			if(typeof cb === 'function') cb(index);
			sliderAutoplay = true;
			this.setTimer();
			if(typeof sortTl[index] === 'object') sortTl[index].play();
		};

        this.activate = function() {
			$('#initcloser').remove();
			if(queued === false) {
                if(typeof opt.onStart === 'function') opt.onStart(index, prevIndex, params);
                if(opt.act === true && typeof sortTl[0] === 'object') sortTl[0].play();
                sliderAutoplay = opt.autoplay;
				if(sliderAutoplay === true) this.setTimer();
                queued = true;
            }
		};

		this.playing = function() {
			return sliderAutoplay;
		};

        this.initialize();
    };

}(jQuery));