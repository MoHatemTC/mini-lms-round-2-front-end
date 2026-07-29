/**
 * @file AdminTaskBuilder.jsx
 * @description Admin form interface to create and manage assignments.
 */

import React, { useState } from 'react';
import assignmentService from '../services/assignmentService';
import { Plus, Check, FileText, Link2, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminTaskBuilder() {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [requiredQuizId, setRequiredQuizId] = useState('');

  // Custom hand-in check lists
  const [requiredFiles, setRequiredFiles] = useState([]);
  const [requiredLinks, setRequiredLinks] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fileOptions = ['ZIP', 'PDF', 'MP4', 'IMAGE', 'DOCUMENT'];
  const linkOptions = ['github', 'demo', 'evidence'];

  const toggleFileOption = (opt) => {
    setRequiredFiles(prev =>
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  const toggleLinkOption = (opt) => {
    setRequiredLinks(prev =>
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Validate future date
    const dDate = new Date(dueDate);
    if (dDate <= new Date()) {
      setFeedback({ type: 'error', message: 'Due date must be in the future!' });
      setLoading(false);
      return;
    }

    try {
      const taskData = {
        id: taskId,
        title,
        instructions,
        due_date: dueDate,
        required_quiz_id: requiredQuizId || null,
        required_files: requiredFiles,
        required_links: requiredLinks
      };

      const result = await assignmentService.createTask(taskData);
      setFeedback({
        type: 'success',
        message: result.message || 'Task created successfully!'
      });

      // Clear forms
      setTaskId('');
      setTitle('');
      setInstructions('');
      setDueDate('');
      setRequiredQuizId('');
      setRequiredFiles([]);
      setRequiredLinks([]);
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to save task configuration.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl max-w-2xl mx-auto animate-fade-in">

      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="font-outfit font-extrabold text-2xl text-white">Create Assignment Task</h2>
          <p className="text-xs text-slate-400 mt-1">Configure instructions, prerequisite quiz locks, and file hand-in rules.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Task ID & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Task ID (Unique Code)</label>
            <input
              type="text"
              required
              placeholder="e.g. task_git_basics"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Git Setup & Workflows"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Instructions</label>
          <textarea
            required
            rows={4}
            placeholder="Write clear instructions detailing rules, deliverables, and guidelines..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold resize-none"
          />
        </div>

        {/* Due Date & Prerequisite Quiz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Due Date</label>
            <input
              type="datetime-local"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Prerequisite Quiz ID (Optional)</label>
            <input
              type="text"
              placeholder="e.g. quiz_html_01"
              value={requiredQuizId}
              onChange={(e) => setRequiredQuizId(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold"
            />
          </div>
        </div>

        {/* Hand-in Rules Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* File Formats checklist */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} className="text-slate-400" />
              Required File Uploads
            </label>
            <div className="flex flex-wrap gap-2">
              {fileOptions.map(opt => {
                const selected = requiredFiles.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleFileOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      selected
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {selected && <Check size={12} />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links checklist */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Link2 size={14} className="text-slate-400" />
              Required Web Links
            </label>
            <div className="flex flex-wrap gap-2">
              {linkOptions.map(opt => {
                const selected = requiredLinks.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleLinkOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 capitalize ${
                      selected
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {selected && <Check size={12} />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 border ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <AlertCircle size={16} />
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4.5 rounded-xl text-sm font-bold text-white btn-gradient flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Plus size={16} />
              Save Task Configuration
            </>
          )}
        </button>

      </form>

    </div>
  );
}
