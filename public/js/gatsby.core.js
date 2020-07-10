;(function($){

	'use strict';

	$.gatsbyCore = {

		NOSIDEBAR: $('.gt-page-content-wrap.gt-no-sidebar').length,
		ISRTL: getComputedStyle(document.body).direction === 'rtl',
		TRANSITIONDURATION: 500, // base jQuery animation duration

		FLEXBOXSUPPORTED: $('html').hasClass('gt-flexbox'),
		ISTOUCH: $('html').hasClass('gt-touchevents'),
		ANIMATIONSUPPORTED: $('html').hasClass('gt-cssanimations'),

		TRANSITIONEND : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		ANIMATIONEND: "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",

		/**
		 * 
		 * @return undefined;
		 **/
		DOMLoaded: function(){

			// set base jQuery animation duration
			$.fx.speed = this.TRANSITIONDURATION;

			// background images init
			if($('[data-bg]').length) this.templateHelpers.bg();

			// owl adaptives
			if($('.owl-carousel').length) this.templateHelpers.owlAdaptive();

			// full width section init
			if($('.gt-fullwidth-section').length) this.templateHelpers.fullWidthSection.init();
			if($('.gt-fullwidth-section-bg').length) this.templateHelpers.fullWidthSectionBg.init();

			// compressed form init
			if($('.gt-compressed').length) this.modules.compressedForm.init();

			// quantity fields
			if($('.gt-qty').length) this.modules.qty();

			// main menu init
			if($('.gt-navigation').length) this.modules.navigation();

			// sticky section init
			if($('.gt-sticky').length) this.modules.stickySection.init();

			// dropdown elements init
			if($('.gt-dropdown-invoker').length) this.modules.dropdown();

			// hidden elements init
			if($('.gt-hidden-section').length) this.modules.hiddenSections();

			// close btn init
			if($('.gt-close').length) this.modules.closeBtn();
			if($('.gt-shopping-cart-full').length) this.modules.removeProduct();

			// init view types (product boxes)
			if($('[data-view]').length) this.modules.viewTypes();

			// header 3 toggle nav
			if($('.gt-toggle-nav').length) this.modules.showHideNav();

			// contactform init
			if($('.gt-contact-form').length) this.modules.contactForm.init();

			//subscribe form init
			if($('.gt-subscribe').length) this.modules.subscribeForm.init();

			// display settings for percentage element
			if($('.gt-progress-bars-holder.type-4').length) this.templateHelpers.nowrapProgressBars.check();

			// back to top button init
			this.modules.backToTop({
				easing: 'easeOutQuint',
				speed: 550,
				cssPrefix: 'gt-'
			});

			// prealoader init
			if($('#preloader').length) this.modules.preloader({
				waitAfterLoad: 1500
			});

		},

		/**
		 * 
		 * @return undefined;
		 **/
		outerResourcesLoaded: function(){

			// breadcrumbs outer offset init
			if($('#header.gt-fixed').length) this.templateHelpers.breadCrumbsOffset();

			// dropcap style 3 init
			if($('.gt-dropcap.gt-type-3').length) this.templateHelpers.canvasDropcap();

			// init animation for progress bars
			if($('.gt-progress-bars-holder').length) this.modules.animatedProgressBars.init({
				speed: 800,
				easing: 'easeOutQuart'
			});

			// init animation for counters
			if($('.gt-counters-holder').length) this.modules.animatedCounters.init();

			// synchronizes owl carousel
			if($('.owl-carousel[data-sync]').length) this.modules.syncOwlCarousel.init();

			// google maps init
			if($('.gt-gmap').length) this.modules.googleMaps.init();

			// isotope
			if($('.gt-isotope-container').length) this.modules.isotope.init();

			// rating
			if($('.gt-rating').length) this.modules.rating();

			// animated content
			if($('[data-animation]').length) this.modules.animatedContent(200);

			if($('.gt-fullscreen-layout-type').length) this.templateHelpers.fullScreenLayout.init();
			if($('.gt-media-holder.gt-fullscreen').length) this.templateHelpers.fullScreenMediaHolder.init();

			// dim header init
			if($('#header.gt-dim.gt-fixed, #header.gt-transparent').length) this.modules.fixedDimHeader();

		},

		jQueryExtend: function(){

			$.fn.extend({

				gatsbyImagesLoaded : function () {

					var $imgs = this.find('img[src!=""]');

					if (!$imgs.length) {return $.Deferred().resolve().promise();}

					var dfds = [];

					$imgs.each(function(){
						var dfd = $.Deferred();
						dfds.push(dfd);
						var img = new Image();
						img.onload = function(){dfd.resolve();}
						img.onerror = function(){dfd.resolve();}
						img.src = this.src;
					});

					return $.when.apply($,dfds);

				}

			});

		},

		modules: {

			/**
			 * Initialize main navigation
			 * @return undefined;
			 **/
			navigation: function(){

				var navigation = {

					init: function(){

						this.navigation = $('.gt-navigation');
						this.bindEvents();
						this.menuBtn = null;

						if($(window).width() < 768) this.insertMenuBtn();

					},

					bindEvents: function(){

						var self = this,
							$w = $(window);

						this.navigation.on('mouseenter.smart', 'li[class*="gt-has-"]', this.smartPosition);
						this.navigation.on('mouseleave.smart', '.gt-dropdown', this.resetSmartPosition);
						this.navigation.on('click.mobilenav', 'li[class*="gt-has-"] > a', {self: this}, this.linkRouter);

						$(document).on('click.mobilefocusout', function(e){

							if(!$(e.target).closest(self.navigation).length && !$(e.target).hasClass('gt-nav-btn')) self.cleanMenu();
						});

						$w.on('resize.navigation', function(){
							self.cleanMenu();
							if(!self.menuBtn && $w.width() < 768) self.insertMenuBtn();
						});

					},

					smartPosition: function(e){

						var $this = $(this),
							$wW = $(window).width();

						if($wW < 768) return false;

						var child = $this.children('.gt-dropdown'),
							transformCoeficient = child.outerWidth() - child.outerWidth() * .85;

						if($.gatsbyCore.ISRTL){

							if(child.offset().left - transformCoeficient < 0) child.addClass('gt-reverse');

						}
						else{
							var posX = child.offset().left,
								oW = child.outerWidth();

							if(posX + oW > $wW) child.addClass('gt-reverse');
						}

						e.preventDefault();

					},

					resetSmartPosition: function(e){

						var $this = $(this),
							$wW = $(window).width();

						if($wW < 768) return false;

						setTimeout(function(){
							$this.find('.gt-reverse').removeClass('gt-reverse');
						}, 350);

					},

					linkRouter: function(e){

						var $wW = $(window).width(),
							self = e.data.self;

						if($wW >= 768 && $wW <= 1280){
							self.tabletHandler.call($(this), e);
						}
						else if($wW < 768){
							self.mobileHandler.call($(this), e);
						}

					},

					tabletHandler: function(e){

						var $this = $(this);

						if(!$this.hasClass('gt-prevented')){

							$this.addClass('gt-prevented');
							e.preventDefault();

							$this
								.parent('li')
								.addClass('gt-t-active')
								.siblings('li')
								.removeClass('gt-t-active')
								.children('a')
								.removeClass('gt-prevented');

						}

					},

					mobileHandler: function(e){

						var $this = $(this);

						if(!$this.hasClass('gt-prevented')){

							e.preventDefault();

							$this
								.addClass('gt-prevented')
								.next('.gt-dropdown')
								.stop()
								.slideDown()
								.parent()
								.addClass('gt-m-active')
								.siblings()
								.removeClass('gt-m-active')
								.children('a')
								.removeClass('gt-prevented')
								.next('.gt-dropdown')
								.stop()
								.slideUp();

						}

					},

					cleanMenu: function(){

						this.navigation.find('.gt-prevented, .gt-m-active, .gt-t-active').removeClass('gt-prevented gt-m-active gt-t-active');

					},

					insertMenuBtn: function(){

						var self = this;

						this.menuBtn = $('<button></button>', {
							class: 'gt-nav-btn'
						});

						this.menuBtn.on('click', function(){

							$(this).toggleClass('gt-active');

							self.navigation
								.stop()
								.slideToggle();

						});

						this.menuBtn.insertBefore(this.navigation);

					}

				}

				navigation.init();

			},

			showHideNav: function(){

				var btn = $('.gt-toggle-nav');
				if(!btn.length) return;

				btn.on('click', function(e){

					e.preventDefault();

					var navigation = $('.gt-navigation.gt-animated-nav');

					if(navigation.length){
						$(this).toggleClass('gt-active');
						navigation.toggleClass('gt-nav-hidden');
					}

				});

			},

			/**
			 * Initialize compressed forms
			 **/
			compressedForm: {

				init: function(collection){

					this.collection = collection ? collection : $('form.gt-compressed');
					this.collection.addClass('gt-f-hide');

					this.bindEvents();

				},

				bindEvents: function(){

					this.collection.on('mouseenter', function(e){

						$(this).removeClass('gt-f-hide');

					});

					this.collection.on('mouseleave', function(e){

						var $this = $(this);

						if($this.hasClass('gt-focused') || $.gatsbyCore.ISTOUCH) return false;

						$this.addClass('gt-f-hide');

					});

					this.collection.on('focus', 'input', function(e){

						$(this).closest('.gt-compressed').addClass('gt-focused');

					});

					this.collection.on('blur', 'input', function(e){

						var form = $(this).closest('.gt-compressed');

						form.addClass('gt-f-hide').removeClass('gt-focused');

						if(!$(e.relatedTarget).closest('.gt-compressed').length) form.removeClass('gt-prevented');

					});

					if($.gatsbyCore.ISTOUCH){

						this.collection.on('submit', function(e){

							var $this = $(this);

							if(!$this.hasClass('gt-prevented')){

								e.preventDefault();
								$this.removeClass('gt-f-hide').addClass('gt-prevented');


							}

						});

					}

				}

			},

			/**
			 * Initializes dropdown module
			 * @return Object Core;
			 **/
			dropdown: function(){

				var dropdown = {

					init: function(){

						this.bindEvents();

					},

					bindEvents: function(){

						var self = this;

						$('body').on('click', '.gt-dropdown-invoker', function(e){

							e.preventDefault();
							e.stopPropagation();

							var invoker = $(this),
								dropdown = invoker.next('.gt-dropdown');

							self.smartPosition(dropdown);
							
							invoker.add(dropdown).toggleClass('gt-opened');
							dropdown.parent().toggleClass('gt-dropdown-over');

						});

						$(document).on('click', function(e){

							var dropdown = $('.gt-dropdown');

							if(!$(e.target).closest(dropdown).length){

								dropdown.add(dropdown.prev('.gt-dropdown-invoker')).removeClass('gt-opened');
								dropdown.parent().removeClass('gt-dropdown-over');

							}

						});

					},

					smartPosition: function(dropdown){

						var dWidth = dropdown.outerWidth(),
							dOfsset = dropdown.offset().left,
							$wW = $(window).width();

						if(dOfsset + dWidth > $wW) dropdown.addClass('gt-reverse');

					}

				}

				dropdown.init();

				return this;

			},

			/**
			 * Initialize global close event
			 * @return Object Core;
			 **/
			closeBtn: function(){

				$('body').on('click.globalclose', '.gt-close:not(.gt-shopping-cart-full .gt-close)', function(e){

					e.preventDefault();

					$(this).parent().stop().animate({
						opacity: 0
					}, function(){

						$(this).stop().slideUp(function(){

							$(this).remove();

						});

					});

				});

				return this;

			},

			removeProduct: function(collection){

				var c = collection ? collection : $('.gt-shopping-cart-full');

				c.on('click.removeProduct', '.gt-close', function(e){

					e.preventDefault();

					$(this).closest('tr').stop().fadeOut(function(){
						$(this).remove();
					});

				});

			},

			/**
			 * Page preloader
			 * @return Object modules;
			 **/
			preloader: function(options){

				var config = {
						waitAfterLoad: 1000,
						duration: 1000
					},
					loader = $('#preloader');

				$.extend(config, options);

				$('body').gatsbyImagesLoaded().then(function(){

					setTimeout(function(){

						loader.fadeOut(config.duration, function(){
							$(this).remove();
						});

					}, config.waitAfterLoad);

				});

				return this;

			},

			/**
			 * Generates back to top button
			 * @return Object Core;
			 **/
			backToTop: function(config){

				var backToTop = {

					init: function(config){
						
						var self = this;

						if(config) this.config = $.extend(this.config, config);

						this.btn = $('<button></button>', {
							class: self.config.cssPrefix + 'btn ' + self.config.cssPrefix +'icon '+self.config.cssPrefix+'back-to-top animated stealthy',
							html: '<span class="lnr lnr-chevron-up"></span>'
						});

						this.bindEvents();

						$('body').append(this.btn);

					},

					config: {
						breakpoint: 700,
						showClass: 'zoomIn',
						hideClass: 'zoomOut',
						easing: 'linear',
						speed: 500,
						cssPrefix: ''
					},

					bindEvents: function(){

						var page = $('html, body'),
							self = this;

						this.btn.on('click', function(e){

							page.stop().animate({

								scrollTop: 0

							}, {
								easing: self.config.easing,
								duration: self.config.speed
							});

						});

						this.btn.on($.gatsbyCore.ANIMATIONEND, function(e){

							e.preventDefault();
							
							var $this = $(this);

							if($this.hasClass(self.config.hideClass)){

								$this
									.addClass('stealthy')
									.removeClass(self.config.hideClass + " " + self.config.cssPrefix + "inview");

							}

						});

						$(window).on('scroll.backtotop', { self: this}, this.toggleBtn);

					},

					toggleBtn: function(e){

						var $this = $(this),
							self = e.data.self;

						if($this.scrollTop() > self.config.breakpoint && !self.btn.hasClass(self.config.cssPrefix + 'inview')){

							self.btn
									.addClass(self.config.cssPrefix + 'inview')
									.removeClass('stealthy');

							if($.gatsbyCore.ANIMATIONSUPPORTED){
								self.btn.addClass(self.config.showClass);
							}

						}
						else if($this.scrollTop() < self.config.breakpoint && self.btn.hasClass(self.config.cssPrefix + 'inview')){

							self.btn.removeClass(self.config.cssPrefix + 'inview');

							if(!$.gatsbyCore.ANIMATIONSUPPORTED){
								self.btn.addClass('stealthy')
							}
							else{
								self.btn.removeClass(self.config.showClass)
										.addClass(self.config.hideClass);
							}

						}

					}

				}

				backToTop.init(config);

				return this;

			},

			/**
			 * Sticky header section
			 **/
			stickySection: {

				STICKYPADDING: 10,
				MAXSTICKYHEIGHT: 90,

				init: function(){

					this.body = $('body');
					this.sticky = $('#header').find('.gt-sticky');

					if(!this.sticky.length) return;

					this.bindEvents();
					this.updateDocumentState();

				},

				updateDocumentState: function(){

					this.reset();

					if($(window).width() < 768) return;

					this.sticky.removeAttr('style');

					this.stickyHeight = this.sticky.outerHeight();

					if(this.stickyHeight > this.MAXSTICKYHEIGHT){

						this.needScale = true;

						this.defPaddingTop = parseInt(this.sticky.css('padding-top'), 10);
						this.defPaddingBottom = parseInt(this.sticky.css('padding-bottom'), 10);

						this.stickyOffset = this.sticky.offset().top + this.defPaddingTop - this.STICKYPADDING;

					}
					else{

						this.needScale = false;
						this.stickyOffset = this.sticky.offset().top;

					}					

					$(window).trigger('scroll.sticky');

				},

				reset: function(){

					var $w = $(window);

					this.sticky.removeClass('gt-sticked');
					this.freeSpace();

					if($w.width() < 768 && this.hasEvents){

						var spacer = this.sticky.siblings('.gt-sticky-spacer');
						if(spacer.length) spacer.remove();

						$w.off('scroll.sticky');
						this.hasEvents = false;

						return;

					}
					else if($w.width() >= 768 && !this.hasEvents){

						$w.on('scroll.sticky', {self: this}, this.scrollHandler);
						this.hasEvents = true;

					}

				},

				bindEvents: function(){

					var $w = $(window),
						self = this;

					$w.on('scroll.sticky', {self: this}, this.scrollHandler);
					$w.on('resize.sticky', function(){

						if(self.resizeTimeoutId) clearTimeout(self.resizeTimeoutId);

						self.resizeTimeoutId = setTimeout(function(){

							self.updateDocumentState();

						}, 100);

					});
					self.hasEvents = true;

				},

				scrollHandler: function(e){

					var $w = $(this),
						self = e.data.self;

					if($w.scrollTop() > self.stickyOffset && !self.sticky.hasClass('gt-sticked')){

						self.sticky.addClass('gt-sticked');

						if(self.needScale){

							self.sticky.css({
								'padding-top': self.STICKYPADDING,
								'padding-bottom': self.STICKYPADDING
							});

						}

						self.fillSpace();

					}
					else if($w.scrollTop() <= self.stickyOffset && self.sticky.hasClass('gt-sticked')){

						self.sticky.removeClass('gt-sticked');

						if(self.needScale){
						
							self.sticky.css({
								'padding-top': self.defPaddingTop,
								'padding-bottom': self.defPaddingBottom
							});

						}

						self.freeSpace();

					}

				},

				fillSpace: function(){

					var self = this,
						parent = self.sticky.parent(),
						spacer = parent.children('.gt-sticky-spacer');

					if(spacer.length){
						spacer.show().css('height', self.stickyHeight);
						return false;
					}
					else{

						spacer = $('<div></div>', {
							class: 'gt-sticky-spacer',
							style: 'height:' + self.stickyHeight + 'px'
						});

						parent.prepend(spacer);

					}

				},

				freeSpace: function(){

					var self = this,
						parent = self.sticky.parent(),
						spacer = parent.children('.gt-sticky-spacer');

					if(spacer.length) spacer.hide();

				}

			},

			/**
			 * Changes header background when scrolling
			 * @return Object Core;
			 **/
			fixedDimHeader: function(){

				var dH = {

					init: function(){

						this.header = $('#header.gt-dim.gt-fixed, #header.gt-transparent');
						this.pageContentWrap = $('.gt-page-content-wrap');

						this.breakpoint = 50;

						if(!this.pageContentWrap.length) return false;

						this.bindEvents();
						// this.updateDocumentState();

						$(window).trigger('scroll.fixedDimHeader');

					},

					updateDocumentState: function(){

						// this.breakpoint = this.pageContentWrap.offset().top - this.header.outerHeight();

					},

					bindEvents: function(){

						var $w = $(window),
							self = this;

						$w.on('scroll.fixedDimHeader', {self: this}, this.scrollHandler);
						// $w.on('resize.fixedDimHeader', function(){ self.updateDocumentState(); });

					},

					reset: function(){

						this.header.removeClass('gt-over');

					},

					scrollHandler: function(e){

						var $this = $(this),
							self = e.data.self;

						if($this.width() < 768){
							self.reset();
							return false;
						}

						if($this.scrollTop() > self.breakpoint && !self.header.hasClass('gt-over')){
							self.header.addClass('gt-over');
						}
						else if($this.scrollTop() <= self.breakpoint && self.header.hasClass('gt-over')){
							self.header.removeClass('gt-over');
						}

					}

				}

				dH.init();

				return this;

			},

			animatedProgressBars: {

				init: function(config){

					this.collection = $('.gt-pbar');
					if(!this.collection.length) return;

					this.holdersCollection = $('.gt-progress-bars-holder');
					this.w = $(window);

					this.preparePBars();

					$.extend(this.config, config);

					this.updateDocumentState();

					this.w.on('resize.animatedprogressbars', this.updateDocumentState.bind(this));

					this.w.on('scroll.animatedprogressbars', {self: this}, this.scrollHandler);

					this.w.trigger('scroll.animatedprogressbars');

				},

				config: {
					speed: $.fx.speed,
					easing: 'linear'
				},

				updateDocumentState: function(){

					this.breakpoint = this.w.height() / 1.4;

				},

				preparePBars: function(){

					this.collection.each(function(i, el){

						var $this = $(el),
							indicator = $this.children('.gt-pbar-inner'),
							value = $this.data('value');

						$this.add(indicator).data('r-value', value);
						$this.add(indicator).attr('data-value', 0);

						indicator.css('width', 0);

					});

				},

				scrollHandler: function(e){

					var self = e.data.self;

					self.holdersCollection.each(function(i, el){

						var holder = $(el);

						if(self.w.scrollTop() + self.breakpoint >= holder.offset().top && !holder.hasClass('gt-animated')){

							self.animateAllBarsIn(holder);
							holder.addClass('gt-animated');

							if(i === self.holdersCollection.length - 1) self.destroy();

						}

					});


				},

				animateAllBarsIn: function(holder){

					var self = this,
						pbarsCollection = holder.find('.gt-pbar');

					pbarsCollection.each(function(i, el){

						var pbar = $(el),
							indicator = pbar.children('.gt-pbar-inner'),
							value = pbar.data('r-value'),
							pbarWidth = pbar.outerWidth();

						indicator.stop().animate({
							width: value + '%'
						}, {
							duration: self.config.speed,
							easing: self.config.easing,
							step: function(now){
								pbar.add(indicator).attr('data-value', Math.round(now));
							},
							complete: function(){
								setTimeout(function(){
									$.gatsbyCore.templateHelpers.nowrapProgressBars.check();
								}, 0);
							}
						});

					});

				},

				destroy: function(){

					this.w.off('scroll.animatedprogressbars');

				}

			},

			animatedCounters: {

				init: function(){

					this.collection = $('.gt-counter');
					if(!this.collection.length) return;

					this.w = $(window);

					this.prepareCounters();
					this.updateDocumentState();

					this.w.on('scroll.animatedcounter', {self: this}, this.scrollHandler);
					this.w.on('resize.animatedcounter', this.updateDocumentState.bind(this));

					this.w.trigger('scroll.animatedcounter');

				},

				updateDocumentState: function(){

					this.breakpoint = this.w.height() / 1.4;

				},

				prepareCounters: function(){

					this.collection.each(function(i, el){

						var $this = $(el),
							value = $this.data('value');

						$this.data('r-value', value);
						$this.attr('data-value', 0);

					});

				},

				scrollHandler: function(e){

					var self = e.data.self;

					self.collection.each(function(i, el){

						var counter = $(el);

						if(self.w.scrollTop() + self.breakpoint > counter.offset().top && !counter.hasClass('gt-animated')){

							counter.addClass('gt-animated');
							self.animateCounter(counter);

							if(i === self.collection.length - 1) self.destroy();

						}

					});

				},

				animateCounter: function(counter){

					var value = counter.data('r-value'),
						intId, currentValue = 0;

					intId = setInterval(function(){

						counter.attr('data-value', ++currentValue);

						if(currentValue === value) clearInterval(intId);

					}, 4);

				},

				destroy: function(){

					this.w.off('scroll.animatedcounter');
					this.w.off('resize.animatedcounter');

				}

			},

			syncOwlCarousel: {

				init: function(){

					this.collection = $('.owl-carousel[data-sync]');
					if(!this.collection.length) return false;

					this.bindEvents();

				},

				bindEvents: function(){

					var self = this;

					this.collection.each(function(i, el){

						var $this = $(el),
							sync = $($this.data('sync'));

						if(!sync.length){
							console.log('Not found carousel with selector ' + $this.data('sync'));
							return;
						}

						// nav
						$this.on('click', '.owl-prev', function(e){
							sync.trigger('prev.owl.carousel');
						});
						$this.on('click', '.owl-next', function(e){
							sync.trigger('next.owl.carousel');
						});

						sync.on('click', '.owl-prev', function(e){
							$this.trigger('prev.owl.carousel');
						});
						sync.on('click', '.owl-next', function(e){
							$this.trigger('next.owl.carousel');
						});

						// // drag 
						$this.on('dragged.owl.carousel', function(e){

							if(e.relatedTarget.state.direction == 'left'){
								sync.trigger('next.owl.carousel');
							}
							else{
								sync.trigger('prev.owl.carousel');
							}

						});

						sync.on('dragged.owl.carousel', function(e){

							if(e.relatedTarget.state.direction == 'left'){
								$this.trigger('next.owl.carousel');
							}
							else{
								$this.trigger('prev.owl.carousel');
							}

						});

					});

				}

			},

			isotope: {

				baseInitConfig: {
					itemSelector: '.gt-col',
					transitionDuration: '0.5s'
				},

				init: function(){

					var self = this;

					this.collection = $('.gt-isotope-container');
					if(!this.collection.length) return false;

					this.baseInitConfig.isOriginLeft = !$.gatsbyCore.ISRTL;

					this.collection.each(function(i, el){

						var $this = $(this),
							layout = $this.data('masonry') ? 'masonry' : 'fitRows';

						$this.gatsbyImagesLoaded().then(function(){

							self.initFilter($this);
							self.initLoadMore($this);

							$this.isotope($.extend({}, self.baseInitConfig, {
								layoutMode: layout,
								percentPosition: layout === 'masonry',
								masonry: {
									columnWidth: '.gt-grid-sizer'
								}
							}));

							$this.addClass('gt-initialized'); // important for owl carousels inside

						});

					});

				},

				initFilter: function(container){

					var dataFilter = container.data('filter-el');

					if(!dataFilter) return;

					var filter = $(dataFilter);

					filter.on('click', '[data-filter]', function(e){

						var $this = $(this),
							category = $this.data('filter');

						$this
							.addClass('gt-active')
							.parent()
							.siblings()
							.children()
							.removeClass('gt-active');

						e.preventDefault();
						container.isotope({filter: category});

					});

				},

				initLoadMore: function(container){

					var self = this,
						dataBtn = container.data('load-more-btn');

					if(!dataBtn) return;

					var btn = $(dataBtn);

					btn.on('click', function(e){

						e.preventDefault();

						var $this = $(this),
							handler = container.data('ajax-handler');

						self.showLoader($this);

						if(!handler) return false;

						$.ajax({
							url: handler,
							dataType: 'json',
							cache: false // dev only
						})
						.done(function(response){
							self.hideLoader($this);
							self.insertNewItems(response.items, container);
						})
						.fail(function(response){

							self.hideLoader($this);
							$.gatsbyCore.templateHelpers.showAlertBox({
								type: 1,
								status: 'fail',
								message: response.status + ' ' + response.statusText,
								relativeElement: $this,
								icon: 'warning',
								delay: 4000
							});

						});

					});

				},

				insertNewItems: function(items, container){

					var self = this,
						holder = container.data('holder-type'),
						newItems = [];

					$.each(items, function(i, obj){

						var catsClasses = [];

						$.each(obj.categories, function(i, category){
							catsClasses.push(category.name.replace(' ', '-').toLowerCase());
						});

						obj.catsClasses = catsClasses.join(" ");

						// portfolio
						if(holder === 'portfolio'){

							newItems.push($(Handlebars.compile(self.templates['portfolio'])(obj)));

						}
						// blog
						else if(holder === 'blog'){

							var template = self.templates['blog'][obj.post_format];

							newItems.push($(Handlebars.compile(template)(obj)));

						}

						

					});

					container
						.append(newItems)
						.isotope('appended', container.children().not('[style]'));
						
					container.gatsbyImagesLoaded()
					.then(function(){

						// if owl carousel has been added to isotope container
						var carousels = container.find('.owl-carousel:not(.owl-loaded)');
						if(carousels.length){
							carousels.owlCarousel($.extend({}, $.gatsbyCore.baseOwlConfig, {
								dots: false,
								items: 1,
								animateIn: 'flipInX',
								animateOut: 'fadeOut',
								nav: true,
								autoplay: false,
								rtl: $.gatsbyCore.ISRTL
							}));
							$.gatsbyCore.templateHelpers.owlAdaptive(carousels);
						}

						// if items with dynamic background were added to isotope container
						var bgItems = container.find('[data-bg]:not([style*="background-image"])');
						if(bgItems.length){
							$.gatsbyCore.templateHelpers.bg(bgItems);
						}

						// if items with audio player were added to isotope container
						var audio = container.find('audio:not([style*="display:none"])');
						if(audio.length) audio.WTAudio();

						container.isotope('layout');

						if(container.children().length >= container.data('max-items')){
							self.hideLoadMoreBtnFor(container);
						}
					});

				},

				templates: {
					portfolio:  '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<div class="gt-project">\
								<div class="gt-project-image">\
									<img src="{{thumb_src}}" alt="{{project_title}}">\
									<a href="{{project_link}}" class="gt-project-link"></a>\
									{{#if actions_in_image_area}}\
									<ul class="gt-project-actions">\
										<li><a class="gt-project-action fancybox" href="{{thumb_src}}"><span class="lnr lnr-magnifier"></span></a></li>\
										<li><a class="gt-project-action" href="{{project_link}}"><span class="lnr lnr-link"></span></a></li>\
									</ul>\
									{{/if}}\
								</div>\
								<div class="gt-project-description">\
									<div class="gt-description-inner">\
										<h6 class="gt-project-title"><a href="{{project_link}}">{{project_title}}</a></h6>\
										<ul class="gt-project-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
										{{#if actions_in_description_area}}\
										<ul class="gt-project-actions">\
											<li><a class="gt-project-action fancybox" href="{{thumb_src}}"><span class="lnr lnr-magnifier"></span></a></li>\
											<li><a class="gt-project-action" href="{{project_link}}"><span class="lnr lnr-link"></span></a></li>\
										</ul>\
										{{/if}}\
									</div>\
								</div>\
							</div>\
						</div>',
					blog: {
						// image post format
						image: '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<article class="gt-entry gt-image-entry-format">\
								<div class="gt-entry-attachment">\
									<a class="gt-thumbnail-attachment" href="{{post_permalink}}"><img src="{{thumb_src}}" alt="{{post_title}}"></a>\
								</div>\
								<div class="gt-entry-body">\
									{{#if show_categories}}\
										<ul class="gt-entry-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
									{{/if}}\
									<h6 class="gt-entry-title"><a href="{{post_permalink}}">{{post_title}}</a></h6>\
									{{#if post_excerpt}}<div class="gt-entry-excerpt">{{post_excerpt}}</div>{{/if}}\
									<div class="gt-entry-meta">\
										<time class="gt-entry-date" datetime="{{post_date_formatted}}">{{post_date}}</time>\
										<a class="gt-entry-comments-link" href="{{post_comments_link}}">{{post_comments}}</a>\
									</div>\
								</div>\
							</article>\
						</div>',
						// slideshow post format
						slideshow: '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<article class="gt-entry gt-slideshow-entry-format">\
								<div class="gt-entry-attachment">\
									<div class="owl-carousel gt-entry-carousel">{{#images}}<img src="{{src}}" alt="{{alt}}">{{/images}}</div>\
								</div>\
								<div class="gt-entry-body">\
									{{#if show_categories}}\
										<ul class="gt-entry-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
									{{/if}}\
									<h6 class="gt-entry-title"><a href="{{post_permalink}}">{{post_title}}</a></h6>\
									{{#if post_excerpt}}<div class="gt-entry-excerpt">{{post_excerpt}}</div>{{/if}}\
									<div class="gt-entry-meta">\
										<time class="gt-entry-date" datetime="{{post_date_formatted}}">{{post_date}}</time>\
										<a class="gt-entry-comments-link" href="{{post_comments_link}}">{{post_comments}}</a>\
									</div>\
								</div>\
							</article>\
						</div>',
						// video post format
						video: '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<article class="gt-entry gt-video-entry-format">\
								<div class="gt-entry-attachment">\
									<div class="gt-responsive-iframe">\
										<iframe src="{{video_src}}"></iframe>\
									</div>\
								</div>\
								<div class="gt-entry-body">\
									{{#if show_categories}}\
										<ul class="gt-entry-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
									{{/if}}\
									<h6 class="gt-entry-title"><a href="{{post_permalink}}">{{post_title}}</a></h6>\
									{{#if post_excerpt}}<div class="gt-entry-excerpt">{{post_excerpt}}</div>{{/if}}\
									<div class="gt-entry-meta">\
										<time class="gt-entry-date" datetime="{{post_date_formatted}}">{{post_date}}</time>\
										<a class="gt-entry-comments-link" href="{{post_comments_link}}">{{post_comments}}</a>\
									</div>\
								</div>\
							</article>\
						</div>',
						// link post format
						link: '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<article class="gt-entry gt-link-entry-format">\
								<div class="gt-entry-attachment">\
									<a href="{{link}}" class="gt-link-attachment" data-bg="{{link_area_bg}}">\
										<span class="gt-link-attachment-inner">\
											<span class="lnr lnr-{{link_area_icon}}"></span><span class="gt-link-inner">{{link_text}}</span>\
										</span>\
									</a>\
								</div>\
								<div class="gt-entry-body">\
									{{#if show_categories}}\
										<ul class="gt-entry-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
									{{/if}}\
									<h6 class="gt-entry-title"><a href="{{post_permalink}}">{{post_title}}</a></h6>\
									{{#if post_excerpt}}<div class="gt-entry-excerpt">{{post_excerpt}}</div>{{/if}}\
									<div class="gt-entry-meta">\
										<time class="gt-entry-date" datetime="{{post_date_formatted}}">{{post_date}}</time>\
										<a class="gt-entry-comments-link" href="{{post_comments_link}}">{{post_comments}}</a>\
									</div>\
								</div>\
							</article>\
						</div>',
						// audio post format
						audio: '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<article class="gt-entry gt-audio-entry-format">\
								<div class="gt-entry-attachment">\
									<audio controls src="{{path_to_audio_file}}"></audio>\
								</div>\
								<div class="gt-entry-body">\
									{{#if show_categories}}\
										<ul class="gt-entry-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
									{{/if}}\
									<h6 class="gt-entry-title"><a href="{{post_permalink}}">{{post_title}}</a></h6>\
									{{#if post_excerpt}}<div class="gt-entry-excerpt">{{post_excerpt}}</div>{{/if}}\
									<div class="gt-entry-meta">\
										<time class="gt-entry-date" datetime="{{post_date_formatted}}">{{post_date}}</time>\
										<a class="gt-entry-comments-link" href="{{post_comments_link}}">{{post_comments}}</a>\
									</div>\
								</div>\
							</article>\
						</div>',
						// quote post format
						quote: '\
						<div class="gt-col {{#if size}} gt-{{size}} {{/if}} {{catsClasses}}">\
							<article class="gt-entry gt-quote-entry-format">\
								<div class="gt-entry-attachment">\
									<a href="{{post_permalink}}" class="gt-entry-link"></a>\
									<div class="gt-blockquote-attachment" data-bg="{{blockquote_area_bg}}">\
										<div class="gt-blockquote-attachment-inner">\
											<blockquote>{{quote}}</blockquote>\
											<div class="gt-author">{{author}}</div>\
										</div>\
									</div>\
								</div>\
								<div class="gt-entry-body">\
									{{#if show_categories}}\
										<ul class="gt-entry-cats">{{#categories}}<li><a href="{{link}}">{{name}}</a></li>{{/categories}}</ul>\
									{{/if}}\
									<h6 class="gt-entry-title"><a href="{{post_permalink}}">{{post_title}}</a></h6>\
									{{#if post_excerpt}}<div class="gt-entry-excerpt">{{post_excerpt}}</div>{{/if}}\
									<div class="gt-entry-meta">\
										<time class="gt-entry-date" datetime="{{post_date_formatted}}">{{post_date}}</time>\
										<a class="gt-entry-comments-link" href="{{post_comments_link}}">{{post_comments}}</a>\
									</div>\
								</div>\
							</article>\
						</div>'
					}
				},

				showLoader: function(relativeElement){

					if(relativeElement === undefined || !relativeElement.length) return false;

					relativeElement.addClass('gt-isotope-loading');

				},

				hideLoader: function(relativeElement){

					if(relativeElement === undefined || !relativeElement.length) return false;

					relativeElement.removeClass('gt-isotope-loading');

				},

				hideLoadMoreBtnFor: function(container){

					var btn = $(container.data('load-more-btn'));

					btn.slideUp(function(){

						var $this = $(this),
							parent = $this.parent('.aligncenter');

						$this.add(parent).remove();

					});

				}

			},

			/**
			 * Google Maps
			 * Requires: maplace-0.1.3.min.js
			 **/
			googleMaps: {

				config: {

					map_options: {
						zoom: 16,
						scrollwheel: false,
						styles: [
							{
								"featureType": "administrative.land_parcel",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "landscape.man_made",
								"elementType": "all",
								"stylers": [
									{
									"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi",
								"elementType": "labels",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "road",
								"elementType": "labels",
								"stylers": [
									{
										"visibility": "simplified"
									},
									{
										"lightness": 20
									}
								]
							},
							{
								"featureType": "road.highway",
								"elementType": "geometry",
								"stylers": [
									{
										"hue": "#f49935"
									}
								]
							},
							{
								"featureType": "road.highway",
								"elementType": "labels",
								"stylers": [
									{
										"visibility": "simplified"
									}
								]
							},
							{
								"featureType": "road.arterial",
								"elementType": "geometry",
								"stylers": [
									{
										"hue": "#fad959"
									}
								]
							},
							{
								"featureType": "road.arterial",
								"elementType": "labels",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "road.local",
								"elementType": "geometry",
								"stylers": [
									{
										"visibility": "simplified"
									}
								]
							},
							{
								"featureType": "road.local",
								"elementType": "labels",
								"stylers": [
									{
										"visibility": "simplified"
									}
								]
							},
							{
								"featureType": "transit",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "water",
								"elementType": "all",
								"stylers": [
									{
										"hue": "#a1cdfc"
									},
									{
										"saturation": 30
									},
									{
										"lightness": 49
									}
								]
							}
						]
					},
					locations: [
						{
							lat: 40.7707307,
							lon: -74.0210859,
							icon: 'images/marker.png',
							title: 'Main office'
						}
					],
					generate_controls: false,
					controls_on_map: false,
					view_all: false

				},

				init: function(config){

					var self = this;

					this.collection = $('.gt-gmap');
					if(!this.collection.length) return;

					this.MapPlaceCollection = [];

					if(config) $.extend(this.config, config);

					this.collection.each(function(i, el){

						var $this = $(el),
							options = {};

						if($this.data('locations')) console.log($this.data('locations')); options.locations = $this.data('locations');

						options.map_div = '#' + $this.attr('id');
						self.MapPlaceCollection.push(new Maplace($.extend({}, self.config, options)).Load());

					});

					this.bindEvents();

				},

				bindEvents: function(){

					var self = this;

					$(window).on('resize.map', function(){

						if(self.mapTimeoutId) clearTimeout(self.mapTimeoutId);

						self.mapTimeoutId = setTimeout(function(){

							self.MapPlaceCollection.forEach(function(elem, index, arr){
								elem.Load();
							});

						}, 100);

					});

				}

			},

			/**
			 * Contact Form
			 * Requires: handlebars v4.0.5.js
			 **/
			contactForm: {

				init: function(){

					this.collection = $('.gt-contact-form');
					if(!this.collection.length) return false;

					var form = this.collection[0];

					this.validator = new Validator({
						form: form,
						cssPrefix: 'gt-',
						incorrectClass: 'invalid',
						rules: [
							{
								element: form.elements.cf_name,
								rules: {
									empty: null
								}
							},
							{
								element: form.elements.cf_email,
								rules: {
									empty: null,
									pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
								}
							},
							{
								element: form.elements.cf_message,
								rules: {
									min: 20
								}
							}
						],
						onIncorrect: function(errorsList){

							var $this = $(this);

							$.gatsbyCore.templateHelpers.showAlertBox({
								type: 1,
								status: 'fail',
								icon: 'warning',
								message: errorsList,
								relativeElement: $this,
								delay: 4000
							});

						},
						onCorrect: function(){

							var $this = $(this);

							console.log("THIS: ", $this.serialize())

							$.ajax({
								// type: 'POST',
								method: 'POST',
								url: 'https://formspree.io/mrgyywab',
								// dataType: 'json',
								data: $this.serialize(),
								// url: 'php/contactform_handler.php',
								cache: false
							}).done(function(response){

								if(response.status == 'success'){

									$.gatsbyCore.templateHelpers.showAlertBox({
										type: 1,
										status: 'success',
										icon: 'checkmark-circle',
										message: response.statusText,
										relativeElement: $this,
										delay: 4000
									});

									$this.find('input:not([type="submit"]):not([type="radio"]):not([type="checkbox"]), textarea').val('');

								}

								if(response.status == 'fail'){

									$.gatsbyCore.templateHelpers.showAlertBox({
										type: 1,
										status: 'fail',
										icon: 'warning',
										message: response.errors,
										relativeElement: $this,
										delay: 4000
									});

								}

							}).fail(function(response){

								$.gatsbyCore.templateHelpers.showAlertBox({
									type: 1,
									status: 'fail',
									icon: 'warning',
									message: response.status + ' ' + response.statusText,
									relativeElement: $this,
									delay: 4000
								});

							});

						}
					});	

				}

			},

			/**
			 * Subscribe Form
			 * Requires: handlebars v4.0.5.js
			 **/
			subscribeForm: {

				init: function(){

					this.collection = $('.gt-subscribe');
					if(!this.collection.length) return false;

					var form = this.collection[0];

					this.validator = new Validator({
						form: form,
						cssPrefix: 'gt-',
						incorrectClass: 'invalid',
						rules: [
							{
								element: form.elements.subscribe_email,
								rules: {
									empty: null,
									pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
								}
							}
						],
						onIncorrect: function(errorsList){

							var $this = $(this);

							$.gatsbyCore.templateHelpers.showAlertBox({
								type: 2,
								status: 'fail',
								icon: 'warning',
								message: errorsList,
								relativeElement: $this,
								delay: 4000
							});

						},
						onCorrect: function(){

							var $this = $(this);

							$.ajax({
								type: 'POST',
								dataType: 'json',
								data: $this.serialize(),
								url: 'php/subscribe_handler.php',
								cache: false
							}).done(function(response){

								if(response.status == 'success'){

									$.gatsbyCore.templateHelpers.showAlertBox({
										type: 2,
										status: 'success',
										icon: 'checkmark-circle',
										message: response.statusText,
										relativeElement: $this,
										delay: 4000
									});

									$this.find('input:not([type="submit"]):not([type="radio"]):not([type="checkbox"]), textarea').val('');

								}

								if(response.status == 'fail'){

									$.gatsbyCore.templateHelpers.showAlertBox({
										type: 2,
										status: 'fail',
										icon: 'warning',
										message: response.errors,
										relativeElement: $this,
										delay: 4000
									});

								}

							}).fail(function(response){

								$.gatsbyCore.templateHelpers.showAlertBox({
									type: 2,
									status: 'fail',
									icon: 'warning',
									message: response.status + ' ' + response.statusText,
									relativeElement: $this,
									delay: 4000
								});

							});

						}
					});	

				}

			},

			/**
			 * Initialize rating boxes
			 * @return jQuery ratings;
			 **/
			rating : function(collection){

				var ratings = collection ? collection : $('.gt-rating');

				ratings.each(function(){

					$(this).append('<div class="gt-empty-state"></div><div class="gt-fill-state"></div>');

					var $this = $(this),
						rating = $this.data("rating"),
						fillState = $this.children('.gt-fill-state'),
						w = $this.outerWidth();

					fillState.css('width', Math.floor(rating / 5 * w));

				});

				return ratings;

			},

			/**
			 * Changes view type (product boxes)
			 * @return jQuery collection;
			 **/
			viewTypes: function(){

				var collection = $('[data-view]');
				if(!collection.length) return;

				collection.on('click', function(e){

					e.preventDefault();
					var $this = $(this),
						target = $($this.data('target'));

					$this
						.addClass('gt-active')
						.siblings()
						.removeClass('gt-active');

					target
						.removeClass('gt-view-list gt-view-grid')
						.addClass('gt-view-' + $this.data('view'));

				});

				return collection;

			},

			/**
			 * Handling animation when page has been scrolled
			 * @return jQuery collection;
			 **/
			animatedContent : function(delay){

				var collection = $('[data-animation]');
				if(!collection.length) return;

				setTimeout(function(){

					collection.addClass('gt-invisible animated');

					$("[data-animation]").each(function(){

						var self = $(this),
							scrollFactor = self.data('scroll-factor') ? self.data('scroll-factor') : -240;

						if($(window).width() > 767) {

							self.appear(function() {

								var delay = (self.attr("data-animation-delay") ? self.attr("data-animation-delay") : 1);

								if(delay > 1) self.css("animation-delay", delay + "ms");
								self.removeClass('gt-invisible').addClass("gt-visible " + self.attr("data-animation"));	
								self.on($.gatsbyCore.ANIMATIONEND, function(){
									self.addClass('gt-animation-end');
								});

							}, {accX: 0, accY: scrollFactor});

						}
						else {

							self.removeClass("gt-invisible").addClass("gt-visible");

						}

					});

				}, delay ? delay : 0);

				return collection;

			},

			/**
			 * Emulates quantity fields
			 * @return jQuery collection;
			 **/
			qty: function(){

				var collection = $('.gt-qty');
				if(!collection.length) return null;

				collection.on('click.qty', '[class*="gt-qty-btn"]', function(){

					var $this = $(this),
						input = $this.siblings('input'),
						currentVal = input.val();

					if($this.hasClass('gt-qty-btn-up')){

						input.val(++currentVal);

					}
					else if($this.hasClass('gt-qty-btn-down')){

						if(currentVal < 0){
							input.val(1);
							return false;
						}

						if(currentVal == 1) return false;

						input.val(--currentVal);

					}

				});

				return collection;

			},

			/**
			 * Emulates single accordion item
			 * @param Function callback
			 * @return jQuery collection;
			 **/
			hiddenSections: function(callback){

				var collection = $('.gt-hidden-section');
				if(!collection.length) return;

				collection.each(function(i, el){
					$(el).find('.gt-content').hide();
				});

				collection.on('click.hidden', '.gt-invoker', function(e){

					e.preventDefault();

					var content = $(this).closest('.gt-hidden-section').find('.gt-content');

					content.slideToggle({
						duration: $.gatsbyCore.TRANSITIONDURATION,
						easing: 'easeOutQuint',
						complete: callback ? callback : function(){}
					});

				});


				return collection;

			}

		},

		templateHelpers: {

			showAlertBox: function(data){

				var template = '<div style="display:none" class="gt-alert-box gt-type-{{type}} gt-{{status}}">\
									<div class="gt-alert-box-inner">\
										{{#if icon}}\
											<span class="gt-icon">\
												<span class="lnr lnr-{{icon}}"></span>\
											</span>\
										{{/if}}\
										{{message}}\
									</div>\
								</div>';

				var ready = $(Handlebars.compile(template)(data));

				data.relativeElement.after(ready);

				ready.slideDown({
					duration: $.gatsbyCore.TRANSITIONDURATION,
					easing: 'easeOutQuint',
					complete: function(){

						if(data.delay){

							$(this).delay(data.delay).slideUp({
								duration: $.gatsbyCore.TRANSITIONDURATION,
								easing: 'easeOutQuint',
								complete: function(){

									$(this).remove();

								}
							});

						}

					}
				});

			},

			fullWidthSectionBg: {

				init: function(){

					var self = this;

					this.collection = $('.gt-fullwidth-section-bg');
					if(!this.collection.length) return;

					this.container = $('.container');
					this.w = $('[class*="-layout-type"]');

					this.render();

					$(window).on('resize.fullwidthsection', function(){

						if(self.timer) clearTimeout(self.timer);

						self.timer = setTimeout(function(){

							self.render();

						}, 50);

					});

				},

				reset: function(){

					if(!this.collection) return;

					var bgElement = this.collection.find('.gt-bg-element');

					bgElement.css({
						'margin-left':'auto',
						'margin-right': 'auto'
					});

					this.render();

				},

				render: function(){

					var self = this;

					this.collection.each(function(i, el){

						var $this = $(el),
							out = Math.abs(self.w.offset().left - $this.offset().left) * -1,
							bgImage = $this.data('fullwidth-bg'),
							bgElement = $this.find('.gt-bg-element');

						if(!bgElement.length){

							bgElement = $('<div></div>', {
								class: 'gt-bg-element'
							});

							if(bgImage) bgElement.css('background-image', 'url(' +bgImage+ ')');

							$this.prepend(bgElement);

						};

						bgElement.css({
							'margin-left': out,
							'margin-right': out
						});

					});

				}

			},

			fullWidthSection: {

				init: function(){

					var self = this;

					this.collection = $('.gt-fullwidth-section');
					if(!this.collection.length) return;

					this.container = $('.container');
					this.w = $('[class*="-layout-type"]');

					this.render();

					$(window).on('resize.fullwidthsection', function(){

						if(self.timer) clearTimeout(self.timer);

						self.timer = setTimeout(function(){

							self.reset();

						}, 50);

					});

				},

				reset: function(){

					if(!this.collection) return;

					this.collection.css({
						'margin-left': 0,
						'margin-right': 0
					});

					this.render();

				},

				render: function(){

					var self = this;

					this.collection.each(function(i, el){

						var $this = $(el),
							out = Math.abs(self.w.offset().left - $this.offset().left) * -1

						$this.css({
							'margin-left': out,
							'margin-right': out
						});

						var isotope = $this.find('.gt-isotope-container');
						if(isotope.length) isotope.isotope('layout');

					});

				}

			},

			/**
			 * Adds background image
			 * @return undefined;
			 **/
			bg: function(collection){

				var collection = collection ? collection : $('[data-bg]');

				collection.each(function(){

					var $this = $(this),
						bg = $this.data('bg');

					if(bg) $this.css('background-image', 'url('+bg+')');

				});

			},

			/**
			 * Sets correct inner offsets in breadcrumbs (only for fixed header types)
			 * @return undefined;
			 **/
			breadCrumbsOffset: function(){

				var header = $('#header.gt-fixed, #header.gt-transparent'),
					breadcrumbs = $('.gt-breadcrumbs-wrap'),
					$w = $(window);

					breadcrumbs.css({
						'border-style': 'solid',
						'border-color': 'transparent'
					});

				function correctPosition(){

					if($w.width() < 768) return false;

					var hHeight = header.outerHeight();
					breadcrumbs.css('border-top-width', hHeight);

				}

				correctPosition();
				$(window).on('resize.breadcrumbs', correctPosition);

			},

			/**
			 * Generates drop cap
			 * @return Object Core;
			 **/
			canvasDropcap: function(){

				var canvasDropcap = {

					init: function(config){

						config = config || {};

						this.collection = $('.gt-dropcap.gt-type-3');
						this.config = $.extend(this.config, config);

						this.generateCanvas();

					},

					config: {
						font: 'Cairo',
						fontSize: '60px',
						lineHeight: '32px',
						fontWeight: 800
					},

					generateCanvas: function(){

						var self = this;

						this.collection.each(function(i, el){

							var canvas = document.createElement("canvas"),
								firstLetter = $(el).text().slice(0, 1),
								imageSrc = $(el).data('dropcap-bg');

							canvas.setAttribute('width', self.config.fontSize);
							canvas.setAttribute('height', self.config.fontSize);

							$(el).text($(el).text().slice(1));

							$(el).prepend(canvas);

							self.drowLetter(firstLetter, canvas, imageSrc);

						});

					},

					drowLetter: function(letter, canvas, imageSrc){

						var self = this,
							ctx = canvas.getContext('2d'),
							font = self.config.fontWeight + " " + self.config.fontSize + " " + self.config.font,
							img = document.createElement("img");

						img.src = imageSrc;

						img.onload = function(){
							ctx.font = font;
							ctx.fillStyle = ctx.createPattern(img, 'repeat');
							ctx.fillText(letter, 10, (parseInt(self.config.fontSize, 10) - 10));
						}

						ctx.font = font;
						ctx.fillStyle = ctx.createPattern(img, 'repeat');
						ctx.fillText(letter, 10, (parseInt(self.config.fontSize, 10) - 10));

					}

				}

				canvasDropcap.init();

				return this;

			},

			/**
			 * Calculates display settings for percentage element (only for progress bars type-4)
			 **/
			nowrapProgressBars: {

				PERCENTAGEELEMENTWIDTH: 40,

				check: function(){

					this.collection = $('.gt-progress-bars-holder.type-4 .gt-pbar-wrap');
					if(!this.collection.length) return;

					this.checkOverlay();

					this.w = $(window);

					this.w.off('resize.nowrapprogressbars').on('resize.nowrapprogressbars', this.checkOverlay.bind(this));

				},

				checkOverlay: function(){

					var self = this;

					this.collection.each(function(i, el){

						var $this = $(el),
							titleWidth = $this.find('.gt-pbar-title').outerWidth(),
							indicatorWidth = $this.find('.gt-pbar-inner').outerWidth();

						if(indicatorWidth < titleWidth + self.PERCENTAGEELEMENTWIDTH && !$this.hasClass('gt-percentage-hidden')){
							$this.addClass('gt-percentage-hidden');
						}
						else if(indicatorWidth >= titleWidth + self.PERCENTAGEELEMENTWIDTH && $this.hasClass('gt-percentage-hidden')){
							$this.removeClass('gt-percentage-hidden');
						}

					});

				}

			},

			owlAdaptive: function(collection){

				var collection = collection ? collection : $('.owl-carousel');

				if(!collection.length) return;

				collection.each(function(i, el){

					var $this = $(el);

					$this.on('changed.owl.carousel', function(e){
						$.gatsbyCore.templateHelpers.owlSameHeight($this, true);
						$.gatsbyCore.templateHelpers.owlNav($this);
					});

					$this.on('resized.owl.carousel', function(e){
						$.gatsbyCore.templateHelpers.owlSameHeight($this, true);
					});

					$this.on('initialized.owl.carousel', function(e){

						setTimeout(function(){
							if($this.data('owlCarousel').settings.dots){
								$this.addClass('owl-dots');
							}
						}, 100);
						
						$.gatsbyCore.templateHelpers.owlSameHeight($this);
						$.gatsbyCore.templateHelpers.owlNav($this);

					});

				});

			},

			owlSameHeight: function(owl, animateContainer){

				var max = 0;

				setTimeout(function(){

					var activeItems = owl.find('.owl-item.active').children();

					owl.find('.owl-item').children().css('height', 'auto');

					activeItems.each(function(i, el){

						var $this = $(el),
							height = $this.outerHeight();

						if(height > max) max = height;

					});

					if(animateContainer){
						owl.find('.owl-stage-outer').stop().animate({
							height: max
						}, {
							duration: 150,
							complete: function(){

								setTimeout(function(){

									var isotopeParent = owl.closest('.gt-isotope-container.gt-initialized');
									if(isotopeParent.length) isotopeParent.isotope('layout');

								}, 700);
								
							}
						});
					}

					activeItems.css('height', max);					

				}, 20);

			},

			owlNav: function(owl){

				setTimeout(function(){

					var settings = owl.data('owlCarousel').settings;
					if(settings.autoplay) return;

					var prev = owl.find('.owl-prev'),
						next = owl.find('.owl-next');

					if(owl.find('.owl-item').first().hasClass('active')) prev.addClass('gt-disabled');
					else prev.removeClass('gt-disabled');

					if(owl.find('.owl-item').last().hasClass('active')) next.addClass('gt-disabled');
					else next.removeClass('gt-disabled');

				}, 100);

			},

			fullScreenLayout: {

				init: function(){

					var self = this;

					this.layout = $('.gt-fullscreen-layout-type');
					if(!this.layout.length) return;

					this.header = $('#header');
					this.footer = $('#footer');
					this.pW = $('.gt-page-content-wrap');
					this.w = $(window);
					this.body = $('body');


					this.layout.gatsbyImagesLoaded().then(function(){

						self.updateDocumentState();

					});

					this.w.on('resize.fullscreenlayout', this.updateDocumentState.bind(this));

				},

				updateDocumentState: function(){

					var self = this;

					if(self.timeout) clearTimeout(self.timeout);

					self.timeout = setTimeout(function(){

						self.body.add(self.pW).css({
							'padding-top': 0,
							'padding-bottom': 0
						});

						self.hH = self.header.outerHeight();
						self.fH = self.footer.outerHeight();

						self.body.css({
							'padding-top': (self.hH !== null) ? self.hH : (self.fH !== null ? self.fH : 0),
							'padding-bottom': (self.fH !== null) ? self.fH : (self.hH !== null ? self.hH : 0)
						});

						self.pWH = self.pW.outerHeight();
						self.wH = self.w.height();

						self.run();

					}, 130);

				},

				run: function(){

					var self = this,
						fullPageHeight = self.pWH + self.hH + self.fH,
						paddingTop = 0,
						paddingBottom = 0;

					// if without header
					if(!self.hH && self.fH !== null){
						paddingTop = paddingBottom = (self.wH - self.pWH - (self.fH * 2)) / 2
					}
					// if without footer
					else if(!self.fH && self.hH !== null){
						paddingTop = paddingBottom = (self.wH - self.pWH - (self.hH * 2)) / 2
					}
					else{
						paddingTop = paddingBottom = (self.wH - fullPageHeight) / 2
					}

					if(fullPageHeight < this.wH){

						this.pW.css({
							'padding-top': paddingTop,
							'padding-bottom': paddingBottom
						});

					}

				}

			},

			fullScreenMediaHolder: {

				init: function(){

					var self = this;

					this.collection = $('.gt-media-holder.gt-fullscreen');
					if(!this.collection.length) return;

					this.defPaddingTop = parseInt(this.collection.css('padding-top'), 10);
					this.defPaddingBottom = parseInt(this.collection.css('padding-bottom'), 10);

					this.w = $(window);

					this.run();

					this.w.on('resize.mediaholder', this.run.bind(this));

					return this.collection;

				},

				reset: function(){

					if(!this.collection) return;

					this.run();

				},

				updateDocumentState: function(){

					var self = this;

					this.collection.css({
						'padding-top': self.defPaddingTop,
						'padding-bottom': self.defPaddingBottom
					})

					this.wH = this.w.height();
					this.cH = this.collection.outerHeight();

				},

				run: function(){

					var self = this;

					this.updateDocumentState();

					if(this.timeoutId) clearTimeout(this.timeoutId);

					this.timeoutId = setTimeout(function(){

						if(self.cH < self.wH){

							var diff = (self.wH - self.cH) / 2;

							self.collection.css({
								'padding-top': diff + self.defPaddingTop,
								'padding-bottom': diff + self.defPaddingBottom
							});

						}

					}, 100);

				}

			}

		},

		baseOwlConfig: {
			animateIn: 'zoomIn',
			animateOut: 'zoomOut',
			loop: true,
			smartSpeed: 500,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			navText: ['', '']
		}

	}

	$.gatsbyCore.jQueryExtend();
	

	$(function(){

		$.gatsbyCore.DOMLoaded();

		// temp
		var switcher = $('#styleswitcher-holder');

		if(switcher.length) switcher.load('styleswitcher.html', function(){

			$.getScript('js/gatsby.styleswitcher.min.js');

			var select = switcher.find('.gt-custom-select');

			if(select.length){

				select.MadCustomSelect({
					cssPrefix: 'gt-'
				});

			}

		});

	});

	$(window).load(function(){

		$.gatsbyCore.outerResourcesLoaded();

	});


})(jQuery);