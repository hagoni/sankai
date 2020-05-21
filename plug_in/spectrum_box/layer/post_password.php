<div class="spectrumLayer">
	<div class="data">
		<div class="spectrumPrivatePostPasswordLayer">
			<div class="titleArea">
				<p class="title1"><span>PASSWORD</span></p>
			</div>
			<div class="textArea1">
					<input type="password" class="private_password_input" placeholder="비밀번호를 입력해주세요"/>
					<a href="#private_password_action" class="private_password_btn">인증</a>
			</div>
		</div>
	</div>
	<ul class="button">
		<!--<li class="spectrumPassAction" >확인</li>-->
	</ul>
	<textarea class="script">
		$('.private_password_btn').unbind();
		$('.private_password_btn').click(function(e){
			if($('.private_password_input').val().length < 1){
				alert('비밀번호를 입력해주세요');
				return false;
			}
			$('<form class="1n1_submit_forn" method="<?=$_POST['method'];?>" action="<?=$_POST['action'];?>"><input type="hidden" name="pw" value="'+$('.private_password_input').val()+'" /></form>').appendTo('body');
			var $form =$('.1n1_submit_forn').last();
			<?
			if(strcmp($_POST['hidden_data'],"")){
				$post_key_val = explode('[||]',$_POST['hidden_data']);
				foreach($post_key_val as $key_val_data){
					$key_val = explode('[==]',$key_val_data);
			?>
				$form.append('<input type="hidden" name="<?=$key_val[0];?>" value="<?=$key_val[1];?>" />');
			<?
				}
			}
			?>
			$form.submit();

			e.preventDefault();
		});
	</textarea>
</div>