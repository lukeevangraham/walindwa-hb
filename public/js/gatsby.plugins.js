;(function($){

	'use strict';

	$(function(){

		/* ------------------------------------------------
				Revolution Slider
		------------------------------------------------ */

			var revSlider = $('#rev-slider'),
				revSlider2 = $('#rev-slider-2'),
				revSlider3 = $('#rev-slider-3');

			if(revSlider.length){

				$.gatsbyCore.revApi = revSlider.revolution({
					sliderType:"standard",
					sliderLayout:"fullscreen",
					dottedOverlay: 'twoxtwo',
					spinner: "spinner3",
					responsiveLevels: [4096,1024,778,480],
					delay:6000,
					navigation: {
						arrows:{
							enable: false,
							hide_onleave: true,
							hide_onmobile: true,
							rtl: $.gatsbyCore.ISRTL,
							tmp: '<span class="gt-arrow"></span>',
							left: {
								container:"slider",
								h_align:"left",
								v_align:"center",
								h_offset:30,
								v_offset:0
							},
							right: {
								container:"slider",
								h_align:"right",
								v_align:"center",
								h_offset:30,
								v_offset:0
							}
						},
						bullets:{
							style:"",
							enable: true,
							container: "slider",
							rtl: $.gatsbyCore.ISRTL,
							hide_onmobile: false,
							hide_onleave: false,
							hide_delay: 200,
							hide_under: 0,
							hide_over: 9999,
							tmp:'<span class="gt-circle-bullet"></span>', 
							direction:"vertical",
							space: 15,       
							h_align: "right",
							v_align: "center",
							h_offset: 100,
							v_offset: 20
						},
						onHoverStop: "off",
						touch:{
							touchenabled:"on"
						}
					},
					gridwidth:1230,
					gridheight:720,
					parallax:{
						type:"scroll",
						levels:[20, 30, 40, 50, 60, 85],
						origo:"enterpoint",
						speed:400,
						bgparallax:"on",
						disable_onmobile:"on"
					}
				});

			}

			if(revSlider2.length){

				$.gatsbyCore.revApi2 = revSlider2.revolution({
					sliderType:"standard",
					sliderLayout:"fullscreen",
					spinner: "spinner3",
					delay: 200000,
					responsiveLevels: [4096, 1356, 1280, 1024, 767, 640, 361],
					navigation: {
						arrows:{
							enable: false,
							hide_onleave: true,
							hide_onmobile: true,
							rtl: $.gatsbyCore.ISRTL,
							tmp: '<span class="gt-arrow"></span>',
							left: {
								container:"slider",
								h_align:"left",
								v_align:"center",
								h_offset:30,
								v_offset:0
							},
							right: {
								container:"slider",
								h_align:"right",
								v_align:"center",
								h_offset:30,
								v_offset:0
							}
						},
						bullets:{
							style:"",
							enable: true,
							container: "slider",
							hide_onmobile: false,
							hide_onleave: false,
							hide_delay: 200,
							hide_under: 0,
							hide_over: 9999,
							tmp:'<span class="gt-circle-bullet"></span>', 
							direction:"vertical",
							space: 15,       
							h_align: "right",
							v_align: "center",
							h_offset: 100,
							v_offset: 20
						},
						onHoverStop: "off",
						touch:{
							touchenabled:"on"
						}
					},
					gridwidth: [1620, 1356, 1200, 1024, 768, 640, 480],
					gridheight: [1080, 800, 800, 768, 480, 360, 320],
					parallax:{
						type:"scroll",
						levels:[20, 30, 40, 50, 60, 85],
						origo:"enterpoint",
						speed:400,
						bgparallax:"on",
						disable_onmobile:"on"
					}
				});

			}

			if(revSlider3.length){

				revSlider3.revolution({
					sliderType:"carousel",
					sliderLayout:"auto",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
						mouseScrollReverse:"default",
						onHoverStop:"off",
						bullets: {
							enable:true,
							hide_onmobile:false,
							style:"custom",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:-190,
							space:11,
							tmp:''
						}
					},
					carousel: {
						horizontal_align: "center",
						vertical_align: "center",
						fadeout: "on",
						vary_fade: "on",
						maxVisibleItems: 5,
						infinity: "on",
						space: 10,
						stretch: "off",
							showLayersAllTime: "off",
							easing: "Power3.easeInOut",
							speed: "800"
					},
					responsiveLevels:[1240,1024,778,480],
					visibilityLevels:[1240,1024,778,480],
					gridwidth:[324,324,324,324],
					gridheight:[577,577,577,577],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});

			}

		/* ------------------------------------------------
				End of Revolution Slider
		------------------------------------------------ */

		/* ------------------------------------------------
				Twitter Feed
		------------------------------------------------ */

			var twitterFeed = $('.gt-twitter-feed');

			if(twitterFeed.length){

				twitterFeed.tweet({
					username : 'fanfbmltemplate',
					modpath: 'php/twitter/',
					count : 2,
					loading_text : '<p>Loading tweets...</p>',
					template : '<li><a class="gt-tw-user" href="{user_url}" target="_blank">@{name}</a> {text}</li>'
				});

			}

		/* ------------------------------------------------
				End of Twitter Feed
		------------------------------------------------ */

		/* ------------------------------------------------
				Instagram Feed
		------------------------------------------------ */

			if($('#instafeed').length){

				var feed = new Instafeed({
					target: 'instafeed',
					tagName: 'living',
					limit: 8,
					get: 'user',
					userId: 314754609,
					accessToken: '314754609.a85626a.dbe04117a894440ebb2586a385685451',
					resolution: 'standard_resolution',
					clientId: '686d7a7385cf43ebb9518774734459da',
					template: '<div class="gt-instafeed-item"><a class="fancybox gt-lightbox" rel="instagram" href="{{image}}" title="{{location}}"><img width="75" height="75" src="{{image}}" /></a></div>',
					after: function(){
						$('#' + this.options.target).find('.fancybox').fancybox();
					}
				});
						
				feed.run();

			}

			if($('#instafeed2').length){

				var feed = new Instafeed({
					target: 'instafeed2',
					tagName: 'living',
					limit: 6,
					get: 'user',
					userId: 314754609,
					accessToken: '314754609.a85626a.dbe04117a894440ebb2586a385685451',
					resolution: 'standard_resolution',
					clientId: '686d7a7385cf43ebb9518774734459da',
					template: '<div class="gt-instafeed-item"><a class="fancybox gt-lightbox" rel="instagram" href="{{image}}" title="{{location}}"><img src="{{image}}" /></a></div>',
					after: function(){
						$('#' + this.options.target).find('.fancybox').fancybox();
					}
				});
						
				feed.run();

			}

		/* ------------------------------------------------
				End of Instagram Feed
		------------------------------------------------ */

		/* ------------------------------------------------
				Fancybox
		------------------------------------------------ */

			if($.fancybox){

				var $fancyBox = $('.fancybox');

				$.fancybox.defaults.padding = 0;
				$.fancybox.defaults.wrapCSS = 'gt-custom-lightbox';

				$.fancybox.defaults.helpers.thumbs = {
					width: 80,
					height: 80
				}

				$.fancybox.defaults.beforeShow = function () {

					var className = '';

					if(this.title){
						// New line
						this.title += '<br />';
						this.title += '<div class="fancybox-share-buttons">';
					}
					else{
						this.title += '<div class="fancybox-share-buttons only">';
					}

					this.title += '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + this.href + '">Tweet</a> ';

					// Add FaceBook like button
					this.title += '<iframe src="//www.facebook.com/plugins/like.php?href=http://fancyapps.com/fancybox/demo/1_b.jpg&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:110px; height:23px;" allowtransparency="true"></iframe>';
					this.title += '</div>';

				};

				$.fancybox.defaults.afterShow = function(){
					// Render tweet button
					twttr.widgets.load();
				};

				$.fancybox.defaults.helpers.title = {
					type: 'inside'
				}

				if($fancyBox.length){
					$fancyBox.fancybox();
				}

				var fancyboxMedia = $('.fancybox-media');

				if(fancyboxMedia.length){

					fancyboxMedia.fancybox({
						openEffect  : 'none',
						closeEffect : 'none',
						helpers : {
							media : {}
						}
					});

				}

			}

		/* ------------------------------------------------
				End of Fancybox
		------------------------------------------------ */

		/* ------------------------------------------------
				Custom Select
		------------------------------------------------ */

			var select = $('.gt-custom-select');

			if(select.length){
				select.MadCustomSelect({
					cssPrefix: 'gt-'
				});
			}

		/* ------------------------------------------------
				End of Custom Select
		------------------------------------------------ */

		/* ------------------------------------------------
				Accordion
		------------------------------------------------ */

			var accordions = $('.gt-accordion');

			if(accordions.length){

				accordions.MadAccordion({
					easing: 'easeInOutCubic',
					speed: 500,
					cssPrefix: 'gt-'
				});

			}

		/* ------------------------------------------------
				End of Accordion
		------------------------------------------------ */

		/* ------------------------------------------------
				Toggle
		------------------------------------------------ */

			var toggles = $('.gt-toggle');

			if(toggles.length){

				toggles.MadAccordion({
					toggle: true,
					easing: 'easeInOutCubic',
					speed: 500,
					cssPrefix: 'gt-'
				});

			}

		/* ------------------------------------------------
				End of Toggle
		------------------------------------------------ */

		/* ------------------------------------------------
				Owl Carousel
		------------------------------------------------ */

			var brandCarousel = $('.owl-carousel.gt-brand-holder');

			if(brandCarousel.length){

				var ecItemsConfig = {};

				if($.gatsbyCore.NOSIDEBAR){

					if(brandCarousel.hasClass('gt-cols-5')){
						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 3
							},
							991: {
								items: 5
							}
						}
					}else if(brandCarousel.hasClass('gt-cols-4')){

						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 3
							},
							991: {
								items: 4
							}
						}

					}

				}
				else{

					if(brandCarousel.hasClass('gt-cols-5')){
						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 3
							},
							991: {
								items: 5
							}
						}
					}else if(brandCarousel.hasClass('gt-cols-4')){

						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 3
							},
							991: {
								items: 4
							}
						}
					}

				}

				brandCarousel.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					responsive: ecItemsConfig,
					margin: 30,
					nav: true,
					autoplay: false,
					dots: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var tc1 = $('.owl-carousel.gt-testimonials-holder.gt-type-1');

			if(tc1.length){

				tc1.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					items: 1,
					nav: true,
					dots: false,
					autoplay: false,
					mouseDrag: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var pagsCarousel = $('.owl-carousel.gt-authors-holder');

			if(pagsCarousel.length){

				var pagsItemsConfig = {};

				if($.gatsbyCore.NOSIDEBAR){

					pagsItemsConfig = {
						0: {
							items: 1
						},
						768: {
							items: 2
						},
						991: {
							items: 3
						}
					}

				}
				else{

					pagsItemsConfig = {
						0: {
							items: 1
						},
						768: {
							items: 2
						},
						1200: {
							items: 3
						}
					}

				}

				pagsCarousel.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					responsive: pagsItemsConfig,
					nav: false,
					margin: 30,
					center: $.gatsbyCore.ISRTL ? false : true,
					dots: false,
					mouseDrag: false,
					autoplay: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var tc2 = $('.owl-carousel.gt-testimonials-holder.gt-type-2');

			if(tc2.length){

				var tcItemsConfig = {};

				if($.gatsbyCore.NOSIDEBAR){

					if(tc2.hasClass('gt-cols-3')){

						tcItemsConfig = {
							0: {
								items: 1
							},
							767: {
								items: 2
							},
							991: {
								items: 3
							}
						}

					}
					else if(tc2.hasClass('gt-cols-2')){

						tcItemsConfig = {
							0: {
								items: 1
							},
							767: {
								items: 2
							}
						}

					}

				}
				else{

					if(tc2.hasClass('gt-cols-3')){

						tcItemsConfig = {
							0: {
								items: 1
							},
							767: {
								items: 2
							},
							1201: {
								items: 3
							}
						}

					}
					else if(tc2.hasClass('gt-cols-2')){

						tcItemsConfig = {
							0: {
								items: 1
							},
							767: {
								items: 2
							}
						}

					}

				}

				tc2.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					responsive: tcItemsConfig,
					nav: false,
					dots: true,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var simpleCarousel = $('.owl-carousel.gt-simple-carousel');

			if(simpleCarousel.length){

				simpleCarousel.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					items: 1,
					dots: false,
					nav: true,
					animateIn: 'flipInX',
					animateOut: 'fadeOutDown',
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var entriesCarousel = $('.owl-carousel.gt-entries-holder, .owl-carousel.gt-portfolio-holder, .owl-carousel.gt-brand-holder');

			if(entriesCarousel.length){

				var ecItemsConfig = {};

				if($.gatsbyCore.NOSIDEBAR){

					if(entriesCarousel.hasClass('gt-cols-3')){
						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 2
							},
							991: {
								items: 3
							}
						}
					}
					else if(entriesCarousel.hasClass('gt-cols-2')){
						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 2
							}
						}
					}

				}
				else{

					if(entriesCarousel.hasClass('gt-cols-3')){
						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 2
							},
							1200: {
								items: 3
							}
						}
					}
					else if(entriesCarousel.hasClass('gt-cols-2')){
						ecItemsConfig = {
							0: {
								items: 1
							},
							600: {
								items: 2
							}
						}
					}

				}

				entriesCarousel.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					responsive: ecItemsConfig,
					margin: 30,
					nav: true,
					dots: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var entryCarousel = $('.owl-carousel.gt-entry-carousel');

			if(entryCarousel.length){

				entryCarousel.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					dots: false,
					items: 1,
					animateIn: 'flipInX',
					animateOut: 'fadeOut',
					nav: true,
					autoplay: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var entryCarousel = $('.owl-carousel.gt-entry-carousel');

			if(entryCarousel.length){

				entryCarousel.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					dots: false,
					items: 1,
					animateIn: 'flipInX',
					animateOut: 'fadeOut',
					nav: true,
					autoplay: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

			var productThumbs = $('.owl-carousel.gt-product-thumbs');

			if(productThumbs.length){

				var ptItemsConfig = {};

				if($.gatsbyCore.NOSIDEBAR){

					ptItemsConfig = {
						0: {
							items: 3
						},
						490: {
							items: 4
						}
					}

				}
				else{

					ptItemsConfig = {
						0: {
							items: 3
						},
						767: {
							items: 4
						},
						992: {
							items: 3
						}
					}

				}

				productThumbs.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
					responsive: ptItemsConfig,
					dots: false,
					nav: true,
					margin: 14,
					loop: false,
					autoplay: false,
					rtl: $.gatsbyCore.ISRTL ? true : false
				}));

			}

		/* ------------------------------------------------
				End of Owl Carousel
		------------------------------------------------ */

		/* ------------------------------------------------
				Countdown
		------------------------------------------------ */

			var $countdown = $('.gt-countdown-holder');

			if($countdown.length){

				$countdown.each(function(){

					var $this = $(this),
						endDate = $this.data(),
						until = new Date(
							endDate.year,
							endDate.month || 0,
							endDate.day || 1,
							endDate.hours || 0,
							endDate.minutes || 0,
							endDate.seconds || 0
						);

					// initialize
					$this.countdown({
						until : until,
						format : 'dHMS',
						labels : ['Years', 'Month', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds']
					});

				});

			}

		/* ------------------------------------------------
				End countdown
		------------------------------------------------ */

		/* ------------------------------------------------
				WTAudio
		------------------------------------------------ */

			var audio = $('audio');

			if(audio.length){

				audio.WTAudio();

			}

		/* ------------------------------------------------
				End of WTAudio
		------------------------------------------------ */

		/* ------------------------------------------------
				Range Slider
		------------------------------------------------ */

			var slider = $('#gt-slider');

			if(slider.length){

				slider.slider({
					range : true,
					min : 0,
					max : 150,
					values : [14,89],
					slide : function(event, ui){
						$(this).siblings('.gt-slider-min').text('$' + ui.values[0])
								.siblings('.gt-slider-max').text('$' + ui.values[1])
								.siblings('.gt-slider-min-input').val(ui.values[0])
								.siblings('.gt-slider-max-input').val(ui.values[1]);
					},
					create : function(event, ui){

						var $this = $(this),
							leftValue = $this.slider( "values", 0 ),
							rightValue = $this.slider( "values", 1 );

						$this.siblings('.gt-slider-min').text('$' + leftValue)
							.siblings('.gt-slider-max').text('$' + rightValue)
							.siblings('.gt-slider-min-input').val(leftValue)
							.siblings('.gt-slider-max-input').val(rightValue);
					}
				});

			}

		/* ------------------------------------------------
				End of Range Slider
		------------------------------------------------ */

		/* ------------------------------------------------
				Elevate Zoom
		------------------------------------------------ */

			var imgZoom = $('#img-zoom');

			if(imgZoom.length){

				imgZoom.elevateZoom({
					zoomType: "inner",
					gallery:'thumbnails',
					galleryActiveClass: 'active',
					cursor: "crosshair",
					responsive:true,
					easing:true,
					zoomWindowFadeIn: 500,
					zoomWindowFadeOut: 500,
					lensFadeIn: 500,
					lensFadeOut: 500
				});

			}

			$(".gt-open-modal").on("click", function(e) { 
				var ez = $(this).siblings('img').data('elevateZoom');
				$.fancybox(ez.getGalleryList());
				e.preventDefault();
			});

		/* ------------------------------------------------
				End of Elevate Zoom
		------------------------------------------------ */

		$('.gt-photo-area .gt-photo-container').isotope({
			itemSelector: '.gt-photo-col',
			masonry: {
				columnWidth: 310
			}
		});

	});

	$(window).load(function(){


		/* ------------------------------------------------
				Tabs
		------------------------------------------------ */

			var tabs = $('.gt-tabs-holder');

			if(tabs.length){

				tabs.MadTabs({
					easing: 'easeInOutCubic',
					speed: 500,
					cssPrefix: 'gt-'
				});

			}

		/* ------------------------------------------------
				End of Tabs
		------------------------------------------------ */

		/* ------------------------------------------------
				Tour Sections
		------------------------------------------------ */

			var tourSections = $('.gt-tour-sections-holder');

			if(tourSections.length){

				tourSections.MadTabs({
					easing: 'easeInOutCubic',
					speed: 500,
					cssPrefix: 'gt-'
				});

			}

		/* ------------------------------------------------
				End of TourSections
		------------------------------------------------ */

		/* ------------------------------------------------
				Parallax
		------------------------------------------------ */

			var mediaHolder = $('.gt-no-touchevents .gt-media-holder[data-bg]');

			if(mediaHolder.length && !$.gatsbyCore.ISTOUCH){

				setTimeout(function(){

					mediaHolder.each(function(){

						$(this).parallax("50%", 0.1);

					});

				}, 1000);

			}

			var fwParallax = $('.gt-no-touchevents .gt-parallax-section .gt-bg-element, .gt-no-touchevents .gt-call-out .gt-bg-element');

			if(fwParallax.length && !$.gatsbyCore.ISTOUCH){

				setTimeout(function(){

					fwParallax.each(function(){
						$(this).parallax("50%", 0.1);
					});

				}, 1000);

			}

		/* ------------------------------------------------
				End of Parallax
		------------------------------------------------ */
		

	});

})(jQuery);