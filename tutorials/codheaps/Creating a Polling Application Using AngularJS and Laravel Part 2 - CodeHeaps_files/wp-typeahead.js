( function($) {
	
	$('input[name="s"]')
		.typeahead( {
			source: function ( query , process ) {
				$.ajax({
					url: wp_typeahead.ajaxurl,
					type : 'GET',
					dataType: 'JSON',
					data: 'action=ajax_search&fn=get_ajax_search&terms=' + query + '&sec_token=' + wp_typeahead.sec_token,
					success: function(data) {
							process(data);
					}
				});
			}
		} );
} )(jQuery);
