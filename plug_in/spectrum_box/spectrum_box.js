//Ver 1.2

(function($) {
	var spectrumInstallHTML;
	window.SpectrumBox = function(){
		var _this = this;
		this.reset = function(){
				$('.spectrum_pop, .spectrum_content_wrap, .spectrum_content').css({'width':'auto','height':'auto'});
				$('.spectrum_content').html('');
				$('.spectrum_button ul').html('');
		}
		this.initialize = function(){
			if(typeof Spectrum_install !== true){
				window.Spectrum_dir = CONST_ROOT+'/plug_in/spectrum_box';
				var spectrumInstallHTML = ''
													+'<div class="spectrum_box_wrap" style="display:none;">'
													+'		<div class="spectrum_pop">'
													+'			<div class="spectrum_close spectrumEvent" data-event="close">X</div>'
													+'			<div class="spectrum_content_wrap">'
													+'				<div class="spectrum_progress" style="display:none;"><img src="'+Spectrum_dir+'/image/progressbar.gif" width="50" height="17" /></div>'
													+'				<div class="spectrum_alert" style="display:none;"></div>'
													+'				<div class="spectrum_content" style="width:auto;height:auto;"></div>'
													+'			</div>'
													+'			<div class="spectrum_button"><ul style="top:-100px"></ul></div>'
													+'		</div>'
													+'</div>'
													;
				window.Spectrum_install = true;
				window.Spectrum_open = false;
				window.Spectrum_content_width = 0;
				window.Spectrum_content_height = 0;
				$('body').append(spectrumInstallHTML);
				window.Spectrum_button_spacing = $('.spectrum_close').height() + $('.spectrum_button').height()+4;
			}
			$(document).ready(function(){
				$('body').on('click','.spectrumEvent',function(){//이벤트 제어
					var
							__this = $(this),
							__event = __this.data('event')
						;
					if(__event=='open'){//열기
						if(typeof __this.data('layercode') !== 'string'){
							var layercode = '';
						}else{
								var layercode = __this.data('layercode');
						}
						_this.view('open', layercode, __this.data());
					}
					if(__event=='close'){//닫기
						_this.view('close');
					}
				});
				$('body').on('click','.spectrum_button li[data-call]',function(){//이벤트 제어
					var
							__this = $(this),
							__call = __this.data('call')
						;
						_this.layer(__call);
				});
			});
		}
		window.spectrumProgressAction = function(condition){
			if(condition){
				$('.spectrum_progress').show();
			}else{
				$('.spectrum_progress').hide();
			}
		}
		window.spectrumAlert = function(_msg){
			$('.spectrum_alert').html(_msg).fadeIn(350);
			setTimeout(function(){
				$('.spectrum_alert').fadeOut(450).delay(450).slideUp(450);
			},2000);
		}
		window.spectrumLayer = function(layercode){
			_this.layer(layercode);
		}
		this.layer = function(layercode,post_data){
			if(typeof post_data !== "object"){
				var post_data = {};
			}
			$('.spectrum_button ul').animate({'top':0-($('.spectrum_button ul li').outerHeight()+100)},{
				'duration':100,
				'complete':function(){
					$.ajax({
						url : Spectrum_dir+'/layer/'+layercode+'.php',
						type : 'POST',
						data : post_data,
						before : function(){
							spectrumProgressAction(true);
						},
						'cache' : false,
						error : function(){
							alert('서버로부터 응답을 받을 수 없습니다.');
						},
						success : function(response){
							if(!Spectrum_open){
								$('.spectrum_content_wrap').css({'height':0});
							}
							$('.spectrum_button ul').html($(response).find('.button').html());
							$('.spectrum_content').html($(response).find('.data').html());
								
								eval($(response).find('.script').text());
								if(!Spectrum_open){
									var backWidth = $('.spectrum_content')[0].scrollWidth;
									$('.spectrum_content_wrap').css({'width':0});
								}
								var 
									_width =  $('.spectrum_content')[0].scrollWidth,
									_height =  $('.spectrum_content')[0].scrollHeight
									;
								if(!Spectrum_open){
									$('.spectrum_content').width(backWidth);
								}
								Spectrum_content_width = _width;
								Spectrum_content_height = _height;
								$('.spectrum_content').hide();
								if(!Spectrum_open){
									$('.spectrum_content_wrap').css({'width':0});
								}
								$('.spectrum_content_wrap').animate({'width':_width,'height' : _height},{
									'duration':450,
									'step':function(){
										$('.spectrum_pop').trigger('resized');
									},
									complete : function(){
										$('.spectrum_pop').trigger('resized');
										$('.spectrum_button ul').animate({'top':0},{'duration':250});
										$('.spectrum_content').fadeIn(450);
										/*
										$('.spectrum_content_wrap').animate({'height' : _height},{
											'duration':450,
											'step':function(){
												$('.spectrum_pop').trigger('resized');
											},
											complete : function(){
											}
										});
										*/
									}
								});
						},
							
						error : function(){
							alert('시스템 오류가 발생하였습니다.');
						},
						complete : function(){
							spectrumProgressAction(false);
							Spectrum_open = true;
						}
					});
				}});		}
		this.view = function(mode, layercode, post_data){
			if(mode=='open'){
				$('.spectrum_box_wrap').fadeIn(450);
				$('.spectrum_pop').unbind('resized').on('resized',function(){
					if( $(window).height() < (Spectrum_button_spacing+Spectrum_content_height) ){
						$('.spectrum_content_wrap').height($(window).height() - (Spectrum_button_spacing));
						$('.spectrum_content_wrap').css({'overflow-y':'scroll'});
						$(this).css({'height':'100%'});
					}else if($(this).height() == $(window).height()){
						//$('.spectrum_content_wrap').height(Spectrum_content_height-4);
						$('.spectrum_content_wrap').css({'overflow-y':'hidden','height':Spectrum_content_height});
						$(this).css({'height':'auto'});
					}
					if( $(window).width() < (Spectrum_button_spacing+Spectrum_content_width) ){
						$('.spectrum_content_wrap').width($(window).width());
						$('.spectrum_content_wrap').css({'overflow-x':'scroll'});
						$(this).css({'width':'100%'});
					}else if($(this).width() == $(window).width()){
						$('.spectrum_pop').css({'width':Spectrum_content_width});
						//$('.spectrum_content_wrap').width(Spectrum_content_width);
						$('.spectrum_content_wrap').css({'overflow-x':'hidden','width':Spectrum_content_width});
						$(this).css({'width':'auto'});
					}
					$('.spectrum_pop').width($('.spectrum_content_wrap').width());
					$(this).css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2)));
					$(this).css("right", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2)));
				});
				$('.spectrum_pop').css({'margin-top':$(window).height()});
				$('.spectrum_pop').animate({'margin-top':0},{
					duration : 550,
					complete : function(){
						_this.layer(layercode,post_data);
						if($('.spectrum_box_wrap').css('position') == 'absolute'){
							var body = $("html, body");
							body.stop().animate({scrollTop:0}, '500', function() { 
								$('html, body').css('overflow','hidden');
							});
						}
						$('body').css('overflow','hidden');
					}
				});
				$(window).resize(function(){
					$('.spectrum_pop').trigger('resized');
				}).trigger('resize');
			}else{
				Spectrum_open = false;
				$('.spectrum_pop').animate({'margin-top':$(window).height()},{
					duration : 550,
					complete : function(){
					}
				});
				$('.spectrum_box_wrap').fadeOut(750,function(){
					$('html, body').css('overflow','');
					_this.reset();
				});
			}
		}
		this.initialize();
	}
}(jQuery));