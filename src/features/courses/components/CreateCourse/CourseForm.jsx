import InputField from '../UI/Form/InputField';
import TextareaField from '../UI/Form/TextareaField';
import SelectField from '../UI/Form/SelectField';
import SectionTitle from '../UI/Form/SectionTitle';
import PrimaryButton from '../UI/Buttons/PrimaryButton';
import SecondaryButton from '../UI/Buttons/SecondaryButton';
import LearningOutcomeInput from './LearningOutcomeInput';
import { useCourseForm } from '../../hooks/useCourseForm';

const TRACK_OPTIONS = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI', 'DevOps', 'UI/UX'];
const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

const CourseForm = ({ isLoadingSkeleton = false, onClose }) => {
  const {
    formData,
    errors,
    isSubmitting,
    backendError,
    handleChange,
    handleSaveDraft,
    handleCancel,
    isValid
  } = useCourseForm(onClose);

  if (isLoadingSkeleton) {
    return (
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 animate-pulse flex flex-col gap-8">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-6">
          <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
          <div className="h-28 bg-gray-100 rounded-lg w-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <form className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col relative transition-all duration-300" onSubmit={e => e.preventDefault()}>
      
      {/* Backend Error Banner */}
      {backendError && !backendError.errors && (
        <div className="mx-6 sm:mx-8 mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <svg className="w-5 h-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <span className="font-medium text-sm">{backendError.message || 'An error occurred while saving the course.'}</span>
        </div>
      )}

      <div className="p-6 sm:p-10 space-y-6">
        <div className="mb-8">
          <SectionTitle title="Basic Information" description="Provide the core details of the course." />
          <InputField
            label="Course Title"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Advanced React Patterns"
            maxLength={100}
            error={errors.title}
            required
          />
          <TextareaField
            label="Description"
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Detailed description of what this course covers..."
            error={errors.description}
            required
          />
        </div>

        <div className="mb-8">
          <SectionTitle title="Course Details" description="Categorize and define the scope of the course." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            <SelectField
              label="Track"
              id="track"
              value={formData.track}
              onChange={(e) => handleChange('track', e.target.value)}
              options={TRACK_OPTIONS}
              error={errors.track}
              required
            />
            <SelectField
              label="Level"
              id="level"
              value={formData.level}
              onChange={(e) => handleChange('level', e.target.value)}
              options={LEVEL_OPTIONS}
              error={errors.level}
              required
            />
            <InputField
              label="Duration"
              id="duration"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g. 8 Weeks, 20 Hours"
              error={errors.duration}
              required
            />
            <InputField
              label="Main Skill"
              id="skill"
              value={formData.skill}
              onChange={(e) => handleChange('skill', e.target.value)}
              placeholder="e.g. React, Node.js"
              error={errors.skill}
              required
            />
          </div>
        </div>

        <div>
          <SectionTitle title="Learning Outcomes" description="What will students be able to do after completing this course?" />
          {/* We will leave LearningOutcomeInput as a specialized component since it requires drag and drop logic that OutcomeItem alone can't do without a wrapper */}
          <LearningOutcomeInput
            outcomes={formData.learningOutcomes}
            onChange={(newOutcomes) => handleChange('learningOutcomes', newOutcomes)}
            error={errors.learningOutcomes}
          />
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-5 sm:px-10 sm:py-6 flex flex-col-reverse sm:flex-row justify-end gap-4 rounded-b-2xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20">
        <SecondaryButton
          onClick={onClose ? onClose : handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={handleSaveDraft}
          disabled={!isValid() || isSubmitting}
          isLoading={isSubmitting}
        >
          Save Draft
        </PrimaryButton>
      </div>
    </form>
  );
};

export default CourseForm;
