Financial Accounting System for Hair Salon
Video demonstration: https://www.youtube.com/watch?v=RwAEyWKjcmQ

Overview
This financial accounting system is designed for hair salons, featuring a REST API server built with Spring Boot and a client-side single-page application developed in Angular 18. The system offers responsive design for optimal performance on various devices.

Key Features
Login and Dashboard: Users can log in with a username and password. The dashboard displays key financial metrics for the company and individual employees, including transactions, revenue, and salary details.
Language Support: Switch the interface language to English by clicking on the company name.
Financial Reports: View detailed financial reports for the current month, previous periods, and a breakdown of expenses.
User Roles
Employee: Limited access to view personal data only.
SuperUser: Can view financial data for the company and employees but cannot manage users.
Administrator: Full access, including user creation and management.
Transactions
External Payments: Integrates with an external payment system using Selenium WebDriver. Transaction data from the external system triggers internal account transfers and salary calculations.
Internal Accounts: Manages internal accounts such as Bank, Clients, Expenses, and employee accounts. Automated and manual money transfers are supported, with restrictions based on user permissions.
Automation
Scheduled Transactions: Automate money transfers between accounts and assign employee schedules for automatic transaction handling.
Money-Log: Track account balance changes over time.
Security and Restrictions
User Management: Control access by user roles. Restrictions prevent actions like deleting the only administrator or users with a non-zero balance.
Manual Transfers: Users can initiate manual transfers, with cancellation possible until the end of the day.