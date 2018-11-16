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

    function checkUsernameExists() {
        var URL = "love?uname=" + $("#usernameIn").val();
        var exists = false;
        $.ajax({
            url: URL,
            type: "GET",
            datatype: 'json',
            success: function(data, textStatus) {
                console.log("DATA LENGTH: " + data.length);
                exists = data.length != 0;
            },
            async: false
        });
        return exists;
    }

    // Add new User
    $("#submit-user").click(function() {

        // Validate fields
        var fields_valid = true;
        try {
            var username = document.getElementById("usernameIn");
            if (!username.checkValidity()) {
                fields_valid = false;
            }
        }
        catch (err) {
            fields_valid = false;
            // validationMessage
        }
        if (!fields_valid) {
            return false;
        }


        // Check if username exists
        var userExists = checkUsernameExists();
        // console.log("USEREXISTS: " + userExists);
        if (userExists) {
            alert("Username already exists!");
            return;
        }
        // Get gender from radio buttons
        var gen = "";
        var radios = document.getElementsByName('genderIn');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                gen = radios[i].value;
                break;
            }
        }

        // Create the object
        var myobj = {
            username: $("#usernameIn").val(),
            password: $("#passwordIn").val(),
            firstName: $("#firstNameIn").val(),
            lastName: $("#lastNameIn").val(),
            age: $("#ageIn").val(),
            image: $("#imageURL").val(),
            gender: gen,
            interests: $("#interestsIn").val(),
            bio: $("#bioIn").val()
        };
        var jobj = JSON.stringify(myobj);
        // console.log(jobj);
        var url = "love";
        // Call API to add user to database
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
        return false; // To stop form submission refresh page
    });

    // Login User
    $("#login-user").click(function() {
        var URL = "love?uname=" + $("#usernameIn2").val() + "&pword=" + $("#passwordIn2").val();
        //console.log("PASSWORDIN2: " + $("#passwordIn2").val());
        $.getJSON(URL, function(data) {
            if (data.length != 1) console.log("Wrong username or password...");
            else {
                console.log("Log me in!");
                var jobj = JSON.stringify(data); // Convert data to string
                sessionStorage.setItem("myself", jobj); // Save information
                document.location.href = "love.html"; // Move pages
            }
        });
        return false; // To stop form submission refresh page
    });
});

function getAll() {
    $.getJSON("/love", function(data) {
        fillPage(data);
    });
}

function getProfile() {
    $.getJSON(("/love"), function(data) {
       fillProfile(data) 
    });
}

function fillProfile(data) {
    var theHTML = '<div class="row justify-content-center" id="person-row">';
    var i = $("#firstNameIn").val();
    var user = data[i];
    var firstName = user.firstName;
    var lastName = user.lastName;
    var interests = user.interests;
    var bio = user.bio;
    var image = user.image;
    var username = user.username;
    theHTML += '<div class="card col-3 individual-card" onclick="getPerson(' + username +
        ')"><img class="card-img-top" src="' + image +
        '" alt="User image"><div class="card-body d-flex flex-column"><h4 class="card-title">' +
        firstName + " " + lastName + "</h4><h5 class='mt-auto'>Interests</h5><p>" + interests + "</p><h5 class='mt-auto'>About Me</h5><p>" + bio + "</p></div></div>";
    theHTML += '</div>';
    $("#profiles").append(theHTML);
}

function fillPage(data) {
    var theHTML = '<div class="row justify-content-center" id="person-row">';
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        var firstName = user.firstName;
        var lastName = user.lastName;
        var interests = user.interests;
        var image = user.image;
        var username = user.username;
        theHTML += '<div class="card col-3 individual-card" onclick="getPerson(' + username +
        ')"><img class="card-img-top" src="' + image +
        '" alt="User image"><div class="card-body d-flex flex-column"><h4 class="card-title">' +
        firstName + " " + lastName + "</h4><h5 class='mt-auto'>Interests</h5><p>" + interests + "</p></div></div>";
    }
    theHTML += '</div>';
    $("#profiles").append(theHTML);
}
