const ctx = document.getElementById('tokenomicsChart').getContext('2d');
const tokenomicsChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Liquidity', 'Treasury', 'Community Rewards', 'Charity', 'Marketing', 'Development Fund'],
    datasets: [{
      label: 'Token Distribution',
      data: [30, 25, 20, 5, 5, 10], // Adjust percentages here
      backgroundColor: ['#28a745', '#f39c12', '#3498db', '#FF6EC7', '#e74c3c', '#808080'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
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
