import { Chart as ChartJS, BarController, Legend, Tooltip } from "chart.js";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(BarController, Tooltip, Legend);

function OrderStats() {
  // Dummy data for the most ordered items in the menu
  const mostOrderedItems = [
    { name: "Item A", quantity: 50 },
    { name: "Item B", quantity: 30 },
    { name: "Item C", quantity: 20 },
    { name: "Item D", quantity: 15 },
    { name: "Item E", quantity: 10 },
  ];

  // Extracting labels and data from the dummy data
  const labels = mostOrderedItems.map((item) => item.name);
  const data = mostOrderedItems.map((item) => item.quantity);

  return (
    <div className="flex items-center justify-center h-80 p-2">
      <Pie
        data={{
          labels: labels,
          datasets: [
            {
              label: "Most Ordered Items",
              data: data,
              backgroundColor: [
                "#006400", // Dark green
                "#228B22", // Forest green
                "#3CB371", // Medium sea green
                "#90EE90", // Light green
                "#98FB98",
              ],
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Most Ordered Items",
            },
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </div>
  );
}

export default OrderStats;
