<div class="spectrumLayer">
	<div class="data">
		<div class="spectrumInfoLayer">
			환영합니다.
		</div>
	</div>
	<ul class="button">
		<li class="spectrumGoBranchAction">점주 페이지</li>
		<li class="spectrumLogoutAction" >로그아웃</li>
	</ul>
	<textarea type="text/javascript" class="script">
		$('.spectrumGoBranchAction').click(function(){
			window.location.href='/new/board/index.php?board=branch_as_01';
		});
		$('.spectrumLogoutAction').click(function(){
			$.ajax({
				url:'/new/admin/index.php?board=out',
				error:function(){
					spectrumAlert('서버로부터 응답을 받지 못 하였습니다');
				},
				success : function(){
					spectrumAlert('로그아웃 되었습니다.');
					setTimeout(function(){
						window.location.href='/new';
					},1500);
				}
			});
		});
	</textarea>
</div>