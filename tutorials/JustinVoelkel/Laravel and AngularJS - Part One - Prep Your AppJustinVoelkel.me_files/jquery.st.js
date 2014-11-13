/*

	01. - Dinamic styles holder
	02. - Drop-Down menu
	03. - Quick reply form
	04. - Textarea
	05. - Sticked div
	06. - Tag cloud
	07. - Archives & Categories
	08. - Original size of images
	09. - Max size for YouTube & Vimeo video
	10. - ST Gallery

*/

/* jshint -W099 */
/* global jQuery:false */

var p = jQuery.noConflict();

p(function(){

	'use strict';



/*==01.==========================================

 	D I N A M I C   S T Y L E S
	Holder for dinamic styles

===============================================*/

	if ( !p('#st-dynamic-css').length ) {

		p('head').append('<style id="st-dynamic-css" type="text/css"></style>');

	}



/*==02.==========================================

	D R O P - D O W N   M E N U
	Main menu on responsive mode

===============================================*/

/*

	1 - DROP-DOWN MENU

		1.1 - Default
		1.2 - Custom

*/

	/*-------------------------------------------
		1.1 - Default
	-------------------------------------------*/

	p('#menu #page_id').change(function() {

		var
			val = p(this).val();

			if ( val ) {
				p(this).parent().submit(); }

	});


	/*-------------------------------------------
		1.2 - Custom
	-------------------------------------------*/

	p('#selectElement').change(function() {

		if ( p(this).val() ) {
			window.open( p(this).val(), '_parent' ); }

	});



/*==03.==========================================

	Q U I C K   R E P L Y   F O R M
	Append and remove quick form

===============================================*/

/*

	1 - QUICK REPLY FORM

		1.1 - Open form
		1.2 - Cancel reply

*/

	/*-------------------------------------------
		1.1 - Open form
	-------------------------------------------*/

	p('a.quick-reply').click(function(){


		/*--- First of all -----------------------------*/

		// Make previous Reply link visible
		p('.quick-reply').removeClass('none');

		// Make previous Cancel Reply link hidden
		p('.quick-reply-cancel').addClass('none');

		// Erase all quick holders
		p('.quick-holder').html('');

		// Make comment form visible
		p('#commentform').removeClass('none');


		/*--- Append new form -----------------------------*/

		var
			id = p(this).attr('title'),
			form = p('#respond').html();

			// Make this Reply link hidden
			p(this).addClass('none');

			// Make this Cancel Reply link visible
			p(this).next().removeClass('none');

			// Hide major form
			p('#commentform, #reply-title').addClass('none');

			// Put the form to the holder
			p('#quick-holder-' + id).append(form).find('h3').remove();

			// Set an ID for hidden field
			p('#quick-holder-' + id + ' input[name="comment_parent"]').val(id);


		return false;

	});


	/*-------------------------------------------
		1.2 - Cancel reply
	-------------------------------------------*/

	p('.quick-reply-cancel').click(function(){

		// Make previous Reply link visible
		p('.quick-reply').removeClass('none');

		// Make this Cancel Reply link hidden
		p(this).addClass('none');

		// Erase all quick holders
		p('.quick-holder').html('');

		// Make comment form visible
		p('#commentform, #reply-title').removeClass('none');

		return false;

	});



/*==04.==========================================

 	T E X T A R E A
	Animation by focus

===============================================*/

	p('#layout').on('focus', 'textarea', function() {

		if ( p(this).height() < 151 && ! p(this).hasClass( 'height-ready' ) ) {

			p(this)
				.css({ height: 70 })
				.animate({ height: 150 }, 300, function(){ p(this).addClass( 'height-ready' ); });

		}

	});



/*==05.==========================================

 	S T I C K E D   D I V
	Sticked container

===============================================*/

	if ( p('.stickyDiv').length ) {

		var
			el = p('.stickyDiv'),
			stickyTop = p('.stickyDiv').offset().top,
			stickyHeight = p('.stickyDiv').height();

			p(window).scroll(function(){

				var
					limit = p('#footer').offset().top - stickyHeight - 100,
					windowTop = p(window).scrollTop();


					/*--- by top -----------------------------*/

					if ( stickyTop < windowTop ) {

						el.css({ position: 'fixed', top: 20 });

					}

					else {

						el.css( 'position', 'static' );

					}


					/*--- by footer -----------------------------*/

					if ( limit < windowTop ) {
						
						var
							diff = limit - windowTop;
							el.css({ top: diff });

					}

			});

	}



/*==06.==========================================

 	T A G   C L O U D
	Add number of posts for each tag

===============================================*/

	p('.tagcloud a').each(function(){

		var
			number = p(this).attr('title').split(' ');

			number = '<span>' + number[0] + '</span>';

			p(this).append(number).attr('title','');

	});



/*==07.==========================================

 	A R C H I V E S & C A T E G O R I E S
	Replace count wrapper on widgets,
	e.g. from (7) to <span>7</span>

===============================================*/

	p('.widget_archive li, .widget_categories li').each(function(){

		var
			str = p(this).html();

			str = str.replace(/\(/g,"<span>");
			str = str.replace(/\)/g,"</span>");
			
			p(this).html(str);

	});



/*==08.==========================================

 	O R I G I N A L   S I Z E
	For images and others

===============================================*/

	p('.size-original').removeAttr('width').removeAttr('height');



/*==09.==========================================

 	V I D E O   R E S I Z E
	Max size for YouTube & Vimeo video

===============================================*/

	function st_video_resize() {

		p('iframe').each(function(){

			var
				src = p(this).attr('src'),
				check_youtube = src.split('youtube.com'),
				check_vimeo = src.split('vimeo.com');
				
				if ( check_youtube[1] || check_vimeo[1] ) {

					var
						width = p(this).parent().width(),
						height = width * 0.61;

						if ( width > 1 ) {
							p(this).css({ 'width': width, 'height': height }); }

				}

		});

	}

	st_video_resize();

	p(window).resize( st_video_resize );



/*==10.==========================================

 	S T   G A L L E R Y
	ST Gallery script

===============================================*/

	stG_init();
	
	function stG_init() {

		p('.st-gallery').each(function(){

			p('img',this).addClass('st-gallery-pending').last().addClass('st-gallery-last');

			var
				slides = p(this).html(),
				check = slides.split('img'),
				controls = '<ol>';

				for ( var i = 1; i < check.length; i++ ) {
					if ( i === 1 ) {
						controls += '<li class="st-gallery-tab-current"></li>'; }
					else {
						controls += '<li></li>'; }
				}

				controls += '</ol>';

				p(this).html( '<div>' + slides + '</div>' + controls );

				p('div img:first-child',this).removeClass('st-gallery-pending').addClass('st-gallery-current');

		});

	}

	p('.st-gallery div img').on( 'click touchstart', function(){

		if ( ! p(this).parent().hasClass('st-gallery-locked') ) {

			var
				img = p(this),
				gallery = p(this).parent(),
				current = gallery.find('.st-gallery-current'),
				hCurrent = gallery.height(),
				imgIndex = img.prevAll().length,
				tabs = img.parent().next( 'ol' );

				gallery.addClass('st-gallery-locked');

				var
					nextImage = ( current.hasClass('st-gallery-last') ? gallery.find('img').first() : gallery.children().eq( imgIndex + 1 ) );

					current
						.removeClass('st-gallery-current').addClass('st-gallery-flushed').stop(true,false)
						.animate({ 'opacity': 0 }, 300,
							function(){
								p(this).removeAttr('style').removeClass('st-gallery-flushed').addClass('st-gallery-pending');
								gallery.removeClass('st-gallery-locked');
							});

					nextImage.removeClass('st-gallery-pending').addClass('st-gallery-current');

					var
						hNext = nextImage.height();

						if ( hNext !== 0 ) {
							gallery.css( 'height', hCurrent ).stop(true,false).animate({ 'height': hNext }, 700 ); }
						else {
							gallery.css( 'height', 'auto' ); }

					var
						currentTab = nextImage.prevAll().length;
	
						tabs.children( '.st-gallery-tab-current' ).removeClass( 'st-gallery-tab-current' );
						tabs.children().eq( currentTab ).addClass( 'st-gallery-tab-current' );

		}

	});

	p('.st-gallery ol li').click(function(){

		p(this).each(function(){

			var
				no = p(this).prevAll().length,
				gallery = p(this).parent().parent().find('div'),
				current = gallery.find('.st-gallery-current'),
				h = gallery.children().eq( no ).height();

				p(this).parent().find('.st-gallery-tab-current').removeClass('st-gallery-tab-current');
				p(this).addClass('st-gallery-tab-current');

				current.removeClass('st-gallery-current').addClass('st-gallery-pending');

				gallery.css( 'height', h );

				gallery.children().eq( no )
					.removeClass('st-gallery-pending')
					.addClass('st-gallery-flushed')
					.css({ opacity: 0 })
					.animate({ opacity: 1 }, 300, 
						function(){
							p(this).removeClass('st-gallery-flushed').addClass('st-gallery-current').removeAttr('style');
							gallery.removeAttr('style');
						});

		});

	});



});