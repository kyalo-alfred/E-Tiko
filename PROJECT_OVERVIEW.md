Event Ticketing & Reservation System
Group 5 Members
189592 - Maina Tiffany Wanjiru
190513 - Alfred Kyalo Junior
167925 - Eniola Faithfulness Fabunmi
189923 - Ogwayo Emma Awuor
188760 - Anton Sumba Mutanda

1. Problem Statement
Managing events and ticket sales manually is often inefficient and error-prone. Event organizers face challenges such as tracking attendee registrations, verifying payments, managing seating capacity, and producing accurate reports. Attendees also expect a seamless, secure, and reliable platform for browsing events, booking tickets, and making payments.
This project aims to develop a web-based Event Ticketing & Reservation System that bridges this gap. The platform enables organizers to create, manage, and monitor events easily, while attendees can browse, book, and pay for tickets online. It integrates with M-Pesa API for secure mobile payments, provides real-time dashboards for analytics, supports early bird ticketing, and generates exportable reports to enhance accountability and data-driven event planning.

2. System Objectives
1.	Automate event registration, ticketing, and payment workflows.
2.	Provide real-time dashboards for organizers to monitor ticket sales and attendance.
3.	Offer a secure, user-friendly ticket booking experience for attendees.
4.	Support multiple ticket types (VIP, Regular, Early Bird, etc.) with dynamic pricing.
5.	Generate exportable reports (PDF, Excel) for both financial and event performance analysis.
6.	Ensure system security through authentication, authorization, and two-factor authentication (2FA).
7.	Allow safe and realistic payment testing via M-Pesa sandbox.

3. High-Level Features
3.1 User Management & Authentication
•	Role-based access control (Attendee, Organizer).
•	User registration and login with 2FA (via email/SMS).
•	Secure password reset using token verification.
3.2 Event & Ticket Management
•	Organizers can create, update, and delete events.
•	Support for ticket categories (VIP, Regular, Early Bird, etc.).
•	Ticket pricing automatically adjusts depending on booking time (Early Bird discounts).
•	Real-time seat and capacity tracking per event.
3.3 Ticket Booking & Payments
•	Attendees can browse, search, and filter events.
•	Book and purchase tickets online.
•	Integrated M-Pesa API for secure mobile payments.
•	Sandbox mode for testing transactions without real money.
•	Automatic email/SMS confirmations upon successful booking.
3.4 Early Bird System
•	Early Bird Phase: Allows attendees to buy tickets at a discounted rate before a specified date.
•	After the Early Bird deadline, regular pricing applies automatically.
•	Organizers can define:
o	Early Bird start and end dates
o	Discount percentage or special price
•	Helps increase pre-event sales and attendance predictability.
3.5 Analytics & Dashboards
•	Organizers can view sales trends, revenue, and attendance data.
•	Interactive charts using Chart.js.
•	Real-time event performance tracking.
3.6 Reports
•	PDF booking confirmations for attendees.
•	Exportable Excel and PDF reports for organizers.
•	Revenue summaries and attendance reports filtered by date or event.

4. System Architecture Overview
The system will follow a modular, multi-tier architecture comprising:
•	Frontend: Web interface (HTML, CSS, JavaScript, Bootstrap, Chart.js).
•	Backend:
o	Java (Spring Boot): Core event and ticket management APIs.
o	PHP: Payment handling and M-Pesa API integration.
•	Database: MySQL (shared schema for events, users, bookings, and payments).
•	Security: JWT-based authentication, role-based authorization, and 2FA.
The system follows a multi-tier modular architecture:
Layer	Technology	Description
Frontend	HTML5, CSS3, JavaScript, Bootstrap, Chart.js	User interfaces for booking and dashboards
Backend	Java (Spring Boot)	Core event, ticket, and reporting APIs
Backend	PHP	Handles payment logic and M-Pesa API integration
Database	MySQL	Stores users, events, bookings, payments, and attendance
Security	JWT + 2FA	Authentication, authorization, and secure communication

5. Workload Distribution
Student	Role	Responsibilities
👩‍💻 Student 1	Backend (Java: Event & Ticket Management)	CRUD for users/events, manage ticket categories (VIP, Regular, Early Bird), analytics APIs
👨‍💻 Student 2	Backend (PHP: Payments & M-Pesa API)	M-Pesa API integration, payment callbacks, link payments to bookings, feed financial data to reports
👩‍💻 Student 3	Frontend (User Booking Flow)	UI for registration, login, 2FA, event browsing, and booking integration
👨‍💻 Student 4	Frontend (Organizer Dashboards & Analytics)	Organizer dashboards, Chart.js analytics, report export integration
👩‍💻 Student 5	Reports & Security (PDF/Excel + Authentication)	Secure authentication (2FA), report generation (PDF/Excel), export tools, system-wide security

6. Sprint Plan & Milestones
Sprint	Deadline	Key Deliverables	Assigned Students
Sprint 1	12 Sept	Project setup on GitHub	All students
Sprint 2	19 Sept	User authentication & 2FA	Student 3 (UI), Student 5 (Security), Student 1 (Backend support)
Sprint 3	27 Sept	Basic CRUD (Users, Events, Tickets), Password reset, M-Pesa setup	Student 1 (CRUD), Student 2 (Payments), Student 5 (Reset), Students 3 & 4 (UI)
Sprint 4	10 Oct	Advanced logic (filters, payment link, dashboards, reports setup)	Student 1, Student 2, Student 4, Student 5
Sprint 5	31 Oct	Analytics integration, final booking flow, enhanced security	Student 4 (Charts), Students 1 & 2 (Data), Student 3 (Booking), Student 5 (Security)
Sprint 6	14 Nov	Exportable reports, final integration, and testing	Student 5 (Reports), Student 4 (UI integration), All students (Final QA)

7. Expected Outcomes
By the end of the project, the system will:
•	Organizers can manage events and monitor performance effectively.
•	Attendees can securely purchase tickets and receive confirmations instantly.
•	System supports multiple ticket categories and early bird pricing logic.
•	Organizers can make data-driven decisions using analytics and reports.
•	Secure, reliable, and tested payment flows (sandbox + live).
•	
8. Tools & Technologies
Category	Tools / Frameworks
Frontend	HTML5, CSS3, JavaScript, Bootstrap, Chart.js
Backend	Java (Spring Boot), PHP
Database	MySQL
Security	JWT, 2FA (Email/SMS), BCrypt
Reports	iText (Java), DomPDF (PHP), Apache POI (Excel)
Payment	M-Pesa Daraja API
Version Control	GitHub
Testing	Postman, JUnit, PHPUnit

9. Security Considerations
•	JWT-based authentication for all protected endpoints.
•	Two-Factor Authentication for login and password reset.
•	SSL/TLS encryption on all communications.
•	Input validation to prevent SQL injection and XSS.
•	Role-based access control (RBAC) enforced at backend level.
•	M-Pesa sandbox testing to prevent unauthorized real transactions.
10. Testing and M-Pesa Sandbox Integration
To safely test payment flows without real money:
1.	Register the app on M-Pesa Daraja Sandbox (developer.safaricom.co.ke).
2.	Generate sandbox credentials (Consumer Key, Consumer Secret, Shortcode).
3.	Use test STK push or C2B simulation endpoints.
4.	Store mock transactions in the database (Payment table).
5.	Verify success callbacks and status updates automatically.
6.	Once verified, switch to live credentials for production.

10. Conclusion
The Event Ticketing & Reservation System aims to transform the ticketing process into a secure, automated, and data-driven solution. Through integration of Early Bird pricing, M-Pesa payments, and insightful analytics, the platform provides both event organizers and attendees with a seamless and efficient experience.

Existing Database 

-- Create the database
CREATE DATABASE iap_event_management;
USE iap_event_management;

-- 1. Roles Table
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    two_fa_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- 3. Venue Table
CREATE TABLE Venue (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Event Table
CREATE TABLE Event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    organizer_id INT NOT NULL,
    venue_id INT NOT NULL,
    event_name VARCHAR(200) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id),
    FOREIGN KEY (venue_id) REFERENCES Venue(venue_id)
);

-- 5. Bookings Table
CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'PAID', 'CANCELLED') DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);

-- 6. BookingDetails Table
CREATE TABLE BookingDetails (
    booking_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    ticket_type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

-- 7. Tickets Table
CREATE TABLE Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_detail_id INT NOT NULL,
    ticket_code VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('ISSUED', 'REDEEMED', 'CANCELLED') DEFAULT 'ISSUED',
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_detail_id) REFERENCES BookingDetails(booking_detail_id)
);

-- 8. Payment Table
CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    mpesa_transaction_id VARCHAR(100) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'PENDING',
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

-- 9. Attendance Table
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    checked_in BOOLEAN DEFAULT FALSE,
    check_in_time TIMESTAMP NULL,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id)
);
 
OPTIONAL(INCLUDES EARLY BIRD FEATURE)
-- =============================================================
--  iap_event_management DATABASE SETUP + TEST DATA (Student 2)
-- =============================================================

-- Create the database
CREATE DATABASE IF NOT EXISTS iap_event_management;
USE iap_event_management;

-- =============================================================
-- 1. Roles Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- =============================================================
-- 2. Users Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    two_fa_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- =============================================================
-- 3. Venue Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Venue (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- 4. Event Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    organizer_id INT NOT NULL,
    venue_id INT NOT NULL,
    event_name VARCHAR(200) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id),
    FOREIGN KEY (venue_id) REFERENCES Venue(venue_id)
);

-- =============================================================
-- 5. Bookings Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'PAID', 'CANCELLED') DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);

-- =============================================================
-- 6. BookingDetails Table
-- =============================================================
CREATE TABLE IF NOT EXISTS BookingDetails (
    booking_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    ticket_type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

-- =============================================================
-- 7. Tickets Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_detail_id INT NOT NULL,
    ticket_code VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('ISSUED', 'REDEEMED', 'CANCELLED') DEFAULT 'ISSUED',
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_detail_id) REFERENCES BookingDetails(booking_detail_id)
);

-- =============================================================
-- 8. Payment Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    mpesa_transaction_id VARCHAR(100) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'PENDING',
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

-- =============================================================
-- 9. Attendance Table
-- =============================================================
CREATE TABLE IF NOT EXISTS Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    checked_in BOOLEAN DEFAULT FALSE,
    check_in_time TIMESTAMP NULL,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id)
);

-- =============================================================
--  TEST DATA INSERTS
-- =============================================================

-- Insert sample roles
INSERT INTO Roles (role_name) VALUES 
('Organizer'),
('Attendee')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- Insert sample users
INSERT INTO Users (role_id, full_name, email, phone, password_hash)
VALUES
(1, 'Event Organizer', 'organizer@example.com', '0700000001', 'hashed_pw'),
(2, 'John Attendee', 'attendee@example.com', '0700000002', 'hashed_pw');

-- Insert sample venue
INSERT INTO Venue (name, address, capacity)
VALUES 
('Strathmore Auditorium', 'Madaraka, Nairobi', 200);

-- Insert sample event
INSERT INTO Event (organizer_id, venue_id, event_name, description, start_time, end_time)
VALUES 
(1, 1, 'IAP 2025 Tech Summit', 'A summit on innovation and programming.', 
'2025-11-10 09:00:00', '2025-11-10 17:00:00');

-- Insert booking (user books event)
INSERT INTO Bookings (user_id, event_id, status)
VALUES 
(2, 1, 'PENDING');

-- Insert booking details (ticket type & price)
INSERT INTO BookingDetails (booking_id, ticket_type, price, quantity)
VALUES 
(1, 'VIP', 5000.00, 1);

-- Simulate payment
INSERT INTO Payment (booking_id, mpesa_transaction_id, amount, status)
VALUES 
(1, 'MPESA123456', 5000.00, 'SUCCESS');

-- Update booking status after successful payment
UPDATE Bookings 
SET status = 'PAID' 
WHERE booking_id = 1;

-- Generate ticket after payment
INSERT INTO Tickets (booking_detail_id, ticket_code)
VALUES 
(1, CONCAT('TCKT-', UUID()));

-- Simulate check-in (attendance)
INSERT INTO Attendance (ticket_id, checked_in, check_in_time)
VALUES 
(1, TRUE, NOW());

-- =============================================================
--  OPTIONAL: Trigger to auto-update booking status after payment
-- =============================================================
DELIMITER //
CREATE TRIGGER after_payment_success
AFTER UPDATE ON Payment
FOR EACH ROW
BEGIN
    IF NEW.status = 'SUCCESS' THEN
        UPDATE Bookings 
        SET status = 'PAID' 
        WHERE booking_id = NEW.booking_id;
    END IF;
END //
DELIMITER ;

-- =============================================================
--  SANDBOX COPY CREATION (safe testing environment)
-- =============================================================

CREATE DATABASE IF NOT EXISTS iap_event_management_sandbox;
USE iap_event_management_sandbox;

-- Clone table structures only (for testing)
CREATE TABLE Roles LIKE iap_event_management.Roles;
CREATE TABLE Users LIKE iap_event_management.Users;
CREATE TABLE Venue LIKE iap_event_management.Venue;
CREATE TABLE Event LIKE iap_event_management.Event;
CREATE TABLE Bookings LIKE iap_event_management.Bookings;
CREATE TABLE BookingDetails LIKE iap_event_management.BookingDetails;
CREATE TABLE Tickets LIKE iap_event_management.Tickets;
CREATE TABLE Payment LIKE iap_event_management.Payment;
CREATE TABLE Attendance LIKE iap_event_management.Attendance;
