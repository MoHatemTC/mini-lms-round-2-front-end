/**
 * @file TaskPage.jsx
 * @description Main orchestrator page for task creation (admin) and task hand-ins (learner).
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import assignmentService from '../services/assignmentService';
import AdminTaskBuilder from '../components/AdminTaskBuilder';
import TaskSubmissionForm from '../components/TaskSubmissionForm';
import { BookOpen, Calendar, Lock, ShieldCheck, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

export default function TaskPage({ isAdmin }) {
  const { id } = useParams();
  const taskId = id || 'task_git_basics'; // Fallback for testing

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const loadTaskData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await assignmentService.fetchTask(taskId);
      // Backend returns: { status: 'success', data: { task, isUnlocked, submission } }
      const data = result.data;
      setTask(data.task);
      setIsUnlocked(data.isUnlocked);
      setSubmission(data.submission);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to load task details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      loadTaskData();
    }
  }, [taskId, isAdmin]);

  const handleSubmissionSuccess = (submissionData) => {
    setSubmission(submissionData);
    loadTaskData(); // Reload to get fresh status
  };

  const handleFileDownload = async (file) => {
    try {
      const blob = await assignmentService.downloadFile(file.url);
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      alert(`Failed to download file: ${err.message || err}`);
    }
  };

  // Render Admin View
  if (isAdmin) {
    return (
      <div className="py-6">
        <AdminTaskBuilder />
      </div>
    );
  }

  // Render Learner View Loading
  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-slate-400">Loading task configurations...</p>
      </div>
    );
  }

  // Render Error
  if (errorMsg) {
    return (
      <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border border-red-500/20 text-center space-y-4">
        <p className="text-sm font-bold text-red-400">Error loading assignment: {errorMsg}</p>
        <button
          onClick={loadTaskData}
          className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-850 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render Prerequisite Locked state
  if (!isUnlocked) {
    return (
      <div className="max-w-2xl mx-auto glass-panel p-10 rounded-3xl border border-white/5 shadow-2xl text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
          <Lock size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="font-outfit font-extrabold text-2xl text-white">Assignment Locked</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            You must pass the prerequisite quiz **({task?.required_quiz_id})** before this assignment unlocks.
          </p>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/learner/quizzes/${task?.required_quiz_id}`}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-650 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/10"
          >
            Go to Quiz
            <ChevronRight size={14} />
          </Link>
          <button
            onClick={loadTaskData}
            className="px-6 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all"
          >
            Check Status
          </button>
        </div>
      </div>
    );
  }

  // Render Unlocked Learner Flow
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Info */}
      <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-extrabold uppercase tracking-wider">
            Assignment
          </span>
          <h2 className="font-outfit font-extrabold text-3xl text-white">{task?.title}</h2>
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              Due: {new Date(task?.due_date).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        {submission && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-2xl">
            <CheckCircle2 size={16} className="text-emerald-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Status</span>
              <span className="text-xs text-emerald-400 font-extrabold">{submission.status}</span>
            </div>
          </div>
        )}
      </div>

      {/* Instructions details */}
      <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4 shadow-lg">
        <h3 className="font-outfit font-bold text-lg text-white">Instructions</h3>
        <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
          {task?.instructions}
        </p>
      </div>

      {/* Submission Form or Existing Hand-in Display */}
      <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 shadow-lg">
        <h3 className="font-outfit font-bold text-lg text-white">Your Hand-In</h3>
        
        {submission ? (
          <div className="space-y-6">
            
            {/* Success card banner */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="text-emerald-400 mt-0.5" size={18} />
              <div>
                <h4 className="text-xs font-extrabold text-emerald-400">Submission Recorded</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Your hand-in files and links have been successfully registered on {new Date(submission.submitted_at).toLocaleString()}.
                </p>
              </div>
            </div>

            {/* Submitted Files */}
            {submission.files && submission.files.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Files</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {submission.files.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFileDownload(file)}
                      className="w-full text-left p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl flex items-center justify-between text-xs text-white transition-all font-semibold cursor-pointer"
                    >
                      <span className="truncate max-w-[200px]">{file.name}</span>
                      <ExternalLink size={12} className="text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submitted Links */}
            {submission.links && submission.links.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Links</h4>
                <div className="space-y-2">
                  {submission.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl flex items-center justify-between text-xs text-white transition-all font-semibold capitalize"
                    >
                      <span>{link.type}: {link.url}</span>
                      <ExternalLink size={12} className="text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Re-submit trigger button */}
            <button
              onClick={() => setSubmission(null)}
              className="px-6 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/10 hover:border-indigo-500/30 rounded-xl text-xs font-bold transition-all"
            >
              Re-submit Hand-In
            </button>

          </div>
        ) : (
          <TaskSubmissionForm task={task} onSuccess={handleSubmissionSuccess} />
        )}
      </div>

    </div>
  );
}
