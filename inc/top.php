<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
define('_VIEW3BOARD_', TRUE);
@include_once														"../view3.php";
######################################################################################################################################################
//list
$end_path = "";
$end_page_path = $view3_rand.$end_path;

//수정
$path_action_edit = view3_link("||idx||page||board||select||search||skin","action_edit&skin=root","",$end_path);//등록 클릭시 링크
$path_save = view3_link("||idx||page||select||search","list","",$end_path);//등록 클릭시 링크
$path_save_01 = view3_link("||page||select||search","write","",$end_path);//등록 클릭시 링크

$path_clear = view3_link("||page||select||search","list","",$end_path);
$path_list = view3_link("||idx||view_page","list","",$end_path);//목록 클릭시 링크
if(!strcmp($view3_sca_new,"")){$view3_sca_new = $view3_sca;}else{$view3_sca_new=$view3_sca_new;}
$path_list_01 = view3_link("||idx||view_page||sca||sca_new","list&sca=".$view3_sca_new,"",$end_path);//목록 클릭시 링크

$path_write = view3_link("||select||search||idx","write&select=".$view3_select."&search=".$view3_search,"",$end_path);
$path_write_01 = view3_link("||select||search","write&select=".$view3_select."&search=".$view3_search,"",$end_path);

$path_action = view3_link("||idx||page||select||search||skin","action&skin=root","",$end_path);//등록 클릭시 링크
$path_edit = view3_link("","edit","",$end_path);//등록 클릭시 링크

$path_next = view3_link("||page||now_date||type||select||search","list&select=".$view3_select."&search=".$view3_search,"no");
$path_next_01 = view3_link("||page||now_date||type||select||search","view&select=".$view3_select."&search=".$view3_search,"no");
$path_next_02 = view3_link("||idx||view_page||temp_idx||now_date||type||select||search","view&select=".$view3_select."&search=".$view3_search,"no");
$path_next_03 = view3_link("||idx||view_page||now_date||type||select||search","list&select=".$view3_select."&search=".$view3_search,"no");

$path_delete = view3_link("||idx||page||select||search||skin","delete&skin=root","",$end_path);//등록 클릭시 링크
$path_drop = view3_link("||idx||page||select||search","list","",$end_path);//등록 클릭시 링크
######################################################################################################################################################
$admin_idx = "10";//관리자페이지만

$board_idx = "11";//보드 총괄 셋팅 (관리자 권한)

$html_idx = "12";//유저게시판
$franchise_idx = "13";
$company_idx = "14";
$m_idx = "15";
######################################################################################################################################################
if(!strcmp($view3_sca,"")){
	$temp_next_sca = "";
}else{
	$temp_next_sca = " and view3_sca='".$view3_sca."'";
}
$board_sql = "select * from ".TABLE_LEFT."board where view3_setup='".$html_idx."' and view3_link='".$page_insik."'".$temp_next_sca." order by view3_sca asc";
$out_board_sql=@mysql_query($board_sql);
$board_list                             = @mysql_fetch_assoc($out_board_sql);
$group_sql = "select * from ".TABLE_LEFT."group where view3_setup='".$html_idx."' and view3_idx='".$board_list['view3_group_idx']."'";
$out_group_sql=@mysql_query($group_sql);
$group_list                             = @mysql_fetch_assoc($out_group_sql);

$bbs_sql = "select * from ".TABLE_LEFT.$board." where view3_idx='".$view3_idx."'";
$out_bbs_sql=@mysql_query($bbs_sql);
$bbs_list                             = @mysql_fetch_assoc($out_bbs_sql);

$gnb_index = $group_list['view3_order_css'];//새로변경
$minor_index = $board_list['view3_order_css'];//새로변경

$is_sub = true;

$h2_title_kr = $group_list['view3_title_01'];
$h2_title_kr_old = $group_list['view3_title_01'];

$h2_title_sub = $board_list['view3_title_01'];

$top_img_alt = $board_list['view3_top_img_alt'];
$view3_table = TABLE_LEFT.$board_list['view3_link'];
if(!strcmp($_REQUEST["skin"],"")){
	$view3_skin                                             = $board_list['view3_skin_board'];
	$skin                                                   = str_replace("view3_","",$board_list['view3_skin_board']);
}else{
	$view3_skin                                             = "view3_".$_REQUEST["skin"];
	$skin                                                   = $_REQUEST["skin"];
}
if(!strcmp($board_list['view3_sca'],"")){
	$next_sca = "";
	$write_sca = "";
}else{
	$next_sca = " and view3_sca='".$board_list['view3_sca']."'";
	$write_sca = $board_list['view3_sca'];
}
if(!strcmp($board,"")){
	$page_id                                                    = PATH_PAGE_NAME;
}else{
	$page_id                                                    = $skin;
}
$skin_path = BOARD.'/'.$view3_skin;
######################################################################################################################################################
$depth1_link_query = "SELECT * FROM `".TABLE_LEFT."group` WHERE view3_use = '1' AND view3_setup = '$html_idx' ORDER BY view3_order";
$depth1_result = mysql_query($depth1_link_query);
$prev_page_list = '';
$curr_page_list = '';
$next_page_list = '';
$depth1_i = 0;
while($depth1_list = mysql_fetch_assoc($depth1_result)) {
    if($depth1_i === 2) break;
    $depth2_link_query = "SELECT * FROM `".TABLE_LEFT."board` WHERE view3_use = '1' AND view3_setup = '$html_idx' AND view3_group_idx = '".$depth1_list['view3_idx']."' ORDER BY view3_order";
    $depth2_result = mysql_query($depth2_link_query);
    unset($depth1_link);
    while($depth2_list = mysql_fetch_assoc($depth2_result)) {
        $depth1_link = $depth2_list;
        break;
    }

    if($depth1_i === 1) {
        $next_page_list = $depth1_link;
		$next_page_list['order'] =  $depth1_list['view3_order_css'];
		$next_page_list['title'] =  $depth1_list['view3_title_02'];
        $depth1_i++;
        break;
    }
    $prev_page_list = $curr_page_list;
    $curr_page_list = $depth1_link;
	$curr_page_list['order'] =  $depth1_list['view3_order_css'];
	$curr_page_list['title'] =  $depth1_list['view3_title_02'];
    if($depth1_list['view3_idx'] === $group_list['view3_idx']) {
        $depth1_i++;
    }
}
if($prev_page_list) {
	switch($prev_page_list['view3_style']) {
		case 'html':
			$prev_page_link = $root.'/html/'.$prev_page_list['view3_link'];
			break;
		case 'board':
			$prev_page_link = BOARD.'/index.php?board='.$prev_page_list['view3_link'];
			break;
		case 'http':
			$prev_page_link = $prev_page_list['view3_link'].'" target="_blank';
			break;
		case 'url':
			$prev_page_link = $prev_page_list['view3_link'];
			break;
		default:
			$prev_page_link = $root.'/html/'.$prev_page_list['view3_link'];
	}
    if($prev_page_list['view3_sca']) {
		if(strpos($prev_page_link, '?') > -1) $prev_page_link .= '&amp;sca='.$prev_page_list['view3_sca'];
		else $prev_page_link .= '?sca='.$prev_page_list['view3_sca'];
	}
}
if($next_page_list) {
	switch($next_page_list['view3_style']) {
		case 'html':
			$next_page_link = $root.'/html/'.$next_page_list['view3_link'];
			break;
		case 'board':
			$next_page_link = BOARD.'/index.php?board='.$next_page_list['view3_link'];
			break;
		case 'http':
			$next_page_link = $next_page_list['view3_link'].'" target="_blank';
			break;
		case 'url':
			$next_page_link = $next_page_list['view3_link'];
			break;
		default:
			$next_page_link = $root.'/html/'.$next_page_list['view3_link'];
	}
    if($next_page_list['view3_sca']) {
		if(strpos($next_page_link, '?') > -1) $next_page_link .= '&amp;sca='.$next_page_list['view3_sca'];
		else $next_page_link .= '?sca='.$next_page_list['view3_sca'];
	}
}
######################################################################################################################################################
$settings_sql = 'SELECT * FROM `'.TABLE_LEFT.'settings` WHERE `key`="info";';
$settings_query = mysql_query($settings_sql);
$settings_raw = mysql_fetch_assoc($settings_query);
$settings_data = unserialize($settings_raw['val']);
$sitename = htmlentities($settings_data['title'], ENT_QUOTES | ENT_IGNORE, "UTF-8");
$description = htmlentities($settings_data['desc'], ENT_QUOTES | ENT_IGNORE, "UTF-8");
$keywords = htmlentities($settings_data['keyword'], ENT_QUOTES | ENT_IGNORE, "UTF-8");
$page_uri = urlencode(PROTOCOL.$_SERVER[SERVER_NAME].$_SERVER[REQUEST_URI]);
$canonical = htmlentities($settings_data['canonical'], ENT_QUOTES | ENT_IGNORE, "UTF-8").$_SERVER[REQUEST_URI];
$og_image_arr = explode('||', $bbs_list['view3_file']);
if($view3_type == 'view') {
	$title_ko = $bbs_list['view3_title_01'].' :: '.$sitename;
	$desc = cut(view3_html($bbs_list['view3_command_01']), 60);
	for($i=0; $i<count($og_image_arr); $i++) {
		if($og_image_arr[$i] != '') {
			$og_image = $pc.'/upload/'.$board.$og_image_arr[$i];
			break;
		}
	}
} else {
	$title_ko = str_replace('<br />', '&nbsp;', html_entity_decode($board_list['view3_title_01'])).' | '.str_replace('<br />', '&nbsp;', html_entity_decode($group_list['view3_title_02'])).' :: '.$sitename;
	$desc = $board_list['view3_description'];
}
$desc = $desc ? $desc : $description;
if(!$og_image) {
	$og_image = $def_og_image;
}
######################################################################################################################################################
$request_root = $root;
$time = time();
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="description" content="<?=$desc?>">
<meta name="keywords" content="<?=$keywords?>">
<meta name="author" content="">
<meta property="og:title" content="<?=$title_ko?>">
<meta property="og:url" content="<?=$page_uri?>">
<meta property="og:description" content="<?=$desc?>">
<meta property="og:type" content="website">
<meta property="og:image" content="<?=$og_image?>">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="<?=$title_ko?>">
<meta name="twitter:url" content="<?=$page_uri?>">
<meta name="twitter:description" content="<?=$desc?>">
<meta name="twitter:image" content="<?=$og_image?>">
<meta name="viewport" content="width=1260">
<title><?=$title_ko?></title>
<link rel="canonical" href="<?=$canonical?>">
<link rel="shortcut icon" href="<?=$root?>/img/favicon.ico">
<link rel="stylesheet" href="<?=$root?>/css/style.css?<?=$time?>">
<link rel="stylesheet" href="<?=$root?>/css/sub.css?<?=$time?>">
<?
if(!$board) {
	if(file_exists(ROOT_INC.'/css/'.$page_id.'.css')) {
		echo '<link rel="stylesheet" href="'.$root.'/css/'.$page_id.'.css?'.$time.'">'.PHP_EOL;
	}
} else {
	echo '<link rel="stylesheet" href="'.$root.'/css/board.css?'.$time.'">'.PHP_EOL;
	if(file_exists(BOARD_INC.'/'.$view3_skin.'/css/skin.css')) {
		echo '<link rel="stylesheet" href="'.BOARD.'/'.$view3_skin.'/css/skin.css?'.$time.'">'.PHP_EOL;
	}
}
?>
<script>
var CONST_REQUEST_ROOT = '<?=$request_root?>';
var CONST_ROOT = '<?=$root?>';
var CONST_SITENAME = '<?=str_replace(' ', '', $sitename)?>';
var CONST_BOARD = '<?=$board?>';
var CONST_SKIN_PATH = '<?=BOARD.'/'.$view3_skin?>';
var CONST_TAB = '<?=$view3_tab?>';
var CONST_GNB_INDEX = '<?=$gnb_index?>';
var CONST_LNB_INDEX = '<?=$minor_index?>';
var CONST_ORDER = '<?=$board_list['view3_order']?>';
</script>
<script src="<?=$root?>/js/jquery-1.12.0.min.js"></script>
<script src="<?=$root?>/freebest/inquiry.js"></script>
<script src="//player.vimeo.com/api/player.js"></script>
<script src="<?=$root?>/js/common.js?<?=$time?>"></script>
<script src="<?=$root?>/js/sub.js?<?=$time?>"></script>
<?
if(!$board) {
	if(file_exists(ROOT_INC.'/js/'.$page_id.'.js')) {
		echo '<script src="'.$root.'/js/'.$page_id.'.js?'.$time.'"></script>'.PHP_EOL;
	}
}
if($board && $view3_type == 'view') {
?>
<script>
(function($) {
	$(document).ready(function() {
		$('body').on('click', '.social-fb-share-btn', function(e) {
			window.open($(this).attr('href'), '', 'width=680, height=480, left=200, top=100');
			e.preventDefault();
		});
		$('body').on('click', '.social-bl-share-btn', function(e) {
			window.open($(this).attr('href'), '', 'width=574, height=604, left=200, top=100');
			e.preventDefault();
		});
		$('body').on('click', '.social-ks-share-btn', function(e) {
			window.open($(this).attr('href'), '', 'width=480, height=450, left=200, top=100');
			e.preventDefault();
		});
	});
}(jQuery));
</script>
<?
}
?>
</head>
<body>

<!-- 건너뛰기 링크 시작 -->
<dl id="skiptoContent">
	<dt>바로가기 메뉴</dt>
	<dd><a href="#navigation" class="skip">네비게이션 바로가기</a></dd>
	<dd><a href="#content" class="skip">본문 바로가기</a></dd>
</dl>
<!-- //건너뛰기 링크 끝 -->

<div id="wrap">
<?php
include_once('header.php');
?>
	<!-- sub_content start -->
	<div class="sub_content over_h" id="content">
		<!-- sub_visual start -->
<?
if($gnb_index != 2){
?>
		<div class="sub_visual_wrap" data-sub-offset="1">
			<div class="sub<?=$gnb_index?>_visual<?=$minor_index?> sub_visual rel">
				<div class="sub_visual_bg">
					<div class="sub_visual_bg_in sub_ovl"></div>
				</div>
				<div class="sub_title_area">
					<span class="line sub_line"></span>
					<p class="sub_title"><img src="<?=$root?>/img/sub/sub_title<?=$gnb_index?>.png" alt=""></p>
					<p class="sub_stitle"><img src="<?=$root?>/img/sub/sub_stitle<?=$gnb_index?>.png" alt=""></p>
				</div>
			</div>
		</div>
<?
} else {
?>
		<div class="sub_visual_wrap" data-sub-offset="1">
			<div class="sub<?=$gnb_index?>_visual sub_visual rel">
				<div class="sub_visual_bg over_h">
					<div class="sub_visual_video sub_ovl">
						<iframe src="//player.vimeo.com/video/380644331?quality=1080p&autopause=0&playsinline=1&autoplay=1&loop=1&background=1" allow="autoplay" width="100%" height="100%" frameborder="0" playsinline webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
					</div>
				</div>
				<div class="sub_title_area">
					<span class="line sub_line"></span>
					<p class="sub_title"><img src="<?=$root?>/img/sub/sub_title<?=$gnb_index?>.png" alt=""></p>
					<p class="sub_stitle"><img src="<?=$root?>/img/sub/sub_stitle<?=$gnb_index?>.png" alt=""></p>
				</div>
			</div>
		</div>
<?
}
?>
		<!-- //sub_visual end -->
		<!-- lnb start -->
<?
if($gnb_index != 6){
?>
		<div class="lnb_wrap">
			<ul class="lnb fs_def t_center">
<?
$depth2_link_query = "SELECT * FROM `".TABLE_LEFT."board` WHERE view3_use = '1' AND view3_setup = '$html_idx' AND view3_group_idx = '".$group_list['view3_idx']."' ORDER BY view3_order";
$depth2_result = mysql_query($depth2_link_query);
while($depth2_list = mysql_fetch_assoc($depth2_result)) {
switch($depth2_list['view3_style']) {
case 'html':
$depth2_link = $root.'/html/'.$depth2_list['view3_link'];
break;
case 'board':
$depth2_link = BOARD.'/index.php?board='.$depth2_list['view3_link'];
break;
case 'http':
$depth2_link = $depth2_list['view3_link'].'" target="_blank';
break;
case 'url':
$depth2_link = $depth2_list['view3_link'];
break;
default:
$depth2_link = $root.'/html/'.$depth2_list['view3_link'];
}
if($depth2_list['view3_sca']) {
if(strpos($depth2_link, '?') > -1) $depth2_link .= '&amp;sca='.$depth2_list['view3_sca'];
else $depth2_link .= '?sca='.$depth2_list['view3_sca'];
}
?>
				<li<?if($depth2_list['view3_order_css'] == $minor_index){echo ' class="on"';}?>>
					<a href="<?=$depth2_link?>"><?=strip_tags(html_entity_decode($depth2_list['view3_title_01']))?></a>
				</li>
<?
}
?>
			</ul>
		</div>
<?
} else{
?>
		<div class="lnb_wrap">
			<ul class="lnb fs_def t_center">
<?
$depth2_link_query = "SELECT * FROM `".TABLE_LEFT."board` WHERE view3_use = '1' AND view3_setup = '$html_idx' AND view3_group_idx = '".$group_list['view3_idx']."' ORDER BY view3_order";
$depth2_result = mysql_query($depth2_link_query);
$depth2_i = 1;
while($depth2_list = mysql_fetch_assoc($depth2_result)) {
switch($depth2_list['view3_style']) {
case 'html':
    $depth2_link = $root.'/html/'.$depth2_list['view3_link'];
    break;
case 'board':
    $depth2_link = BOARD.'/index.php?board='.$depth2_list['view3_link'];
    break;
case 'http':
    $depth2_link = $depth2_list['view3_link'].'" target="_blank';
    break;
case 'url':
    $depth2_link = $depth2_list['view3_link'];
    break;
default:
    $depth2_link = $root.'/html/'.$depth2_list['view3_link'];
}
if($depth2_list['view3_sca']) {
if(strpos($depth2_link, '?') > -1) $depth2_link .= '&amp;sca='.$depth2_list['view3_sca'];
else $depth2_link .= '?sca='.$depth2_list['view3_sca'];
}
$depth2_link .= '#'.$depth2_i;
?>
		        <li>
		            <a href="<?=$depth2_link?>">
		                <?=$depth2_list['view3_title_01']?>
		            </a>
		        </li>
<?
$depth2_i++;
}
?>
			</ul>
		</div>
<?
}
?>
		<!-- //lnb end -->

		<div class="sub_img<?=$gnb_index?> sub_img"><img src="<?=$root?>/img/sub/sub_img<?=$gnb_index?>.png" alt=""></div>
		<!-- page_title_area start -->
		<div class="page_title_area t_center">
			<p class="page_title"><?=html_entity_decode($board_list['view3_special_01'])?></p>
			<p class="page_text"><?=nl2br($board_list['view3_special_02']);?></p>
		</div>
		<!-- //page_title_area end -->
