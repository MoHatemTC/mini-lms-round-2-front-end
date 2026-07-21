export const validateCourseForm = (formData) => {
  const errors = {};

  // Title: required, 5-120 chars
  if (!formData.title || !formData.title.trim()) {
    errors.title = 'Title is required.';
  } else if (formData.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters.';
  } else if (formData.title.trim().length > 120) {
    errors.title = 'Title must not exceed 120 characters.';
  }

  // Description: required, min 30 chars
  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Description is required.';
  } else if (formData.description.trim().length < 30) {
    errors.description = 'Description must be at least 30 characters.';
  }

  // Track: required
  if (!formData.track) {
    errors.track = 'Track is required.';
  }

  // Level: required
  if (!formData.level) {
    errors.level = 'Level is required.';
  }

  // Duration: required
  if (!formData.length || !formData.length.trim()) {
    errors.length = 'Duration is required.';
  }

  // Skill: required
  if (!formData.skill || !formData.skill.trim()) {
    errors.skill = 'Main Skill is required.';
  }

  // Learning Outcomes: min 1, max 20, no empty
  if (!formData.learningOutcomes || formData.learningOutcomes.length === 0) {
    errors.learningOutcomes = 'At least one learning outcome is required.';
  } else if (formData.learningOutcomes.length > 20) {
    errors.learningOutcomes = 'Maximum of 20 learning outcomes allowed.';
  } else if (formData.learningOutcomes.some(outcome => !outcome || !outcome.trim())) {
    errors.learningOutcomes = 'Learning outcomes cannot contain empty items.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
