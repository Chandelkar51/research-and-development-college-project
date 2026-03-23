# College Management System

A MERN-based College Management System with separate student, faculty, and admin authentication, plus Docker support for easy setup.

## Features

### Student
- Sign up and log in
- View profile
- View materials
- View timetable
- View marks
- Forgot password

### Faculty
- Sign up and log in
- Manage profile
- Upload materials
- Search students
- Manage timetable
- Forgot password

### Admin
- Sign up and log in
- Manage students
- Manage faculty
- Manage branches
- Manage subjects
- Forgot password

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Containerization: Docker, Docker Compose

## Project Structure

```text
.
├── frontend
├── backend
├── docker-compose.yml

Run With Docker
Prerequisites
Docker Desktop
Git
Steps
git clone https://github.com/sakshidewangan/research-and-development-college-project.git
cd research-and-development-college-project
docker compose up --build
Application URLs
Frontend: http://localhost:3000
Backend: http://localhost:4000
Seed Default Admin
docker compose exec backend npm run seed
Default admin credentials:

Email: admin@gmail.com
Password: admin123
Stop Containers
docker compose down
Notes
MongoDB runs through Docker in this setup
If you change code, restart containers if needed
Public signup is available for student, faculty, and admin