$(document).ready(function () {
    var optionsTemplate = $("#optionsTemplate").html();

    function renderProduct(product, index) {
        var optionsContainer = $(".options-container");

        // console.log(product);

        product.num = index + 1;

        optionsContainer.append(Mustache.render(optionsTemplate, product));
    }

    function listProduct() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3000/product/",
            headers: {
                token: document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1],
            },
            success: function (data, status) {
                // console.log(data);
                data.forEach((e, index) => {
                    renderProduct(e, index);
                });
            },
            error: function (data, status) {
                console.log(data);
                console.log(status);
            },
        });
    }

    listProduct();

    var selected = $(".selected");
    var optionsContainer = $(".options-container");
    var searchBox = $(".search-box input");

    let optionsList = $(".option");

    // console.log(optionsList);

    $(document).on("click", ".selected", null, function (event) {
        // console.log("test");
        optionsContainer.toggleClass("active");
        searchBox.toggleClass("hidden");

        searchBox.value = "";
        filterList("");
        if (optionsContainer.hasClass("active")) {
            searchBox.focus();
        }
    });

    searchBox.keyup(function (e) {
        filterList(e.target.value);
    });

    $(document).on("click", ".option", null, function (event) {
        event.preventDefault();

        // console.log($(this).children("label").children(".option-id").text());
        // console.log($(this).children("label").children(".option-name").text());

        optionId = $(this).children("label").children(".option-id").text();
        optionName = $(this).children("label").children(".option-name").text();

        $(selected).find("#selectedId").text(optionId);
        $(selected).find("#selectedName").text(optionName);

        optionsContainer.removeClass("active");
        searchBox.toggleClass("hidden");
    });

    const filterList = (searchTerm) => {
        // console.log(searchTerm);
        optionsList = $(".option");
        // console.log(optionsList);
        searchTerm = searchTerm.toLowerCase();
        optionsList.each((index, option) => {
            // let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
            let label = $(option).children("label").text().toLowerCase();
            // console.log(label);
            if (label.indexOf(searchTerm) != -1) {
                // option.style.display = "block";
                $(option).css("display", "block");
            } else {
                // option.style.display = "none";
                $(option).css("display", "none");
            }
        });
    };

    var counter = 0;
    var total = 0;

    var checkout = [];

    var currentProduct = {};

    var bigTemplate = $("#bigTemplate").html();
    var smallTemplate = $("#smallTemplate").html();

    function renderCheckoutItem(product, counter) {
        console.log(product);

        product.num = counter;

        var bigList = $("#bigList");
        var smallList = $("#smallList");
        bigList.append(Mustache.render(bigTemplate, product));
        smallList.append(Mustache.render(smallTemplate, product));

        $("#grand-total").text(total);
        $("#confirm-total").text(total);
    }

    function getProductDetails(id) {
        $.ajax({
            type: "GET",
            url: `http://127.0.0.1:3000/product/${id}`,
            headers: {
                token: document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1],
            },
            success: function (data, status) {
                // console.log(data[0]);
                currentProduct.productId = data[0].productId;
                currentProduct.productName = data[0].productName;
                currentProduct.productPrice = data[0].productPrice;
                currentProduct.subtotal = data[0].productPrice * currentProduct.quantity;

                total = total + currentProduct.subtotal;

                counter = counter + 1;

                renderCheckoutItem(currentProduct, counter);
            },
            error: function (data, status) {
                console.log(data);
                console.log(status);
            },
        });
    }

    $(document).on("click", "#confirm-btn", null, function (event) {
        event.preventDefault();

        // console.log($.trim($("#selectedId").text()));
        // console.log($.trim($("#selectedQuantity").val()));

        var checkoutObj = {
            productId: $.trim($("#selectedId").text()),
            quantity: $.trim($("#selectedQuantity").val()),
        };

        checkout.push(checkoutObj);

        getProductDetails(checkoutObj.productId);

        currentProduct.quantity = $.trim($("#selectedQuantity").val());
    });

    $(document).on("click", "#checkout-btn", null, function (event) {
        event.preventDefault();

        json = JSON.stringify(checkout);

        console.log(json);

        data = {};

        data.data = checkout;

        console.log(JSON.stringify(data));

        $.ajax({
            type: "POST",
            url: `http://127.0.0.1:3000/checkout/`,
            data: data,
            headers: {
                token: document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1],
            },
            success: function (data, status) {
                console.log("successfully created Transaction");
            },
            error: function (data, status) {
                console.log(data);
                console.log(status);
            },
        });
    });

    $(document).on("click", ".delete-btn", null, function (event) {
        // console.log($(this).closest("tr"));
        event.preventDefault();

        // console.log($(`#subtotal${this.id}`).text());
        // console.log($(this).parent().parent().prev().text());
        // total = total - $(this).parent().parent().prev().text();
        total = total - $(`#subtotal${this.id}`).text();

        var big = $(`#big${this.id}`);
        var small = $(`#small${this.id}`);

        big.remove();
        small.remove();

        // console.log("test");

        $("#grand-total").text(total);
        $("#confirm-total").text(total);
    });
});
