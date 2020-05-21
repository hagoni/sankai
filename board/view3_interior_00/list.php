<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>

<div class="layer1 rel">
    <div class="bg_slide rel h100 m_100 max_1800">
        <div class="swiper-container h100">
            <ul class="swiper-wrapper h100">
                <li class="swiper-slide slide1 h100 rel">
                    <div class="dim abs h100"></div>
                    <div class="ovl abs h100"></div>
                    <p class="sl_ttl"><img src="<?=$skin_path?>/img/lyr1_ttl1.png" alt="이야기를 나누는 은은한 공간"></p>
                    <p class="sl_text text wt">한 잔의 술과 진솔한 이야기를 나누는<br>은은한 공간 산카이입니다.<br><em>테이블 파티션을 통해 복잡한 사람들과<br>분리된 독립적인 공간을 창출합니다.</em></p>
                </li>
                <li class="swiper-slide slide2 h100 rel">
                    <div class="dim abs h100"></div>
                    <div class="ovl abs h100"></div>
                    <p class="sl_ttl"><img src="<?=$skin_path?>/img/lyr1_ttl2.png" alt="따스한 감성이 묻어난 목로의 공간"></p>
                    <p class="sl_text text wt">100년 전통 목로 선술집의<br>따스한 감성에 현대적 요소를 결합해<br>산카이만의 세련된 분위기를 만듭니다.</p>
                </li>
            </ul>
        </div>
        <ul class="bg_paging abs fs_def t_center">
            <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
            <li><a href="#none"></a></li>
        </ul>
    </div>
    <ul class="boxes abs fs_def t_center">
        <li>
            <a href="#none">
                <p class="box_ttl"><img src="<?=$skin_path?>/img/box1_ttl.png" alt="#친구끼리"></p>
                <div class="box_on1 box_on abs">
                    <p class="on_ttl"># 친구끼리</p>
                    <p class="on_text">현대적 요소를 결합한 산카이는<br>SNS에 올릴만한<br>세련된 분위기를 연출합니다.</p>
                </div>
            </a>
        </li>
        <li>
            <a href="#none">
                <p class="box_ttl"><img src="<?=$skin_path?>/img/box2_ttl.png" alt="#연인끼리"></p>
                <div class="box_on2 box_on abs">
                    <p class="on_ttl"># 연인끼리</p>
                    <p class="on_text">테이블 파티션이 있어<br>분위기를 낼 수 있는<br>은은한 공간입니다.</p>
                </div>
            </a>
        </li>
        <li>
            <a href="#none">
                <p class="box_ttl"><img src="<?=$skin_path?>/img/box3_ttl.png" alt="#가족끼리"></p>
                <div class="box_on3 box_on abs">
                    <p class="on_ttl"># 가족끼리</p>
                    <p class="on_text">독립적인 공간이 있어<br>가족과 함께 조용하게<br>즐길 수 있는 공간입니다.</p>
                </div>
            </a>
        </li>
    </ul>
</div>

<!-- board wrapper start -->
<div id="boardWrap">

    <ul class="tabmenu fs_def">
		<li<?if($view3_tab == '' || $view3_tab == 'interior'){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("tab","tab=interior");?>">인테리어</a></li>
		<li<?if($view3_tab == 'exterior'){echo ' class="on"';}?>><a href="<?=URL_PATH.'?'.get("tab","tab=exterior");?>">익스테리어</a></li>
	</ul>

<?
if($total_data > 0) {
?>

	<div class="interior_slider">
		<div class="swiper-container slider-container">
			<ul class="swiper-wrapper slider-wrapper">
<?
	$sql = $main_sql.$view_order;
	$out_sql = mysql_query($sql);
	$file = array();
	while($list = mysql_fetch_assoc($out_sql)) {
        $list_file_array = explode('||', $list['view3_file']);
        $list_file = $pc.'/upload/'.$board.$list_file_array[2];
		$file[] = $list_file;
?>
				<li class="swiper-slide" data-src="<?=$list_file?>">
                    <img src="<?=$list_file?>" alt="" class="w100">
                </li>
<?
	}
?>
			</ul>
		</div>
        <button type="button" class="int_btns int_prev">이전</button>
        <button type="button" class="int_btns int_next">다음</button>
	</div>
	<ul class="interior_paging fs_def t_center">
        <li class="swiper-pagination-bullet-active"><a href="#none"></a></li>
        <li><a href="#none"></a></li>
	</ul>

<script>
$(document).ready(function() {
    var tl = new TimelineMax({repeat: -1, repeatDelay: 5.0});
    $('.boxes li').each(function(i) {
        var $t = $(this);
        var t = i > 0 ? '+=5.0' : '+=0';
        tl.call(function() {
            $('.boxes li').removeClass('on');
            $t.addClass('on');
        }, null, null, t);
    });
    $('.boxes li').on('mouseenter', function() {
        tl.pause();
        $('.boxes li').removeClass('on');
    });
    $('.boxes li').on('mouseleave', function() {
        tl.play();
    });

    new Swiper('.bg_slide > .swiper-container', {
        speed: 1,
        autoplay: {
            delay: 8000,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
        	el: '.bg_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
        observer: true,
        observeParents: true
    });
    var $swiperItems = $('.interior_slider .swiper-slide');
    new Swiper('.interior_slider > .slider-container', {
        spaceBetween: 100,
        pagination: {
        	el: '.interior_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
        navigation: {
            prevEl: '.int_btns.int_prev',
            nextEl: '.int_btns.int_next'
        }
    });

});
</script>

<?
} else {
    echo '<p class="nodata">게시물이 없습니다.</p>'.PHP_EOL;
}
?>

</div>
<!-- //board wrapper end -->
