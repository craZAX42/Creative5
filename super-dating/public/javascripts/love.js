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
    });

    $("#loginButton2").click(function() {
        $signup.fadeOut(500);
        setTimeout(function() {
            $login.fadeIn();
        }, (500));
    });

    $("#submit-user").click(function() {
        var $gender = "";
        var radios = document.getElementsByName('genderIn');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                // alert(radios[i].value);
                $gender = radios[i].value;
                break;
            }
        }
        
        var myobj = { username: $("#usernameIn").val(), password: $("#passwordIn").val(),
        firstName: $("#firstNameIn").val(), lastName: $("#lastNameIn").val(), 
        age: $("#ageIn").val(), image: $("#imageURL").val(), gender: $gender,
        interests: $("#interestsIn").val(), bio: $("#bioIn").val() };
        var jobj = JSON.stringify(myobj);
        console.log(jobj);
        var url = "love";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                console.log("User successfully stored.");
                sessionStorage.setItem("myself", jobj); // Save the object information
                document.location.href = "love.html"; // Move pages
            }
        });
    });
    
    $("#login-user").click(function() {
        var URL = "love?uname=" + $("#usernameIn2").val() + "&pword=" + $("#passwordIn2").val();
        //console.log("PASSWORDIN2: " + $("#passwordIn2").val());
        $.getJSON(URL, function(data) {
            if (data.length != 1) console.log("Wrong username or password...");
            else {
                console.log("Log me in!");
            }
        });
    });

});
