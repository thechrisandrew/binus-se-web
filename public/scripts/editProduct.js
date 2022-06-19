$(function () {
	const queryString = window.location.search;
	// console.log(queryString);

	const urlParams = new URLSearchParams(queryString);
	const productId = urlParams.get("productId");
	// console.log(productId);

	$(".save-btn").attr("id", productId);

	function getProductDetails() {
		$.ajax({
			type: "GET",
			url: `http://127.0.0.1:3000/product/${productId}`,
			headers: {
				token: document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1],
			},
			success: function (data, status) {
				// console.log(data[0]);
				$("#productName").val(data[0].productName);
				$("#productSKU").val(data[0].productId);
				$("#productQuantity").val(data[0].productStock);
				$("#productPrice").val(data[0].productPrice);
			},
			error: function (data, status) {
				console.log(data);
				console.log(status);
			},
		});
	}

	getProductDetails();

	$(document).on("click", ".save-btn", null, function (event) {
		event.preventDefault();

		$.ajax({
			url: "http://127.0.0.1:3000/product/update/" + this.id,
			type: "POST",
			headers: {
				token: document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1],
			},
			data: {
				productId: $("#productSKU").val(),
				productName: $("#productName").val(),
				productPrice: $("#productPrice").val(),
				productStock: $("#productQuantity").val(),
			},
			success: function (data, status) {
				if (status == "success") {
					console.log("Save successfully");
					window.location.href = "./product.html";
				} else {
					console.log("Not saved.");
				}
			},
		});
	});
});
