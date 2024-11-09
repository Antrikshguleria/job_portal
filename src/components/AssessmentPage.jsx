import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AssessmentPage = () => {
  const { jobTitle } = useParams();
  const [job, setJob] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null); // Start with null to hide score until submission
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve job data from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const foundJob = storedJobs.find((job) => job.jobTitle === jobTitle);

    if (!foundJob || !Array.isArray(foundJob.questions) || foundJob.questions.length === 0) {
      // Navigate back if questions are missing or invalid
      navigate("/job");
      return;
    }

    setJob(foundJob);
  }, [jobTitle, navigate]);

  const handleAnswerChange = (questionIndex, selectedIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedIndex, // Store the selected index (0, 1, 2, 3)
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;

    // Compare answers and calculate score only when submitting
    job.questions.forEach((question, index) => {
      // Check if the selected answer (index) matches the correct answer index
      if (answers[index] !== undefined && answers[index].toString() === question.correctAnswer) {
        totalScore++;
      }
    });

    setScore(totalScore); // Set the final score

    // Update the candidate's completedAssessment status in localStorage
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const updatedCandidates = candidates.map((candidate) =>
      candidate.jobTitle === jobTitle
        ? { ...candidate, completedAssessment: true, score: totalScore }
        : candidate
    );
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));

    alert(`You scored ${totalScore} out of ${job.questions.length}`);
    navigate("/job"); // Redirect back to job listing after submission
  };

  if (!job) return <div>Loading...</div>; // Loading state

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Assessment for {job.jobTitle}</h1>

      <form>
        {job.questions && job.questions.length > 0 ? (
          job.questions.map((question, index) => (
            <div key={index} className="mb-6">
              {/* Display the question text correctly */}
              <p className="text-lg font-semibold mb-2">{question.question}</p>
              <div className="flex flex-col">
                {question.options.map((option, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={i} // Store the index of the selected option
                      checked={answers[index] === i} // Compare against the stored index
                      onChange={() => handleAnswerChange(index, i)} // Store the index of the selected answer
                      className="mr-2"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No assessment available for this job.</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit Assessment
        </button>
      </form>

      {/* Display the score only after submission */}
      {score !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-600 rounded">
          Your score: {score} out of {job.questions.length}
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;