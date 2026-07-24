import React, { useState, useEffect } from 'react';
import { quizService } from '../services/quizService';
import AdminQuizBuilder from '../components/AdminQuizBuilder';
import QuizLockBanner from '../components/QuizLockBanner';
import QuizQuestion from '../components/QuizQuestion';
import QuizResultModal from '../components/QuizResultModal';
import { BookOpen, User, Send, CheckCircle, RotateCcw, AlertTriangle } from 'lucide-react';

export default function QuizPage({ isAdmin }) {
  // Simulator Configurations for Testing
  const [learnerId, setLearnerId] = useState(1);
  const [quizId, setQuizId] = useState('quiz_html_01');

  // Quiz States
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [question_id]: choice_id }
  const [result, setResult] = useState(null);

  // Status & Validation States
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Fetch the quiz configurations on mount or config change
  const loadQuizData = async () => {
    if (isAdmin) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSelectedAnswers({});
    setValidationErrors([]);

    try {
      const response = await quizService.fetchQuiz(quizId, learnerId);
      setQuiz(response.data.quiz);
      setQuestions(response.data.questions);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        // Handle locks or max retry blocks explicitly
        setQuiz({ id: quizId, required_material_id: 'material_course_html', max_retries: 3 }); // fallback config
        setError(err.response.data.message);
      } else {
        setError(err.response?.data?.message || 'Failed to connect to the backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizData();
  }, [learnerId, quizId, isAdmin]);

  // Handle choice selection
  const handleSelectChoice = (questionId, choiceId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: choiceId,
    });
    // Clear warning for this question if it was selected
    if (validationErrors.includes(questionId)) {
      setValidationErrors(validationErrors.filter(id => id !== questionId));
    }
  };

  // Simulate unlocking by completing prerequisite materials in Slot 4
  const handleSimulateUnlockPrerequisite = async () => {
    if (!quiz || !quiz.required_material_id) return;
    setLoading(true);
    try {
      await quizService.simulateSlot4Completion(learnerId, quiz.required_material_id);
      // Reload quiz data to verify unlocking
      await loadQuizData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error simulating material completion.');
      setLoading(false);
    }
  };

  // Submit answers for grading
  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    setValidationErrors([]);

    // Validate that all questions are answered
    const unanswered = [];
    questions.forEach(q => {
      if (selectedAnswers[q.id] === undefined) {
        unanswered.push(q.id);
      }
    });

    if (unanswered.length > 0) {
      setValidationErrors(unanswered);
      return; // Block submission
    }

    setSubmitting(true);
    try {
      const answersPayload = Object.keys(selectedAnswers).map(qId => ({
        question_id: parseInt(qId, 10),
        choice_id: selectedAnswers[qId],
      }));

      const response = await quizService.submitQuiz(quizId, learnerId, answersPayload);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to grade the quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset quiz attempt
  const handleRetryQuiz = () => {
    setResult(null);
    setSelectedAnswers({});
    setValidationErrors([]);
    loadQuizData();
  };

  // Render Admin View
  if (isAdmin) {
    return <AdminQuizBuilder />;
  }

  // Render Learner View
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Simulation Controls Sidebar/Widget */}
      <div className="glass-panel rounded-2xl p-6 border border-indigo-500/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-outfit font-bold text-white text-base">Simulation Sandbox</h3>
          <p className="text-xs text-slate-400">Change learner IDs to test Row-Level Security (RLS) policies.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl flex-grow md:flex-grow-0">
            <User size={14} className="text-slate-500" />
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Learner ID:</label>
            <input
              type="number"
              min="1"
              value={learnerId}
              onChange={(e) => setLearnerId(parseInt(e.target.value, 10) || 1)}
              className="bg-transparent border-none text-white focus:outline-none w-16 text-sm font-semibold text-center"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl flex-grow md:flex-grow-0">
            <BookOpen size={14} className="text-slate-500" />
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quiz ID:</label>
            <input
              type="text"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-28 text-sm font-semibold text-center"
            />
          </div>

          <button
            onClick={loadQuizData}
            className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl text-xs font-bold transition-all border border-indigo-500/20 hover:border-indigo-500/40"
          >
            Reload State
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400 font-medium">Fetching quiz configuration...</p>
        </div>
      ) : result ? (
        /* Result Screen */
        <QuizResultModal result={result} onRetry={handleRetryQuiz} />
      ) : error && error.includes('locked') ? (
        /* Locked Screen */
        <QuizLockBanner 
          requiredMaterialId={quiz?.required_material_id || 'material_course_html'} 
          onSimulateUnlock={handleSimulateUnlockPrerequisite} 
        />
      ) : (
        /* Quiz Form Screen */
        <form onSubmit={handleSubmitQuiz} className="space-y-6">
          
          {error && (
            <div className="p-4 rounded-xl flex items-start gap-3 border bg-rose-950/40 border-rose-800/60 text-rose-300">
              <AlertTriangle className="shrink-0" size={20} />
              <div className="text-sm font-medium">{error}</div>
            </div>
          )}

          {quiz && (
            <>
              {/* Quiz Header Title */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-900 shadow-md">
                <span className="text-xs font-bold text-indigo-400 font-outfit uppercase tracking-wider">Active Assessment</span>
                <h2 className="font-outfit font-extrabold text-2xl text-white tracking-tight mt-1">{quiz.title}</h2>
                <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-slate-400 border-t border-slate-900/60 pt-4">
                  <div>Required: <strong className="text-white">{quiz.pass_score}%</strong> to pass</div>
                  <div>Retry Limit: <strong className="text-white">{quiz.max_retries} attempts</strong></div>
                </div>
              </div>

              {/* Validation Warning Alert */}
              {validationErrors.length > 0 && (
                <div className="p-4 rounded-xl flex items-start gap-3 border bg-rose-950/40 border-rose-800/60 text-rose-300">
                  <AlertTriangle className="shrink-0 animate-bounce" size={20} />
                  <div className="text-sm font-semibold">
                    Unanswered questions remaining. You must answer all questions before submitting the quiz.
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <QuizQuestion
                    key={q.id}
                    question={q}
                    qIndex={idx}
                    selectedChoiceId={selectedAnswers[q.id]}
                    onSelectChoice={handleSelectChoice}
                    isValidationWarning={validationErrors.includes(q.id)}
                  />
                ))}
              </div>

              {/* Submit Button */}
              {questions.length > 0 && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all text-sm"
                  >
                    <Send size={16} /> {submitting ? 'Grading Answers...' : 'Submit Assessment'}
                  </button>
                </div>
              )}
            </>
          )}
        </form>
      )}
    </div>
  );
}
