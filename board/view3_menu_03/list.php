<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
include(ROOT_INC.'/admin/view3_menu_03/cat.php');
if($view3_tab == '') {
	$view3_tab = 1;
    // foreach($menuCatNew[$view3_sca] as $key => $val) {
    //     $view3_tab = $key;
    //     break;
    // }
}
$view_idx = $_REQUEST['idx'];
?>
<style>
.grid_img{position:relative;padding-top:80%;background-repeat:no-repeat;background-position:center;background-size:cover}
.grid_txt_area{height:auto}
.grid_txt_area .board_txt{line-height:300%}
.menu_img img{width:100%}

@media screen and (max-width:767px) {
	.tabmenu li a{width:54px}
}

.menutab{padding-bottom:55px}
.menutab li{margin-left:45px}
.menutab li:first-child{margin-left:0}
.menutab li a{position:relative;display:inline-block;padding:3px 7px;font-family:'Arita-buriSB';font-size:25px;letter-spacing:-0.05em;color:#2d2925}
.menutab li a:before{content:'';position:absolute;left:0;bottom:0;width:0;height:4px;background-color:#d4b66c}
.menutab li.on a:before, .menutab li a:hover:before{width:100%}
</style>
				<!-- menutab start -->
				<?if($menuCatNew[$view3_sca]) {?>
			    <ul class="menutab fs_def t_center">
					<li<?if($view3_tab == 1){echo ' class="on"';}?>><a href="<?=BOARD.'/index.php?'.get('tab', 'tab=1')?>">ALL</a></li>
			        <?foreach($menuCatNew[$view3_sca] as $key => $val) {?>
			        <li<?if($view3_tab == $key){echo ' class="on"';}?>>
			            <a href="<?=BOARD.'/index.php?'.get('tab', 'tab='.$key)?>"><?=$val?></a>
			        </li>
			        <?}?>
			    </ul>
			    <?}?>
				<!-- <ul class="menutab fs_def t_center">
					<li class="on"><a href="#none">ALL</a></li>
					<li><a href="#none">세트메뉴</a></li>
					<li><a href="#none">스페셜메뉴</a></li>
					<li><a href="#none">후레쉬메뉴</a></li>
				</ul> -->
				<!-- //menutab end -->
				<div id="boardWrap">
				<? /*
					<ul class="tabmenu board_tab">
						<li class="<?if((!strcmp($view3_tab,"")) or (!strcmp($view3_tab,"2"))){echo ' on';}?>"><a href="<?=URL_PATH;?>?<?=get("page||type||tab||idx||sca","tab=2");?>">전체</a></li>
						<li class="<?if(!strcmp($view3_tab,"3")){echo ' on';}?>"><a href="<?=URL_PATH;?>?<?=get("page||type||tab||idx||sca","tab=3");?>">뼈전골</a></li>
						<li class="<?if(!strcmp($view3_tab,"4")){echo ' on';}?>"><a href="<?=URL_PATH;?>?<?=get("page||type||tab||idx||sca","tab=4");?>">뼈찜</a></li>
						<li class="<?if(!strcmp($view3_tab,"5")){echo ' on';}?>"><a href="<?=URL_PATH;?>?<?=get("page||type||tab||idx||sca","tab=5");?>">해장국</a></li>
						<li class="<?if(!strcmp($view3_tab,"6")){echo ' on';}?>"><a href="<?=URL_PATH;?>?<?=get("page||type||tab||idx||sca","tab=6");?>">별미</a></li>
					</ul>
					*/ ?>


					<div class="grid_wrap">
<?
######################################################################################################################################################
$list_page = "1000";
$page_per_list = "10";
$start = ($view3_page-1)*$list_page;
page($total_data, $list_page, $page_per_list, $path_next, "img", $view3_page, $end_page_path);
######################################################################################################################################################
if( (!strcmp($total_data,"0")) or (!strcmp($total_data,"")) ){
	if(!strcmp($view3_search,"")){
		$no_data_text = "등록된 내용이 없습니다.";
	}else{
		$no_data_text = "검색 결과가 없습니다.";
	}
?>
	<p class="nodata t_center"><?=$no_data_text?></p>
<?
}else{
######################################################################################################################################################
?>
						<div id="menuInfoContainer" class="menu_info"<?if(isset($_REQUEST['idx']) == false){echo ' style="display:none"';}?>>
<?
	if(strcmp($_REQUEST['idx'],"")){
		$view3_idx = $_REQUEST['idx'];
		$top_sql = $main_sql." and view3_idx='".$view3_idx."'".$view_order;
		$out_top_sql = @mysql_query($top_sql);
		$top_list = @mysql_fetch_assoc($out_top_sql);
		view3_hit($view3_table, $view3_idx);
######################################################################################################################################################
// 이전글 다음글
######################################################################################################################################################
		$sort = view3_prev_next($view3_table,$view3_idx);
		$path_prev = view3_link("||idx","view&idx=".$temp_prev,"",$end_path);
		$path_next = view3_link("||idx","view&idx=".$temp_next,"",$end_path);
######################################################################################################################################################
		$top_option = view3_option(array($top_list['view3_file'],$top_list['view3_file_old'],$board),$top_list['view3_write_day'],$top_list['view3_notice'],$top_list['view3_main'],array($top_list["view3_code"],$top_list['view3_name']),array($top_list['view3_open'],$top_list['view3_close']));
		$next_command_01 = str_ireplace('<img', '<img onclick="hero_img(this);" style="cursor:pointer;"', view3_html($top_list['view3_command_01']));
?>

							<div class="slider-container">
								<ul class="slider-wrapper">
									<li class="slider-items">
										<div class="menu_img_area">
											<div class="menu_img"><?=str_replace('style="max-width:100%;" ','',$top_option['user_list']);?></div>
										</div>
										<div class="menu_txt_area">
											<p class="board_txt fs_xxl fc_bk menu_txt_title"><?=$top_list['view3_title_01'];?></p>
											<div class="board_txt menu_txt fs_l fc_gy"><?=$next_command_01;?></div>
										</div>
									</li>
								</ul>
							</div>
							<button type="button" id="menuInfoPrev" class="slider-btns slider-prev" data-idx="<?=$temp_prev;?>"<?if(!$temp_prev){echo ' style="display:none"';}?>>이전 페이지로 바로가기</button>
							<button type="button" id="menuInfoNext" class="slider-btns slider-next" data-idx="<?=$temp_next;?>"<?if(!$temp_next){echo ' style="display:none"';}?>>다음 페이지로 바로가기</button>
							<button type="button" id="menuInfoX" class="menu_close">메뉴 뷰페이지 닫기</button>
<?
	}
?>
						</div>
						<ul class="grid_list">
<?

######################################################################################################################################################
$sql = $main_sql.$view_order.' limit '.$start.','.$list_page.';';
$out_sql=@mysql_query($sql);
$count = @mysql_num_rows($out_sql);
$i = '0';
$temp_i='1';
while($list                             = @mysql_fetch_assoc($out_sql)){
######################################################################################################################################################
    $list_count = $total_data-$start-$i;//높은 숫자부터 출력
//	$option 종류 : file_icon[파일],new_icon[신규],notice[공지],main[메인노출],name[작성자],event,user_event_icon[시작일,종료일]
	$option = view3_option(array($list['view3_file'],$list['view3_file_old'],$board),$list['view3_write_day'],$list['view3_notice'],$list['view3_main'],array($list["view3_code"],$list['view3_name']),array($list['view3_open'],$list['view3_close']));
	$path_view = view3_link("||idx||select||search","view&select=".$view3_select."&search=".$view3_search."&idx=".$list['view3_idx'],"",$end_path);
	$view_href = ' onclick="location.href=\''.URL_PATH.'?'.$path_view.'\'" style="cursor:pointer;"';
######################################################################################################################################################
//	$next_command_01 = view3_html($list['view3_command_01']);
	$summary = cut($list['view3_command_01'], 126);
	$write_day = date("Y-m-d", strtotime($list['view3_write_day']));
######################################################################################################################################################
	$temp_file_arr = explode('||', $list['view3_file']);
	$temp_file = $root.'/upload/'.$board.$temp_file_arr[2];
?>
							<li class="<?if($i<"4"){echo 'mt_none';};if(!strcmp($temp_i,"1")){echo ' ml_none';}else if(!strcmp($temp_i,"4")){$temp_i="0";}?>" data-idx="<?=$list['view3_idx'];?>">
								<a href="#none">
									<div class="grid_img_area">
										<!-- <div class="grid_img"><?=str_replace('width="100%" ','',$option['user_list']);?></div> -->
										<div class="grid_img" style="background-image:url('<?=$temp_file?>')"></div>
										<div class="grid_ico">
											<?
											$special_01_array = explode("||",$list['view3_special_01']);
											if(in_array("1", $special_01_array)){
											?>
											<span class="menu_new_ico">NEW</span>
											<?
											}
											if(in_array("2", $special_01_array)){
											?>
											<span class="menu_best_ico">BEST</span>
											<?
											}
											?>
										</div>
									</div>
									<div class="grid_txt_area">
										<p class="board_txt fc_gy"><?=$list['view3_title_01'];?></p>
									</div>
									<div class="grid_hover_wrap">
										<span class="grid_hover_ico"></span>
									</div>
								</a>
							</li>
<?
$temp_i++;
$i++;
}
######################################################################################################################################################
?>
						</ul>
<?
if(strcmp($out_page,"")){
?>
						<ul class="paging">
							<?='';$out_page;?>
						</ul>
<?
}
######################################################################################################################################################
}
######################################################################################################################################################
?>
					</div>
				</div>

<script type="text/javascript" src="<?=BOARD?>/<?=$view3_skin?>/js/ResponsiveMenu.js"></script>
