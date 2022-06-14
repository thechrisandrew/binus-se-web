$(function () {
	function renderProduct(product) {
		var smallTemplate = $("#smallTemplate").html();
		var bigTemplate = $("#bigTemplate").html();
		var bigProduct = $("#bigProduct");
		var smallProduct = $("#smallProduct");

		bigProduct.append(Mustache.render(bigTemplate, product));
		smallProduct.append(Mustache.render(smallTemplate, product));
	}

	function listProduct() {
		$.ajax({
			type: "GET",
			url: "http://127.0.0.1:3000/product/",
			success: function (data, status) {
				data.forEach((e) => {
					renderProduct(e);
				});
			},
			error: function (data, status) {
				console.log(data);
				console.log(status);
			},
		});
	}

	listProduct();

	$("#bigProduct").delegate(".edit", "click", function () {
		$(this).addClass("editMode");

		$("div[contenteditable]").keydown(function (e) {
			console.log(e);
			// trap the return key being pressed
			if (e.keyCode === 13) {
				// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
				document.execCommand("insertHTML", false, "<br/>");
				// prevent the default behaviour of return key pressed
				return false;
			}
		});
	});

	// Save data
	$("#bigProduct").delegate(".edit", "focusout", function () {
		$(this).removeClass("editMode");

		var data = {
			key: this.dataset.key,
			value: $(this).text(),
		};

		console.log(data);

		$.ajax({
			url: "http://127.0.0.1:3000/product/update/" + this.id,
			type: "POST",
			data: data,
			success: function (data, status) {
				if (status == "success") {
					console.log("Save successfully");
				} else {
					console.log("Not saved.");
				}
			},
		});
	});

	$("#bigProduct").delegate(".delete", "click", function () {
		var row = this;

		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/product/delete/" + this.id,
			success: function (data, status) {
				console.log(data);
				console.log(status);
				if (status == "success") {
					$(row).parent().parent().remove();
				}
			},
			error: function (data, status) {
				console.log(data);
				console.log(status);
			},
		});
	});

	$("#bigProduct").delegate("div[contenteditable]", "keydown", function (e) {
		if (e.keyCode === 13) {
			// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
			document.execCommand("insertHTML", false, "<br/>");
			// prevent the default behaviour of return key pressed
			return false;
		}
	});

	$("#bigProduct").delegate("span[contenteditable]", "keydown", function (e) {
		return e.which != 13;
	});

	$("#smallProduct").delegate(".edit", "click", function () {
		$(this).addClass("editMode");

		$("div[contenteditable]").keydown(function (e) {
			console.log(e);
			// trap the return key being pressed
			if (e.keyCode === 13) {
				// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
				document.execCommand("insertHTML", false, "<br/>");
				// prevent the default behaviour of return key pressed
				return false;
			}
		});
	});

	// Save data
	$("#smallProduct").delegate(".edit", "focusout", function () {
		$(this).removeClass("editMode");

		var data = {
			key: this.dataset.key,
			value: $(this).text(),
		};

		console.log(data);

		$.ajax({
			url: "http://127.0.0.1:3000/product/update/" + this.id,
			type: "POST",
			data: data,
			success: function (data, status) {
				if (status == "success") {
					console.log("Save successfully");
				} else {
					console.log("Not saved.");
				}
			},
		});
	});

	$("#smallProduct").delegate(".delete", "click", function () {
		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/product/delete/" + this.id,
			success: function (data, status) {
				console.log(status);
				if (status == "success") {
					$(this).parent().remove();
				}
			},
			error: function (data, status) {
				console.log(data);
				console.log(status);
			},
		});
	});

	$("#smallProduct").delegate("div[contenteditable]", "keydown", function (e) {
		if (e.keyCode === 13) {
			// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
			document.execCommand("insertHTML", false, "<br/>");
			// prevent the default behaviour of return key pressed
			return false;
		}
	});

	$("#smallProduct").delegate("span[contenteditable]", "keydown", function (e) {
		return e.which != 13;
	});
});
