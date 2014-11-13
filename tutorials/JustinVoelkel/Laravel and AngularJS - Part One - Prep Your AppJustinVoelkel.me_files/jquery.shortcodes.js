/*

	01. - Dynamic styles holder
	02. - Toggle
	03. - Tabs
	04. - Alert messages
	05. - Skill bar
	06. - Icons for Lists
	07. - Tooltips
	08. - Mediaelement fix
*/

/* jshint -W099 */
/* global jQuery:false, stData:false */

var sh = jQuery.noConflict();

sh(function(){

	'use strict';

/*==01.==========================================

 	D I N A M I C   S T Y L E S
	Holder for dynamic styles

===============================================*/

	if ( !sh('#st-dynamic-css').length ) {

		sh('head').append('<style id="st-dynamic-css" type="text/css"></style>');

	}


/*==02.==========================================

	T O G G L E
	Toggle & Accordion

===============================================*/

/*

	1 - TOGGLE

		1.1 - Activation
		1.2 - Opening
		1.3 - Closing
		1.4 - Accordion
		1.5 - Click on

*/

	/*-------------------------------------------
		1.1 - Activation
	-------------------------------------------*/

	sh('.toggle-opened').each(function(){

		toggleOpen ( sh(this) );

	});


	/*-------------------------------------------
		1.2 - Opening
	-------------------------------------------*/

	function toggleOpen( toggle ) {

		var
			holder = toggle.find( '.toggle-holder' ),
			height = toggle.find( '.toggle-box' ).outerHeight( true );

			// Opening
			holder.stop( true, false ).animate({ height: height }, 300);

			// Change class-status for toggle
			toggle.removeClass( 'toggle-closed' ).addClass( 'toggle-opened' );

	}


	/*-------------------------------------------
		1.3 - Closing
	-------------------------------------------*/

	function toggleClose( toggle ) {

		var
			holder = toggle.find( '.toggle-holder' );

			// Closing
			holder.stop( true, false ).animate({ height: 0 }, 300);

			// Change class-status for toggle
			toggle.removeClass( 'toggle-opened' ).addClass( 'toggle-closed' );

	}


	/*-------------------------------------------
		1.4 - Accordion
	-------------------------------------------*/

	function toggleAccordion( toggle ) {

		// Close all holders
		toggle.parent().find( '.toggle-holder' ).each(function(){

			sh(this).stop( true, false ).animate({ height: 0 }, 300);

			// Change class-status for toggle
			sh(this).parent().removeClass( 'toggle-opened' ).addClass( 'toggle-closed' );

		});

		// Open required holder
		toggleOpen( toggle );

	}


	/*-------------------------------------------
		1.5 - Click on
	-------------------------------------------*/

	sh('.toggle-title').click(function(){

		var
			toggle		= sh(this).parent(),
			accordion	= toggle.parent().hasClass( 'accordion' ) ? 1 : '',
			status		= toggle.hasClass( 'toggle-opened' ) ? 'opened' : 'closed';

			// If accordion
			if ( accordion ) {

				toggleAccordion( toggle );

				return;

			}

			// If closed
			if ( status === 'closed' ) {
				toggleOpen( toggle ); }

			// If opened
			if ( status === 'opened' ) {
				toggleClose( toggle ); }

	});


/*==03.==========================================

 	T A B S
	Simple tabs

===============================================*/

/*

	1 - TABS

		1.1 - Functions
		1.2 - Activation

*/

	/*-------------------------------------------
		1.1 - Functions
	-------------------------------------------*/

	sh('.st-ul li').each(function(){
		
		sh(this).click(function(){

			var
				li = sh(this);

				li.parent().children( '.st-current' ).removeClass( 'st-current' );
				li.addClass( 'st-current' );

			var
				liIndex = li.prevAll().length,
				st_tabs = li.parent().next( '.st-tabs' );

				st_tabs.children( '.block' ).removeClass( 'block' );
				st_tabs.children().eq( liIndex ).css({ opacity: 0 }).addClass( 'block' ).animate({ opacity: 1 }, 300);

		});

	});


	/*-------------------------------------------
		1.2 - Activation
	-------------------------------------------*/

	sh( '.st-ul li:first-child' ).addClass( 'st-current' );
	sh( '.st-tabs > div:first-child' ).addClass( 'block' );


/*==04.==========================================

 	A L E R T   M E S S A G E S
	Remove alert by click

===============================================*/

	sh('.alert-close').click(function(){

		sh(this).parent().animate({ opacity: 0 }, 300, function(){

			sh(this).animate({ height: 0, padding: 0, margin: 0 }, 300, function(){

				sh(this).remove();

			});

		});

	});


/*==05.==========================================

 	S K I L L   B A R
	Animated bar for [skill] shortcode

===============================================*/

/*

	1 - SKILL

		1.1 - by scroll
		1.2 - by loading

*/

	/*-------------------------------------------
		1.1 - by scroll
	-------------------------------------------*/

	sh(window).scroll(function(){

		sh('.skill-scroll').not('.skill-animated').each(function(){

			var
				windowHeight = sh(window).height(),
				windowPosition = sh(window).scrollTop(),
				elementPosition = sh(this).offset().top,
				currentPosition = elementPosition - windowPosition;
		
				if ( currentPosition < windowHeight - 100 ) {

					var progress = sh(this).attr('data-progress');

					sh(this).addClass('skill-animated').animate({ width: progress + '%' }, 2000);
	

				}

		});

	});


	/*-------------------------------------------
		1.2 - by loading
	-------------------------------------------*/

	sh('.skill-auto').each(function(){

		var progress = sh(this).attr('data-progress');

		sh(this).animate({ width: progress + '%' }, 2000);

	});


/*==06.==========================================

 	L I S T S
	Apply icon for styles lists

===============================================*/

	// is StrictThemes font based
	if ( sh('body').hasClass('font-st') ) {

		sh('ul.list').each(function(){

			var
				str = sh(this).attr('class'),
				icon = str.split('list-');

				sh(this).find('> li').each(function(){

					sh(this).addClass('ico-st ico-' + icon[1]);

				});

		});

	}

	// else icon based list
	else {

		sh('ul.list').each(function(){
	
			var
				str = sh(this).attr('class'),
				icon = str.split('list-'),
				size = sh('body').hasClass('hidpi') ? 32 : 16,
				style = '.list-' + icon[1] + ' > li:before { background: url("' + stData[3] + '/wp-content/plugins/stkit/assets/images/icons/' + size + '/glyphs/gray/' + icon[1] + '.png") left center no-repeat; }',
				dynamic = sh('#st-dynamic-css').html(),
				check = dynamic.split(style);
	
				if ( !check[1] ) {
					sh('#st-dynamic-css').append( style + "\n" ); }
	
		});

	}


/*==04.==========================================

	T O O L T I P S
	Simple tooltips

===============================================*/

/*

	1 - TOOLTIPS

		1.1 - Calendar tooltips
		1.2 - Flickr tooltips
		1.3 - Function

*/

	/*-------------------------------------------
		1.1 - Calendar tooltips
	-------------------------------------------*/

	sh('.widget_calendar tbody a, #prev a, #next a').addClass('tooltip');


	/*-------------------------------------------
		1.2 - Flickr tooltips
	-------------------------------------------*/

	sh('#flickr img').addClass('tooltip');


	// Removing & setting back
	// titles by mouse hover

	sh('#flickr .flickr_badge_image a')

		.hover(

			function(){

				var
					title = sh(this).attr('title');

					sh(this)
						.removeAttr('title')
						.attr( 'data-title', title );


			},

			function(){

				var
					title = sh(this).attr('data-title');

					sh(this)
						.removeAttr('data-title')
						.attr( 'title', title );

			}

		)

		.mousedown(

			function(){

				var
					title = sh(this).attr('data-title');

					sh(this)
						.removeAttr('data-title')
						.attr( 'title', title );

			}

		);


	/*-------------------------------------------
		1.3 - Function
	-------------------------------------------*/

	sh('.tooltip').each(function(){

		sh(this)

			.hover(
	
				function(){
	
					var
						tt_title = sh(this).attr('title');
	
						if ( tt_title ) {
		
							sh(this).attr('title','');
	
							sh('#layout').append('<div id="tooltip-holder" style="opacity: 0;"></div>');
		
							sh('#tooltip-holder').html('<div class="tooltip-holder">' + tt_title + '</div>');
				
							sh('body').mousemove(function(ev) {

								sh('#tooltip-holder').delay(400).animate({ opacity: 1 }, 300 )
									.css({
										'left': ev.pageX + 10 + 'px',
										'top': ev.pageY + 30 + 'px'
									});

							});
				
						}

				},
	
				function(){

					var
						tt_title = sh('#tooltip-holder > div').html();

						sh(this).attr( 'title', tt_title );
	
						sh('#tooltip-holder').remove();
	
				}
	
			);

	});


/*==08.==========================================

	M E D I A E L E M E N T
	Fix dimensions of sefl-hosted videos

===============================================*/

	sh('video').each(function() {

		var
			factor = 9 / 16,
			wp_video = sh(this).parents('.wp-video'),
			wp_video_W = wp_video.width(),
			wp_video_H = Math.round( wp_video.width() * factor );

			sh(this).attr( 'data-width', wp_video_W + 'px' ).attr( 'data-height', wp_video_H + 'px' );

	});

	sh('.wp-video').css({ 'width': '100%', 'height': '100%' });

	sh('video').width('100%').height( sh(this).attr('data-height') ).css({ 'width': '100%', 'height': sh(this).attr('data-height') });


});


