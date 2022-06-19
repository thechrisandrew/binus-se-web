$(function () {
	$("#signOut").click(() => {
		document.cookie = "token=";
		window.location.href = "http://127.0.0.1:5500/public/login.html";
	});

	function render(data) {
		$("#fname-input").val(data.firstName);
		$("#lname-input").val(data.lastName);
		$("#email-input").val(data.email);
	}

	function getUserDetails() {
		$.ajax({
			type: "GET",
			url: "http://127.0.0.1:3000/staff/user/",
			headers: {
				token: document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1],
			},
			success: function (data, status) {
				console.log(data);
				render(data[0]);
				// if (data != "Something went wrong!") {
				// 	window.location.href = "./product.html";
				// }
			},
			error: function (data, status) {
				// console.log(data);
				// console.log(status);
				alert("Invalid data or Something went wrong!");
			},
		});
	}

	getUserDetails();

	$("#edit-btn").click((event) => {
		event.preventDefault();
		$("#edit-btn").toggleClass("hidden");
		$("#save-btn").toggleClass("hidden");

		$("#fname-input").removeAttr("disabled");
		$("#lname-input").removeAttr("disabled");
		$("#email-input").removeAttr("disabled");
	});

	$("#save-btn").click((event) => {
		event.preventDefault();
		$("#edit-btn").toggleClass("hidden");
		$("#save-btn").toggleClass("hidden");

		$("#fname-input").attr("disabled", "disabled");
		$("#lname-input").attr("disabled", "disabled");
		$("#email-input").attr("disabled", "disabled");

		$.ajax({
			url: "http://127.0.0.1:3000/staff/update/",
			type: "POST",
			headers: {
				token: document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1],
			},
			data: {
				email: $("#email-input").val(),
				firstName: $("#fname-input").val(),
				lastName: $("#lname-input").val(),
			},
			success: function (data, status) {
				if (status == "success") {
					// console.log("Save successfully");
					alert("saved Successfully");
				} else {
					console.log("Not saved.");
				}
			},
		});
	});
});
