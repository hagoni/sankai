(function($) {

	'use strict';

	window.Highlight = function(assets, options) {

		if(this instanceof Highlight === false) {
			return new Highlight(assets, options);
		}

		if(assets.length === 0) return false;

		var _this = this;

		var opt = {diff: 200, duration: 0.4, easing: 'Power2.easeIn', delay: 0};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

        var highlightElems = [],
		    offsetTop = [],
            tl = [],
			viewed = [],
			winH = win.innerHeight(),
			docH = doc.innerHeight(),
			limit = docH - winH - 10;

		var	LENGTH;

		this.initialize = function() {
            this.setElements();
            this.setTimeline();
            this.setViewOffset();
            this.setHandler();
            win.trigger('scroll');
		};

		this.setElements = function() {
			for(var i=0, el, prevEl, len = 0; i<assets.length; i++) {
                prevEl = assets.eq(i - 1);
                el = assets.eq(i);
				if(i === 0 || (i > 0 && el.parent().offset().top !== prevEl.parent().offset().top)) {
					highlightElems[len] = [];
					highlightElems[len].push(el);
					len++;
				} else {
					highlightElems[len - 1].push(el);
				}
				viewed[i] = false;
			}
            LENGTH = len;
		};

        this.setTimeline = function() {
            for(var i=0; i<LENGTH; i++) {
                tl[i] = new TimelineLite({paused: true});
                for(var j=0; j<highlightElems[i].length; j++) {
                    tl[i].to(highlightElems[i][j].children('.highlight'), opt.duration, {width: '100%', ease: opt.easing});
                }
            }
        };

		this.setViewOffset = function() {
			for(var i=0; i<LENGTH; i++) {
				var el = highlightElems[i][0];
                offsetTop[i] = el.offset().top - winH + opt.diff;
				if(offsetTop[i] > limit) offsetTop[i] = limit;
			}
		};

		this.setHandler = function() {
			win.scroll(function() {
				_this.checkOffset();
			});
			var resizeTimer = null;
			win.resize(function() {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					winH = win.innerHeight();
					limit = docH - winH - 10;
					_this.setViewOffset();
					_this.checkOffset();
				}, 100);
			});
		};

		this.checkOffset = function() {
			for(var i=0; i<LENGTH; i++) {
				this.loopIf(i);
			}
		};

		this.loopIf = function(i) {
			if(i === LENGTH) return false;
			if(win.scrollTop() >= offsetTop[i] && viewed[i] === false) {
				viewed[i] = true;
				this.motion(i);
				this.loopIf(i + 1);
			}
		};

		this.motion = function(i) {
			tl[i].play();
		};

		this.initialize();
	};

}(jQuery));

new Highlight($('em'));