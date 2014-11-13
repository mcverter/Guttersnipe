$(document).ready(function(){

    var subscribeToNewsletters = function(){
        $.post(
            "/ajax/users/subscribe",
            { email: $("#newsletter_subscriber_val").val()},
            function(data) {
                $("#newsletter_section").html(data.message_html);
            },
            "json"
        );
    };

    //Subscribe to Newsletters
    $("#newsletter_subscriber").click(subscribeToNewsletters);

});