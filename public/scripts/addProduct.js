$(function () {
	function addProduct() {
		var data = {
			productId: $("#productSKU").val(),
			productName: $("#productName").val(),
			productPrice: $("#productPrice").val(),
			productStock: $("#productQuantity").val(),
		};

		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/product/",
			headers: {
				token: document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1],
			},
			data: data,
			success: function (data, status) {
				// console.log(data);
				if (data != "Something went wrong!") {
					window.location.href = "./product.html";
				}
			},
			error: function (data, status) {
				// console.log(data);
				// console.log(status);
				alert("Invalid data or Something went wrong!");
			},
		});
	}

	$("#addProduct").click(addProduct);
});
