/* global $ */

$(document).ready(function() {
    $("#beginButtonGroup").click(function() {
        $("#signupButton").fadeOut(500);
        $("#loginButton").fadeOut(500);
    });

    var $login = $('#loginForm');
    var $signup = $("#signupForm");
    $("#signupButton").click(function() {
        setTimeout(function() {
            $signup.fadeIn();
        }, (500));
    });

    $("#loginButton").click(function() {
        setTimeout(function() {
            $login.fadeIn();
        }, (500));
    });

    $("#signupButton2").click(function() {
        $login.fadeOut(500);
        setTimeout(function() {
            $signup.fadeIn();
        }, (500));
    })

    $("#loginButton2").click(function() {
        $signup.fadeOut(500);
        setTimeout(function() {
            $login.fadeIn();
        }, (500));
    })

});
