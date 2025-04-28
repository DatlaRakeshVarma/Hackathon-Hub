import React, { useState, useEffect } from 'react';
import { Calendar, Users, Tag, Info, Award, Link as LinkIcon } from 'lucide-react';
import { HackathonSubmission } from '../types';
import { colleges, tags, states, districts } from '../data/hackathons';

interface HackathonFormProps {
  onSubmit: (data: HackathonSubmission) => void;
}

const HackathonForm: React.FC<HackathonFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<HackathonSubmission>({
    title: '',
    college: '',
    state: '',
    district: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    description: '',
    eligibility: '',
    prizes: '',
    teamSize: {
      min: 1,
      max: 4
    },
    tags: [],
    website: '',
    image: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>(districts['Andhra Pradesh'].slice(1));

  useEffect(() => {
    setAvailableDistricts(districts[formData.state as keyof typeof districts]?.slice(1) || []);
    
    // Reset district when state changes
    if (formData.state && formData.district && !districts[formData.state as keyof typeof districts]?.includes(formData.district)) {
      setFormData(prev => ({
        ...prev,
        district: ''
      }));
    }
  }, [formData.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'teamSizeMin' || name === 'teamSizeMax') {
      setFormData({
        ...formData,
        teamSize: {
          ...formData.teamSize,
          [name === 'teamSizeMin' ? 'min' : 'max']: parseInt(value) || 0
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== 'All Tags' && !selectedTags.includes(value)) {
      const newTags = [...selectedTags, value];
      setSelectedTags(newTags);
      setFormData({
        ...formData,
        tags: newTags
      });
    }
  };

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    setFormData({
      ...formData,
      tags: newTags
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.college) newErrors.college = 'College is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.registrationDeadline) newErrors.registrationDeadline = 'Registration deadline is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.eligibility) newErrors.eligibility = 'Eligibility criteria is required';
    if (!formData.prizes) newErrors.prizes = 'Prize details are required';
    if (formData.teamSize.min < 1) newErrors.teamSizeMin = 'Minimum team size must be at least 1';
    if (formData.teamSize.max < formData.teamSize.min) {
      newErrors.teamSizeMax = 'Maximum team size must be greater than or equal to minimum team size';
    }
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (!formData.contactName) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
    if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone is required';
    
    // Validate dates
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (formData.registrationDeadline && formData.startDate && 
        new Date(formData.registrationDeadline) > new Date(formData.startDate)) {
      newErrors.registrationDeadline = 'Registration deadline must be before start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Hackathon</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Hackathon Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
            College/University*
          </label>
          <select
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.college ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select College</option>
            {colleges.slice(1).map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
          {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State*
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.state ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select State</option>
            {states.slice(1).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>
        
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            District*
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.district ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select District</option>
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Website URL (Optional)
        </label>
        <div className="flex items-center">
          <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date*
          </label>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.startDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date*
          </label>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.endDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
        </div>
        
        <div>
          <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
            Registration Deadline*
          </label>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              id="registrationDeadline"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.registrationDeadline ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.registrationDeadline && (
            <p className="mt-1 text-sm text-red-600">{errors.registrationDeadline}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description*
        </label>
        <div className="flex items-start">
          <Info className="h-5 w-5 text-gray-400 mr-2 mt-2" />
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Provide a detailed description of your hackathon..."
          />
        </div>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">
            Eligibility Criteria*
          </label>
          <textarea
            id="eligibility"
            name="eligibility"
            rows={3}
            value={formData.eligibility}
            onChange={handleChange}
            className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.eligibility ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Who can participate in this hackathon?"
          />
          {errors.eligibility && <p className="mt-1 text-sm text-red-600">{errors.eligibility}</p>}
        </div>
        
        <div>
          <label htmlFor="prizes" className="block text-sm font-medium text-gray-700 mb-1">
            Prizes*
          </label>
          <div className="flex items-start">
            <Award className="h-5 w-5 text-gray-400 mr-2 mt-2" />
            <textarea
              id="prizes"
              name="prizes"
              rows={3}
              value={formData.prizes}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.prizes ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe the prizes and rewards for winners..."
            />
          </div>
          {errors.prizes && <p className="mt-1 text-sm text-red-600">{errors.prizes}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Size*
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <label htmlFor="teamSizeMin" className="block text-xs text-gray-500">
                  Min
                </label>
                <input
                  type="number"
                  id="teamSizeMin"
                  name="teamSizeMin"
                  min="1"
                  value={formData.teamSize.min}
                  onChange={handleChange}
                  className={`w-20 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.teamSizeMin ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
            <span className="text-gray-500">to</span>
            <div>
              <label htmlFor="teamSizeMax" className="block text-xs text-gray-500">
                Max
              </label>
              <input
                type="number"
                id="teamSizeMax"
                name="teamSizeMax"
                min="1"
                value={formData.teamSize.max}
                onChange={handleChange}
                className={`w-20 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.teamSizeMax ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
          {errors.teamSizeMin && <p className="mt-1 text-sm text-red-600">{errors.teamSizeMin}</p>}
          {errors.teamSizeMax && <p className="mt-1 text-sm text-red-600">{errors.teamSizeMax}</p>}
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags*
          </label>
          <div className="flex items-center">
            <Tag className="h-5 w-5 text-gray-400 mr-2" />
            <select
              id="tags"
              name="tags"
              onChange={handleTagChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.tags ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select Tags</option>
              {tags.slice(1).map((tag) => (
                <option key={tag} value={tag} disabled={selectedTags.includes(tag)}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL* (Banner image for your hackathon)
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.image ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="https://example.com/image.jpg"
        />
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        <p className="mt-1 text-xs text-gray-500">
          Please provide a URL to an image that represents your hackathon. Recommended size: 1200x600 pixels.
        </p>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Name*
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.contactName ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.contactName && <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>}
          </div>
          
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email*
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.contactEmail ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone*
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.contactPhone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+91 9876543210"
            />
            {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit for Review
        </button>
      </div>
    </form>
  );
};

export default HackathonForm;