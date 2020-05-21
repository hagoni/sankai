    <!-- bottom_inq start -->
    <div class="bot_inquiry">
    <div class="form_area">
        <form method="post" action="<?=$pc;?>/sms/sms_trans.php" id="directSms" class="form">
            <input type="hidden" name="send" value="right">
            <fieldset class="input_fs">
                <div class="clearfix">
                    <div class="over_h">
                        <a href="tel:18009873" class="bot_inq_tel"><img src="<?=$root?>/img/common/bot_inq_tel.png" alt="가맹문의 1800-9873" class="w100"></a>
                        <div class="type_chk f_right">
                            <input type="checkbox" name="chk_sms_agree" id="chk_sms_agree0">
                            <label for="chk_sms_agree0" class="chk_label">개인정보수집 동의</label>
                            <p class="check_p">
                                <a href="#none" class="bindPolicyModalOpen" data-type="3">개인정보취급방침</a> 동의
                            </p>
                        </div>
                    </div>
                    <div class="type_txt f_left">
                        <label for="name1">이름</label>
                        <input type="text" name="name" id="name1" class="labeling" autocomplete="off">
                    </div>
                    <div class="type_txt f_left">
                        <label for="hp1">연락처</label>
                        <input type="text" name="hp" id="hp1" class="labeling" autocomplete="off" onkeyup="hero_key(this,1);">
                    </div>
                    <button type="submit" class="bindSmsSubmit btn_send f_left">보내기</button>
                </div>
            </fieldset>
        </form>
    </div>
    </div>
    <!-- //bottom_inq end -->
    <!-- footer start -->
    <div class="footer_wrap">
        <footer class="t_center">
            <ul class="policy fs_def">
                <li><a href="#none" class="bindPolicyModalOpen" data-type="0">개인정보처리방침</a></li>
                <li><a href="#none" class="bindPolicyModalOpen" data-type="1">이메일무단수집거부</a></li>
            </ul>
            <address>
                (주) SND CPR     대표자 : 김성철     대표번호 : 1800-9873<br>
                사업자등록번호 : 128-87-08806<br>
                주소 : 경기 고양 일산서구 킨텍스로 240,<br>
                오피스동 1205호, 1206호(대화동, 킨텍스꿈에그린)
            </address>
            <p class="copy">COPYRIGHT 2020 산카이 ALL RIGHTS RESERVED.</p>
        </footer>
    </div>
    <!-- //footer end -->
