# Talent Syncro

## Admin Credentials
- **Username:** admin@gmail.com
- **Password:** Pa$$w0rd!

## Live Site URL
[Talent Syncro](https://talent-syncro.web.app)

## Features
1. **User Authentication:**
   - Email and password-based registration and login.
   - Password validation: minimum 6 characters, at least one capital letter, and one special character.
   - Social login options (Google, Github) which automatically assign the role of an Employee.

2. **Roles Management:**
   - Three user roles: Employee, HR, and Admin.
   - Role selection during registration (excluding Admin).
   - Admin can promote employees to HR and adjust  salary.

3. **Home Page:**
   - Banner showcasing company success.
   - List of services provided by the company.
   - Customer testimonials in a slider format.
   - Navbar with conditional display of Register, Login, and User Photo/Logout based on authentication status.

4. **Dashboard:**
   - Employee-specific pages to submit daily work records and view payment history.
   - HR-specific pages to manage employee verification, payment, and work progress.
   - Admin-specific pages to manage all employees, adjust salaries, and manage roles.

5. **Employee Pages:**
   - Submit daily tasks with hours worked.
   - View monthly salary payments with pagination.

6. **HR Pages:**
   - View and manage employee details, verify status, and make payments.
   - Detailed view of an employee's information and salary history.
   - Filterable work progress records of all employees.

7. **Admin Pages:**
   - View all verified employees and HRs.
   - Manage promotions, terminations, and salary adjustments.
   - Toggle between table view and card grid view.

8. **Contact Us Page:**
   - Display company address and a contact form for visitors to send messages.
   - Admin can view received messages.

9. **Additional Features:**
   - JWT token-based authentication.
   - Real-time updates to the UI.

10. **Payment Gateway Integration:**
   - Secure payment processing using a stripe payment gateway.
   - Ensure payments are not made more than once for the same month/year.

## Technologies Used
- **Frontend:** React, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Firebase Auth, JWT
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **Payment Gateway:** Stripe
- **Miscellaneous:** imgbb for image uploads
