<?
######################################################################################################################################################
//HERO BOARD 시작 (개발자 : 이진영)
######################################################################################################################################################
define('_HEROBOARD_', TRUE);
@include_once														"../../view3.php";
######################################################################################################################################################
######################################################################################################################################################
//HERO BOARD 시작 (개발자 : 이진영)
######################################################################################################################################################
//if(!defined('_HEROBOARD_'))exit;
######################################################################################################################################################
@include_once(ROOT_INC.'/plug_in/punycode/idna_convert.class.php');
function punycode($temp_data = null,$temp_type = null){
	$punycode_data = new idna_convert();
	if( (isset($temp_data)) and (!strcmp($temp_type,"")) ){
		$encoded = isset($temp_data) ? stripslashes($temp_data) : '';
		$decoded = $punycode_data->decode($encoded);
	}
	if( (isset($temp_data)) and (strcmp($temp_type,"")) ){
		$decoded = isset($temp_data) ? stripslashes($temp_data) : '';
		$encoded = $punycode_data->encode($decoded);
	}
	return $encoded;
}
echo punycode("생활커피.com/landing/");
/*
$IDN = new idna_convert();

}
if (isset($_REQUEST['decode'])) {
    $encoded = isset($_REQUEST['encoded']) ? stripslashes($_REQUEST['encoded']) : '';
    $decoded = $IDN->decode($encoded);
}
if (isset($_REQUEST['lang'])) {
    if ('de' == $_REQUEST['lang'] || 'en' == $_REQUEST['lang']) $lang = $_REQUEST['lang'];
    $add .= '<input type="hidden" name="lang" value="'.$_REQUEST['lang'].'" />'."\n";
} else {
    $lang = 'en';
}
*/
?>