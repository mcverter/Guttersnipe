/*

	01. - HiDPI

*/

/* jshint -W099 */
/* global jQuery:false */
/* global stData:false */

var hi = jQuery.noConflict();

jQuery(document).ready(function() {

	'use strict';



/*= 01. =========================================

	HiDPI
	Make changes for hight resolution screens

===============================================*/

/*

	1 - HiDPI

		1.1 - Detect HiDPI
		1.2 - Add hidpi class to body
		1.3 - Set an original size for logo
		1.4 - Replace images if possible
		1.5 - Replace projects and feat. images
		1.6 - Replace gravatars
		1.7 - Replace other images
		1.8 - Replace icons on shortcode buttons
		1.9 - Replace containers's bg image
		1.10 - Is file exists

*/

	/*-------------------------------------------
		1.1 - Detect HiDPI
	-------------------------------------------*/

	var
		hidpi = '',
		mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";

		if ( window.devicePixelRatio > 1 ) {
			hidpi = true;
		}
	
		if ( window.matchMedia && window.matchMedia(mediaQuery).matches ) {
			hidpi = true;
		}


	if ( hidpi ) {


		/*-------------------------------------------
			1.2 - Add hidpi class to body
		-------------------------------------------*/

		hi('body').addClass('hidpi');


		/*-------------------------------------------
			1.3 - Replace images if possible
		-------------------------------------------*/

		hi('#layout img').each(function(){

			if ( hi(this).is('[data-hidpi]') ) {

				var
					src = hi(this).attr('data-hidpi');

					hi(this).attr( 'src', src );

			}

		});


		/*-------------------------------------------
			1.4 - Set an original size for logo
		-------------------------------------------*/

		hi('#logo img').bind('load', function() {

			hi(this).css({ 'width': '', 'max-width': 'none', 'position': 'absolute' });

			var
				w = hi(this).width() / 2,
				h = hi(this).height() / 2;

				if ( w > 0 ) {
					hi(this).css({ 'max-width': 'none', 'position': 'relative', 'display': 'table', 'width': w, 'height': h, 'opacity': 1 }); }


		});


		/*-------------------------------------------
			1.5 - Replace projects and feat. images
		-------------------------------------------*/

		hi('a.project-thumb, a.post-thumb').each(function(){

			if ( hi(this).is('[data-hidpi]') ) {

				var
					src = hi(this).attr('data-hidpi');

					hi(this).css( 'background-image', 'url(' + src + ')' );

			}

		});


		/*-------------------------------------------	http://gravatar.com/avatar/013dd927b583bcc03100bef5789d0b23?d=mm&s=150&r=G
			1.6 - Replace gravatars						http://1.gravatar.com/avatar/5cda351c146c73c1c876ff012de31b79?s=110&d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D110&r=G
		-------------------------------------------*/

/*		hi('#layout img.avatar').each(function(){

			var
				src = hi(this).attr('src'),
				check = src.split('gravatar');
				
				if ( check[1] ) {

					var
						a = src.split('&s='),
						before = a[0] + '&s=',
						b = a[1],
						c = b.split('&r='),
						size = c[0],
						after = '&r=' + c[1];

						hi(this).attr( 'src', before + size * 2 + after );

				}

		});
*/

		/*-------------------------------------------
			1.7 - Replace other images
		-------------------------------------------*/

		hi('#content img').each(function(){

			if ( hi(this).is('[data-hidpi]') ) {

				var
					src = hi(this).attr('src'),
					w = hi(this).width(),
					check = src.split( stData[3] ); // Compare image root and site root

					// If the image on this server
					if ( check[1] ) {

						a = b = c = null;

						var
							a = src.split('-'),
							b = a[a.length-1],
							c = b.split('x'),
							width = c[0] ? c[0] : 0,
							height = c[1] ? c[1].split('.')[0] : 0;

							if ( width === 0 || height === 0 ) {

								return;

							}
							else {

								var
									path = src.split( '-' + width + 'x' + height ),
									before = path[0],
									after = path[1],
									src2x = before + '-' + width * 2 + 'x' + height * 2 + after;
		
									// If the large image an exists
									if ( urlExists( src2x ) ) {
		
										// Apply original dimentions if needed
										if ( w === parseFloat(width) ) {
											hi(this).attr( 'width', width ).attr( 'height', height );
										}
		
										// Replace the source
										hi(this).attr( 'src', src2x );
		
									}

							}

					}

			}

		});


		/*-------------------------------------------
			1.8 - Replace icons on shortcode buttons
		-------------------------------------------*/

		hi('a.button-with-icon-16').each(function(){

			var
				src = hi(this).css('background-image'),
				a = src.split('/16/'),
				before = a[0],
				after = a[1];

				hi(this).css({ 'background-image': before + '/32/' + after });

		});

		hi('a.button-with-icon-32').each(function(){

			var
				src = hi(this).css('background-image'),
				a = src.split('/32/'),
				before = a[0],
				after = a[1];

				hi(this).css({ 'background-image': before + '/64/' + after });

		});


		/*-------------------------------------------
			1.9 - Replace containers's bg image
		-------------------------------------------*/

		hi('.st-container-bg').each(function(){

			if ( hi(this).is('[data-hidpi]') ) {

				var
					src = hi(this).attr('data-hidpi');

					hi(this).css( 'background-image', 'url(' + src + ')' );

			}

		});


	} // if ( hidpi )



	/*-------------------------------------------
		1.10 - Is file exists
	-------------------------------------------*/

	function urlExists( url ) {
		
		var
			http = new XMLHttpRequest();
	
			http.open('HEAD', url, false);
	
			http.send();
	
			return http.status !== 404;
	
	}


}); // end jQuery.noConflict()