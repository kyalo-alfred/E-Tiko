# E-Tiko – Event Ticketing & Management System

## Team Members
189592 - Maina Tiffany Wanjiru  
190513 - Alfred Kyalo Junior  
167925 - Eniola Faithfulness Fabunmi  
189923 - Ogwayo Emma Awuor  
188760 - Anton Sumba Mutanda

## Project Overview
E-Tiko is a web application developed as part of the **Internet Application Programming** unit.  
The system allows users to browse events, book tickets, pay via M-Pesa, and provides organizers with dashboards, analytics, and reporting tools.  
It integrates **2-Factor Authentication** and role-based access control for security.

---

## Frontend Application

This is the frontend React application for E-TIKO built with React and TypeScript.

### Getting Started

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

#### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd etiko-frontend

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

#### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Technologies Used

- **Vite** - Fast build tool and development server
- **React** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components

---

## Responsibilities

### Backend
- **Event & Ticket Management (Java Spring Boot):** Event CRUD, ticket categories (VIP, Regular, Early Bird), inventory management, booking APIs.
- **Payments & M-Pesa Integration (PHP):** M-Pesa API integration, secure callbacks, transaction records, ticket confirmation.

### Frontend
- **User Application:** Registration/login with 2FA, event browsing & search, booking forms, payment initiation, confirmation page.
- **Organizer Dashboard:** Charts & analytics (tickets sold, time schedule, revenue, attendance), event management, exportable reports.

### Reports & Security
- Generate PDF/Excel reports (bookings, revenue, attendance).
- Role-based access (organizer vs. attendee).
- 2FA and secure password reset with tokens.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by E-TIKO.
