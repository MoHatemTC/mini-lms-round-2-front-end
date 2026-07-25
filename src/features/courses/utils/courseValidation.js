/**
 * Validates whether a course meets the requirements to be published.
 * @param {Object} course - The course object to validate
 * @returns {Object} { isReady: boolean, missingRequirements: string[] }
 */
export const validateCourseForPublish = (course) => {
  if (!course) return { isReady: false, missingRequirements: ['Course data is missing'] };

  const missingRequirements = [];

  // Check title
  if (!course.title || !course.title.trim()) {
    missingRequirements.push('Course title is missing.');
  }

  // Check description
  if (!course.description || !course.description.trim()) {
    missingRequirements.push('Course description is missing.');
  }

  // Check required metadata
  const hasTrack = Boolean(course.track && course.track.trim());
  const hasLevel = Boolean(course.level && course.level.trim());
  const hasDuration = Boolean(course.duration && course.duration.trim());
  
  if (!hasTrack || !hasLevel || !hasDuration) {
    missingRequirements.push('Required metadata (track, level, duration) is incomplete.');
  }

  // Check materials (assuming course.materials or course.files)
  const materials = course.materials || course.files || [];
  if (!Array.isArray(materials) || materials.length === 0) {
    missingRequirements.push('At least one uploaded material is required.');
  }

  // If backend provided a specific readyToPublish flag, we can also respect it,
  // though we still show the granular frontend validation above to the user.
  let isReady = missingRequirements.length === 0;
  if (typeof course.readyToPublish === 'boolean') {
    isReady = isReady && course.readyToPublish;
    if (!course.readyToPublish && missingRequirements.length === 0) {
      missingRequirements.push('Backend indicates the course is not ready for publishing.');
    }
  }

  return {
    isReady,
    missingRequirements
  };
};
