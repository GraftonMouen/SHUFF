// Initialize Tokenomics Chart
const initTokenomicsChart = () => {
  const ctx = document.getElementById('tokenomicsChart').getContext('2d');
  return new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Liquidity', 'Treasury', 'Community Rewards', 'Charity', 'Marketing', 'Development Fund'],
      datasets: [{
        data: [30, 25, 20, 5, 5, 10],
        backgroundColor: [
          '#28a745',
          '#f39c12',
          '#3498db',
          '#FF6EC7',
          '#e74c3c',
          '#808080'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              size: 14
            },
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
};

// Initialize chart when DOM loads
document.addEventListener('DOMContentLoaded', initTokenomicsChart);
