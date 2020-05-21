<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
$server_path = realpath(__FILE__);
$server_filename = basename(__FILE__);
if(!strcmp(realpath(__DIR__),"")){
	$temp_root_m_inc                                                = substr(str_replace($server_filename, "", $server_path),"0","-1");
}else{
	$temp_root_m_inc                                                = realpath(__DIR__);
}
######################################################################################################################################################
$temp_domain = $HTTP_SERVER_VARS['HTTP_HOST'];
$temp_host = @explode(".",$temp_domain);
if(!strcmp($temp_host['0'],"m")){
	//모바일
//	$temp_root_m                                                    = "/m";
	$temp_root_m                                                    = str_replace(BASE_INC, "", $temp_root_m_inc);
//	$temp_domain                                                    = str_replace($temp_host['0'].".", "", $temp_domain);
	$temp_domain                                                    = substr($temp_domain,'2');//모바일 쓴다면 글씨 길이많금 
	$temp_domain_m                                                  = $temp_domain;
}else{
	//pc
	$temp_root_m                                                    = str_replace(BASE_INC, "", $temp_root_m_inc);
	$temp_domain                                                    = $temp_domain;
	$temp_domain_m                                                  = "m.".$temp_domain;
}
$temp_view3_root_array = explode("/",str_replace(root_inc."/","",$_SERVER[SCRIPT_FILENAME]));
if(!strcmp(in_array("branch",$temp_view3_root_array),"1")){//모바일
	$temp_root_m = $temp_root_m."/branch";
//	$temp_root_branch = $temp_root_m."/branch";
};
if(!strcmp(in_array("branch2",$temp_view3_root_array),"1")){//모바일
	$temp_root_m = $temp_root_m."/branch2";
//	$temp_root_branch = $temp_root_m."/branch";
};
define('ROOT_M',                                                    $temp_root_m,TRUE);
define('ROOT_M_INC',                                                BASE_INC.ROOT_M,TRUE);
/*
define('ROOT_BRANCH',                                               $temp_root_branch,TRUE);
define('ROOT_BRANCH_INC',                                           TOP_INC.ROOT_BRANCH,TRUE);
*/
define('DOMAIN',                                                    $temp_domain,TRUE);
define('DOMAIN_M',                                                  $temp_domain_m,TRUE);
define('PC_FILE',                                                   DOMAIN.ROOT,TRUE);
define('PC_UPLOAD',                                                 DOMAIN.ROOT."/upload",TRUE);

//define('PC_FILE',                                                   DOMAIN.ROOT,TRUE);
//define('PC_UPLOAD',                                                 DOMAIN.ROOT."/upload",TRUE);
######################################################################################################################################################
?>