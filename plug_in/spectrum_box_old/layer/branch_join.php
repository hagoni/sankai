<div class="spectrumLayer">
	<div class="data">
		<div class="spectrumJoinLayer">
			<div class="titleArea">
				<p>회원가입</p>
			</div>
			<div class="formArea">
<form name="fwrite7" method="post" action="/new/board/index.php?board=member&type=action_member&skin=root" accept-charset="UTF-8" onsubmit="return false;" enctype="multipart/form-data">
	<input type="hidden" name="board" value="member">
	<input type="hidden" name="url" value="ajax">
	<input type="hidden" name="prikey" value="<?=uniqid();?>">
	<input type="hidden" name="file_save_type" value="drop"><!--null값은 기본 null이아니면 파일이 자동으로 축소되어 업로드된다-->
	<input type="hidden" name="editor_data">
	<input type="hidden" name="inquiry_action" value="ok">
	<div id="goto_content" class="viewTop">
		<table class="view_table" summary="이 표는 글쓰기 기능을 하며 글쓴이, 비밀번호, 이메일, 제목, 내용, 첨부파일로 구성되어 있습니다.">
			<colgroup>
				<col width="15%">
				<col width="85%">
			</colgroup>
			<tbody>
				<tr>
					<th scope="col"><span>*</span> <label for="id">아이디</label></th>
					<td class="writeTitle">
						<input type="hidden" name="drop" value="drop||id||pw||board||skin||url||prikey||editor_data||file_save_type||x||y||inquiry_action||pw_next">
						<input type="text" name="id" id="id" autocomplete="false" required="required" class="w_20p" onkeyup="hero_key(this,3);" maxlength="20" onblur="reg_mb_id_check();">
						&nbsp;&nbsp;&nbsp;<span id="msg_mb_id" class="note" style="color: blue;">사용하셔도 좋은 아이디 입니다.</span>
					</td>
				</tr>
				<tr>
					<th scope="col"><span>*</span> <label for="pw">패스워드</label></th>
					<td class="writeTitle">
						<input type="password" name="pw" id="pw" autocomplete="false" required="required" class="w_20p">
					</td>
				</tr>
				<tr>
					<th scope="col"><span>*</span> <label for="pw_next">패스워드 확인</label></th>
					<td class="writeTitle">
						<input type="password" name="pw_next" id="pw_next" autocomplete="false" required="required" class="w_20p">
					</td>
				</tr>
				<tr>
					<th scope="col"><span>*</span> <label for="nick">직책</label></th>
					<td class="writeTitle">
						<input type="text" name="nick" id="nick" autocomplete="false" required="required" class="w_20p">
					</td>
				</tr>
				<tr>
					<th scope="col"><span>*</span> <label for="name">이름</label></th>
					<td class="writeTitle">
						<input type="text" name="name" id="name" autocomplete="false" required="required" class="w_20p">
					</td>
				</tr>
<!--
				<tr>
					<th scope="col"><label for="special_09">금액제한</label></th>
					<td class="writeTitle">
						<input type="text" name="special_09" id="special_09" autocomplete="false" class="w_20p" onkeyup="hero_key(this,1);" style="text-align:right"/> 원
					</td>
				</tr>
-->
				<tr>
					<th scope="col"> <label for="email">이메일</label></th>
					<td class="writeTitle">
						<input type="text" name="email" id="email" autocomplete="false" class="w_20p">
					</td>
				</tr>
				<tr>
					<th scope="col"><span>*</span> <label for="hp">핸드폰</label></th>
					<td class="writeTitle">
						<input type="text" name="hp" id="hp" autocomplete="false" required="required" class="w_20p" onkeyup="hero_key(this,1);">
					</td>
				</tr>
				<tr>
					<th scope="col"><label class="addr_search">매장주소</label></th>
					<td class="writeTitle">
						<br>&nbsp;
						<span class="inputTitle"><label for="addr_post_01">우편번호</label></span><br>
						<input type="text" name="addr_post_01" id="addr_post_01" autocomplete="false" class="w_50px" onkeyup="hero_key(this,1);if(this.value.length >= 4)addr_post_02.focus();"> -
						<input type="text" name="addr_post_02" id="addr_post_02" autocomplete="false" class="w_50px" onkeyup="hero_key(this,1);">
						&nbsp;&nbsp;<button class="addr_search board_button">주소검색</button>
						<br>
						<br>
						<span class="inputTitle"><label for="addr_road">도로명주소</label></span>
						<br>
						<input type="text" name="addr_road" id="addr_road" autocomplete="false" class="w_50p">
						<br>
						<br>
						<span class="inputTitle"><label for="addr_number">지번 주소</label></span>
						<br>
						<input type="text" name="addr_number" id="addr_number" autocomplete="false" class="w_50p">
						<br>
						<br>
						<span class="inputTitle"><label for="addr_detail">상세 주소</label></span>
						<br>
						<input type="text" name="addr_detail" id="addr_detail" autocomplete="false" class="w_50p">
						<br>&nbsp;
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 글쓰기 버튼 시작 -->
		<div class="writeBtn over_h">
			<!-- 글쓰기, 목록 -->
			<!--
			<div class="f_right">
				<input type="button" value="등록" onclick="javascript:view3_submit(this.form);" class="board_button">
				<a href="/new/admin/index.php?group=bbs&amp;group_sub=24&amp;select=&amp;search=&amp;type=list&amp;now_date=pOQQJ"><span>목록</span></a>
			</div>
			-->
			<!-- //글쓰기, 목록 -->
		</div>
		<!-- //글쓰기 버튼 끝 -->
	</div>
</form>
<!--
				<div class="subTitle">기본 정보</div>
				<dl>
					<dt><label for='formID'>아이디</label></dt>
					<dd><input type="text" id="formID" /></dd>
				</dl>
				<dl>
					<dt><label for='formPW'>비밀번호</label></dt>
					<dd><input type="password" id="formPW" /></dd>
				</dl>
				<dl>
					<dt><label for='formNick'>직책</label></dt>
					<dd><input type="text" id="formNick" /></dd>
				</dl>
				<dl>
					<dt><label for='formName'>이름</label></dt>
					<dd><input type="text" id="formName" /></dd>
				</dl>
				<dl>
					<dt><label for='formEmail'>이메일</label></dt>
					<dd><input type="text" id="formEmail" /></dd>
				</dl>
				<dl>
					<dt><label for='formHP'>핸드폰</label></dt>
					<dd><input type="text" id="formHP" /></dd>
				</dl>
				<div class="subTitle">매장 주소</div>
				<dl>
					<dt><label for='addr_post_01'>우편번호</label></dt>
					<dd>
						<input type="text" id="addr_post_01" class="number" />
							&nbsp;-&nbsp;
						<input type="text" id="addr_post_01" class="number" />
					</dd>
				</dl>
				<dl>
					<dt><label for='addr_post_02'>도로명주소</label></dt>
					<dd><input type="text" id="addr_post_02" /></dd>
				</dl>
				<dl>
					<dt><label for='addr_road'>지번 주소</label></dt>
					<dd><input type="text" id="addr_road" /></dd>
				</dl>
				<dl>
					<dt><label for='addr_detail'>상세 주소</label></dt>
					<dd><input type="text" id="addr_detail" /></dd>
				</dl>
-->
			</div>
		</div>
	</div>
	<ul class="button">
		<li data-call="branch_login">로그인</li>
		<li class="spectrumJoinAction" >회원가입</li>
	</ul>
	<textarea class="script">
		$('.addr_search').click(function(e){
			window.open('/new/admin/view3_map_01/postcode.php?fname=fwrite7&geocode=off', 'postcode', 'width=500, height=600, left=150, top=100');
		});
		function view3_submit(f) {
				for(var i=0; i<f.length; i++) {
					if(!f[i].value && f[i].attributes['required']) {
						f[i].focus();
						spectrumAlert('필수입력항목을 빠짐 없이 입력해주세요.');
						return false;
					}
				}
				return true;
		}
		window.hero_key = function(obj,temp_key){
			str = new String(obj.value);
			if(temp_key==""){
			}else if(temp_key=="1"){//숫자만
				obj.style.imeMode = "disabled";
				obj.value = str.replace(/[^0-9]/g,'');
			}else if(temp_key=="2"){//영어만
				obj.style.imeMode = "disabled";
				obj.value = str.replace(/[^a-zA-Z]/g,'');
			}else if(temp_key=="3"){//숫자+영어만
				obj.style.imeMode = "disabled";
		//        obj.value = str.replace(/[^0-9a-zA-Z]/g,'');
				obj.value = str.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
			}
		}
		window.reg_mb_id_check = function() {
			$.ajax({
				type: 'POST',
				url: '/new/admin/view3_member_00/check.php',
				data: {
					'temp_id': encodeURIComponent($('#id').val())
				},
				cache: false,
				async: false,
				success: function(result) {
					var msg = $('#msg_mb_id');
					switch(result) {
						case '111' : msg.html('사용할 수 없는 아이디 입니다.').css('color', 'red'); break;
						case '000' : msg.html('사용하셔도 좋은 아이디 입니다.').css('color', 'blue'); break;
						default : msg.html('사용할 수 없는 아이디 입니다.').css('color', 'red'); break;
					}
				}
			});
		}
		$('.spectrumJoinAction').click(function(){
			if(!view3_submit($('[name="fwrite7"]')[0])){
				return false;
			}
			var _form = $('[name="fwrite7"]');
			$.ajax({
				url : _form.attr('action'),
				data : _form.serialize(),
				type : 'POST',
				error  : function(){
					spectrumAlert('서버로 부터 응답을 받지 못 하였습니다.');
				},
				success : function(response){
					var request = $(response).find('.ajax_msg').text();
					if(request=='ok'){
						spectrumAlert("가입이 완료되었습니다.\n심사후 결과를 통보 해드리겠습니다");
						spectrumLayer('branch_login');
					}else{
						if(request!==''){
							spectrumAlert(request);
						}else{
							spectrumAlert('서버로 부터 응답을 받지 못 하였습니다..');
						}
					}
				}
			});
		});
	</textarea>
</div>