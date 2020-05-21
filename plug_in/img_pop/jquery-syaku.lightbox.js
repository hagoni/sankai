/**
 * jQuery Syaku LightBox ver 1.0.0
 *
 * Copyright (c) Seok Kyun. Choi. 최석균
 * GNU Lesser General Public License
 * http://www.gnu.org/licenses/lgpl.html
 *
 * registered date 20110803
 * http://syaku.tistory.com
 */

(function($) {

  $.fn.slightbox = function(settings) {

    settings = jQuery.extend({
      id_box : 'syakuLightbox',
      id_display : 'syakuLightboxDisplay',
      id_display_img : 'syakuLightboxDisplayImage',
      id_loading : 'syakuLightboxLoading'
    }, settings);
    
    var id_box = settings.id_box;
    var id_display = settings.id_display;
    var id_display_img = settings.id_display_img;
    var id_loading = settings.id_loading;
    var j_id_box = '#' + id_box;
    var j_id_display = '#' + id_display;
    var j_id_display_img = '#' + id_display_img;
    var j_id_loading = '#' + id_loading;

    var body = $(document.body);
    var obj_box = $(j_id_box,body);
    var obj_display = $(j_id_display,body);

    var objSlightbox = this;
    var items = [ ];
    var items_count = 0;

    function _initialize() {

      var selected = $(this).attr('href');
      var idx = 0;

      objSlightbox.each(function(i) {
        var href = $(this).attr('href');
        var item = { 'href' : href };
        if (selected == href) { idx = i; }
        items.push(item);
      });

      _begin(idx);
      _img_display(idx);
      items_count = items.length;

      return false;
    }

    function _offset(w,h) {
      var width = 0;
      var height = 0;

      var obj = {width:0 , height:0 , scrollTop:0 , scrollLeft:0 , scrollWidth:0 , scrollHeight:0 , top:0 , left:0};

      // 현재 화면의 크기
      var dom = document.documentElement;
      try {

        if ($.browser.msie) {
          obj.width = parseInt(dom.offsetWidth);
          obj.height = parseInt(dom.offsetHeight);
        } else {
          obj.width = parseInt(window.innerWidth);
          obj.height = parseInt(window.innerHeight);
        }

      } catch (e) { // ie6
        win = $(document);
        obj.width = win.width();
        obj.height = win.css('height','100%').height();
      }

      var doc = $(document);
      // 스크롤의 위치
      obj.scrollLeft = parseInt(doc.scrollLeft());
      obj.scrollTop = parseInt(doc.scrollTop());

      // 현재 화면의 전체 크기 (스크롤 포함)
      if ($.browser.msie) { // 20 오차발생
        obj.scrollWidth = parseInt(doc.width()) - 20;
      } else {
        obj.scrollWidth = parseInt(doc.width());
      }
      obj.scrollHeight = parseInt(doc.height());

      // 모니터 중앙에 위치 값
      if (w > 0) obj.left = (obj.width - w)/2 + obj.scrollLeft;
      if (h > 0) obj.top = (obj.height - h)/2 + obj.scrollTop;

      if (obj.left < 0){ obj.left = -obj.left; }
      if (obj.top < 0){ obj.top = -obj.top; }

      return obj;
    }

    function _close() {
      $(j_id_box).remove();
      $(j_id_display).remove();
    }

    function _show() {
      $(j_id_display_img).show();
    }
    
    function _begin(idx) {
      var menu_btn = "<div id='syakuLightboxMenu'><a href='" + items[idx].href + "' target='_blank' id='syakuLightboxBtnOpen'></a><span style='margin-left:5px;' id='syakuLightboxBtnClose'></span></div>";
      var offset = _offset();
      if (!obj_box.is(j_id_box)) {
        body.append($("<div id='" + id_box + "'></div>").css('width','100%').css('height',offset.scrollHeight));
      }

      if (!obj_display.is(j_id_display)) {
        body.append(jQuery("<div id='" + id_display + "'>" + menu_btn + /*<div id='syakuLightboxLoading'><span id='syakuLightboxLoadingImg'></span></div>*/"<img src='' id='" + id_display_img + "' style='display:none;' /></div>"));
        jQuery('#syakuLightboxBtnClose').click(function() { _close(); });
      }
    }

    function _img_resize_show(objImg) {
      var w = objImg.width;
      var h = objImg.height;

      var offset = _offset(w,h);
      var monitor_w = parseInt(offset.width);
      var monitor_h = parseInt(offset.height);

      if(offset.width <= w) { w = offset.width/1.2; $(j_id_display_img).attr('width' ,w); }
      if(offset.height <= h) { h = offset.height/1.2; $(j_id_display_img).attr('height' , h); }
      w = $(j_id_display_img).width();
      h = $(j_id_display_img).height();

      offset = _offset(w,h);
      $(j_id_display).css('top',offset.top).css('left',offset.left);

      $(j_id_display_img + ',#syakuLightboxMenu').mouseover(function() {
        $('#syakuLightboxMenu').show();
      }).mouseout(function() {
        $('#syakuLightboxMenu').hide();
      });

      _show();
    }

    function _img_display(idx) {

      var objImg = new Image();
      objImg.onload = function() {
        $(j_id_display_img).attr('src',items[idx].href);
        objImg.onload=function(){};
      };

      $(j_id_display_img).load(function() { _img_resize_show(objImg); });

      objImg.src = items[idx].href;
    }

    return this.unbind('click').click(_initialize);
  };

})(jQuery);