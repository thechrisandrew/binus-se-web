$(document).ready(function () {
    listTransactionHistory();

    var transactionTemplate = $("#TransactionTemplate").html();
    var itemTemplate = $("#ItemTemplate").html();

    function renderTransactionCard(history) {
        // console.log(history);

        let transactionCard = $("#TransactionsCard");

        transactionCard.append(Mustache.render(transactionTemplate, history));

        history.items.forEach((res, index) => {
            renderItemCard(res, history.transactionId);
        });
    }

    function renderItemCard(item, tableId) {
        // console.log(item);
        // console.log(tableId);

        let itemCard = $("#Table" + tableId);

        itemCard.append(Mustache.render(itemTemplate, item));
    }

    function listTransactionHistory() {
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3000/history?startDate=" + startDate + "&endDate=" + endDate,
            success: function (data, status) {
                // console.log(data, status);
                if (status === "success" || data.status === 200) {
                    // console.log(data);

                    data.forEach((res, index) => {
                        renderTransactionCard(res, index);
                    });
                }
            },
            error: function (data, status) {
                console.log(data, status);
                if (data.status === 500) {
                    alert("Error: Server error");
                }
            },
        });
    }

    $(document).on("click", "#FilterButton", null, function (event) {
        event.preventDefault();
        let transactionCard = $("#TransactionsCard");
        let itemCard = $("#ItemCard");

        transactionCard.empty();
        itemCard.empty();

        listTransactionHistory();
    });
});
