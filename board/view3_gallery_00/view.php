<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
######################################################################################################################################################
$sql = $main_sql.$view_order;
$out_sql = mysql_query($sql);
$list = mysql_fetch_assoc($out_sql);
view3_hit($view3_table, $list['view3_idx']);
######################################################################################################################################################
// 이전글 다음글
######################################################################################################################################################
$sort = view3_prev_next($view3_table,$view3_idx);
$path_prev = view3_link("||idx","view&idx=".$temp_prev,"",$end_path);
$path_next = view3_link("||idx","view&idx=".$temp_next,"",$end_path);
######################################################################################################################################################
$_SESSION['idx'] = $view3_idx;
$option = view3_option(array($list['view3_file'],$list['view3_file_old'],$board),$list['view3_write_day'],$list['view3_notice'],$list['view3_main'],array($list["view3_code"],$list['view3_name']),array($list['view3_open'],$list['view3_close']));
$command_01 = preg_replace('/img(.+)src="/', 'img$1src="'.$pc, html_entity_decode($list['view3_command_01']));
?>

<!-- board wrapper start -->
<div id="boardWrap">

	<div class="board_view_head">
		<p class="board_view_title b_fs_xl b_ff_h b_c_h ellipsis"><?=$option['notice']?><?=$list['view3_title_01']?></p>
		<ul class="board_view_sns">
			<li><a href="https://www.facebook.com/sharer/sharer.php?u=<?=urlencode('http://'.$_SERVER[SERVER_NAME].$_SERVER[REQUEST_URI]);?>" class="social-fb-share-btn"><img src="../img/board/sns_ico01.png" alt="페이스북 아이콘" /></a></li>
			<li><a href="http://blog.naver.com/openapi/share?url=<?=urlencode('http://'.$_SERVER[SERVER_NAME].$_SERVER[REQUEST_URI]);?>" class="social-bl-share-btn"><img src="../img/board/sns_ico02.png" alt="네이버 블로그 아이콘" /></a></li>
			<li><a href="https://story.kakao.com/share?url=<?=urlencode('http://'.$_SERVER[SERVER_NAME].$_SERVER[REQUEST_URI]);?>" class="social-ks-share-btn"><img src="../img/board/sns_ico03.png" alt="카카오스토리 아이콘" /></a></li>
		</ul>
	</div>

    <div class="board_view_body">
<?
if($option['user_down'] || $option['user_view']) {
?>
        <div class="board_view_file">
<?
	echo $option['user_down'];
	echo $option['user_view'];
?>
        </div>
<?
}
if ($list['view3_movie'] != "" && $list['view3_video'] == "Vimeo") {
?>
		<iframe src="https://player.vimeo.com/video/<?=$list['view3_movie']?>" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<?
}
?>
        <div class="board_view_text b_fs_m b_lh_l b_c_m"><?=view3_html($list['view3_command_01'])?></div>
    </div>

<?
######################################################################################################################################################
include_once(BOARD_INC.'/setup_bottom.php');
######################################################################################################################################################
?>

</div>
<!-- //board wrapper end -->
