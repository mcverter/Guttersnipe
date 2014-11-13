// DOCUMENT READY
jQuery(document).ready(function($) {
		
		
		//**********************************
        //NAV MENU
		//wp active menu item fix
		$('ul#nav li.current-menu-item, ul#nav li.current_page_parent').addClass('active');
		$('ul#nav ul li.current-menu-item').parents('li').addClass('active');
		
		$('ul#nav > li').addClass('first-level');
		$('ul#nav li').each(function() { if($(this).find('ul').length) $(this).addClass('has-sub'); });
        $('ul#nav li.has-sub').hover(function() {
 
                var subMenu = $(this).find('div').length ? $(this).find('ul') : $(this).find('ul:first');
 				
                //if has sub menu
                if(subMenu.length) {
					
                    $(this).find('a').eq(0).addClass("selected");
                    subMenu.stop(true,true).slideDown(300,'easeOutQuad');
					
                }
            }, function(e) {  //hover out
					
                    var subMenu = $(this).find('div').length ? $(this).find('div') : $(this).find('ul:first');
                    subMenu.stop(true,true).delay(0).slideUp(150,'easeOutQuad');
                    $(this).find('a').eq(0).removeClass("selected");
					
                });
        //NAV MENU
        //**********************************
		
		
		// MOBIL NAV MENU - SELECT LIST
		//**********************************
		/* Clone our navigation */
		var mainNavigation = $('ul#nav').clone();
		
		/* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
		$('.header nav').prepend('<select class="menu"></select>');
		var selectMenu = $('select.menu');
		$(selectMenu).append('<option>'+"MENU"+'</option>');
		
		/* Navigate our nav clone for information needed to populate options */
		$(mainNavigation).children('li').each(function() {
		
			 /* menu - LEVEL 1 */
			 $(selectMenu).append(generateSelectLink($(this), ''));
			
			 /* menu - LEVEL 2 */
			 if ($(this).children('ul').length > 0) {
					$(this).children('ul').children('li').each(function() {
			
				    /* Append this option to our "select" */
					$(selectMenu).append(generateSelectLink($(this), ' ---'));
				   
				   /* menu - LEVEL 3 */
				   if ($(this).children('ul').length > 0) {
						$(this).children('ul').children('li').each(function() {
					
						   /* Append this option to our "select" */
						   $(selectMenu).append(generateSelectLink($(this), ' ------'));
						   
						   
						   /* menu - LEVEL 4 */
						   if ($(this).children('ul').length > 0) {
								$(this).children('ul').children('li').each(function() {
							
								   /* Append this option to our "select" */
								   $(selectMenu).append(generateSelectLink($(this), ' ---------'));
								   
								});
							 }
						   
						});
					 }
				   
				});
			 }
		});
		
		function generateSelectLink(li, prefix) {
			var href = li.children('a').attr('href');
			var text = li.children('a').text();
			return '<option value="' + href+ '"> ' + prefix + text + '</option>';
		}
		
		/* When our select menu is changed, change the window location to match the value of the selected option. */
		$(selectMenu).change(function() {
			location = this.options[this.selectedIndex].value;
		});
		//**********************************
		
		
		
		// LIGHTBOX
		//**********************************
		if($("a[rel^='prettyPhoto']").length) {
			$("a[rel^='prettyPhoto']").prettyPhoto({
					theme: 'pp_default',
					social_tools:"",
					default_width: 800,
					default_height: 450
				});
		}
		//**********************************
		
		
		
		//**********************************
        // MEDIA BOX MASK
		$('.media-box').hover(function() {
					$(this).find('.mask').stop(true,true).fadeIn();
			},function() {
					$(this).find('.mask').stop(true,true).fadeOut();
				});
		//**********************************
		
		
		//**********************************
        // ACCORDION AND TOGGLES
		$('.accordion-group .accordion-toggle').click(function() {
				var parent = $(this).parents('.accordion-group');
				parent.siblings().removeClass('active').find('.accordion-body').stop(true,true).hide();
				if(!parent.hasClass('active')) {
					parent.addClass('active').find('.accordion-body').stop(true,true).fadeIn(500);
				} else { 
					parent.removeClass('active').find('.accordion-body').stop(true,true).hide();
				}
			});
		//**********************************
				
		
		
		//*************************************
		// VALIDATION
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		//*************************************
		
		
		//**********************************
		// FLEX SLIDER
		// cache container
		var $slider = $('.flexslider');
		if($slider.length) {
			$slider.waitForImages(function() {
				
				$slider.addClass('ready').flexslider({
					  animation: animationType,
					  controlsContainer: ".flex-container", 
					  slideshowSpeed: slideTime,
					  animationDuration: animSpeed,
					  start: function(slider){ // init the height of the first item on start

							var $new_height = slider.slides.eq(0).height();
							/* add a current class to the active item */
							slider.slides.removeClass('current');
							slider.slides.eq(0).addClass('current');
							//console.log($new_height);	
							//slider.height($new_height);
							setTimeout(doResizeSlide, 500); 

																	
						},          
						before: function(slider){ // init the height of the next item before slide

							var $animatingTo = slider.slides.eq(slider.animatingTo);
							var $new_height = slider.slides.eq(slider.animatingTo).height();                
							
							/* add a current class to the active item */
							slider.slides.removeClass('current');
							$animatingTo.addClass('current');
							
							if($new_height != slider.height()){
								slider.stop().animate({ height: $new_height  }, 250);
							}
						}
				  });
				
			},null,true);
		}
		
		$(window).resize(function() {   
			clearTimeout(this.id);
			this.id = setTimeout(doResizeSlide, 500);           
		})
			
		function doResizeSlide() {
			var slider = jQuery('.flexslider');
			if(slider.find('.slides li').length > 1) {
				var newHeight = jQuery('li.current', slider).height();          
				slider.stop().animate({ height: newHeight });
			}
		}
		
		//**********************************
		
		
		//**********************************
		// PORTFOLIO FILTERING - ISOTOPE
		// cache container
		var $container = $('#portfolio');
		
		if($container.length) {
			$container.waitForImages(function() {
				
				// initialize isotope
				$container.isotope({
				  itemSelector : '.item',
				  layoutMode : 'fitRows'
				});
				
				// filter items when filter link is clicked
				$('#filters a').click(function(){
				  var selector = $(this).attr('data-filter');
				  $container.isotope({ filter: selector });
				  $(this).parent().addClass('current').siblings().removeClass('current');
				  return false;
				});
				
			},null,true);
		}
		//**********************************
		
		
		//**********************************
		
		// WP FIX
		$( '.main-slider, .services .item' ).find( 'br' ).remove();
		
		//**********************************
		
		
		//**********************************
		
        // WP FIX
		$( '.widget > ul:not(.social)' ).addClass( 'list dots' );
		
		//**********************************
		
		
		//**********************************
		
        // WP FIX
		$( '#twitter-list a' ).attr( 'rel', 'nofollow' );
		
		//**********************************
		
		//**********************************
		
        // WP FIX
		$( 'footer .go-to-top' ).click(function()
		{
			$( 'body' ).animate( { scrollTop: 0 }, 1000 );
			
			return false;
		});
		
		//**********************************
		
		
	}); //end doc.load	
//*******************************