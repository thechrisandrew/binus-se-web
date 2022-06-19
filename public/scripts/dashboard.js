$(document).ready(function () {
	function render(data) {
		// console.log(data.todayResult[0].totalIncome);
		$("#total-today").text(data.todayResult[0].totalIncome);

		// console.log(data.yesterdayResult[0].totalIncome);
		$("#total-yesterday").text(data.yesterdayResult[0].totalIncome);

		var chartData = {
			// A labels array that can contain any sort of values
			// labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
			labels: [],

			// Our series array that contains series objects or in this case series data arrays
			// series: [[5, 10, 4, 2, 3]],
			series: [[]],
		};

		// console.log(data.itemStatisticResult);

		data.itemStatisticResult.forEach((e) => {
			console.log(e);

			chartData.labels.push(e.transactionDate.substring(0, 10));

			chartData.series[0].push(e.totalTransaction);
		});

		var options = {
			low: 0,
			axisY: {
				onlyInteger: true,
			},
		};

		// Create a new line chart object where as first parameter we pass in a selector
		// that is resolving to our chart container element. The Second parameter
		// is the actual data object.
		new Chartist.Line(".ct-chart", chartData, options);
	}

	function getDashboardInfo() {
		$.ajax({
			type: "GET",
			url: "http://127.0.0.1:3000/dashboard/",
			headers: {
				token: document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1],
			},
			success: function (data, status) {
				console.log(data);
				// data.forEach((e, index) => {
				// 	renderProduct(e, index);
				// });
				render(data);
			},
			error: function (data, status) {
				console.log(data);
				console.log(status);
			},
		});
	}

	getDashboardInfo();
});
