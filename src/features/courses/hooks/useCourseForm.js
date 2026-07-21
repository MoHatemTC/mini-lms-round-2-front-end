import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createCourse, clearCourseState } from '../courseSlice';
import { useNotification } from '../../../components/common/Notification/NotificationProvider';

export const useCourseForm = (onClose) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifyCourseSaved } = useNotification();
  const { loading: isSubmitting, error: backendError, successMessage } = useSelector((state) => state.courses || {});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    track: '',
    level: '',
    duration: '',
    skill: '',
    learningOutcomes: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearCourseState());
    return () => dispatch(clearCourseState());
  }, [dispatch]);

  // Handle successful submission
  useEffect(() => {
    if (successMessage) {
      notifyCourseSaved();
      setFormData({
        title: '',
        description: '',
        track: '',
        level: '',
        duration: '',
        skill: '',
        learningOutcomes: []
      });
      if (onClose) {
        onClose();
      } else {
        navigate('/admin/courses');
      }
    }
  }, [successMessage, navigate, notifyCourseSaved, onClose]);

  // Handle Backend Validation Errors gracefully
  useEffect(() => {
    if (backendError && backendError.errors) {
      setErrors(prev => ({ ...prev, ...backendError.errors }));
    }
  }, [backendError]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.track) newErrors.track = 'Track is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.skill.trim()) newErrors.skill = 'Main Skill is required';
    if (formData.learningOutcomes.length === 0) {
      newErrors.learningOutcomes = 'At least one learning outcome is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSaveDraft = async () => {
    if (validate() && !isSubmitting) {
      dispatch(createCourse(formData));
    }
  };

  const isValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.track !== '' &&
      formData.level !== '' &&
      formData.duration.trim() !== '' &&
      formData.skill.trim() !== '' &&
      formData.learningOutcomes.length > 0
    );
  };

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  return {
    formData,
    errors,
    isSubmitting,
    backendError,
    handleChange,
    handleSaveDraft,
    handleCancel,
    isValid
  };
};
