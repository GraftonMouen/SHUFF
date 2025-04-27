const ctx = document.getElementById('tokenomicsChart').getContext('2d');
const tokenomicsChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Liquidity', 'Development Fund', 'Community Rewards', 'Marketing', 'Treasury'],
    datasets: [{
      label: 'Token Distribution',
      data: [35, 25, 20, 10, 10], // Adjust percentages here
      backgroundColor: ['#28a745', '#f39c12', '#3498db', '#e74c3c'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + "%";
          }
        }
      }
    }
  }
});
