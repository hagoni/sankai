    <!-- footer start -->
    <div class="footer_wrap bg">
        <div class="footer inner_1500 in_1500 over_h">
            <div class="ft_left f_left">
                <ul class="policy fs_def">
                    <li><a href="#none" class="bindPolicyModalOpen" data-type="0">개인정보처리방침</a></li>
                    <li><a href="#none" class="bindPolicyModalOpen" data-type="1">이메일무단수집거부</a></li>
                    <li><a href="<?=$root?>/board/index.php?board=map_01&sca=all">매장안내</a></li>
                    <li><a href="<?=$root?>/html/fran.html">창업안내</a></li>
                </ul>
                <p class="address">
                    (주) SND CPR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대표자 : 김성철&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대표번호 : 1800-9873&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사업자등록번호 : 128-87-08806<br>
                    경기 고양 일산서구 킨텍스로 240 오피스동 1205호, 1206호(대화동, 킨텍스꿈에그린)
                </p>
            </div>
            <div class="ft_right f_right t_right">
                <p class="ft_inq">가맹문의 1800.9873</p>
                <p class="copy">COPYRIGHT 2020 산카이 ALL RIGHTS RESERVED.</p>
            </div>
        </div>
    </div>
    <!-- //footer end -->

    <!-- 가맹문의 바 start -->
    <div class="inquiry_bar br_inquiry_bnr">
    	<div class="inner_1200 clearfix">
    		<form method="post" action="<?=$root?>/sms/sms_trans.php" class="bnr_inquiry" id="directSms1">
    			<input type="hidden" name="send" value="right">
    			<fieldset>
    				<legend class="indent">감성커피 가맹상담문의</legend>
    				<div class="clearfix">
    					<div class="type_tel f_left"><img src="<?=$root?>/img/common/inq_tel.png" alt="가맹문의 02-401-1966"></div>
    					<div class="type_txt type_tags f_left">
    						<label for="name0" class="type_txt_label">성함</label>
    						<input type="text" name="name" id="name0" class="input_name sms_name labeling" autocomplete="off">
    					</div>
    					<div class="type_txt type_tags f_left">
    						<label for="hp0" class="type_txt_label">전화번호</label>
    						<input type="text" name="hp" id="hp0" class="input_phone sms_phone labeling" autocomplete="off">
    					</div>
    					<div class="type_select type_tags f_left">
    						<select name="special_03" id="iqr_special" class="legion">
    							<option value="">가맹희망지역</option>
    							<option value="서울">서울</option>
    							<option value="부산">부산</option>
    							<option value="대구">대구</option>
    							<option value="인천">인천</option>
    							<option value="광주">광주</option>
    							<option value="대전">대전</option>
    							<option value="울산">울산</option>
    							<option value="세종">세종</option>
    							<option value="경기">경기</option>
    							<option value="강원">강원</option>
    							<option value="충북">충북</option>
    							<option value="충남">충남</option>
    							<option value="전북">전북</option>
    							<option value="전남">전남</option>
    							<option value="경북">경북</option>
    							<option value="경남">경남</option>
    							<option value="제주">제주</option>
    						</select>
    					</div>
    					<div class="type_chk fs_def f_left">
    						<input type="checkbox" id="chk_sms_agree0" name="chk_sms_agree">
    						<label for="chk_sms_agree0" class="chk_label"><a href="#none" class="btn_policy bindPolicyModalOpen" data-type="3">개인정보취급방침</a><br>동의하기</label>
    					</div>
    					<button type="submit" class="bindSmsSubmit btn_send f_right">문의하기</button>
    				</div>
    			</fieldset>
    		</form>
    	</div>
    </div>
    <!-- //가맹문의 바 end -->

    <!-- 하단 가맹문의 바 start -->
    <div class="br_btns_wrap">
    	<a href="#none" class="br_btn_top">TOP</a>
    	<a href="#none" class="br_btn_inq btn_scroll">가맹문의 버튼</a>
    </div>
