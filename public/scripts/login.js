$(function () {
    $("#login").click(function () {
        loginAccount();
    });
});

var email = $("#email");
var password = $("#password");

function loginAccount() {
    $.ajax({
        url: "http://127.0.0.1:3000/auth/login",
        type: "POST",
        data: {
            email: email.val(),
            password: password.val(),
        },
        success: function (data, status) {
            console.log(data, status);
            // status code belom jalan di login, tapi di register udah jalan
            if (status === "success") {
                let token = data.token;
                document.cookie = "token=" + token;
                window.location.href = "http://127.0.0.1:5500/public/index.html";
            }
        },
        error: function (data, status) {
            console.log(data, status);
            if (status === "error" && data.status === 401) {
                alert("Error: " + data.responseJSON.message);
            } else if (data.status === 400) {
                alert("Error: " + data.responseJSON.message);
            } else if (data.status === 500) {
                alert("Error: Server error");
            }
        },
    });
}
