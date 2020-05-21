    <!-- header start -->
    <header id="navigation" class="header">
        <div class="header_inner">
            <button type="button" class="btn_stm bindSitemapSpread">사이트맵</button>
            <h1 class="logo"><a href="<?=$root?>/">HOME</a></h1>
            <a href="tel:1800-9873" class="btn_inq" onclick="mobConv_CALL()">가맹문의 전화번호</a>
        </div>
    </header>
    <!-- //header end -->
<!-- Enliple Tracker v3.6 [결제전환] start -->
<script src="https://cdn.megadata.co.kr/js/en_script/3.6/enliple_min3.6.js"></script>
<script type="text/javascript">
<!--
function mobConv_CALL() {
    var cn = new EN();
    cn.setData("uid", "sndcpr");
    cn.setData("ordcode", "");
    cn.setData("qty", "1");
    cn.setData("price", "1");
    cn.setData("pnm", encodeURIComponent(encodeURIComponent("call")));
    cn.setSSL(true);
    cn.sendConv();
}
//-->
</script>
<!-- Enliple Tracker v3.6 [결제전환] end -->
