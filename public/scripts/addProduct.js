$(function() {

    function addProduct() {
        var product = {
            productName: $('#productName').val(),
            price: $('#productPrice').val(),
            id: $("#productSKU").val(),
            quantity: $("#productQuantity").val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/product/',
            data: product,
            success: function(data,status) {
                if(data!="Something went wrong!"){
                    window.location.href = './product.html';
                }
            }
        });
    }

    $('#addProduct').click(addProduct);

});