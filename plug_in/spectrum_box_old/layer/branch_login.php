<div class="spectrumLayer">
	<div class="data">
		<div class="spectrumLoginLayer">
			<div class="titleArea">
				<p>로그인</p>
			</div>
			<div class="formArea">
				<dl>
					<dt><label for='formID'>아이디</label></dt>
					<dd><input type="text" id="formID" /></dd>
				</dl>
				<dl>
					<dt><label for='formPW'>비밀번호</label></dt>
					<dd><input type="password" id="formPW" /></dd>
				</dl>
			</div>
		</div>
	</div>
	<ul class="button">
		<li data-call="branch_join">회원가입</li>
		<li class="spectrumLoginAction" >로그인</li>
	</ul>
	<textarea class="script">
		$('body').on('click','.spectrumLoginAction',function(){
			spectrumProgressAction(true);
			$.ajax({
				cache: false,
				async: false,
				url : '/new/board/index.php?language=0&type=logout_check',
				data : { 'login_id' : $('#formID').val(), 'login_pw' : $('#formPW').val(), 'logout_check':'logout_check'},
				type : 'POST',
				error : function(){
					spectrumAlert('서버로 부터 응답을 받지 못 하였습니다.');
				},
				success : function(requests){
					var request = $(requests).find('.login_msg').text();
					if(request=='ok'){
						window.location.href='/new/board/index.php?board=branch_as_01';
					}else{
						spectrumAlert(request);
					}
				},
				complete : function(){
					spectrumProgressAction(false);
				}
			});
		});
		
		$('#formPW').keypress(function(e) {
			if (e.which == 13) {/* 13 == enter key@ascii */
				$('.spectrumLoginAction').trigger('click');
			}
		});
	</textarea>
</div>