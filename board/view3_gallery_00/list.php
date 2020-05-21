<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
$select_query_string = "SELECT * FROM `".TABLE_LEFT.$board."` WHERE `view3_use` = '1'";
if($view3_sca) {
	$select_query_string .= " AND `view3_sca` = '$view3_sca'";
}
$total_rows = mysql_num_rows(mysql_query($select_query_string));
?>
<div class="photo_list_wrap inner" style="margin-top:60px">
<?
if($total_rows > 0) {
    $list_num_per_page = 12;
    $pagination = 10;
    page($total_rows, $list_num_per_page, $pagination, $path_next, '', $view3_page, $end_page_path);
    $start_offset = ($view3_page - 1) * $list_num_per_page;
    $end_offset = $list_num_per_page;
	$board_inc = BOARD;
	
	$HTML_NO = "";
	$notice_sql = $select_query_string." and view3_notice = 1 ORDER BY view3_order DESC, view3_write_day DESC";
	$notice_res = mysql_query($notice_sql);
	while ($notice_lst = mysql_fetch_assoc($notice_res)) {
		$HTML_NO .= "<li class='ellipsis'>";
		$HTML_NO .= "<a href='{$board_inc}/index.php?board=happy_01&amp;type=view&amp;idx={$notice_lst['view3_idx']}&amp;skin=gallery_00&amp;modal=1' class='bindContentsModalOpen' data-key='bindContentsModalOpen'>";
		$HTML_NO .=	"<img src='{$request_root}/design/other/notice_ing.png' alt=''>&nbsp;&nbsp;&nbsp;{$notice_lst['view3_title_01']}";
		$HTML_NO .=	"</a>";
		$HTML_NO .=	"</li>";
	}


	$HTML_NOT = "";
	$query_string = $select_query_string." and view3_notice != 1 ORDER BY view3_order DESC, view3_write_day DESC LIMIT $start_offset, $end_offset";
	$result = mysql_query($query_string);
    while($list = mysql_fetch_assoc($result)) {
		$path_view = URL_PATH.'?'.view3_link('||idx||select||search','view&select='.$view3_select.'&search='.$view3_search.'&idx='.$list['view3_idx']);
		$write_day = date('Y.m.d', strtotime($list['view3_write_day']));
		$open_day = date('Y.m.d', strtotime($list['view3_open']));
		$list_file_array = explode('||', $list['view3_file']);


		$contents = view3_html($list['view3_command_01']); // addslashes 함수를 사용하여 DB에 저장한 경우
	    preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $contents, $matches);
	    $hap_img = explode("||",$list_file_array['view3_file']);
	    if ($list_file_array[2] == "") {
	        if ($matches[1] == "") {
	            $happy_img = $root."/design/noimg/happy_01.jpg";
	        } else {
	            $happy_img = $matches[1];
	        }
	    } else {
	        $happy_img = $root."/upload/happy_01".$list_file_array[2];
	    }

		$HTML_NOT .= "<li>";
		$HTML_NOT .= "<a href='{$board_inc}/index.php?board=happy_01&amp;type=view&amp;idx={$list['view3_idx']}&amp;skin=gallery_00&amp;modal=1' class='bindContentsModalOpen' data-key='bindContentsModalOpen'>";
		$HTML_NOT .= "<div class='img_wrap' style='background-image:url({$happy_img})'></div>";
		$HTML_NOT .= "<div class='txt_wrap'>";
		$HTML_NOT .= "<p class='list_tit title'>{$list['view3_title_01']}</p>";
		$HTML_NOT .= "</div>";
		$HTML_NOT .= "</a>";
		$HTML_NOT .= "</li>";
    }
?>
	<ul class="notice_list">
		<?=$HTML_NO?>
	</ul>
	<ul class="photo_list">
		<?=$HTML_NOT?>
	</ul>
    <div class="paging fs_def">
    	<?=$out_page?>
    </div>
<?
}
?>
</div>
<script src="<?=BOARD?>/view3_gallery_00/js/ContentsModal.js?<?=$time?>"></script>
<script type="text/javascript">
	$(document).ready(function(){
		new ContentsModal('.bindContentsModalOpen', {
			viewContainer: '#boardWrap',
			skin: [
				CONST_REQUEST_ROOT + '/board/view3_modal_map_00/css/view.css'
			]
		});
	});
</script>
