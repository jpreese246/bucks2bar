// Validate username input
document.getElementById("username").addEventListener("input", ({ target }) => {
  const username = target.value; // Get the value of the input field
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Validation regex

  // Set border color based on validation
  target.style.borderColor = regex.test(username) ? "green" : "red";
});

// Download the chart as an image
document.getElementById("downloadBtn").addEventListener("click", () => {
  const canvas = document.getElementById("chatBarChart");
  const image = canvas.toDataURL("image/png"); // Convert canvas to a PNG image

  // Create a temporary <a> element to trigger the download
  const link = document.createElement("a");
  link.href = image;
  link.download = "chart.png"; // Set the default file name
  link.click(); // Trigger the download
});

let barChart; // Variable to hold the chart instance

// Handle "Chat" tab click to render the chart
document.getElementById("chat-tab").addEventListener("click", () => {
  const ctx = document.getElementById("chatBarChart").getContext("2d");

  // Function to retrieve monthly data
  const getMonthlyData = () => {
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

    return months.map((month) => ({
      month,
      income: parseFloat(document.getElementById(`${month}-income`).value) || 0,
      expenses:
        parseFloat(document.getElementById(`${month}-expenses`).value) || 0,
    }));
  };

  // Retrieve and process monthly data
  const monthlyData = getMonthlyData();
  const labels = monthlyData.map(
    ({ month }) => month.charAt(0).toUpperCase() + month.slice(1)
  ); // Capitalize month names
  const incomeData = monthlyData.map(({ income }) => income);
  const expensesData = monthlyData.map(({ expenses }) => expenses);

  // Destroy the existing chart instance if it exists
  if (barChart) barChart.destroy();

  // Create a new chart instance
  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels, // Set month names as labels
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
