<h1>Financial Accounting System for Hair Salon</h1>

Video demonstration: https://www.youtube.com/watch?v=RwAEyWKjcmQ

<h2>Overview</h2>
<p>This financial accounting system is designed for hair salons, featuring a REST API server built with Spring Boot and a client-side single-page application developed in Angular 18. The system offers responsive design for optimal performance on various devices.</p>

<h2>Key Features</h2>
<ul>
    <li><strong>Login and Dashboard:</strong> Users can log in with a username and password. The dashboard displays key financial metrics for the company and individual employees, including transactions, revenue, and salary details.</li>
    <li><strong>Language Support:</strong> Switch the interface language to English by clicking on the company name.</li>
    <li><strong>Financial Reports:</strong> View detailed financial reports for the current month, previous periods, and a breakdown of expenses.</li>
</ul>

<h2>User Roles</h2>
<ul>
    <li><strong>Employee:</strong> Limited access to view personal data only.</li>
    <li><strong>SuperUser:</strong> Can view financial data for the company and employees but cannot manage users.</li>
    <li><strong>Administrator:</strong> Full access, including user creation and management.</li>
</ul>

<h2>Transactions</h2>
<ul>
    <li><strong>External Payments:</strong> Integrates with an external payment system using Selenium WebDriver. Transaction data from the external system triggers internal account transfers and salary calculations.</li>
    <li><strong>Internal Accounts:</strong> Manages internal accounts such as Bank, Clients, Expenses, and employee accounts. Automated and manual money transfers are supported, with restrictions based on user permissions.</li>
</ul>

<h2>Automation</h2>
<ul>
    <li><strong>Scheduled Transactions:</strong> Automate money transfers between accounts and assign employee schedules for automatic transaction handling.</li>
    <li><strong>Money-Log:</strong> Track account balance changes over time.</li>
</ul>

<h2>Security and Restrictions</h2>
<ul>
    <li><strong>User Management:</strong> Control access by user roles. Restrictions prevent actions like deleting the only administrator or users with a non-zero balance.</li>
    <li><strong>Manual Transfers:</strong> Users can initiate manual transfers, with cancellation possible until the end of the day.</li>
</ul>
