import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library
import './Dashboard.css'; // Import CSS file for additional styling

function Dashboard() {
  // Dummy data for orders, revenue, and products
  const orders = 150;
  const revenue = '$15,000';
  const products = [
    { id: 1, name: 'Laptop', price: 20 },
    { id: 2, name: 'Bags', price: 30 },
    { id: 3, name: 'Mobiles', price: 25 },
    { id: 4, name: 'Perfumes', price: 25 },
  ];

  // Dummy data for line chart
  const salesData = [
    { month: 'Jan', sales: 100 },
    { month: 'Feb', sales: 150 },
    { month: 'Mar', sales: 200 },
    { month: 'Apr', sales: 180 },
    { month: 'May', sales: 220 },
    { month: 'Jun', sales: 250 },
  ];

  const chartRefBar = useRef(null); // Reference to the bar chart canvas element
  const chartRefPie = useRef(null); // Reference to the pie chart canvas element
  const chartRefLine = useRef(null); // Reference to the line chart canvas element
  const chartInstanceBar = useRef(null); // Reference to the bar chart instance
  const chartInstancePie = useRef(null); // Reference to the pie chart instance
  const chartInstanceLine = useRef(null); // Reference to the line chart instance

  useEffect(() => {
    if (products.length === 0) return; // Check if products array is empty

    // Destroy the existing bar chart instance before rendering a new one
    if (chartInstanceBar.current) {
      chartInstanceBar.current.destroy();
    }

    // Create a new bar chart instance
    const ctxBar = chartRefBar.current.getContext('2d');
    const newChartInstanceBar = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: products.map((product) => product.name),
        datasets: [
          {
            label: 'Price',
            data: products.map((product) => product.price),
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ], // Example background colors
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
            ], // Example border colors
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000, // Animation duration in milliseconds
          easing: 'easeInOutQuart', // Easing function for the animation
        },
        scales: {
          y: {
            beginAtZero: true, // Start y-axis at zero
            grid: {
              color: 'rgba(0, 0, 0, 0.1)', // Color of the grid lines
            },
            ticks: {
              font: {
                size: 12, // Font size of the y-axis labels
              },
            },
          },
          x: {
            grid: {
              display: false, // Hide the x-axis grid lines
            },
          },
        },
      },
    });

    // Update the bar chart instance reference
    chartInstanceBar.current = newChartInstanceBar;

    // Clean up function to destroy the bar chart when the component unmounts
    return () => {
      if (chartInstanceBar.current) {
        chartInstanceBar.current.destroy();
      }
    };
  }, [products]); // Re-render the bar chart when the products data changes

  useEffect(() => {
    if (products.length === 0) return; // Check if products array is empty

    // Destroy the existing pie chart instance before rendering a new one
    if (chartInstancePie.current) {
      chartInstancePie.current.destroy();
    }

    // Create a new pie chart instance
    const ctxPie = chartRefPie.current.getContext('2d');
    const newChartInstancePie = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: products.map((product) => product.name),
        datasets: [
          {
            label: 'Price',
            data: products.map((product) => product.price),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ], // Example background colors
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ], // Example border colors
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000, // Animation duration in milliseconds
          easing: 'easeInOutQuart', // Easing function for the animation
        },
        plugins: {
          legend: {
            position: 'right', // Position of the legend
          },
        },
      },
    });

    // Update the pie chart instance reference
    chartInstancePie.current = newChartInstancePie;

    // Clean up function to destroy the pie chart when the component unmounts
    return () => {
      if (chartInstancePie.current) {
        chartInstancePie.current.destroy();
      }
    };
  }, [products]); // Re-render the pie chart when the products data changes

  useEffect(() => {
    // Destroy the existing line chart instance before rendering a new one
    if (chartInstanceLine.current) {
      chartInstanceLine.current.destroy();
    }

    // Create a new line chart instance
    const ctxLine = chartRefLine.current.getContext('2d');
    const newChartInstanceLine = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: salesData.map((data) => data.month),
        datasets: [
          {
            label: 'Sales',
            data: salesData.map((data) => data.sales),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            tension: 0.1, // Line tension (0 for straight lines)
          },
        ],
      },
      options: {
        animation: {
          duration: 2000, // Animation duration in milliseconds
          easing: 'easeInOutQuart', // Easing function for the animation
        },
        scales: {
          y: {
            beginAtZero: true, // Start y-axis at zero
            grid: {
              color: 'rgba(0, 0, 0, 0.1)', // Color of the grid lines
            },
            ticks: {
              font: {
                size: 12, // Font size of the y-axis labels
              },
            },
          },
          x: {
            grid: {
              display: false, // Hide the x-axis grid lines
            },
          },
        },
      },
    });

    // Update the line chart instance reference
    chartInstanceLine.current = newChartInstanceLine;

    // Clean up function to destroy the line chart when the component unmounts
    return () => {
      if (chartInstanceLine.current) {
        chartInstanceLine.current.destroy();
      }
    };
  }, []); // Render the line chart only once

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-section">
        <h2>Orders</h2>
        <p>Total Orders: {orders}</p>
      </div>

      <div className="dashboard-section">
        <h2>Revenue</h2>
        <p>Total Revenue: {revenue}</p>
      </div>

      <div className="dashboard-section">
        <h2>Top Products (Bar Chart)</h2>
        {/* Render the canvas element for the bar chart */}
        <canvas ref={chartRefBar} />
      </div>

      <div className="dashboard-section">
        <h2>Top Products (Pie Chart)</h2>
        {/* Render the canvas element for the pie chart */}
        <canvas ref={chartRefPie} />
      </div>

      <div className="dashboard-section">
        <h2>Sales Trend (Line Chart)</h2>
        {/* Render the canvas element for the line chart */}
        <canvas ref={chartRefLine} />
      </div>
    </div>
  );
}

export default Dashboard;

