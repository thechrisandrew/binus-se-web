$(document).ready(function () {
	function render(data) {
		var formatter = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",

			// These options are needed to round to whole numbers if that's what you want.
			//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
			//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
		});

		// console.log(data.todayResult[0].totalIncome);
		$("#total-today").text(formatter.format(data.todayResult[0].totalIncome));

		// console.log(data.yesterdayResult[0].totalIncome);
		$("#total-yesterday").text(formatter.format(data.yesterdayResult[0].totalIncome));

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

			var date = new Date(e.transactionDate);

			chartData.labels.push(date.toLocaleDateString());

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
