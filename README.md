Job Portal

A fully functional Job Portal application created using React and React Router. The project enables users to manage job listings, post new jobs, view candidate applications, and conduct assessments. All data is stored locally on the browser using localStorage, allowing users to view and interact with the information on the client side without any backend or server setup.

Table of Contents

	1.	Features
	2.	Getting Started
	3.	Project Structure
	4.	Components and Pages
	•	Job Listing
	•	Add a Job
	•	View Candidates
	•	Candidate Details
	•	Assessment Page
	5.	LocalStorage Implementation

Components and Pages

Job Listing

	•	The Job Listing page displays all jobs posted by users.
	•	Each job card shows the Job Title, Description, and whether it includes an assessment.
	•	Users can navigate to the Candidates Page to see the list of applicants for a particular job, or go to the Assessment Page to view or take an assessment.

Add a Job

	•	Users can add a new job posting by clicking the Add New Job button.
	•	The Add Job Form prompts users to enter a job title and description, along with an option to add an assessment.
	•	If an assessment is added, users can input Multiple Choice Questions (MCQs), including options and correct answers.
	•	The job data, including the assessment, is stored in the browser’s localStorage.

View Candidates

	•	The Candidates Page shows all candidates who have applied for a particular job.
	•	Each candidate entry includes details like the Name, Age, Email, and application Status.
	•	Clicking on a candidate’s profile navigates to the Candidate Detail Page, where further information and assessment scores can be reviewed.

Candidate Details

	•	The Candidate Detail Page provides detailed information for each candidate.
	•	Displays candidate details, including Experience, Resume Link, and Assessment Scores (if the candidate has taken an assessment).
	•	This page allows interviewers or job posters to review a candidate’s qualifications and test results.

Assessment Page

	•	The Assessment Page displays the assessment questionnaire created for a specific job.
	•	Candidates can complete the assessment, and their answers are stored in localStorage for review.
	•	Upon completion, candidates receive a score based on the correct answers provided by the job poster.

LocalStorage Implementation

All data is stored locally within the user’s browser using localStorage. This includes:
	•	Job Listings: Each job created is saved to localStorage, including title, description, and assessment questions.
	•	Candidate Applications: Candidate details and applications are also stored in localStorage.
	•	Assessment Data: Candidate responses to assessments are saved locally, enabling users to access scores and answers directly from the candidate’s profile.

Advantages of LocalStorage for this Project

	•	Simple and Fast: Local storage provides a quick way to persist data on the client side without requiring a server.
	•	Isolated Data: Each user’s data is stored independently in their own browser, ensuring that personal and sensitive information is not shared across users.
	•	Offline Access: Users can still view and manage data even if they lose internet connectivity, as everything is stored locally.

