<?php 
$source_file = $_SERVER['DOCUMENT_ROOT'].$_GET['src'];
$type = $_GET['type'];
if(!is_file($source_file)){
	exit();
}
$info = getimagesize($source_file);
switch($info['mime']){
	case 'image/jpeg':$im = imagecreatefromjpeg($source_file);break;
	case 'image/png':$im = imagecreatefrompng($source_file);break;
	case 'image/gif':$im = imagecreatefromgif($source_file);break;
	default :exit();
}
$imgw = imagesx($im);
$imgh = imagesy($im);

if($type=='grayscale'){
	for ($i=0; $i<$imgw; $i++)
	{
			for ($j=0; $j<$imgh; $j++)
			{

					// get the rgb value for current pixel

					$rgb = ImageColorAt($im, $i, $j); 

					// extract each value for r, g, b

					$rr = ($rgb >> 16) & 0xFF;
					$gg = ($rgb >> 8) & 0xFF;
					$bb = $rgb & 0xFF;

					// get the Value from the RGB value

					$g = round(($rr + $gg + $bb) / 3);

					// grayscale values have r=g=b=g

					$val = imagecolorallocate($im, $g, $g, $g);

					// set the gray value

					imagesetpixel ($im, $i, $j, $val);
			}
	}
}
if($type == 'circle'){
	$newwidth = 285;
	$newheight = 285;
	$image = imagecreatetruecolor($newwidth, $newheight);
	imagealphablending($image,true);
	imagecopyresampled($image,$im,0,0,0,0,$newwidth,$newheight,$imgw,$imgh);
	
	// create masking
	$mask = imagecreatetruecolor($imgw, $imgh);
	$mask = imagecreatetruecolor($newwidth, $newheight);
	
	$transparent = imagecolorallocate($mask, 255, 0, 0);
	imagecolortransparent($mask, $transparent);
	
	imagefilledellipse($mask, $newwidth/2, $newheight/2, $newwidth, $newheight, $transparent);

	$red = imagecolorallocate($mask, 0, 0, 0);
	imagecopy($image, $mask, 0, 0, 0, 0, $newwidth, $newheight);
	imagecolortransparent($image, $red);
	imagefill($image,0,0, $red);
	$im = $image;
}
header('Content-type: '.$info['mime']);
switch($info['mime']){
	case 'image/jpeg':imagejpeg($im);break;
	case 'image/png':imagepng($im);break;
	case 'image/gif':imagegif($im);break;
	default :exit();
}
