/**************************************************************************************************
 * IG | Instagram API를 이용하여 해시 태그로 검색한 내용을 표시합니다.
 *
 * @class IG
 * @constructor
 * @version 1.0
 *
 * @param {Object} container jQuery 객체
 * @param {Object} options 옵션 객체
 *
 **************************************************************************************************/
(function($) {

	'use strict';

	window.IG = function(container, options) {

		if(this instanceof IG === false) {
			return new IG(container, options);
		}

		var _this = this;

		var opt = {getJsonpUrl: 'http://view3landing.ivyro.net/_outline/instagram.php', hashTag: '', wrapper: $('.insta'), ignoreCaption: null};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

		var maxId;

		this.initialize = function() {
			this.setHashFeed();
		};

		this.setHashFeed = function() {
			switch(typeof maxId) {
				case 'string':
					var data = {hashTag: opt.hashTag, maxId: maxId};
					break;
				case 'boolean':
					$('.igMore', opt.wrapper).removeClass('spinner');
					alert('더 이상 불러올 내용이 없습니다.');
					return false;
				default:
					var data = {hashTag: opt.hashTag};
					break;
			}
            $.ajax({
                url: opt.getJsonpUrl,
                data: data,
                dataType: 'jsonp',
                type: 'get',
                success: function(response) {
					console.log(response);
					var ignoreCaption = typeof opt.ignoreCaption === 'string' && opt.ignoreCaption.split('||');
					for(var i=0, html='', feed=response.entry_data.TagPage[0].tag.media.nodes; i<3; i++) {
						if(ignoreCaption.length > 0) {
							for(var j=0, skip=false; j<ignoreCaption.length; j++) {
								if(ignoreCaption[j] !== '' && typeof feed[i]['caption'] === 'string' && feed[i]['caption'].indexOf(ignoreCaption[j]) > -1) skip = true;
							}
							if(skip === true) continue;
						}
						// html += '<li style="background-image:url(\''+ feed[i]['display_src'] +'\')">';
						// html += '	<a href="https://www.instagram.com/p/'+ feed[i]['code'] +'" target="_blank">';
						// html += '		<p class="b_fs_m b_c_m"><img src="'+ opt.skinPath +'/img/ig_heart.png" alt="" />&nbsp;&nbsp;'+ feed[i]['likes']['count'] +'<span>COMMENT</span>&nbsp;&nbsp;'+ feed[i]['comments']['count'] +'</p>';
						// html += '	</a>';
						// html += '</li>';
						html += '<li class="insta_img"><a href="https://www.instagram.com/p/'+ feed[i]['code'] +'" target="_blank" class="insta_a" style="background-image:url(\''+ feed[i]['display_src'] +'\')"></a></li>';
					}
					container.append(html);
					maxId = typeof response.entry_data.TagPage[0].tag.media.page_info.end_cursor === 'string' ? response.entry_data.TagPage[0].tag.media.page_info.end_cursor : false;
					setTimeout(function() {
						$('.igMore', opt.wrapper).removeClass('spinner');
						win.trigger('resize');
					}, 200);
                },
				error: function(e) {
					console.log(123123);
					// _this.notice(e.statusText);
				}
            });
		};

		this.notice = function(msg) {
		    alert(msg);
		};

		// IG class 초기화 함수를 호출합니다.
		this.initialize();
	};

}(jQuery));
