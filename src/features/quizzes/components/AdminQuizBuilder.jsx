import React, { useState } from 'react';
import { quizService } from '../services/quizService';
import { Plus, Trash2, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AdminQuizBuilder() {
  const [quizId, setQuizId] = useState('quiz_html_01');
  const [title, setTitle] = useState('HTML & CSS Fundamentals');
  const [passScore, setPassScore] = useState(70);
  const [maxRetries, setMaxRetries] = useState(3);
  const [scoreRule, setScoreRule] = useState('highest');
  const [requiredMaterialId, setRequiredMaterialId] = useState('material_course_html');

  // Simple state storing questions and choices
  const [questions, setQuestions] = useState([
    {
      question_text: 'What does HTML stand for?',
      points: 50,
      choices: [
        { choice_text: 'Hyper Text Markup Language', is_correct: true },
        { choice_text: 'Hyperlinks and Text Markup Language', is_correct: false },
        { choice_text: 'Home Tool Markup Language', is_correct: false },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState('info'); // 'success', 'error', 'info'

  // Add a new blank question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        points: 10,
        choices: [
          { choice_text: '', is_correct: true },
          { choice_text: '', is_correct: false },
        ],
      },
    ]);
  };

  // Delete a question by index
  const deleteQuestion = (qIndex) => {
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  // Modify question details
  const updateQuestionText = (qIndex, text) => {
    const updated = [...questions];
    updated[qIndex].question_text = text;
    setQuestions(updated);
  };

  const updateQuestionPoints = (qIndex, points) => {
    const updated = [...questions];
    updated[qIndex].points = parseInt(points, 10) || 0;
    setQuestions(updated);
  };

  // Add a new blank choice to a question
  const addChoice = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.push({ choice_text: '', is_correct: false });
    setQuestions(updated);
  };

  // Delete a choice from a question
  const deleteChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    updated[qIndex].choices = updated[qIndex].choices.filter((_, idx) => idx !== cIndex);
    setQuestions(updated);
  };

  // Update choice text
  const updateChoiceText = (qIndex, cIndex, text) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex].choice_text = text;
    setQuestions(updated);
  };

  // Toggle correct choice for a question (only 1 can be true)
  const setCorrectChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.forEach((choice, idx) => {
      choice.is_correct = idx === cIndex;
    });
    setQuestions(updated);
  };

  // Save the quiz config to the server
  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    // Frontend validations
    if (!quizId.trim()) {
      setStatusType('error');
      setStatusMessage('Quiz ID is required.');
      setLoading(false);
      return;
    }
    if (!title.trim()) {
      setStatusType('error');
      setStatusMessage('Quiz Title is required.');
      setLoading(false);
      return;
    }
    if (questions.length === 0) {
      setStatusType('error');
      setStatusMessage('Please add at least one question.');
      setLoading(false);
      return;
    }

    // Validate that each question has valid questions, choices and exactly 1 correct answer
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim()) {
        setStatusType('error');
        setStatusMessage(`Question #${i + 1} has empty text.`);
        setLoading(false);
        return;
      }
      if (q.choices.length < 2) {
        setStatusType('error');
        setStatusMessage(`Question #${i + 1} must have at least 2 choices.`);
        setLoading(false);
        return;
      }
      
      let correctCount = 0;
      for (let j = 0; j < q.choices.length; j++) {
        const c = q.choices[j];
        if (!c.choice_text.trim()) {
          setStatusType('error');
          setStatusMessage(`Choice #${j + 1} of Question #${i + 1} cannot be empty.`);
          setLoading(false);
          return;
        }
        if (c.is_correct) correctCount++;
      }
      
      if (correctCount !== 1) {
        setStatusType('error');
        setStatusMessage(`Question #${i + 1} must have exactly one correct answer selected.`);
        setLoading(false);
        return;
      }
    }

    const payload = {
      id: quizId,
      title,
      pass_score: passScore,
      max_retries: maxRetries,
      score_rule: scoreRule,
      required_material_id: requiredMaterialId || null,
      questions,
    };

    try {
      await quizService.createQuiz(payload);
      setStatusType('success');
      setStatusMessage(`Quiz "${title}" created/updated successfully!`);
    } catch (err) {
      console.error(err);
      setStatusType('error');
      setStatusMessage(err.response?.data?.message || 'Error occurred while saving the quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-outfit font-bold text-2xl text-white">Create & Configure Quiz</h2>
          <p className="text-sm text-slate-400">Build quizzes, set points, define RLS locks and retry policies.</p>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl flex items-start gap-3 border ${
          statusType === 'success' 
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
            : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
        }`}>
          {statusType === 'success' ? <CheckCircle2 className="shrink-0" size={20} /> : <AlertTriangle className="shrink-0" size={20} />}
          <div className="text-sm font-medium">{statusMessage}</div>
        </div>
      )}

      <form onSubmit={handleSaveQuiz} className="space-y-6">
        {/* Core Settings Box */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 shadow-xl">
          <h3 className="font-outfit font-semibold text-lg text-white border-b border-slate-800 pb-3">Quiz Configurations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quiz ID</label>
              <input
                type="text"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                placeholder="e.g. quiz_html_01"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quiz Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                placeholder="e.g. HTML & CSS Fundamentals"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Passing Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={passScore}
                onChange={(e) => setPassScore(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Max Retries</label>
              <input
                type="number"
                min="1"
                value={maxRetries}
                onChange={(e) => setMaxRetries(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Score Rule (D-08)</label>
              <select
                value={scoreRule}
                onChange={(e) => setScoreRule(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              >
                <option value="highest">Highest Score Counts</option>
                <option value="latest">Latest Attempt Counts</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Prerequisite Material ID (from Slot 4)</label>
            <input
              type="text"
              value={requiredMaterialId}
              onChange={(e) => setRequiredMaterialId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              placeholder="e.g. material_course_html (Leave empty for no prerequisite)"
            />
          </div>
        </div>

        {/* Dynamic Questions Builder */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-outfit font-semibold text-lg text-white">Questions Configuration</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-400 rounded-xl text-xs font-semibold transition-all"
            >
              <Plus size={14} /> Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="glass-panel rounded-2xl p-6 space-y-4 relative border-l-4 border-l-indigo-500/50 shadow-md">
              <button
                type="button"
                onClick={() => deleteQuestion(qIndex)}
                className="absolute top-6 right-6 text-slate-500 hover:text-rose-400 transition-colors"
                title="Delete Question"
              >
                <Trash2 size={18} />
              </button>

              <h4 className="text-sm font-semibold text-indigo-400 font-outfit uppercase tracking-wider">Question #{qIndex + 1}</h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Question Prompt</label>
                  <input
                    type="text"
                    value={q.question_text}
                    onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    placeholder="e.g. What does HTML stand for?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Points</label>
                  <input
                    type="number"
                    min="1"
                    value={q.points}
                    onChange={(e) => updateQuestionPoints(qIndex, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Choices Sub-list */}
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-500 uppercase">Multiple Choice Options (Check the correct answer)</label>
                  <button
                    type="button"
                    onClick={() => addChoice(qIndex)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    + Add Choice
                  </button>
                </div>

                <div className="space-y-3">
                  {q.choices.map((c, cIndex) => (
                    <div key={cIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct_choice_${qIndex}`}
                        checked={c.is_correct}
                        onChange={() => setCorrectChoice(qIndex, cIndex)}
                        className="w-4 h-4 text-indigo-600 border-slate-800 focus:ring-indigo-500 focus:ring-offset-slate-950 bg-slate-900"
                      />
                      <input
                        type="text"
                        value={c.choice_text}
                        onChange={(e) => updateChoiceText(qIndex, cIndex, e.target.value)}
                        className="flex-grow bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-white placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                        placeholder={`Choice Option #${cIndex + 1}`}
                      />
                      {q.choices.length > 2 && (
                        <button
                          type="button"
                          onClick={() => deleteChoice(qIndex, cIndex)}
                          className="text-slate-600 hover:text-rose-400 transition-colors"
                          title="Remove Choice"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all text-sm"
          >
            <Save size={16} /> {loading ? 'Saving...' : 'Save Quiz Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
