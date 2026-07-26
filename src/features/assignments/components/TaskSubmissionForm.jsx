/**
 * @file TaskSubmissionForm.jsx
 * @description Learner task hand-in interface, handling file uploads and link submissions.
 */

import React, { useState } from 'react';
import assignmentService from '../services/assignmentService';
import { Upload, Link, AlertTriangle, CheckCircle, Trash2, ExternalLink } from 'lucide-react';

export default function TaskSubmissionForm({ task, onSuccess }) {
  const requiredFiles = task.required_files || [];
  const requiredLinks = task.required_links || [];

  // Local state for uploads and inputs
  const [uploadedFiles, setUploadedFiles] = useState({}); // e.g. { ZIP: { name: '...', url: '...' } }
  const [linkValues, setLinkValues] = useState({}); // e.g. { github: '...' }
  
  // UI states
  const [uploadingField, setUploadingField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // File type mapping helper
  const getAcceptAttribute = (type) => {
    switch (type.toUpperCase()) {
      case 'PDF': return '.pdf';
      case 'ZIP': return '.zip';
      case 'MP4': return '.mp4';
      case 'IMAGE': return '.png,.jpg,.jpeg,.gif,.svg';
      case 'DOCUMENT': return '.doc,.docx,.pdf';
      default: return '*';
    }
  };

  // Handles client-side file upload to storage module
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorMsg(null);
    setUploadingField(type);

    try {
      const result = await assignmentService.uploadFile(file);
      // Backend returns structure: { status: 'success', data: { id, filename, url, ... } }
      const uploadedFileMeta = result.data;
      
      setUploadedFiles(prev => ({
        ...prev,
        [type]: {
          name: file.name,
          url: uploadedFileMeta.url || `http://localhost:5000/uploads/generic/${uploadedFileMeta.filename || uploadedFileMeta.id}`,
          type: type
        }
      }));
    } catch (err) {
      setErrorMsg(err.message || `Failed to upload ${type} file.`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleRemoveFile = (type) => {
    setUploadedFiles(prev => {
      const copy = { ...prev };
      delete copy[type];
      return copy;
    });
  };

  const handleLinkChange = (type, val) => {
    setLinkValues(prev => ({
      ...prev,
      [type]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(false);
    setErrorMsg(null);

    // --- Client-side validation checks ---
    
    // 1. Check if all required files are uploaded
    for (const reqFile of requiredFiles) {
      if (!uploadedFiles[reqFile]) {
        setErrorMsg(`Missing required item: Please upload a ${reqFile} file.`);
        return;
      }
    }

    // 2. Check if all required links are provided
    for (const reqLink of requiredLinks) {
      const url = linkValues[reqLink] || '';
      if (!url.trim()) {
        setErrorMsg(`Missing required item: Please provide a ${reqLink} link.`);
        return;
      }
    }

    // 3. Validate link formats
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/;

    const linksPayload = [];
    for (const type of requiredLinks) {
      const url = linkValues[type].trim();
      if (!urlRegex.test(url)) {
        setErrorMsg(`Refused bad link: "${url}" is not a valid absolute URL format.`);
        return;
      }
      if (type.toLowerCase() === 'github' && !githubRegex.test(url)) {
        setErrorMsg(`Refused bad link: "${url}" is not a valid GitHub repository URL.`);
        return;
      }
      linksPayload.push({ type, url });
    }

    const filesPayload = Object.values(uploadedFiles);

    // --- Send submission payload ---
    setSubmitting(true);
    try {
      const result = await assignmentService.submitTask(task.id, {
        files: filesPayload,
        links: linksPayload
      });
      onSuccess(result.data);
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      
      {/* File Uploads section */}
      {requiredFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Required Files</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requiredFiles.map(type => {
              const file = uploadedFiles[type];
              const isUploading = uploadingField === type;
              return (
                <div key={type} className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md text-[10px] font-extrabold uppercase">
                        {type} Format
                      </span>
                      <p className="text-xs text-slate-300 mt-2 font-semibold truncate max-w-[200px]">
                        {file ? file.name : 'No file uploaded'}
                      </p>
                    </div>
                    {file && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(type)}
                        className="p-1.5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className="mt-4">
                    {file ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                        <CheckCircle size={14} />
                        Uploaded
                      </div>
                    ) : isUploading ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-3.5 h-3.5 border border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </div>
                    ) : (
                      <label className="cursor-pointer px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                        <Upload size={12} />
                        Choose File
                        <input
                          type="file"
                          accept={getAcceptAttribute(type)}
                          onChange={(e) => handleFileUpload(e, type)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Links section */}
      {requiredLinks.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Required Links</h4>
          <div className="space-y-4">
            {requiredLinks.map(type => (
              <div key={type} className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 capitalize">
                  <Link size={14} className="text-slate-400" />
                  {type} URL
                </label>
                <input
                  type="text"
                  required
                  placeholder={type === 'github' ? 'https://github.com/username/repository' : 'https://example.com/demo'}
                  value={linkValues[type] || ''}
                  onChange={(e) => handleLinkChange(type, e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation/API error reporting banner */}
      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold flex items-center gap-3 animate-slide-up">
          <AlertTriangle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4.5 rounded-xl text-sm font-bold text-white btn-gradient flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <CheckCircle size={16} />
            Hand In Task
          </>
        )}
      </button>

    </form>
  );
}
