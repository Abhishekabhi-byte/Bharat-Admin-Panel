'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  AlertCircle,
  Calendar,
  MapPin,
  Clock,
  Users,
  FileText,
  CheckCircle,
  Building,
  DollarSign,
  Filter
} from 'lucide-react';

export default function JobPostPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobField: 'Software Development',
      location: 'San Francisco, CA',
      experience: '5-8 years',
      description: 'We are looking for a Senior Software Engineer to lead our development team and architect scalable solutions for our growing platform.',
      workType: 'Full Time',
      jobPostDate: '2026-07-01',
      jobRole: 'Senior Software Engineer',
      filter: 'Backend, Frontend, Full Stack, React, Node.js, AWS',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      jobField: 'Marketing',
      location: 'New York, NY',
      experience: '3-5 years',
      description: 'Seeking a creative Digital Marketing Manager to drive our online presence and lead marketing campaigns across multiple channels.',
      workType: 'Full Time',
      jobPostDate: '2026-07-05',
      jobRole: 'Digital Marketing Manager',
      filter: 'SEO, SEM, Social Media, Google Analytics, Content Strategy',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      jobField: 'Design',
      location: 'Remote',
      experience: '2-4 years',
      description: 'Looking for a talented UI/UX Designer to create beautiful and intuitive user interfaces for our web and mobile applications.',
      workType: 'Part Time',
      jobPostDate: '2026-07-10',
      jobRole: 'UI/UX Designer',
      filter: 'Figma, Adobe XD, Sketch, Prototyping, User Research',
      createdAt: '2026-07-10'
    },
    {
      id: 4,
      jobField: 'Human Resources',
      location: 'Chicago, IL',
      experience: '4-6 years',
      description: 'HR Manager needed to oversee recruitment, employee relations, and organizational development initiatives.',
      workType: 'Full Time',
      jobPostDate: '2026-07-15',
      jobRole: 'HR Manager',
      filter: 'Recruitment, Employee Relations, Performance Management, HRIS',
      createdAt: '2026-07-15'
    },
    {
      id: 5,
      jobField: 'Sales',
      location: 'Los Angeles, CA',
      experience: '2-3 years',
      description: 'Join our sales team as a Sales Representative to drive revenue growth and build strong client relationships.',
      workType: 'Contract',
      jobPostDate: '2026-07-18',
      jobRole: 'Sales Representative',
      filter: 'B2B Sales, CRM, Cold Calling, Negotiation, Lead Generation',
      createdAt: '2026-07-18'
    },
    {
      id: 6,
      jobField: 'Finance',
      location: 'Boston, MA',
      experience: '6-10 years',
      description: 'Seeking an experienced Financial Analyst to provide strategic financial insights and support business decision-making.',
      workType: 'Full Time',
      jobPostDate: '2026-07-20',
      jobRole: 'Senior Financial Analyst',
      filter: 'Financial Modeling, Excel, Forecasting, Budgeting, CPA',
      createdAt: '2026-07-20'
    },
    {
      id: 7,
      jobField: 'Operations',
      location: 'Dallas, TX',
      experience: '3-5 years',
      description: 'Operations Manager needed to optimize processes, improve efficiency, and lead operational excellence initiatives.',
      workType: 'Part Time',
      jobPostDate: '2026-07-22',
      jobRole: 'Operations Manager',
      filter: 'Process Improvement, Six Sigma, Supply Chain, Lean Management',
      createdAt: '2026-07-22'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [jobField, setJobField] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [workType, setWorkType] = useState('');
  const [jobPostDate, setJobPostDate] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [filter, setFilter] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Work type options
  const workTypeOptions = ['Full Time', 'Part Time', 'Contract'];

  // Filter jobs based on search and filter keyword
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.jobField.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.workType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      !filterKeyword || 
      (job.filter && job.filter.toLowerCase().includes(filterKeyword.toLowerCase()));
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterKeyword]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const validateForm = () => {
    if (!jobField.trim()) {
      setFormError('Please enter the job field/domain.');
      return false;
    }
    if (!location.trim()) {
      setFormError('Please enter the job location.');
      return false;
    }
    if (!experience.trim()) {
      setFormError('Please enter the experience requirement.');
      return false;
    }
    if (!description.trim()) {
      setFormError('Please enter the job description.');
      return false;
    }
    if (!workType) {
      setFormError('Please select the work type.');
      return false;
    }
    if (!jobPostDate) {
      setFormError('Please select the job post date.');
      return false;
    }
    if (!jobRole.trim()) {
      setFormError('Please enter the job role.');
      return false;
    }
    return true;
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newJob = {
      id: Date.now(),
      jobField: jobField.trim(),
      location: location.trim(),
      experience: experience.trim(),
      description: description.trim(),
      workType: workType,
      jobPostDate: jobPostDate,
      jobRole: jobRole.trim(),
      filter: filter.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setJobs([newJob, ...jobs]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (job) => {
    setEditingId(job.id);
    setJobField(job.jobField);
    setLocation(job.location);
    setExperience(job.experience);
    setDescription(job.description);
    setWorkType(job.workType);
    setJobPostDate(job.jobPostDate);
    setJobRole(job.jobRole);
    setFilter(job.filter || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedJobs = jobs.map(job =>
      job.id === editingId
        ? {
            ...job,
            jobField: jobField.trim(),
            location: location.trim(),
            experience: experience.trim(),
            description: description.trim(),
            workType: workType,
            jobPostDate: jobPostDate,
            jobRole: jobRole.trim(),
            filter: filter.trim()
          }
        : job
    );

    setJobs(updatedJobs);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedJobs = jobs.filter(job => job.id !== id);
        setJobs(updatedJobs);
        const newTotalPages = Math.ceil(updatedJobs.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (job) => {
    setViewingJob(job);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setJobField('');
    setLocation('');
    setExperience('');
    setDescription('');
    setWorkType('');
    setJobPostDate('');
    setJobRole('');
    setFilter('');
    setEditingId(null);
    setFormError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Truncate description to 40 characters
  const truncateDescription = (text, maxLength = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get work type color
  const getWorkTypeColor = (type) => {
    switch(type) {
      case 'Full Time':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Part Time':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contract':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-3 md:p-6">
      <div className="w-full max-w-7xl bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search and Filter */}
          <div className="flex flex-wrap justify-between items-center p-4 border-b border-red-200/50 gap-3">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Job Posts</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredJobs.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-40 md:w-52 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Filter Input */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  className="w-40 md:w-48 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={filterKeyword}
                  onChange={(e) => setFilterKeyword(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Post Job
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600/10 to-red-500/10 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 min-w-[120px]">Job Role</th>
                  <th className="px-6 py-4 min-w-[120px]">Field</th>
                  <th className="px-6 py-4 min-w-[120px]">Location</th>
                  <th className="px-6 py-4 w-[120px] text-center">Work Type</th>
                  <th className="px-6 py-4 w-[120px] text-center">Post Date</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No job posts found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-red-50/50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 block text-base">{job.jobRole}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{job.jobField}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-red-600" />
                          {job.location}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
                          <Clock className="w-3 h-3" />
                          {job.workType}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-600">
                          {new Date(job.jobPostDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(job)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(job)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(job.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-red-50/50 to-transparent">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredJobs.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredJobs.length}</span> jobs
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white/80 text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }
                  
                  const isSelected = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
                          : 'bg-white/80 border border-red-200/50 text-gray-700 hover:bg-red-50 hover:border-red-300'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-red-200/50 bg-white/80 text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Job Post
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Post New Job
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateJob : handleCreateJob} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Job Role */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Job Role *
                    </label>
                    <input 
                      type="text" 
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {jobRole.length}/100
                    </div>
                  </div>

                  {/* Job Field/Domain */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Job Field/Domain *
                    </label>
                    <input 
                      type="text" 
                      value={jobField}
                      onChange={(e) => setJobField(e.target.value)}
                      placeholder="e.g. Software Development"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={200}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {jobField.length}/200
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Location *
                    </label>
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. San Francisco, CA or Remote"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={200}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {location.length}/200
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Experience *
                    </label>
                    <input 
                      type="text" 
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 5-8 years"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {experience.length}/100
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Work Type - Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Work Type *
                    </label>
                    <select
                      value={workType}
                      onChange={(e) => setWorkType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
                    >
                      <option value="">Select work type</option>
                      {workTypeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Job Post Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Job Post Date *
                    </label>
                    <input 
                      type="date" 
                      value={jobPostDate}
                      onChange={(e) => setJobPostDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Job Description *
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the job responsibilities, requirements, and benefits..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      rows="4"
                     
                    />
                   
                  </div>
                </div>
              </div>

              {/* Filter Field - Full Width */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Filter  <span className="font-normal text-gray-400">*</span>
                </label>
                <textarea 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Enter keywords for filtering e.g. Electrical Engineering..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                  rows="2"
                  required
                  maxLength={500}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {filter.length}/500
                </div>
                <p className="text-xs text-gray-400 mt-1">Enter comma-separated keywords for filtering job posts</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
                >
                  {editingId ? 'Update Job' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={() => {
          setIsViewModalOpen(false);
          setViewingJob(null);
        }}>
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-red-600" />
                Job Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingJob(null);
                }}
                className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Job Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-50/30 p-4 rounded-xl border border-red-200/50">
                <h4 className="text-xl font-bold text-gray-800">{viewingJob.jobRole}</h4>
                <p className="text-gray-600 mt-1">{viewingJob.jobField}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Location</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                    {viewingJob.location}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Work Type</p>
                  </div>
                  <p className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium ${getWorkTypeColor(viewingJob.workType)}`}>
                    {viewingJob.workType}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Experience</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                    {viewingJob.experience}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Post Date</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                    {new Date(viewingJob.jobPostDate).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <FileText className="w-4 h-4 text-red-600" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                </div>
                <p className="text-sm text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50 max-h-40 overflow-y-auto">
                  {viewingJob.description}
                </p>
              </div>

              {/* Filter Field - Added to View Modal */}
              {viewingJob.filter && (
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Filter className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Filter / Keywords</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingJob.filter.split(',').map((keyword, index) => (
                      <span key={index} className="bg-red-50/80 text-gray-700 px-2.5 py-1 rounded-full border border-red-200/50 text-xs font-medium">
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingJob(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}