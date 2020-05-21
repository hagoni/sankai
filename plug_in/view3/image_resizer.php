<?
/*
#최종 수정 2015-10-08 12:30

# 사용예시
	- 예시1
		1 :		$__code =  uniqid();
		2 :		$_SESSION[$__code] = $temp_file;
		3 :		$temp_url = $root."/plug_in/view3/image_resizer.php?width=990&height=660&type=".$filter_src."&quality=100&code=".$__code;

	- 3번째 줄 GET 값 설명
		width / height = 최대 크기 (비율에 맞게 알아서 조정됨)
		type = 구분자 || 로 부가 기능 지정가능 (reset : 파일을 다시 생성합니다) (grayscale : 그레이스케일 필터 효과)
	- 2번째 줄 설명
		$_SESSION[$__code] = DOCUMENT_ROOT 경로가 포함 되어 있지 않은 경로
		$temp_url  = 사용자에게 보여줄 이미지 경로

# 참고 사항
	1. 시스템 부하 방지를 위해 한번 실행되면 변환된 파일이 저장이 되서 다음부터는 저장된 사진을 불러옵니다.
		초기화 하고 싶을때는 type에 reset 을 주면 됩니다.
	2. 저장되는 기준은 지정한 이미지 크기/퀄리티/타입(reset 제외) 에 따라서 각각저장됩니다.

*/
//error_reporting(E_ALL);
session_start();
$OriginalImage = realpath($_SERVER['DOCUMENT_ROOT'].$_SESSION[$_GET['code']]);
if(!file_exists($OriginalImage)){
	//파일 없음
	exit;
}else{
	$Quality = !strcmp($_GET['quality'],'')?100:$_GET['quality'];
	$maxWidth = !strcmp($_GET['width'],'')?990:$_GET['width'];
	$maxHeight = !strcmp($_GET['height'],'')?660:$_GET['height'];
	if(!isset($_GET['type'])){
		$_GetType = '';
	}else{
		$_GetType = $_GET['type'];
		
	}
	$type = explode('||',$_GetType);
	$_GetTypeName='';
	if(count($type)>0){
		foreach($type as $type_name){
			if($type_name != 'reset')
			$_GetTypeName .= '_'.$type_name;
		}
	}
	$NewFile = $_SERVER['DOCUMENT_ROOT'].'/resampled/'.$maxWidth.'_'.$maxHeight.'_'.$Quality.$_GetTypeName.'/'.$_SESSION[$_GET['code']];

	if(file_exists($NewFile) && in_array('reset',$type)){
		unlink($NewFile);
	}
	if( !file_exists($NewFile)){
			$CopyDir = pathinfo($NewFile, PATHINFO_DIRNAME);
			if(!is_dir($CopyDir)){
				$temp_permission = 0755;
				@umask(0);
				if(!strcmp(substr(phpversion(),0,1),"4")){
					@mkdir($CopyDir,$temp_permission);
				}else{
					@mkdir($CopyDir,$temp_permission, true);
				}
			}
			if(!is_dir($CopyDir)){
				echo '!FOLDER';
				exit;//폴더생성 실패
			}else{
				if(!copy($OriginalImage,$NewFile)) {
					exit;//파일 복사 실패
				}else{
					$info = getimagesize($OriginalImage);
					switch($info['mime']){
						case 'image/jpeg':$image = imagecreatefromjpeg($OriginalImage);break;
						case 'image/png':$image = imagecreatefrompng($OriginalImage);break;
						case 'image/gif':$image = imagecreatefromgif($OriginalImage);break;
						default :exit();
					}
					list($origWidth, $origHeight) = getimagesize($OriginalImage);

					if ($maxWidth == 0){
						$maxWidth  = $origWidth;
					}

					if ($maxHeight == 0){
						$maxHeight = $origHeight;
					}
					// Calculate ratio of desired maximum sizes and original sizes.
					$widthRatio = $maxWidth / $origWidth;
					$heightRatio = $maxHeight / $origHeight;

					// Ratio used for calculating new image dimensions.
					$ratio = min($widthRatio, $heightRatio);

					// Calculate new image dimensions.
					$newWidth  = (int)$origWidth  * $ratio;
					$newHeight = (int)$origHeight * $ratio;

					// Create final image with new dimensions.
					$newImage = imagecreatetruecolor($newWidth, $newHeight);
					imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
					//흑백처리
					if(in_array("grayscale",$type)){
						$imgw = imagesx($newImage);
						$imgh = imagesy($newImage);
						for ($i=0; $i<$imgw; $i++)
						{
								for ($j=0; $j<$imgh; $j++)
								{

										// get the rgb value for current pixel

										$rgb = ImageColorAt($newImage, $i, $j); 

										// extract each value for r, g, b

										$rr = ($rgb >> 16) & 0xFF;
										$gg = ($rgb >> 8) & 0xFF;
										$bb = $rgb & 0xFF;

										// get the Value from the RGB value

										$g = round(($rr + $gg + $bb) / 3);

										// grayscale values have r=g=b=g

										$val = imagecolorallocate($newImage, $g, $g, $g);

										// set the gray value

										imagesetpixel ($newImage, $i, $j, $val);
								}
						}
					}
					switch($info['mime']){
						case 'image/jpeg': imagejpeg($newImage, $NewFile, $Quality);break;
						case 'image/png': imagepng($newImage, $NewFile, $Quality);break;
						case 'image/gif': imagegif($newImage, $NewFile, $Quality);break;
						default :exit();
					}
					imagedestroy($image);
					imagedestroy($newImage);
				}
			}
	}

	if( file_exists($NewFile) ){
		$info = getimagesize($NewFile);
		switch($info['mime']){
			case 'image/jpeg':$im = imagecreatefromjpeg($NewFile);break;
			case 'image/png':$im = imagecreatefrompng($NewFile);break;
			case 'image/gif':$im = imagecreatefromgif($NewFile);break;
			default :exit();
		}
		header('Content-type: '.$info['mime']);
		switch($info['mime']){
			case 'image/jpeg':imagejpeg($im);break;
			case 'image/png':imagepng($im);break;
			case 'image/gif':imagegif($im);break;
			default :exit();
		}
	}else{
		exit;//생성 오류
	}
}