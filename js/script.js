// input with id "username" on change
document.getElementById("username").addEventListener("input", function () {
  const username = this.value; // Get the value of the input field
  //regex to check if username has at least 1 capital letter, 1 special character, 1 number, and is at
  //least 8 characters long
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regex.test(username)) {
    //set the username input border color to green
    this.style.borderColor = "green";
  } else {
    //set the username input border color to red
    this.style.borderColor = "red";
  }
});
document.getElementById("downloadBtn").addEventListener("click", function () {
  const canvas = document.getElementById("chatBarChart"); // Get the canvas element
  const image = canvas.toDataURL("image/png"); // Convert canvas to a data URL (PNG format)

  // Create a temporary <a> element to trigger the download
  const link = document.createElement("a");
  link.href = image;
  link.download = "chart.png"; // Set the default file name
  link.click(); // Trigger the download
});
let barChart; // Declare a variable to hold the chart instance
document.getElementById("chat-tab").addEventListener("click", function () {
  var ctx = document.getElementById("chatBarChart").getContext("2d");

  function getMonthlyData() {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const monthlyData = months.map((month) => {
      const income =
        parseFloat(document.getElementById(`${month}-income`).value) || 0;
      const expenses =
        parseFloat(document.getElementById(`${month}-expenses`).value) || 0;
      return { month, income, expenses };
    });

    return monthlyData;
  }

  // Retrieve monthly data
  const monthlyData = getMonthlyData();
  const labels = monthlyData.map(
    (data) => data.month.charAt(0).toUpperCase() + data.month.slice(1)
  ); // Capitalize month names
  const incomeData = monthlyData.map((data) => data.income);
  const expensesData = monthlyData.map((data) => data.expenses);

  // Destroy the existing chart instance if it exists
  if (barChart) {
    barChart.destroy();
  }

  // Create a new chart instance
  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels, // Set month names as labels
      datasets: [
        {
          label: "Income",
          data: incomeData, // Set income data
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: expensesData, // Set expenses data
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
