$(function () {
    $("#register").click(function () {
        registerAccount();
    });
});

var firstname = $("#firstname");
var lastname = $("#lastname");
var email = $("#email");
var password = $("#password");
var confirmPassword = $("#check_password");

function registerAccount() {
    $.ajax({
        url: "http://127.0.0.1:3000/auth/register",
        type: "POST",
        data: {
            firstName: firstname.val(),
            lastName: lastname.val(),
            email: email.val(),
            password: password.val(),
            confirmPassword: confirmPassword.val(),
        },
        success: function (data, status) {
            console.log(data);
            if (status === "success") {
                window.location.href = "http://127.0.0.1:5500/public/login.html";
            }
        },
        error: function (data, status) {
            if (status === "error" && data.status === 400) {
                alert("Error: " + data.responseJSON.error.details[0].message);
            } else if (data.status === 500) {
                alert("Error: Server error");
            }
        },
    });
}
