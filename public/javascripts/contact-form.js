(function ($) {

    "use strict";

    $("#contact").validate();
    
    /* =================================
    ===  CONTACT FORM               ====
    =================================== */
    $("#contact").submit(function (e) {
        e.preventDefault();
        var name = $("#form-name").val();
        var email = $("#form-email").val();
        var subject = $("#form-subject").val();
        var message = $("#form-message").val();
		var toB = $("#form-to").val();
		var to;
		switch(toB){
            case "1":
                to = "communication@24heures.org"; break;
            case "2":
                to = "partenariats@24heures.org"; break;
            case "3":
                to = "restauration@24heures.org"; break;
            case "4":
                to = "billetterie@24heures.org"; break;
			case "5":
				to = "concerts@24heures.org"; break;
			case "6":
				to = "courses@24heures.org"; break;
			case "7":
				to = "animations@24heures.org"; break;
            default:
                to = "communication@24heures.org";
        }


        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message + '&to=' + to;

        function validEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        if (validEmail(email) && (message.length > 1) && (name.length > 1)) {
            $.ajax({
                type: "POST",
                url: "/infos/contact",
                data: dataString,
                success: function() {
					$('.successContent').fadeIn(1000);
					$('.errorContent').fadeOut(500);
				}
            });
        }
        else {
			$('.errorContent').fadeIn(1000);
			$('.successContent').fadeOut(500);
        }
        return false;
    });



  
})(jQuery);


