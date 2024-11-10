import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AssessmentPage = () => {
  const { jobTitle } = useParams();
  const [job, setJob] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const foundJob = storedJobs.find((job) => job.jobTitle === jobTitle);

    if (!foundJob || !Array.isArray(foundJob.questions) || foundJob.questions.length === 0) {
      navigate("/job");
      return;
    }

    setJob(foundJob);
  }, [jobTitle, navigate]);

  const handleAnswerChange = (questionIndex, selectedIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedIndex,
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;

    job.questions.forEach((question, index) => {
      if (answers[index] !== undefined && answers[index].toString() === question.correctAnswer) {
        totalScore++;
      }
    });

    setScore(totalScore);

    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    const updatedCandidates = candidates.map((candidate) =>
      candidate.jobTitle === jobTitle
        ? { ...candidate, completedAssessment: true, score: totalScore }
        : candidate
    );
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));

    alert(`You scored ${totalScore} out of ${job.questions.length}`);
    navigate("/job");
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">Assessment for {job.jobTitle}</h1>

      <form className="space-y-8">
        {job.questions && job.questions.length > 0 ? (
          job.questions.map((question, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <p className="text-lg font-semibold text-gray-800 mb-4">{question.question}</p>
              <div className="space-y-3">
                {question.options.map((option, i) => (
                  <label key={i} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={i}
                      checked={answers[index] === i}
                      onChange={() => handleAnswerChange(index, i)}
                      className="text-indigo-500 focus:ring-2 focus:ring-indigo-400"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No assessment available for this job.</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-lg transition duration-300 transform hover:scale-105"
        >
          Submit Assessment
        </button>
      </form>

      {score !== null && (
        <div className="mt-8 p-4 bg-green-100 text-green-700 text-center font-semibold rounded-lg shadow-md">
          Your score: {score} out of {job.questions.length}
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
