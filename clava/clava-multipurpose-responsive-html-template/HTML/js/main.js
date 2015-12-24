(function($){
	$(document).ready(function(){
		/*----------------------------------------------------*/
		/*	Sticky Header
		/*----------------------------------------------------*/
		var stickyheader = true; // set false to disable or true to enable sticky header
		if(stickyheader == true) {
			var logo = $('#logo'),
				header = $('#header'),
				menu = $('.menu ul > li > a');
			var smallHeight = 70,   // set compact header height
				durationAnim = 500, // animation speed
				defaultHeight = parseInt(header.css('height')),
				defLogoMarginTop = parseInt(logo.css('margin-top')),
				defMenuPaddingTop = parseInt(menu.css('padding-top')),
				defMenuPaddingBottom = parseInt(menu.css('padding-bottom')),
				small_height = defaultHeight - smallHeight;
			$("#header").css({ position: "fixed"});

			var stickyValue = defaultHeight - 20;
			function stickyPosition(val, body, header) {
				$(header).css({ marginTop: val });
				$(body).css({ paddingTop: val });
			}
			stickyPosition(-stickyValue, null, "#header");
			stickyPosition(stickyValue, "body", null);

			function stickymenu(){
				var base = this,
					offset = $(window).scrollTop(), // Get how much of the window is scrolled
					header = $('#header'),
					src = logo.find('img').attr('src');
					
				var menuPaddingTop = defMenuPaddingTop - small_height/2;
					menuPaddingBottom = defMenuPaddingBottom - small_height/2,
					logoMarginTop = defLogoMarginTop - 1 - small_height/2;

				if ($(window).width() > 768) {
					if (offset > 70) { // if it is over 60px (the initial width)
						if (!header.hasClass('compact')) {
							header.animate({
									height: defaultHeight-small_height
								}, {
									queue: false,
									duration: durationAnim,
									complete: function () {
										header.addClass('compact').css("overflow", "visible");
									}
								});
								logo.animate({
									marginTop: logoMarginTop
								}, {
									queue: false,
									duration: durationAnim
								});
							menu.animate({
									paddingTop: menuPaddingTop,
									paddingBottom: menuPaddingBottom,
									margin:0
								}, {
									queue: false,
									duration: durationAnim
								});
							}
					} else if (offset > -1 && offset < 60) {
						header.animate({
								height: defaultHeight,
							}, {
								queue: false,
								duration: durationAnim,
								complete: function () {
									header.removeClass('compact').css("overflow", "visible");
								}
							});
						  logo.stop().animate({
								marginTop: defLogoMarginTop
							}, {
								queue: false,
								duration: durationAnim
							});
						menu.animate({
								paddingTop: defMenuPaddingTop,
								paddingBottom: defMenuPaddingBottom,
							}, {
								queue: false,
								duration: durationAnim
							});
					}
				}
			}

			stickymenu();
			$(window).scroll(function () { stickymenu(); });

			// sticky header reset for mobile
			$(window).resize(function (){
				var winWidth = $(window).width();
				if(winWidth < 768) {
					 $('#logo').css('marginTop','');
					 $('#header').css('height','').removeClass('compact');
					 $("#header").css({ position: ""});
					 $('.menu ul > li > a').css({
						'paddingTop' : '',
						'paddingBottom' : '',
					 });
					 
					stickyPosition(null, null, "#header");
					stickyPosition(null, "body", null);
				} else {
					stickymenu();
					stickyPosition(-stickyValue, null, "#header");
					stickyPosition(stickyValue, "body", null);
					$("#header").css({ position: "fixed"});
				}
			});
		}


		/*----------------------------------------------------*/
		/*	Navigation
		/*----------------------------------------------------*/

		$('.menu ul').superfish({
			delay:       100,                              // one second delay on mouseout
			speed:       500,                              // animation speed
			speedOut:    200,                                // out animation speed
			animation:   {opacity:'show',height:'show'}   // fade-in and slide-down animation
		});

		/*----------------------------------------------------*/
		/*	Mobile Navigation
		/*----------------------------------------------------*/
		var jPanelMenu = {};
		$(function() {
			$('pre').each(function(i, e) {hljs.highlightBlock(e)});
			jPanelMenu = $.jPanelMenu({
				menu: '#responsive',
				animated: false,
				keyboardShortcuts: true
			});
			jPanelMenu.on();
			$(document).on('click',jPanelMenu.menu + ' li a',function(e){
				if ( jPanelMenu.isOpen() && $(e.target).attr('href').substring(0,1) == '#' ) { jPanelMenu.close(); }
			});
			$(document).on('touchend','.menu-trigger',function(e){
				jPanelMenu.triggerMenu();
				e.preventDefault();
				return false;
			});
			
			// Removes SuperFish Styles
			$('#jPanelMenu-menu').removeClass('sf-menu');
			$('#jPanelMenu-menu li ul').removeAttr('style');
		});
		
		$(window).resize(function (){
			var winWidth = $(window).width();
			if(winWidth>767) {
				jPanelMenu.close();
				$('.menu-trigger, #logo').show();
			}
		});
	
	
	if ($.fn.cssOriginal != undefined) {
		$.fn.css = $.fn.cssOriginal;
	}
	$(document).ready(function(){
		$('.fullwidthbanner').revolution({
			delay:6000,
			startwidth:960,
			startheight:470,
			onHoverStop:"off",						// Stop Banner Timet at Hover on Slide on/off
			thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
			thumbHeight:50,
			thumbAmount:3,
			hideThumbs:200,
			navigationType:"none",				// bullet, thumb, none
			navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none
			navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
			navigationHAlign:"center",				// Vertical Align top,center,bottom
			navigationVAlign:"bottom",					// Horizontal Align left,center,right
			navigationHOffset:0,
			navigationVOffset:0,
			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:0,
			soloArrowLeftVOffset:0,
			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:0,
			soloArrowRightVOffset:0,
			lazyLoad:"on",
			touchenabled:"off",						// Enable Swipe Function : on/off
			stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
			stopAfterLoops:1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
			fullWidth:"on",
			shadow:0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)
		});
		
		
		
		
		/*----------------------------------------------------*/
		/*	Carousel
		/*----------------------------------------------------*/
		// Add classes for other carousels
		var $carousel = $('.recent-work-jc');
		var scrollCount;
		function adjustScrollCount() {
			if( $(window).width() < 800 ) {
				scrollCount = 1;
			} else {
				scrollCount = 3;
			}
		}
		
		function adjustCarouselHeight() {
			$carousel.each(function() {
				var $this    = $(this);
				var maxHeight = -1;
				$this.find('li').each(function() {
					maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
				});
				$this.height(maxHeight);
			});
		}

		function initCarousel() {
			adjustCarouselHeight();
			adjustScrollCount();
			var i = 0;
			var g = {};
			$carousel.each(function() {
				i++;
				var $this = $(this);
				g[i] = $this.jcarousel({
					animation           : 600,
					scroll              : scrollCount
				});
				$this.jcarousel('scroll', 0);
				 $this.prev().find('.jcarousel-prev').bind('active.jcarouselcontrol', function() {
					$(this).addClass('active');
				}).bind('inactive.jcarouselcontrol', function() {
					$(this).removeClass('active');
				}).jcarouselControl({
					target: '-='+scrollCount,
					carousel: g[i]
				});

				$this.prev().find('.jcarousel-next').bind('active.jcarouselcontrol', function() {
					$(this).addClass('active');
				}).bind('inactive.jcarouselcontrol', function() {
					$(this).removeClass('active');
				}).jcarouselControl({
					target: '+='+scrollCount,
					carousel: g[i]
				});

				$this.touchwipe({
					wipeLeft: function() {
						$this.jcarousel('scroll','+='+scrollCount);
					},
					wipeRight: function() {
						$this.jcarousel('scroll','-='+scrollCount);
					}
				});
			});
		}
		
		$(window).load(function(){
			initCarousel();
		});
		
		$(window).resize(function () {
			$carousel.each(function() {
				var $this = $(this);
				$this.jcarousel('destroy');
			});
			initCarousel();
		});
		
		
		$("body").tooltip({
			selector: '[data-toggle="tooltip"]'
		});
		
		
		/* ---------------------------------------------------- */
		/*	Black And White										*/
		/* ---------------------------------------------------- */
		$(window).load(function(){
			$('.bwWrapper').BlackAndWhite({
				hoverEffect : true, // default true
				// set the path to BnWWorker.js for a superfast implementation
				webworkerPath : false,
				// for the images with a fluid width and height 
				responsive:true,
				// to invert the hover effect
				invertHoverEffect: false,
				// this option works only on the modern browsers ( on IE lower than 9 it remains always 1)
				intensity:1,
				speed: { //this property could also be just speed: value for both fadeIn and fadeOut
					fadeIn: 200, // 200ms for fadeIn animations
					fadeOut: 800 // 800ms for fadeOut animations
				},
				onImageReady:function(img) {
					// this callback gets executed anytime an image is converted
				}
			});
		});
		
		
		
		//  ==========
		//  = Scroll event function =
		//  ==========
		var goScrolling = function(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = elem.offset().top;
			var elemBottom = elemTop + elem.height();
			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		};
		
		
		//  ==========
		//  = Progress bars =
		//  ==========
		$('.progress_skill .bar').data('width', $(this).width()).css({
			width : 0,
			height:0
		});
		$(window).scroll(function() {
			$('.progress_skill .bar').each(function() {
				if (goScrolling($(this))) {
					$(this).css({
						width : $(this).attr('data-value') + '%',
						height : $(this).attr('data-height') + '%'
					});
				}
			});
		})
		
		
		
		
		$('.tweet_go').tweetable({
			html5: true,
			time: true,
			username: 'envato',
			limit: 2,
			loading:"Load tweets...",
			rotate: false,
			speed: 5000,
			onComplete:function($ul){
				$('time').timeago();
			}
		});
		


	
	
	
	
	
	
	
	/*===========================================================*/
	/*	Isotope Posrtfolio
	/*===========================================================*/	
	if(jQuery.isFunction(jQuery.fn.isotope)){
		jQuery('.portfolio_list').isotope({
			itemSelector : '.list_item',
			layoutMode : 'fitRows',
			animationEngine : 'jquery'
		});
		
		/* ---- Filtering ----- */
		jQuery('#filter li').click(function(){
			var $this = jQuery(this);
			if ( $this.hasClass('selected') ) {
				return false;
			} else {
					jQuery('#filter .selected').removeClass('selected');
					var selector = $this.attr('data-filter');
					$this.parent().next().isotope({ filter: selector });
					$this.addClass('selected');
					return false;
				}
		});	
	}
	
	
	
	/*----------------------------------------------------*/
	/*	Magnific Popup
	/*----------------------------------------------------*/
	$(document).ready(function(){
		$('body').magnificPopup({ 
			type: 'image',
			delegate: 'a.mfp-gallery',
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: true,
			removalDelay: 0,
			mainClass: 'mfp-fade',
			gallery:{enabled:true},
			callbacks: {
				buildControls: function() {
					console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
				}
			}
		});
		
		$('.mfp-image').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'mfp-fade',
			image: {
				verticalFit: true
			}
		});
		
		$('.mfp-youtube, .mfp-vimeo, .mfp-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 0,
			preloader: false,
			fixedContentPos: false
		});
	});
	
		
		/*----------------------------------------------------*/
		/*	Swipe Slider 
		/*----------------------------------------------------*/
		window.mySwipe = new Swipe(document.getElementById('slider'), {
		  startSlide: 2,
		  speed: 400,
		  auto: 3000,
		  continuous: true,
		  disableScroll: false,
		  stopPropagation: false,
		  callback: function(index, elem) {},
		  transitionEnd: function(index, elem) {}
		});
		
		
		// Accordion
		jQuery("ul.clav_accordion li").each(function () {
			if (jQuery(this).index() > 0) {
				jQuery(this).children(".clav_acc_content").css('display', 'none');
			} else {
				if ($(".faq")[0]) {
					jQuery(this).addClass('active').find(".acc_head_icon").append("<i class='fa fa-chevron-circle-down  '></i>");
					jQuery(this).siblings("li").find(".acc_head_icon").append("<i class='fa fa-question-circle'></i>");
				} else {
					jQuery(this).addClass('active').find(".acc_head_icon").append("<i class='fa fa-minus-circle'></i>");
					jQuery(this).siblings("li").find(".acc_head_icon").append("<i class='fa fa-plus-circle'></i>");
				}
			}
			jQuery(this).children(".acc_head").bind("click", function () {
				jQuery(this).parent().addClass(function () {
					if (jQuery(this).hasClass("active")) {
						return;
					} {
						return "active";
					}
				});
				if ($(".faq")[0]) {
					jQuery(this).siblings(".clav_acc_content").slideDown();
					jQuery(this).parent().find(".acc_head_icon i").removeClass("fa fa-question-circle").addClass("fa fa-chevron-circle-down  ");
					jQuery(this).parent().siblings("li").children(".clav_acc_content").slideUp();
					jQuery(this).parent().siblings("li").removeClass("active");
					jQuery(this).parent().siblings("li").find(".acc_head_icon i").removeClass("fa fa-chevron-circle-down").addClass("fa fa-question-circle");
				} else {
					jQuery(this).siblings(".clav_acc_content").slideDown();
					jQuery(this).parent().find(".acc_head_icon i").removeClass("fa fa-plus-circle").addClass("fa fa-minus-circle");
					jQuery(this).parent().siblings("li").children(".clav_acc_content").slideUp();
					jQuery(this).parent().siblings("li").removeClass("active");
					jQuery(this).parent().siblings("li").find(".acc_head_icon i").removeClass("fa fa-minus-circle").addClass("fa fa-plus-circle");
				}
			});
		});
		
		
		
		// Toggle
		jQuery("ul.clav_toggle li").each(function () {
			jQuery(this).children(".clav_toggle_content").css('display', 'none');
			jQuery(this).find(".clav_toggle_head_sign").html("<i class='fa fa-plus-circle'></i>");
			
			jQuery(this).children(".clav_toggle_head").bind("click", function () {
				if (jQuery(this).parent().hasClass("active")) {
					jQuery(this).parent().removeClass("active");
				} else {
					jQuery(this).parent().addClass("active");
				}
				jQuery(this).find(".clav_toggle_head_sign").html(function () {
					if (jQuery(this).parent().parent().hasClass("active")) {
						return "<i class='fa fa-minus-circle'></i>";
					} else {
						return "<i class='fa fa-plus-circle'></i>";
					}
				});
				jQuery(this).siblings(".clav_toggle_content").slideToggle();
			});
		});
		jQuery("ul.clav_toggle").find(".clav_toggle_content.active").siblings(".clav_toggle_head").trigger('click');
		
		
		
		
		
		
		
		
		
		
		
		
	});
	
	/* ------------------ End Document ------------------ */
	});
})(this.jQuery);

$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});
	
	
	/*
			*	Contact Form
			* #contact
			*/

			try{
				jQuery('#contact').validate({
					submitHandler: function(form) {
						jQuery('#contact .message').hide();
						var ajaxurl = 'contact.php';
						var data = {
							action: 'contact_us',
							datas: jQuery(form).serialize()
						};

						jQuery.ajax({
							type: 'POST',
							url: ajaxurl,
							data: data,
							success: function(response){
								jQuery('#contact .message').text(response.error).css({'display' : 'inline-block'});	
							},
							dataType: 'json'
						});
						return false;
 					},
 					rules: {
 						c_name: {
 							 required: true,
      						 minlength: 3
 						},
 						c_mail: {
 							required: true,
 							email: true
 						},
 						c_subject: {
 							required: true,
 							minlength: 6
 						},
 						c_message:{
 							required: true,
 							minlength: 20
 						}
 					}
				});			
			}catch(e){

			}
			
			
			// BUTTON UP
		var btnUp = $('<div/>', {'class':'btntoTop'});
		btnUp.appendTo('body');
		$(document)
			.on('click', '.btntoTop', function() {
				$('html, body').animate({
					scrollTop: 0
				}, 700);
			});
			
		$(window)
			.on('scroll', function() {
				if ($(this).scrollTop() > 200)
					$('.btntoTop').addClass('active');
				else
					$('.btntoTop').removeClass('active');
			});
	/*===========================================================*/
	/*	Preloader 
	/*===========================================================*/	
	//<![CDATA[
		$(window).load(function() { // makes sure the whole site is loaded
			$("#status").fadeOut(); // will first fade out the loading animation
			$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
		})
	//]]>
	
	
});





/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad, and Android mobile phones
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);



