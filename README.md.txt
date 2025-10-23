# Customer Order Analytics

A modern web app for analyzing customer order data with interactive charts and metrics.

## 🧠 Features
- Search customers by phone number
- See total spending, order count, and last order date
- Identify recurring customers
- Visualize order distributions per customer
- Track total revenue and performance
- Works fully client-side (no backend)

## 🪜 Setup Instructions

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click “New repository”
   - Name it something like `customer-analytics`
   - Make it public

2. **Upload the 3 files**
   - `index.html`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**
   - Go to your repository → ⚙️ **Settings**
   - Scroll to “Pages” on the left
   - Under **Source**, select `main` branch → `/root`
   - Click **Save**
   - After a minute, your site will appear at:
     ```
     https://yourusername.github.io/customer-analytics
     ```

4. **Add Your Own Data**
   - In `script.js`, replace the sample `orders` list with your real order data.
   - Each entry should look like:
     ```javascript
     {
       "Account Phones": "1234567890",
       "Account Name": "Customer Name",
       "Resturant": "Branch Name",
       "Total Price": 100,
       "Created": "2023-01-01 12:00:00",
       "status": "closed"
     }
     ```
   - Make sure the field names match exactly (same capitalization).

5. **Visit Your Live Dashboard**
   - Open your link (e.g. `https://yourusername.github.io/customer-analytics`)
   - Use the search box or scroll through customers.

---

## 🛠️ Built With
- HTML, CSS, JavaScript  
- Bootstrap 5  
- Chart.js  
- Font Awesome  

---

## ✅ Quick Summary

| Feature | Description |
|----------|--------------|
| **Primary Key** | Phone number |
| **Average Order Value** | Auto-calculated |
| **Recurring Detection** | Auto-detects |
| **Charts** | Interactive Pie charts |
| **UI Design** | Glassmorphism with Bootstrap |
| **Hosting** | Free on GitHub Pages |
