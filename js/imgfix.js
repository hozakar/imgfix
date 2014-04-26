/* *******************************

-- Usage --

$(element).imgfix({
	fixin: 0,
	scale: 1,
	grayscale: null,
	sepia: null,
	hue: null,
	saturate: null,
	invert: null,
	brightness: null,
	contrast: null,
	blur: null,
	defaults: {
		scale: 1,
		grayscale: null,
		sepia: null,
		hue: null,
		saturate: null,
		invert: null,
		brightness: null,
		contrast: null,
		blur: null,
	}
	width: null,
	height: null,
	protectaspectratio: 0,
	interval: 400,
	easing: '',
	coverclass: '',
	cover: {
		slide: 'none',
		fade: 'in',
		scale: 'none',
		easing: '',
		delay: 0,
		interval: 400
	}
});

-- Values --

cover-slide options:
	none (default)
	in-up
	in-down
	in-right
	in-left
	out-up
	out-down
	out-right
	out-left
    dynamic

cover-fade options:
	none (default)
	in
	out

cover-scale options:
	none (default)
	in
	out

Default value for
    fixin                   => 0
    scale                   => 1
	grayscale               => null
	sepia                   => null
	hue                     => null
	saturate                => null
	invert                  => null
	brightness              => null
	contrast                => null
	blur                    => null
    width                   => null
    height                  => null
    defaults-scale          => 1
	defaults-grayscale      => null
	defaults-sepia          => null
	defaults-hue            => null
	defaults-saturate       => null
	defaults-invert         => null
	defaults-brightness     => null
	defaults-contrast       => null
	defaults-blur           => null
    width                   => null
    height                  => null
    protectaspectratio      => 0
    interval                => 400
    easing                  => ease
    cover-easing            => ease
    cover-delay             => 0
    cover-interval          => 400

******************************* */

"use strict";
(function($) {
	var bl_imgfix = {
		family: new Array(),
		init: function(family, rp) {
			var param = family.parameters ? family.parameters : new Object();
			var el = family.element;

			if(!param.cover) param.cover = {};
			if(!param.defaults) param.defaults = {};
			param = {
				fixin: param.fixin ? 1 : 0,
				scale: param.scale ? param.scale : 1,
				easing: param.easing ? param.easing : '',
				interval: parseInt(param.interval) >= 0 ? param.interval : 400,
				grayscale: parseInt(param.grayscale) >= 0 ? param.grayscale : null,
				sepia: parseInt(param.sepia) >= 0 ? param.sepia : null,
				hue: parseInt(param.hue) >= 0 ? param.hue : null,
				saturate: parseInt(param.saturate) >= 0 ? param.saturate : null,
				invert: parseInt(param.invert) >= 0 ? param.invert : null,
				brightness: parseInt(param.brightness) >= 0 ? param.brightness : null,
				contrast: parseInt(param.contrast) >= 0 ? param.contrast : null,
				blur: parseInt(param.blur) >= 0 ? param.blur : null,
				defaults: {
					scale: param.defaults.scale ? param.defaults.scale : 1,
					grayscale: parseInt(param.defaults.grayscale) >= 0 ? param.defaults.grayscale : null,
					sepia: parseInt(param.defaults.sepia) >= 0 ? param.defaults.sepia : null,
					hue: parseInt(param.defaults.hue) >= 0 ? param.defaults.hue : null,
					saturate: parseInt(param.defaults.saturate) >= 0 ? param.defaults.saturate : null,
					invert: parseInt(param.defaults.invert) >= 0 ? param.defaults.invert : null,
					brightness: parseInt(param.defaults.brightness) >= 0 ? param.defaults.brightness : null,
					contrast: parseInt(param.defaults.contrast) >= 0 ? param.defaults.contrast : null,
					blur: parseInt(param.defaults.blur) >= 0 ? param.defaults.blur : null,
				},
				width: param.width ? param.width : null,
				height: param.height ? param.height : null,
				protectaspectratio: param.protectaspectratio || param.protectAspectRatio ? param.protectaspectratio || param.protectAspectRatio : null,
				coverclass: param.coverclass || param.coverClass ? param.coverclass || param.coverClass : '',
				cover: {
					fade: param.cover.fade ? param.cover.fade : 'none',
					slide: param.cover.slide ? param.cover.slide : 'none',
					scale: param.cover.scale ? param.cover.scale : 'none',
					easing: param.cover.easing ? param.cover.easing : '',
					delay: param.cover.delay ? param.cover.delay : 0,
					interval: param.cover.interval ? param.cover.interval : 400
				}
			}

			family.parameters = param;
			el.css('overflow', 'hidden');
			for(var i = 0; i < el.length; i++) {
				var $cel = $(el[i]);
				$cel.addClass('imgfix_top_container');
				
				var virgin = $cel.find('#imgfix_wrapper_layer_' + family.id + '_' + i).length ? 0 : 1;

				/* Parameter Değerlerini data attrlere yaz */
				if(rp) {
					if($cel.data('fix-img') == null) $cel.data('fix-img', '');
					$cel.data('fix-fixin', param.fixin ? param.fixin : $cel.data('fix-fixin'));
					$cel.data('fix-defaults-scale', param.defaults.scale ? param.defaults.scale : $cel.data('fix-defaults-scale'));
					$cel.data('fix-defaults-grayscale', param.defaults.grayscale != null ? param.defaults.grayscale : $cel.data('fix-grayscale'));
					$cel.data('fix-defaults-sepia', param.defaults.sepia != null ? param.defaults.sepia : $cel.data('fix-sepia'));
					$cel.data('fix-defaults-hue', param.defaults.hue != null ? param.defaults.hue : $cel.data('fix-hue'));
					$cel.data('fix-defaults-saturate', param.defaults.saturate != null ? param.defaults.saturate : $cel.data('fix-saturate'));
					$cel.data('fix-defaults-invert', param.defaults.invert != null ? param.defaults.invert : $cel.data('fix-invert'));
					$cel.data('fix-defaults-brightness', param.defaults.brightness != null ? param.defaults.brightness : $cel.data('fix-brightness'));
					$cel.data('fix-defaults-contrast', param.defaults.contrast != null ? param.defaults.contrast : $cel.data('fix-contrast'));
					$cel.data('fix-defaults-blur', param.defaults.blur != null ? param.defaults.blur : $cel.data('fix-blur'));
					$cel.data('fix-scale', (param.scale ? param.scale : $cel.data('fix-scale')) * $cel.data('fix-defaults-scale'));
					$cel.data('fix-interval', param.interval ? param.interval : $cel.data('fix-interval'));
					$cel.data('fix-grayscale', param.grayscale != null ? param.grayscale : $cel.data('fix-grayscale'));
					$cel.data('fix-sepia', param.sepia != null ? param.sepia : $cel.data('fix-sepia'));
					$cel.data('fix-hue', param.hue != null ? param.hue : $cel.data('fix-hue'));
					$cel.data('fix-saturate', param.saturate != null ? param.saturate : $cel.data('fix-saturate'));
					$cel.data('fix-invert', param.invert != null ? param.invert : $cel.data('fix-invert'));
					$cel.data('fix-brightness', param.brightness != null ? param.brightness : $cel.data('fix-brightness'));
					$cel.data('fix-contrast', param.contrast != null ? param.contrast : $cel.data('fix-contrast'));
					$cel.data('fix-blur', param.blur != null ? param.blur : $cel.data('fix-blur'));
					$cel.data('fix-width', param.width ? param.width : $cel.data('fix-width'));
					$cel.data('fix-height', param.height ? param.height : $cel.data('fix-height'));
					$cel.data('fix-protect-aspect-ratio', param.protectaspectratio ? param.protectaspectratio : $cel.data('fix-protect-aspect-ratio'));
					$cel.data('fix-easing', param.easing ? param.easing : $cel.data('fix-easing'));
					$cel.data('fix-cover', param.coverclass ? param.coverclass : $cel.data('fix-cover'));
					$cel.data('fix-cover-fade', param.cover.fade ? param.cover.fade : $cel.data('fix-cover-fade'));
					$cel.data('fix-cover-slide', param.cover.slide ? param.cover.slide : $cel.data('fix-cover-slide'));
					$cel.data('fix-cover-scale', param.cover.scale ? param.cover.scale : $cel.data('fix-cover-scale'));
					$cel.data('fix-cover-easing', param.cover.easing ? param.cover.easing : $cel.data('fix-cover-easing'));
					$cel.data('fix-cover-delay', param.cover.delay ? param.cover.delay : $cel.data('fix-cover-delay'));
					$cel.data('fix-cover-interval', param.cover.interval ? param.cover.interval : $cel.data('fix-cover-interval'));
				} else {
					if($cel.data('fix-img') == null) $cel.data('fix-img', '');
					$cel.data('fix-fixin', $cel.data('fix-fixin') == null ? param.fixin : $cel.data('fix-fixin'));
					$cel.data('fix-defaults-scale', $cel.data('fix-defaults-scale') == null ? param.defaults.scale : $cel.data('fix-defaults-scale'));
					$cel.data('fix-defaults-grayscale', $cel.data('fix-defaults-grayscale') == null ? param.defaults.grayscale : $cel.data('fix-defaults-grayscale'));
					$cel.data('fix-defaults-sepia', $cel.data('fix-defaults-sepia') == null ? param.defaults.sepia : $cel.data('fix-defaults-sepia'));
					$cel.data('fix-defaults-hue', $cel.data('fix-defaults-hue') == null ? param.defaults.hue : $cel.data('fix-defaults-hue'));
					$cel.data('fix-defaults-saturate', $cel.data('fix-defaults-saturate') == null ? param.defaults.saturate : $cel.data('fix-defaults-saturate'));
					$cel.data('fix-defaults-invert', $cel.data('fix-defaults-invert') == null ? param.defaults.invert : $cel.data('fix-defaults-invert'));
					$cel.data('fix-defaults-brightness', $cel.data('fix-defaults-brightness') == null ? param.defaults.brightness : $cel.data('fix-defaults-brightness'));
					$cel.data('fix-defaults-contrast', $cel.data('fix-defaults-contrast') == null ? param.defaults.contrast : $cel.data('fix-defaults-contrast'));
					$cel.data('fix-defaults-blur', $cel.data('fix-defaults-blur') == null ? param.defaults.blur : $cel.data('fix-defaults-blur'));
					$cel.data('fix-scale', ($cel.data('fix-scale') == null ? param.scale : $cel.data('fix-scale')) * $cel.data('fix-defaults-scale'));
					$cel.data('fix-interval', $cel.data('fix-interval') == null ? param.interval : $cel.data('fix-interval'));
					$cel.data('fix-grayscale', $cel.data('fix-grayscale') == null ? param.grayscale : $cel.data('fix-grayscale'));
					$cel.data('fix-sepia', $cel.data('fix-sepia') == null ? param.sepia : $cel.data('fix-sepia'));
					$cel.data('fix-hue', $cel.data('fix-hue') == null ? param.hue : $cel.data('fix-hue'));
					$cel.data('fix-saturate', $cel.data('fix-saturate') == null ? param.saturate: $cel.data('fix-saturate'));
					$cel.data('fix-invert', $cel.data('fix-invert') == null ? param.invert : $cel.data('fix-invert'));
					$cel.data('fix-brightness', $cel.data('fix-brightness') == null ? param.brightness : $cel.data('fix-brightness'));
					$cel.data('fix-contrast', $cel.data('fix-contrast') == null ? param.contrast : $cel.data('fix-contrast'));
					$cel.data('fix-blur', $cel.data('fix-blur') == null ? param.blur : $cel.data('fix-blur'));
					$cel.data('fix-width', $cel.data('fix-width') == null ? param.width : $cel.data('fix-width'));
					$cel.data('fix-height', $cel.data('fix-height') == null ? param.height : $cel.data('fix-height'));
					$cel.data('fix-protect-aspect-ratio', $cel.data('fix-protect-aspect-ratio') == null ? param.protectaspectratio : $cel.data('fix-protect-aspect-ratio'));
					$cel.data('fix-easing', $cel.data('fix-easing') == null ? param.easing : $cel.data('fix-easing'));
					$cel.data('fix-cover', $cel.data('fix-cover') == null ? param.coverclass : $cel.data('fix-cover'));
					$cel.data('fix-cover-fade', $cel.data('fix-cover-fade') == null ? param.cover.fade : $cel.data('fix-cover-fade'));
					$cel.data('fix-cover-slide', $cel.data('fix-cover-slide') == null ? param.cover.slide : $cel.data('fix-cover-slide'));
					$cel.data('fix-cover-scale', $cel.data('fix-cover-scale') == null ? param.cover.scale : $cel.data('fix-cover-scale'));
					$cel.data('fix-cover-easing', $cel.data('fix-cover-easing') == null ? param.cover.easing : $cel.data('fix-cover-easing'));
					$cel.data('fix-cover-delay', $cel.data('fix-cover-delay') == null ? param.cover.delay : $cel.data('fix-cover-delay'));
					$cel.data('fix-cover-interval', $cel.data('fix-cover-interval') == null ? param.cover.interval : $cel.data('fix-cover-interval'));
					
					/* Top Container için boyut ayarları */
					if($cel.data('fix-width')) $cel.width($cel.data('fix-width'));
					if($cel.data('fix-height')) {
						var h = $cel.data('fix-height');
						if(h.split('%').length > 1) {
							h = parseFloat(h.split('%')[0]);
							h = h ? $cel.width() * h / 100 : 0;
						}
						$cel.height(h);
					}
					
					if($cel.data('fix-protect-aspect-ratio')) {
						if($cel.data('fix-aspect-ratio')) {
							$cel.height($cel.width() * $cel.data('fix-aspect-ratio'));
						} else {
							var h = $cel.height();
							var w = $cel.width();
							var rat = w ? h / w : 0;
							$cel.data('fix-aspect-ratio', rat);
						}
					}
					
				}
				
				if($cel.css('position')=='static') $cel.css('position', 'relative');

				/* Varsa imaj için gerekli ayarlamaları yap yoksa yarat */
				if(virgin) {
					if($cel.find('img').length == 0) {
						$cel.append('<img class="imgfix_src_img" src="' + $cel.data('fix-img') + '" />');
					} else {
						$($cel.find('img')[0]).addClass('imgfix_src_img');
					}
				
					var fimg = $cel.find('img');
					for(var j = 0; j < fimg.length; j++) {
						$(fimg[j]).data('fix-img-default-opacity', $(fimg[j]).css('opacity'));
					}
					$cel.find('img').css('opacity', 0);
				}
				
				/* Layer içeriğini düzenlemek için wrap et ve id ver */
				if(virgin) $cel.wrapInner('<div id="imgfix_wrapper_layer_' + family.id + '_' + i + '" class="imgfix_wrapper_layer" style="position: relative; padding: 0; margin: 0; width: 100%; height: 100%; overflow: hidden;"></div>');
				
				/* İmaj yüklendiğinde hesaplamaları yapmak ve stilleri yaratmak için ilgili fonksiyona yönlendir */
				setImage($('#imgfix_wrapper_layer_' + family.id + '_' + i + ' .imgfix_src_img')[0]);
				if(virgin) {
					$('#imgfix_wrapper_layer_' + family.id + '_' + i + ' .imgfix_src_img').load(function(){
						setImage(this);
					});
				}
				
				/* Cover kullanılacaksa ilgili nesneleri yarat ve stillerini ayarla */
				if($cel.data('fix-cover')) {
					var cover;
					/* Cover layerını bul */
					if($cel.data('fix-cover').split('.').length > 1 || $cel.data('fix-cover').split('#').length > 1) {
						cover = $cel.data('fix-cover');
					} else {
						cover = '.' + $cel.data('fix-cover');
					}
					
					/* Cover layerını wrap et */
					if(virgin) $cel.find(cover).wrap('<div class="imgfix_cover_wrapper"></div>');
					var $cover = $cel.find('.imgfix_cover_wrapper');
					$cover.css({
						width: $($cel.find('.imgfix_wrapper_layer')[0]).width() + 'px',
						height: $($cel.find('.imgfix_wrapper_layer')[0]).height() + 'px'
					});

					/* Cover özelliklerini ata */
					$cover.data('slide', $cel.data('fix-cover-slide'));
					$cover.data('fade', $cel.data('fix-cover-fade'));
					$cover.data('scale', $cel.data('fix-cover-scale'));
					$cover.data('easing', $cel.data('fix-cover-easing'));
					$cover.data('delay', $cel.data('fix-cover-delay'));
					$cover.data('interval', $cel.data('fix-cover-interval'));
					
					/* Cover ayarlamalarını yap */
					var topID = $cover.parents('.imgfix_wrapper_layer')[0].id;

					/* Daha önce oluşturulmuş stil varsa sil */
					$('#imgfix_cover_transitions_for_' + topID).remove();

					if($cover.data('slide') != 'none' || $cover.data('fade') != 'none' || $cover.data('scale') != 'none') {
						/* Hesaplanan değerler ile yeni stil oluştur */
						$('head').append(
							'<style id="imgfix_cover_transitions_for_' + topID + '">' +
								'#' + topID + ' .imgfix_cover_wrapper{' +
									'position: absolute; z-index: 1;' +
									'-webkit-transition: all ' + (parseInt($cover.data('interval')) / 1000) + 's ' + $cover.data('easing') + ' ' + (parseInt($cover.data('delay')) / 1000) + 's;' +
									'transition: all ' + (parseInt($cover.data('interval')) / 1000) + 's ' + $cover.data('easing') + ' ' + (parseInt($cover.data('delay')) / 1000) + 's;' +
								'}' +
							'</style>'
						);
						
						setCoverSlide($cover, topID); //Slide
						setCoverFade($cover, topID); //Fade
						setCoverscale($cover, topID); //scale
					} else {
						/* Hesaplanan değerler ile yeni stil oluştur */
						$('head').append(
							'<style id="imgfix_cover_transitions_for_' + topID + '">' +
								'#' + topID + ' .imgfix_cover_wrapper{' +
									'position: absolute; z-index: 1;' +
								'}' +
							'</style>'
						);
					}
				}
			}
		}
	}
	
	/* Functions */
	function setImage(el) {
		var $tc = $($(el).parents('.imgfix_wrapper_layer')[0]);
		var $dc = $($tc.parents('.imgfix_top_container')[0]);
		
		/* İmajın boyutlarını al ve layera uyacak şekilde ayarla */
		var orgW = $(el).width();
		var orgH = $(el).height();
		var expW = $tc.width();
		var expH = $tc.height();
		
		var oran = expW / orgW;
		var w = orgW * oran;
		var h = orgH * oran;

		if($dc.data('fix-fixin')) {
			if(h > expH) {
				oran = expH / orgH;
				w = orgW * oran;
				h = orgH * oran;
			}
		} else {
			if(h < expH) {
				oran = expH / orgH;
				w = orgW * oran;
				h = orgH * oran;
			}
		}
		
		var topID = $tc[0].id;
		
		/* Daha önce oluşturulmuş stil varsa sil */
		$('#imgfix_img_style_for_' + topID).remove();
		
		/* default filterlar */
		var defFilterStr = '';
		if(
			$dc.data('fix-defaults-grayscale') != null ||
			$dc.data('fix-defaults-sepia') != null ||
			$dc.data('fix-defaults-hue') != null ||
			$dc.data('fix-defaults-saturate') != null ||
			$dc.data('fix-defaults-invert') != null ||
			$dc.data('fix-defaults-brightness') != null ||
			$dc.data('fix-defaults-contrast') != null ||
			$dc.data('fix-defaults-blur') != null
		) {
			defFilterStr = $dc.data('fix-defaults-grayscale') != null ? 'grayscale(' + parseInt($dc.data('fix-defaults-grayscale')) + '%) ' : '';
			defFilterStr += $dc.data('fix-defaults-sepia') != null ? 'sepia(' + parseInt($dc.data('fix-defaults-sepia')) + '%) ' : '';
			defFilterStr += $dc.data('fix-defaults-hue') != null ? 'hue-rotate(' + parseInt($dc.data('fix-defaults-hue')) + 'deg) ' : '';
			defFilterStr += $dc.data('fix-defaults-saturate') != null ? 'saturate(' + parseInt($dc.data('fix-defaults-saturate')) + 'deg) ' : '';
			defFilterStr += $dc.data('fix-defaults-invert') != null ? 'invert(' + parseInt($dc.data('fix-defaults-invert')) + '%) ' : '';
			defFilterStr += $dc.data('fix-defaults-brightness') != null ? 'brightness(' + parseInt($dc.data('fix-defaults-brightness')) + '%) ' : '';
			defFilterStr += $dc.data('fix-defaults-contrast') != null ? 'contrast(' + parseInt($dc.data('fix-defaults-contrast')) + '%) ' : '';
			defFilterStr += $dc.data('fix-defaults-blur') != null ? 'blur(' + parseInt($dc.data('fix-defaults-blur')) + 'px) ' : '';
		}
		if(defFilterStr) defFilterStr = 'filter: ' + defFilterStr + '; -webkit-filter: ' + defFilterStr + ';';
		/* filter uygulanacak mı? */
		var filterStr = '';
		if(
			$dc.data('fix-grayscale') != null ||
			$dc.data('fix-sepia') != null ||
			$dc.data('fix-hue') != null ||
			$dc.data('fix-saturate') != null ||
			$dc.data('fix-invert') != null ||
			$dc.data('fix-brightness') != null ||
			$dc.data('fix-contrast') != null ||
			$dc.data('fix-blur') != null
		) {
			filterStr = $dc.data('fix-grayscale') != null ? 'grayscale(' + parseInt($dc.data('fix-grayscale')) + '%) ' : ($dc.data('fix-defaults-grayscale') != null ? 'grayscale(' + parseInt($dc.data('fix-defaults-grayscale')) + '%) ' : '');
			filterStr += $dc.data('fix-sepia') != null ? 'sepia(' + parseInt($dc.data('fix-sepia')) + '%) ' : ($dc.data('fix-defaults-sepia') != null ? 'sepia(' + parseInt($dc.data('fix-defaults-sepia')) + '%) ' : '');
			filterStr += $dc.data('fix-hue') != null ? 'hue-rotate(' + parseInt($dc.data('fix-hue')) + 'deg) ' : ($dc.data('fix-defaults-hue') != null ? 'hue-rotate(' + parseInt($dc.data('fix-defaults-hue')) + 'deg) ' : '');
			filterStr += $dc.data('fix-saturate') != null ? 'saturate(' + parseInt($dc.data('fix-saturate')) + '%) ' : ($dc.data('fix-defaults-saturate') != null ? 'saturate(' + parseInt($dc.data('fix-defaults-saturate')) + '%) ' : '');
			filterStr += $dc.data('fix-invert') != null ? 'invert(' + parseInt($dc.data('fix-invert')) + '%) ' : ($dc.data('fix-defaults-invert') != null ? 'invert(' + parseInt($dc.data('fix-defaults-invert')) + '%) ' : '');
			filterStr += $dc.data('fix-brightness') != null ? 'brightness(' + parseInt($dc.data('fix-brightness')) + '%) ' : ($dc.data('fix-defaults-brightness') != null ? 'brightness(' + parseInt($dc.data('fix-defaults-brightness')) + '%) ' : '');
			filterStr += $dc.data('fix-contrast') != null ? 'contrast(' + parseInt($dc.data('fix-contrast')) + '%) ' : ($dc.data('fix-defaults-contrast') != null ? 'contrast(' + parseInt($dc.data('fix-defaults-contrast')) + '%) ' : '');
			filterStr += $dc.data('fix-blur') != null ? 'blur(' + parseInt($dc.data('fix-blur')) + 'px) ' : ($dc.data('fix-defaults-blur') != null ? 'blur(' + parseInt($dc.data('fix-defaults-blur')) + 'px) ' : '');
		}
		if(filterStr) filterStr = 'filter: ' + filterStr + ' !important; -webkit-filter: ' + filterStr + ' !important;';
		
		/* Hesaplanan değerler ile yeni stil oluştur */
		$('head').append(
			'<style id="imgfix_img_style_for_' + topID + '">' +
				'#' + topID + ' .imgfix_src_img{' +
					'left: -999999px;' +
					'right: -999999px;' +
					'top: -999999px;' +
					'bottom: -999999px;' +
					'z-index: 0;' +
					'width: ' + parseInt(w + 1) + 'px;' +
					'height: ' + parseInt(h + 1) + 'px;' +
					'position: absolute;' +
					'margin: auto;' +
					'-webkit-transition: all ' + (parseInt($dc.data('fix-interval')) / 1000) + 's ' + $dc.data('fix-easing') + ' ;' +
					'transition: all ' + (parseInt($dc.data('fix-interval')) / 1000) + 's ' + $dc.data('fix-easing') + ';' +
					'-webkit-transform: scale(' + $dc.data('fix-defaults-scale') + ');' +
					'-ms-transform: scale(' + $dc.data('fix-defaults-scale') + ');' +
					'transform: scale(' + $dc.data('fix-defaults-scale') + ');' +
					defFilterStr + 
				'}' +
				'#' + topID + ':hover .imgfix_src_img{' +
					'-webkit-transform: scale(' + $dc.data('fix-scale') + ');' +
					'-ms-transform: scale(' + $dc.data('fix-scale') + ');' +
					'transform: scale(' + $dc.data('fix-scale') + ');' +
					filterStr +
				'}' +
			'</style>'
		);
		
		/* Yüklenme işlemi tamamlandığına göre artık imajı gösterebiliriz 
		   İmaj görüntülenirken hazırlanmış olan transformun uygulanabilmesi için 10 ms zaman tanıyoruz. */
		openImage(el);
	}

	function openImage(el) {
		setTimeout(function(){
			$(el).css({
				opacity: $(el).data('fix-img-default-opacity')
			});
		}, 1);
	}
	
	function setCoverSlide(el, topID) {
		/* Daha önce oluşturulmuş stil varsa sil */
		$('#imgfix_cover_slide_for_' + topID).remove();
		var prnt = $(el).parents('.imgfix_top_container')[0];
		$(prnt).off();
		var slide = el.data('slide');
		removeCoverClass(el);

		switch(slide) {
			case 'in-up':
			case 'in-right':
			case 'in-down':
			case 'in-left':
			case 'out-up':
			case 'out-right':
			case 'out-down':
			case 'out-left':
				el.addClass('imgfix-' + slide);
				break;
			case 'dynamic':
				el.addClass('imgfix-in-up');
				$(prnt).on('mouseenter', el, function(e){
					var id = e.data.parents('.imgfix_wrapper_layer')[0].id.split('_')[3];
					var $top = $(bl_imgfix.family[id].element);

					$(this).find('.imgfix_cover_wrapper').removeClass('imgfix-in-up-right');
					$(this).find('.imgfix_cover_wrapper').removeClass('imgfix-in-up-left');
					$(this).find('.imgfix_cover_wrapper').removeClass('imgfix-in-down-right');
					$(this).find('.imgfix_cover_wrapper').removeClass('imgfix-in-down-left');

					for(var i = 0; i < $top.length; i++) {
						var el = $top[i];
						if(el != this) {
							var dir = '';
							if($(el).offset().top > $(this).offset().top) { // Üstünde
								dir = 'down';
							} else if($(el).offset().top < $(this).offset().top) { // Altında
								dir = 'up';
							} else if($(el).offset().left < $(this).offset().left) { // Solunda
								dir = 'right';
							} else if($(el).offset().left > $(this).offset().left) { // Sağında
								dir = 'left';
							}

							if($(el).offset().top < $(this).offset().top && $(el).offset().left < $(this).offset().left) { // Üstünde
								dir = 'down-right';
							} else if($(el).offset().top > $(this).offset().top && $(el).offset().left < $(this).offset().left) { // Üstünde
								dir = 'up-right';
							} if($(el).offset().top < $(this).offset().top && $(el).offset().left > $(this).offset().left) { // Üstünde
								dir = 'down-left';
							} else if($(el).offset().top > $(this).offset().top && $(el).offset().left > $(this).offset().left) { // Üstünde
								dir = 'up-left';
							}
							
							$(el).find('.imgfix_cover_wrapper').addClass('imgfix-in-' + dir);
							removeCoverClass($(el).find('.imgfix_cover_wrapper'), 'imgfix-in-' + dir);
						}
					}
				});
				$(prnt).on('mouseleave', el, function(e){
					var id = e.data.parents('.imgfix_wrapper_layer')[0].id.split('_')[3];
					var $top = $(bl_imgfix.family[id].element);
					if($top.find(':hover').length) return;
					
					var offsetX = e.offsetX == undefined ? e.pageX - $(this).offset().left : e.offsetX;
					var offsetY = e.offsetY == undefined ? e.pageY - $(this).offset().top : e.offsetY;

					var dir = '';
					if(offsetY < e.data.height() * .1) { // Yukarı
						dir = 'down';
					} else if(offsetY > e.data.height() * .9) { // Aşağı
						dir = 'up';
					} else if(offsetX < e.data.width() * .1) { // Sola
						dir = 'left';
					} else { // Sağa
						dir = 'right';
					}
					e.data.addClass('imgfix-in-' + dir);
					removeCoverClass(e.data, 'imgfix-in-' + dir);
				});
				break;
			default:
				return;
		}
		
		/* Hesaplanan değerler ile yeni stil oluştur */
		$('head').append(
			'<style id="imgfix_cover_slide_for_' + topID + '">' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-up{' +
					'left: 0;' +
					'top: 100%;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-right{' +
					'left: 100%;' +
					'top: 0;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-down{' +
					'left: 0;' +
					'top: -100%;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-left{' +
					'left: -100%;' +
					'top: 0;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-up-left{' +
					'left: -100%;' +
					'top: -100%;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-up-right{' +
					'left: 100%;' +
					'top: -100%;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-down-left{' +
					'left: -100%;' +
					'top: 100%;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-in-down-right{' +
					'left: 100%;' +
					'top: 100%;' +
					'visibility: hidden;' +
				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper.imgfix-in-up, #' + topID + ':hover .imgfix_cover_wrapper.imgfix-in-right, #' + topID + ':hover .imgfix_cover_wrapper.imgfix-in-down, #' + topID + ':hover .imgfix_cover_wrapper.imgfix-in-left{' +
					'left: 0;' +
					'top: 0;' +
					'visibility: visible;' +
				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper.imgfix-out-up{' +
					'left: 0;' +
					'top: -100%;' +
				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper.imgfix-out-right{' +
					'left: 100%;' +
					'top: 0;' +
				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper.imgfix-out-down{' +
					'left: 0;' +
					'top: 100%;' +
				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper.imgfix-out-left{' +
					'left: -100%;' +
					'top: 0;' +
				'}' +
				'#' + topID + ' .imgfix_cover_wrapper.imgfix-out-up, #' + topID + ' .imgfix_cover_wrapper.imgfix-out-right, #' + topID + ' .imgfix_cover_wrapper.imgfix-out-down, #' + topID + ' .imgfix_cover_wrapper.imgfix-out-left{' +
					'left: 0;' +
					'top: 0;' +
				'}' +
			'</style>'
		);
	}
	
	function removeCoverClass($el, dir) {
		if(dir != 'imgfix-in-up') $el.removeClass('imgfix-in-up');
		if(dir != 'imgfix-in-right') $el.removeClass('imgfix-in-right');
		if(dir != 'imgfix-in-down') $el.removeClass('imgfix-in-down');
		if(dir != 'imgfix-in-left') $el.removeClass('imgfix-in-left');
		if(dir != 'imgfix-in-up-left') $el.removeClass('imgfix-in-up-left');
		if(dir != 'imgfix-in-up-right') $el.removeClass('imgfix-in-up-right');
		if(dir != 'imgfix-in-down-left') $el.removeClass('imgfix-in-down-left');
		if(dir != 'imgfix-in-down-right') $el.removeClass('imgfix-in-down-right');
		$el.removeClass('imgfix-out-up');
		$el.removeClass('imgfix-out-right');
		$el.removeClass('imgfix-out-down');
		$el.removeClass('imgfix-out-left');
	}
	
	function setCoverFade(el, topID) {
		/* Daha önce oluşturulmuş stil varsa sil */
		$('#imgfix_cover_fade_for_' + topID).remove();
		
		var fade = el.data('fade');
		var e = new Object();
		
		switch(fade) {
			case 'in':
				e = {
					from: {
						opacity: 0
					},
					to: {
						opacity: 1
					}
				}
				break;
			case 'out':
				e = {
					from: {
						opacity: 1
					},
					to: {
						opacity: 0
					}
				}
				break;
			default:
				return;
		}
		
		/* Hesaplanan değerler ile yeni stil oluştur */
		$('head').append(
			'<style id="imgfix_cover_fade_for_' + topID + '">' +
				'#' + topID + ' .imgfix_cover_wrapper{' +
					'opacity: ' + e.from.opacity + ';' +
					'-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (e.from.opacity * 100) + ')";' + 
					'filter: alpha(opacity=' + (e.from.opacity * 100) + ');' + 
  				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper{' +
					'opacity: ' + e.to.opacity + ';' +
					'-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (e.to.opacity * 100) + ')";' + 
					'filter: alpha(opacity=' + (e.to.opacity * 100) + ');' + 
				'}' +
			'</style>'
		);
	}
	
	function setCoverscale(el, topID) {
		/* Daha önce oluşturulmuş stil varsa sil */
		$('#imgfix_cover_scale_for_' + topID).remove();
		
		var scale = el.data('scale');
		var e = new Object();
		
		switch(scale) {
			case 'in':
				e = {
					from: {
						scale: 0
					},
					to: {
						scale: 1
					}
				}
				break;
			case 'out':
				e = {
					from: {
						scale: 1
					},
					to: {
						scale: 0
					}
				}
				break;
			default:
				return;
		}
		
		/* Hesaplanan değerler ile yeni stil oluştur */
		$('head').append(
			'<style id="imgfix_cover_scale_for_' + topID + '">' +
				'#' + topID + ' .imgfix_cover_wrapper{' +
					'-webkit-transform: scale(' + e.from.scale + ');' +
					'-ms-transform: scale(' + e.from.scale + ');' +
					'transform: scale(' + e.from.scale + ');' +
  				'}' +
				'#' + topID + ':hover .imgfix_cover_wrapper{' +
					'-webkit-transform: scale(' + e.to.scale + ');' +
					'-ms-transform: scale(' + e.to.scale + ');' +
					'transform: scale(' + e.to.scale + ');' +
				'}' +
			'</style>'
		);
	}
	/* End: Functions */
	
	/* Plug-in Start */
	$.fn.imgfix = function(parameters) {
		var id = -1;
		var refreshParameters = false;
		for(var i = 0; i < bl_imgfix.family.length; i++) {
			var dummy = true;
			for(var x in this) if(this[x] != bl_imgfix.family[i].element[x]) dummy = false;
			if(dummy) {
				id = i;
				refreshParameters = true;
				break;
			}
		}
		if(id < 0) {
			bl_imgfix.family.push(new Object);
			id = bl_imgfix.family.length - 1;
		}
		bl_imgfix.family[id] = {
			id: id,
			element: this,
			parameters: parameters
		}
		bl_imgfix.init(bl_imgfix.family[id], refreshParameters);
		$(window).resize(function(){
			bl_imgfix.init(bl_imgfix.family[id]);
		});
	}
	/* End: Plug-in Start */

	/* imgfix refresh */
	$.fn.imgfixRefresh = function() {
		var dummy = $(this).find('.imgfix_wrapper_layer');
		var els = new Array();
		for(var i = 0; i < dummy.length; i++) {
			var id = dummy[i].id.split('_')[3];
			els[id] = true;
		}
		for(var x in els) {
			bl_imgfix.init(bl_imgfix.family[x]);
		}
	}
	/* End: imgfix refresh */
})(jQuery);
