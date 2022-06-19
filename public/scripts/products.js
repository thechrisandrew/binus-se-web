$(document).ready(function () {
    var smallTemplate = $("#smallTemplate").html();
    var bigTemplate = $("#bigTemplate").html();

    function renderProduct(product, index) {
        var bigProduct = $("#bigProduct");
        var smallProduct = $("#smallProduct");

        // console.log(product);

        product.num = index + 1;

        bigProduct.append(Mustache.render(bigTemplate, product));
        smallProduct.append(Mustache.render(smallTemplate, product));
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

    $(document).on("click", ".delete-btn", null, function (event) {
        event.preventDefault();

        var big = $(`#big${this.id}`);
        var small = $(`#small${this.id}`);

        console.log(big);
        console.log(small);

        big.remove();
        small.remove();

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:3000/product/delete/" + this.id,
            headers: {
                token: document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1],
            },
        });
    });
});
