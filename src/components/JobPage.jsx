import { FaPlus, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [assessment, setAssessment] = useState(false);
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);

  const [editingIndex, setEditingIndex] = useState(null); // To track which job is being edited
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleViewCandidate = (jobId) => {
    navigate(`/candidate-detail-page/${jobId}`);
  };

  const handleAddJob = () => {
    if (!jobTitle || !jobDescription) {
      alert("Job Title and Job Description are required!");
      return;
    }

    const newJob = {
      jobTitle,
      jobDescription,
      assessment,
      questions: assessment ? questions : [],
    };

    const updatedJobs = editingIndex !== null
      ? jobs.map((job, index) => index === editingIndex ? newJob : job) // Update job at the correct index
      : [...jobs, newJob]; // Add new job if no editing

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    resetForm();
    setShowAddJobPopup(false);
  };

  const resetForm = () => {
    setJobTitle("");
    setJobDescription("");
    setAssessment(false);
    setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    setEditingIndex(null); // Reset editing index
  };

  const handleEditJob = (index) => {
    const job = jobs[index];
    setJobTitle(job.jobTitle);
    setJobDescription(job.jobDescription);
    setAssessment(job.assessment);
    setQuestions(job.questions);
    setEditingIndex(index); // Set index to track job being edited
    setShowAddJobPopup(true);
  };

  const handleDeleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

      {/* Add Job Button */}
      <button
        onClick={() => setShowAddJobPopup(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6 flex items-center"
      >
        <FaPlus className="mr-2" />
        Add New Job
      </button>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{job.jobTitle}</h2> {/* Job title now visible */}
            <p className="text-gray-600">{job.jobDescription}</p>
            <p className={`mt-2 font-medium ${job.assessment ? 'text-green-500' : 'text-red-500'}`}>
              {job.assessment ? 'Assessment: Present' : 'No Assessment'}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4 border-t pt-4">
              <button
                onClick={() => handleViewCandidate(job.jobTitle)}  // Pass the jobId dynamically
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaEye className="mr-1" /> View Candidates
              </button>
              <button
                onClick={() => handleEditJob(index)}
                className="bg-yellow-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDeleteJob(index)}
                className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
              >
                <FaTrashAlt className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Job Popup */}
      {showAddJobPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl overflow-y-auto" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
            <h2 className="text-2xl font-semibold mb-4">{editingIndex !== null ? 'Edit Job' : 'Add Job'}</h2>
            <form>
              {/* Job Title */}
              <div className="mb-4">
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                />
              </div>

              {/* Job Description */}
              <div className="mb-4">
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                  required
                ></textarea>
              </div>

              {/* Add Assessment Option */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Add Assessment?</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      checked={assessment}
                      onChange={() => setAssessment(true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="no"
                      checked={!assessment}
                      onChange={() => setAssessment(false)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Questions Section */}
              {assessment && (
                <>
                  <h3 className="font-medium text-gray-700 mb-2">Assessment Questions</h3>
                  {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Question</label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                          className="w-full px-4 py-2 mt-2 border rounded-lg"
                          required
                        />
                      </div>

                      {/* Options */}
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Option {String.fromCharCode(65 + optionIndex)} (Index: {optionIndex})
                          </label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, optionIndex, e.target.value)
                            }
                            className="w-full px-4 py-2 mt-2 border rounded-lg"
                            required
                          />
                        </div>
                      ))}

                      {/* Correct Answer (Index) */}
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Correct Answer Index</label>
                        <input
                          type="number"
                          min="0"
                          max="3"
                          value={question.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(index, "correctAnswer", e.target.value)
                          }
                          className="w-full px-4 py-2 mt-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                  >
                    Add Another Question
                  </button>
                </>
              )}

              {/* Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddJobPopup(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddJob}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {editingIndex !== null ? "Update Job" : "Add Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;