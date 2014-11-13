/*

	03. - Quick reply form
	08. - OnBlur/OnFocus for input fields
	09. - Dummy Search
	10. - Dummy Subscribe
*/

/* jshint -W099 */
/* global jQuery:false */

var ie = jQuery.noConflict();

ie(function(){

	'use strict';


/*==03.==========================================

	Q U I C K   R E P L Y   F O R M
	Append and remove quick form

===============================================*/

/*

	1 - QUICK REPLY FORM

		1.1 - Remove dummy before submiting
		1.4 - Return dummy after unsuccess submiting

*/


	/*-------------------------------------------
		1.1 - Remove a dummy before submitting
	-------------------------------------------*/

	if ( ie('#ie-version').hasClass('ie-version-8') || ie('#ie-version').hasClass('ie-version-9') ) {

		ie('#layout')
	
			.on('mousedown touchstart', '.form-submit input[type="submit"]', function(){
	
				ie(this).parent().parent().find('input[type="text"]')
					.each(function(){
	
						var
							dummy = ie(this).attr('placeholder'),
							val = ie(this).val();
			
							if ( dummy === val ) {
								ie(this).val(''); }
	
					});
	
			});

	}

	/*-------------------------------------------
		1.2 - Return a dummy after unsuccess submitting
	-------------------------------------------*/

	if ( ie('#ie-version').hasClass('ie-version-8') || ie('#ie-version').hasClass('ie-version-9') ) {

		ie('body').on('mouseenter touchstart', '#layout', function(){
	
			ie('input[type="text"]',this).each(function(){
	
				var
					dummy = ie(this).attr('placeholder'),
					val = ie(this).val();
	
					if ( !val ) {
						ie(this).val(dummy); }
	
			});
	
		});

	}



/*==08.==========================================

 	O N B L U R / O N F O C U S
	For input fields

===============================================*/

	if ( ie('#ie-version').hasClass('ie-version-8') || ie('#ie-version').hasClass('ie-version-9') ) {

		ie('#layout')
	
			.on('focus', 'input[type="text"]', function(){
	
				var
					dummy = ie(this).attr('placeholder'),
					val = ie(this).val();
	
					if ( dummy === val ) {
						ie(this).val(''); }
	
				})
	
			.on('blur', 'input[type="text"]', function(){
	
				var
					dummy = ie(this).attr('placeholder'),
					val = ie(this).val();
	
					if ( !val ) {
						ie(this).val(dummy); }
	
				});

	}



/*==09.==========================================

 	D U M M Y   S E A R C H
	Dummy data for search input field

===============================================*/

	ie('.searchform').each(function(){

		var
			dummy = ie('input[type="submit"]',this).val();

			if ( ie('#ie-version').hasClass('ie-version-8') || ie('#ie-version').hasClass('ie-version-9') ) {
				ie('input[name="s"]',this).val(dummy).attr('placeholder', dummy); }

			else {
				ie('input[name="s"]',this).attr('placeholder', dummy); }

	});



/*==10.==========================================

 	D U M M Y   S U B S C R I B E
	Dummy data for subscribe form

===============================================*/

	if ( ie('#ie-version').hasClass('ie-version-8') || ie('#ie-version').hasClass('ie-version-9') ) {

		ie('.feedemail-input').each(function(){
	
			var
				dummy = ie(this).attr('placeholder');
	
				ie(this).val(dummy);
	
		});

	}



});