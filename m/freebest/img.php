<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
define('_VIEW3BOARD_',TRUE);
@include_once														"../../view3.php";
######################################################################################################################################################
function gd_image_resize($img_file,$simg_name='', $simg_width='', $cut_height='', $type=''){
	if(!is_file($img_file)){return '원본 파일이 없습니다.';}
	$gd = gd_info();
	$gdver = substr(preg_replace("/[^0-9]/", "", $gd['GD Version']), 0, 1);
	if(!$gdver){return "GD 버젼체크 실패거나 GD 버젼이 1 미만입니다.";}
	list($img_width, $img_height, $img_type, $img_attr) = getimagesize($img_file);
######################################################################################################################################################
	$simg_height = $img_height * ($simg_width/$img_width);
	if(!strcmp($cut_height,"")){
		$cut_height = $simg_height;
	}else{
		$cut_height = $cut_height;
	}
	//축소하는 크기보다 이미지 높이가 낮을경우 축소되는 높이로 변경
	$widthRatio = $simg_width / $img_width;
	if( ($img_height*$widthRatio) >= $simg_height ){
		$cut_height = floor($img_height*$widthRatio);
	}
######################################################################################################################################################
	$temp_img_type = str_replace(".","",ext($img_file));
	$temp_img_type_exe = strtolower($temp_img_type['1']);
	if(!strcmp($temp_img_type_exe,"")){
		$img_type_check = $img_type;
	}else if(!strcmp($temp_img_type_exe,"gif")){
		$img_type_check = "1";
	}else if( (!strcmp($temp_img_type_exe,"jpg")) or (!strcmp($temp_img_type_exe,"jpge")) ){
		$img_type_check = "2";
	}else if(!strcmp($temp_img_type_exe,"png")){
		$img_type_check = "3";
/*
	}else if(!strcmp($temp_img_type_exe,"bmp")){
		$img_type_check = "6";
*/
	}else{
//		return "GIF,JPG,PNG,BMP 가 아닙니다.";
		return "GIF,JPG,PNG 가 아닙니다.";
		exit;
	}
######################################################################################################################################################
	if(!strcmp($img_type_check,"1")){
		$img_im = imagecreatefromgif($img_file);
	}else if(!strcmp($img_type_check,"2")){
		$img_im = imagecreatefromjpeg($img_file);
	}else if(!strcmp($img_type_check,"3")){
		$img_im = imagecreatefrompng($img_file);
	}else if(!strcmp($img_type_check,"6")){
		$img_im = imagecreatefromwbmp($img_file);
	}
######################################################################################################################################################
	if($gdver >= 2){
		$simg_im = imagecreatetruecolor($simg_width, $cut_height);
		imagecopyresampled($simg_im, $img_im, 0, 0, 0, 0, $simg_width, $simg_height,$img_width, $img_height);
	}else{
		$simg_im = imagecreate($simg_width, $cut_height);
		imagecopyresized($simg_im, $img_im, 0, 0, 0, 0, $simg_width, $simg_height,$img_width, $img_height);
	}
######################################################################################################################################################
	if($type=='grayscale'){
		$imgw = $simg_width;
		$imgh = $simg_height;
		for ($i=0; $i<$imgw; $i++){
			for ($j=0; $j<$imgh; $j++){
				$rgb = ImageColorAt($simg_im, $i, $j);
				$rr = ($rgb >> 16) & 0xFF;
				$gg = ($rgb >> 8) & 0xFF;
				$bb = $rgb & 0xFF;
				$g = round(($rr + $gg + $bb) / 3);
				$val = imagecolorallocate($simg_im, $g, $g, $g);
				imagesetpixel ($simg_im, $i, $j, $val);
			}
		}
	}
######################################################################################################################################################
	if(!strcmp($img_type_check,"1")){
		imagegif($simg_im,$simg_name);
	}else if(!strcmp($img_type_check,"2")){
		imagejpeg($simg_im,$simg_name,80);
	}else if(!strcmp($img_type_check,"3")){
		imagepng($simg_im,$simg_name);
	}else if(!strcmp($img_type_check,"6")){
		imagewbmp($simg_im,$simg_name);
	}
######################################################################################################################################################
	imagedestroy($img_im);
	imagedestroy($simg_im);
}
######################################################################################################################################################
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
######################################################################################################################################################
$temp_session_code = $_SESSION['img_code'][$_GET['code']];
$temp_width = $_GET['width'];
$temp_height = $_GET['height'];
$temp_type = $_GET['type'];
######################################################################################################################################################
$OriginalImage = @realpath(ROOT_INC.$temp_session_code);
if(@file_exists($OriginalImage)){
######################################################################################################################################################
	$temp_session_code_array = ext($temp_session_code);
	if(!strcmp($temp_height,"")){
		$NewFile = ROOT_INC.$temp_session_code_array['0']."_".$temp_width.$temp_session_code_array['1'];
	}else{
		$NewFile = ROOT_INC.$temp_session_code_array['0']."_".$temp_width."_".$temp_height.$temp_session_code_array['1'];
	}
	if(!strcmp($temp_type,"new")){
		@unlink($NewFile);
	}
######################################################################################################################################################
	$CopyDir = @pathinfo($NewFile, PATHINFO_DIRNAME);
	if(!is_dir($CopyDir)){//디렉토리가 없다면
		$temp_permission = 0755;
		@umask(0);
		if(!strcmp(substr(phpversion(),0,1),"4")){
			@mkdir($CopyDir,$temp_permission);
		}else{
			@mkdir($CopyDir,$temp_permission, true);
		}
	}
	if(strcmp($temp_session_code,"")){//코드가 있다면
######################################################################################################################################################
		if(@file_exists($NewFile) ){//이미 파일이 있다면
			$info = getimagesize($NewFile);

			if($info['0']<=$temp_width){//기준 넓이 보다 작다면 원본이미지를 보여준다.
				if(strcmp($temp_type,"")){
					gd_image_resize($OriginalImage,$NewFile, $info['0'],$temp_height,$temp_type);
					$temp_NewFile = $NewFile;
				}else{
					$temp_NewFile = $OriginalImage;
				}
			}else{
				$temp_NewFile = $NewFile;//
				gd_image_resize($OriginalImage,$NewFile, $temp_width,$temp_height,$temp_type);
			}
			switch($info['mime']){
				case 'image/jpeg':$im = imagecreatefromjpeg($temp_NewFile);break;
				case 'image/png':$im = imagecreatefrompng($temp_NewFile);break;
				case 'image/gif':$im = imagecreatefromgif($temp_NewFile);break;
				default :exit();
			}
			@header('Content-type: '.$info['mime']);
			switch($info['mime']){
				case 'image/jpeg':imagejpeg($im);break;
				case 'image/png':imagepng($im);break;
				case 'image/gif':imagegif($im);break;
				default :exit();
			}
		}else{//파일이 없다면
			$temp_org_img = getimagesize($OriginalImage);
			if($temp_org_img['0']<=$temp_width){//기준 넓이 보다 작다면 원본이미지를 보여준다.
				if(strcmp($temp_type,"")){
					gd_image_resize($OriginalImage,$NewFile, $temp_org_img['0'],$temp_height,$temp_type);
					$temp_NewFile = $NewFile;
				}else{
					$temp_NewFile = $OriginalImage;
				}
			}else{
				$temp_NewFile = $NewFile;//
				gd_image_resize($OriginalImage,$NewFile, $temp_width,$temp_height,$temp_type);
			}
			$info = getimagesize($temp_NewFile);
			switch($info['mime']){
				case 'image/jpeg':$im = imagecreatefromjpeg($temp_NewFile);break;
				case 'image/png':$im = imagecreatefrompng($temp_NewFile);break;
				case 'image/gif':$im = imagecreatefromgif($temp_NewFile);break;
				default :exit();
			}
			@header('Content-type: '.$info['mime']);
			switch($info['mime']){
				case 'image/jpeg':imagejpeg($im);break;
				case 'image/png':imagepng($im);break;
				case 'image/gif':imagegif($im);break;
				default :exit();
			}
		}
######################################################################################################################################################
	}
}
?>