import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRegCheckCircle, FaPaperPlane, FaRegPaperPlane } from "react-icons/fa";

const CandidatePage = () => {
  const [jobs, setJobs] = useState([]);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantData, setApplicantData] = useState({
    name: "",
    age: "",
    email: "",
    resumeLink: "",
    experience: "",
  });
  const [applicationStatus, setApplicationStatus] = useState(""); // Track application status per job
  const [completedAssessment, setCompletedAssessment] = useState(false); // Track assessment completion
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the jobs data from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyPopup(true);
    setApplicationStatus(""); // Reset the application status before applying
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantData({
      ...applicantData,
      [name]: value,
    });
  };

  const handleApply = () => {
    // Validation
    if (
      !applicantData.name ||
      !applicantData.age ||
      !applicantData.email ||
      !applicantData.resumeLink ||
      !applicantData.experience
    ) {
      alert("All fields are required!");
      return;
    }

    // Store the applicant's details in localStorage
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const candidate = {
      ...applicantData,
      jobTitle: selectedJob.jobTitle,
      jobDescription: selectedJob.jobDescription,
      appliedAt: new Date().toISOString(),
      completedAssessment: false, // Initially set to false
    };

    candidates.push(candidate);
    localStorage.setItem("candidates", JSON.stringify(candidates));

    // Update the application status for the selected job
    const updatedJobs = jobs.map((job) =>
      job.jobTitle === selectedJob.jobTitle
        ? { ...job, status: "Application Submitted" } // Change only the selected job
        : job
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    // Update the UI with a success message
    setApplicationStatus("Application Submitted Successfully");
    setShowApplyPopup(false);
  };

  const handleCancel = () => {
    setShowApplyPopup(false);
    setApplicationStatus(""); // Reset status if canceled
  };

  const handleLaunchAssessment = (job) => {
    if (job.assessment && !completedAssessment) {
      // Navigate to the assessment page and pass the job title as a parameter
      navigate(`/assessment/${job.jobTitle}`);

      // Update localStorage to mark the assessment as completed
      const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
      const candidateIndex = candidates.findIndex((candidate) => candidate.jobTitle === job.jobTitle);
      if (candidateIndex !== -1) {
        candidates[candidateIndex].completedAssessment = true; // Mark as completed
        localStorage.setItem("candidates", JSON.stringify(candidates));
      }
    }
  };

  const checkIfAssessmentCompleted = (jobTitle) => {
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const candidate = candidates.find((candidate) => candidate.jobTitle === jobTitle);
    return candidate ? candidate.completedAssessment : false;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => {
          const assessmentCompleted = checkIfAssessmentCompleted(job.jobTitle);

          return (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              <p className="text-gray-600">{job.jobDescription}</p>
              <p className={`mt-2 font-medium ${job.assessment ? "text-green-500" : "text-red-500"}`}>
                {job.assessment ? "Assessment: Required" : "No Assessment"}
              </p>

              <div className="flex items-center space-x-4 mt-4">
                {job.status === "Application Submitted" ? (
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded flex items-center cursor-not-allowed"
                    disabled
                  >
                    Application Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
                  >
                    Apply
                  </button>
                )}

                {job.status === "Application Submitted" && job.assessment && !assessmentCompleted && (
                  <button
                    onClick={() => handleLaunchAssessment(job)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded flex items-center"
                  >
                    Launch Assessment
                  </button>
                )}

                {assessmentCompleted && (
                  <div className="bg-green-500 text-white py-2 px-4 rounded flex items-center">
                    Assessment Completed
                  </div>
                )}
              </div>

              {applicationStatus && job.jobTitle === selectedJob?.jobTitle && (
                <div className="mt-4 p-2 bg-green-100 text-green-600 rounded">
                  {applicationStatus}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showApplyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Apply for {selectedJob.jobTitle}</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={applicantData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={applicantData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={applicantData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">
                  Resume Link
                </label>
                <input
                  type="url"
                  id="resumeLink"
                  name="resumeLink"
                  value={applicantData.resumeLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={applicantData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatePage;