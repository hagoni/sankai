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

   var $headElems = [$('.lyr3_video > iframe')],
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

new YMotion([
	[
        {el: '.el1_1', set: {opacity: 0, y: -100}, to: {opacity: 1, y: 0}, d: 0.6},
	],
    [
        {el: '.el2_1', set: {opacity: 0, y: 100}, to: {opacity: 1, y: 0}, d: 0.6},
        {el: '.el2_2', set: {opacity: 0, y: -100}, to: {opacity: 1, y: 0}, d: 0.6, t: '-=0.2'},
	],
    [
        {el: '.el3_1', set: {scale: 1}, to: {scale: 1.05}, d: 5},
	],
]).activate();