import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaEnvelope, FaRegClock, FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CandidateDetailPage = () => {
  const { jobId } = useParams(); // Getting jobId from URL params
  const [candidates, setCandidates] = useState([]);
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [status, setStatus] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [saved, setSaved] = useState(false); // Track save status

  useEffect(() => {
    // Retrieve job data from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    // Get the job details using the jobId from the URL
    const foundJob = storedJobs.find((job) => job.jobTitle === jobId);

    if (!foundJob) {
      console.log("Job not found");
      return; // If no job matches the jobId, exit
    }

    // Retrieve candidates from localStorage
    const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
    // Filter candidates whose jobTitle matches the current job's title
    const jobCandidates = storedCandidates.filter(candidate => candidate.jobTitle === foundJob.jobTitle && candidate.jobDescription === foundJob.jobDescription);

    // Set filtered candidates to state and ensure the saved state persists
    setCandidates(jobCandidates); 

    // Check if interview date and status are saved in localStorage
    jobCandidates.forEach(candidate => {
      if (candidate.status === "Interview Scheduled") {
        setStatus("Interview Scheduled");
        setInterviewDate(candidate.interviewDate || "");
      } else if (candidate.status === "Rejected") {
        setStatus("Rejected");
      } else if (candidate.status === "Hired") {
        setStatus("Hired");
      }
    });
  }, [jobId]);

  const handleExpand = (candidateId) => {
    // Toggle the expanded candidate details
    setExpandedCandidate(expandedCandidate === candidateId ? null : candidateId);
  };

  const handleStatusChange = (e, candidateId) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    // Update the status of the candidate
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId) {
        return { ...candidate, status: newStatus, interviewDate: newStatus === "Interview Scheduled" ? interviewDate : "" };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  const handleInterviewDateChange = (e) => {
    setInterviewDate(e.target.value);
  };

  const handleSave = (candidateId) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId && status === "Interview Scheduled") {
        return { ...candidate, interviewDate };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    setSaved(true); // Mark as saved
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">Candidates for Job Title: {jobId}</h1>

      <div className="space-y-6">
        {candidates.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No candidates have applied for this job yet.</p>
        ) : (
          candidates.map((candidate) => (
            <div key={candidate.id} className="mb-6 p-6 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 border border-gray-200">
              <div
                className="cursor-pointer font-semibold text-xl flex items-center text-blue-500 hover:text-blue-700"
                onClick={() => handleExpand(candidate.id)}
              >
                <FaUser className="mr-3 text-2xl" />
                {candidate.name}
              </div>

              {expandedCandidate === candidate.id && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center text-lg text-gray-700">
                    <FaEnvelope className="mr-3 text-xl text-blue-500" />
                    <p><strong>Email:</strong> {candidate.email}</p>
                  </div>
                  <div className="flex items-center text-lg text-gray-700">
                    <FaRegClock className="mr-3 text-xl text-green-500" />
                    <p><strong>Age:</strong> {candidate.age}</p>
                  </div>
                  <div className="flex items-center text-lg text-gray-700">
                    <FaRegClock className="mr-3 text-xl text-green-500" />
                    <p><strong>Experience:</strong> {candidate.experience}</p>
                  </div>
                  <div className="flex items-center text-lg text-gray-700">
                    <FaFileAlt className="mr-3 text-xl text-yellow-500" />
                    <p><strong>Resume Link:</strong> <a href={candidate.resumeLink} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">View Resume</a></p>
                  </div>
                  <div className="flex items-center text-lg text-gray-700">
                    <FaCheckCircle className="mr-3 text-xl text-gray-500" />
                    <p><strong>Status:</strong> 
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(e, candidate.id)}
                        className="ml-3 py-1 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                      </select>
                    </p>
                  </div>
                  
                  {/* Conditionally display the score if it exists */}
                  {typeof candidate.score === 'number' && (
                    <div className="flex items-center text-lg text-gray-700">
                      <FaCheckCircle className="mr-3 text-xl text-green-500" />
                      <p><strong>Score:</strong> {candidate.score}</p>
                    </div>
                  )}

                  {status === "Interview Scheduled" && (
                    <div className="mt-4 flex items-center space-x-4">
                      <label className="mr-2">Interview Date:</label>
                      <input
                        type="date"
                        value={interviewDate}
                        onChange={handleInterviewDateChange}
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      {!saved ? (
                        <button
                          onClick={() => handleSave(candidate.id)}
                          className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg"
                          disabled
                        >
                          Saved
                        </button>
                      )}
                    </div>
                  )}

                  {status === "Hired" && !saved && (
                    <div className="mt-4 text-green-500 flex items-center text-lg">
                      <FaCheckCircle className="mr-3 text-2xl" />
                      <span>Hired</span>
                    </div>
                  )}

                  {status === "Rejected" && !saved && (
                    <div className="mt-4 text-red-500 flex items-center text-lg">
                      <FaTimesCircle className="mr-3 text-2xl" />
                      <span>Rejected</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateDetailPage;
