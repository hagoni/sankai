<?
function curl_get($url) {
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	$return = curl_exec($curl);
	curl_close($curl);
	return $return;
}
exit(curl_get('http://www.youtube.com/oembed?url=http%3A//www.youtube.com/watch?v%3D'.$_POST['code'].'&format=json'));
?>