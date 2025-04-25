// Sample data - in a real app you would load this from your local database
const salesData = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    amounts: [650, 590, 800, 810, 560, 1250, 1100]
};

const paymentData = {
    methods: ['Cash', 'Credit Card', 'Mobile Pay'],
    amounts: [45, 30, 25],
    colors: ['#4cc9f0', '#4361ee', '#3a0ca3']
};

const productsData = {
    names: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    sales: [45, 30, 25, 20, 15],
    colors: ['#f94144', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b']
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Weekly Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: salesData.days,
            datasets: [{
                label: 'Sales ($)',
                data: salesData.amounts,
                backgroundColor: 'rgba(67, 97, 238, 0.7)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Payment Methods Chart
    // const paymentCtx = document.getElementById('paymentChart').getContext('2d');
    // new Chart(paymentCtx, {
    //     type: 'doughnut',
    //     data: {
    //         labels: paymentData.methods,
    //         datasets: [{
    //             data: paymentData.amounts,
    //             backgroundColor: paymentData.colors
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 position: 'bottom'
    //             }
    //         }
    //     }
    // });
    
    // Top Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    new Chart(productsCtx, {
        type: 'horizontalBar',
        data: {
            labels: productsData.names,
            datasets: [{
                label: 'Units Sold',
                data: productsData.sales,
                backgroundColor: productsData.colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Simulate offline/online status
    // setInterval(() => {
    //     const syncStatus = document.querySelector('.sync-status');
    //     const isOnline = Math.random() > 0.7; // 30% chance to show online
        
    //     if (isOnline) {
    //         syncStatus.classList.remove('offline');
    //         syncStatus.classList.add('online');
    //         syncStatus.innerHTML = '<i class="fas fa-plug"></i><span>Online - Syncing data...</span>';
            
    //         // After 3 seconds, show sync complete
    //         setTimeout(() => {
    //             syncStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>All data synced successfully</span>';
    //         }, 3000);
    //     } else {
    //         syncStatus.classList.remove('online');
    //         syncStatus.classList.add('offline');
    //         const pending = Math.floor(Math.random() * 5) + 1;
    //         syncStatus.innerHTML = `<i class="fas fa-plug"></i><span>Offline Mode - ${pending} transactions pending sync</span>
    //                               <button style="margin-left: auto; padding: 5px 10px; background: var(--primary-color); color: white; border: none; border-radius: 3px;">Sync Now</button>`;
    //     }
    // }, 10000);
});