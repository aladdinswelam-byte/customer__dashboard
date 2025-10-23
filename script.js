// =========================
// SAMPLE CUSTOMER DATA
// =========================
// Replace this section with your real data later
const orders = [
  {
    "Account Phones": "1225624040",
    "Account Name": "دينا يونان",
    "Resturant": "Water Way",
    "Total Price": 540,
    "Created": "2023-09-15 11:35:48",
    "status": "closed"
  },
  {
    "Account Phones": "1001222223",
    "Account Name": "دكتور اميرة المرصفاوي",
    "Resturant": "Water Way",
    "Total Price": 955,
    "Created": "2023-09-15 12:15:01",
    "status": "closed"
  },
  {
    "Account Phones": "1001222223",
    "Account Name": "دكتور اميرة المرصفاوي",
    "Resturant": "Water Way",
    "Total Price": 635,
    "Created": "2023-09-16 14:57:11",
    "status": "closed"
  },
  {
    "Account Phones": "1001222223",
    "Account Name": "دكتور اميرة المرصفاوي",
    "Resturant": "Water Way",
    "Total Price": 720,
    "Created": "2023-09-21 18:33:56",
    "status": "closed"
  },
  {
    "Account Phones": "1001690144",
    "Account Name": "رامي الحاج",
    "Resturant": "Water Way",
    "Total Price": 1120,
    "Created": "2023-09-15 16:05:36",
    "status": "closed"
  },
  {
    "Account Phones": "1069995094",
    "Account Name": "نادر سليمان",
    "Resturant": "Water Way",
    "Total Price": 320,
    "Created": "2023-09-15 18:06:44",
    "status": "closed"
  }
];

// =========================
// MAIN ANALYTICS CLASS
// =========================
class CustomerAnalytics {
  constructor(orders) {
    this.orders = orders;
    this.customers = this.processCustomers();
    this.init();
  }

  processCustomers() {
    const customerMap = new Map();

    this.orders.forEach(order => {
      const phone = order['Account Phones'];
      if (!customerMap.has(phone)) {
        customerMap.set(phone, {
          phone: phone,
          name: order['Account Name'],
          orders: [],
          totalSpent: 0,
          averageOrder: 0,
          lastOrder: null,
          branches: new Map(),
          isRecurring: false
        });
      }

      const customer = customerMap.get(phone);
      customer.orders.push(order);
      customer.totalSpent += order['Total Price'];
      customer.averageOrder = customer.totalSpent / customer.orders.length;

      const orderDate = new Date(order.Created);
      if (!customer.lastOrder || orderDate > customer.lastOrder) {
        customer.lastOrder = orderDate;
      }

      const branch = order.Resturant;
      customer.branches.set(branch, (customer.branches.get(branch) || 0) + 1);
      customer.isRecurring = customer.orders.length > 1;
    });

    return Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }

  init() {
    this.displayCustomers();
    this.updateStats();
  }

  displayCustomers(filteredCustomers = null) {
    const customerList = document.getElementById('customerList');
    const customersToShow = filteredCustomers || this.customers;
    customerList.innerHTML = '';

    customersToShow.forEach(customer => {
      const customerCard = this.createCustomerCard(customer);
      customerList.appendChild(customerCard);
    });
  }

  createCustomerCard(customer) {
    const card = document.createElement('div');
    card.className = 'customer-card bg-white rounded-3 p-3 mb-3';
    card.style.cursor = 'pointer';
    card.onclick = () => this.showCustomerDetails(customer);

    const lastOrder = new Date(customer.lastOrder).toLocaleDateString();
    const branchInfo = Array.from(customer.branches.entries())
      .map(([branch, count]) => `${branch} (${count})`)
      .join(', ');

    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h6 class="mb-1">${customer.name}</h6>
          <small class="text-muted">${customer.phone}</small>
        </div>
        <span class="badge ${customer.isRecurring ? 'recurring-badge' : 'new-badge'}">
          ${customer.isRecurring ? 'Recurring' : 'New'}
        </span>
      </div>
      <div class="mt-2">
        <small class="text-muted d-block"><i class="fas fa-store me-1"></i>${branchInfo}</small>
        <small class="text-muted d-block"><i class="fas fa-calendar me-1"></i>Last: ${lastOrder}</small>
      </div>
      <div class="mt-2 d-flex justify-content-between">
        <small><strong>Total: $${customer.totalSpent}</strong></small>
        <small>Avg: $${customer.averageOrder.toFixed(2)}</small>
        <small>Orders: ${customer.orders.length}</small>
      </div>
    `;

    return card;
  }

  showCustomerDetails(customer) {
    const detailsContainer = document.getElementById('customerDetails');
    const lastOrder = new Date(customer.lastOrder).toLocaleDateString();
    const branchInfo = Array.from(customer.branches.entries())
      .map(([branch, count]) => `${branch} (${count} orders)`)
      .join('<br>');

    detailsContainer.innerHTML = `
      <div class="bg-white rounded-3 p-4">
        <div class="text-center mb-4">
          <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
            <i class="fas fa-user text-white fa-2x"></i>
          </div>
          <h4>${customer.name}</h4>
          <p class="text-muted">${customer.phone}</p>
          <span class="badge ${customer.isRecurring ? 'recurring-badge' : 'new-badge'} fs-6">
            ${customer.isRecurring ? '🎯 Recurring Customer' : '👋 New Customer'}
          </span>
        </div>

        <div class="row text-center mb-4">
          <div class="col-4"><div class="border-end"><h5 class="text-primary">${customer.orders.length}</h5><small class="text-muted">Total Orders</small></div></div>
          <div class="col-4"><div class="border-end"><h5 class="text-success">$${customer.totalSpent}</h5><small class="text-muted">Total Spent</small></div></div>
          <div class="col-4"><h5 class="text-warning">$${customer.averageOrder.toFixed(2)}</h5><small class="text-muted">Avg Order</small></div>
        </div>

        <div class="mb-4">
          <h6><i class="fas fa-store me-2"></i>Branches Ordered From:</h6>
          <div class="bg-light rounded p-3">${branchInfo}</div>
        </div>

        <div class="mb-3">
          <h6><i class="fas fa-clock me-2"></i>Last Order Date:</h6>
          <p class="bg-light rounded p-2">${lastOrder}</p>
        </div>

        ${customer.orders.length > 1 ? `
          <div class="chart-container mt-4">
            <h6 class="text-center mb-3">Order Amount Distribution</h6>
            <canvas id="orderChart" height="200"></canvas>
          </div>
        ` : `
          <div class="alert alert-info text-center">
            <i class="fas fa-info-circle me-2"></i>Single order customer - No chart available
          </div>
        `}
      </div>
    `;

    if (customer.orders.length > 1) {
      this.renderOrderChart(customer);
    }
  }

  renderOrderChart(customer) {
    const ctx = document.getElementById('orderChart').getContext('2d');
    const orderAmounts = customer.orders.map(order => order['Total Price']);
    const orderDates = customer.orders.map(order => new Date(order.Created).toLocaleDateString());

    const backgroundColors = orderAmounts.map((_, i) => {
      const hue = (i * 137.5) % 360;
      return `hsl(${hue}, 70%, 60%)`;
    });

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: orderDates,
        datasets: [{
          data: orderAmounts,
          backgroundColor: backgroundColors,
          borderColor: 'white',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return `$${value} (${percent}%)`;
              }
            }
          }
        }
      }
    });
  }

  updateStats() {
    document.getElementById('totalCustomers').textContent = this.customers.length;
    document.getElementById('totalOrders').textContent = this.orders.length;

    const recurring = this.customers.filter(c => c.isRecurring).length;
    document.getElementById('recurringCustomers').textContent = recurring;

    const revenue = this.customers.reduce((sum, c) => sum + c.totalSpent, 0);
    document.getElementById('totalRevenue').textContent = `$${revenue}`;
  }

  searchCustomer() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!searchTerm) return this.displayCustomers();

    const filtered = this.customers.filter(c =>
      c.phone.includes(searchTerm) || c.name.toLowerCase().includes(searchTerm)
    );

    this.displayCustomers(filtered);

    if (filtered.length === 1) this.showCustomerDetails(filtered[0]);
    else if (filtered.length === 0)
      document.getElementById('customerDetails').innerHTML = `
        <div class="alert alert-warning text-center">
          <i class="fas fa-exclamation-triangle me-2"></i>No customer found for: ${searchTerm}
        </div>
      `;
  }
}

// =========================
// PAGE INITIALIZATION
// =========================
document.addEventListener('DOMContentLoaded', () => {
  window.customerAnalytics = new CustomerAnalytics(orders);
});

function searchCustomer() {
  window.customerAnalytics.searchCustomer();
}

document.getElementById('searchInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') searchCustomer();
});
