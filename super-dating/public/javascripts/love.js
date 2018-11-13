/* global $ */

$(document).ready(function() {
    $("#beginButtonGroup").click(function() {
        $("#signupButton").fadeOut(500);
        $("#loginButton").fadeOut(500);
    });

    $("#signupButton").click(function() {
        setTimeout(function() {
            $("#signupForm").fadeIn(500);
        }, (500));
    });
    $("#loginButton").click(function() {
        setTimeout(function() {
            $("#loginForm").fadeIn(500);
        }, (500));
        
    });
});
