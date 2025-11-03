Live Coding Study Case: "Job Board API"

Objective:
Develop a Job Board API where users can register, log in, post job listings, and apply for jobs. This will test the candidate’s ability to handle authentication, database relationships, and business logic within 2 hours.

Technical Requirements
- Backend: Anything familiar with (javascript)
- Database: PostgreSQL or MongoDB
- Authentication: JWT-based login / session-based authentication or anything familiar with
- Business Logic: Job postings, applications, and user roles
- Testing: Postman for API testing

User Authentication:
Implement user registration (POST /register):
Users can register as job seekers or employers.

Job Management:
Implement job posting features (POST /jobs):
Employers can post job listings.
Store job title, description, company name, salary range, and location.

Implement job retrieval (GET /jobs):
Job seekers can view available jobs.

Implement job application (POST /jobs/:id/apply):
Job seekers can apply for a job.
Store job ID, user ID, and application date.

Debugging & Optimization:
Live testing using Postman.
Fix potential issues & optimize database queries.

Bonus Tasks (If Time Permits)
- Job Search & Filtering (GET /jobs?location=Jakarta&salary>5000000)
- Apply Rate Limit (to prevent spam applications)