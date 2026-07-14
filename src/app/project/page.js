'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderGit2, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Image as ImageIcon,
  AlertCircle,
  Calendar,
  MapPin,
  Clock,
  Hash,
  FileText,
  Building,
  CheckCircle,
  Briefcase
} from 'lucide-react';

export default function ProjectSection() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectCode: 'PRJ-2026-001',
      projectImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
      onsiteImages: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400'
      ],
      category: 'Ongoing',
      projectHeading: 'Digital Transformation Initiative',
      description: 'Comprehensive digital transformation project to modernize legacy systems and improve operational efficiency.',
      status: 'Work in Progress',
      startDate: '2026-01-15',
      endDate: '2026-06-30',
      type: 'Technology & Infrastructure',
      location: 'San Francisco, CA - Main Office',
      division: 'Technology Division',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      projectCode: 'PRJ-2026-002',
      projectImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
      onsiteImages: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400'
      ],
      category: 'Upcoming',
      projectHeading: 'Sustainability Initiative 2026',
      description: 'Implementing sustainable practices and green technologies across all operations to reduce carbon footprint.',
      status: 'Upcoming',
      startDate: '2026-08-01',
      endDate: '2026-12-31',
      type: 'Sustainability & Environment',
      location: 'Global Operations',
      division: 'Sustainability Division',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      projectCode: 'PRJ-2026-003',
      projectImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      onsiteImages: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400'
      ],
      category: 'Completed',
      projectHeading: 'ERP System Implementation',
      description: 'Successfully implemented enterprise resource planning system across all departments to streamline operations.',
      status: 'Completed',
      startDate: '2025-09-01',
      endDate: '2026-03-31',
      type: 'Software & Systems',
      location: 'Corporate Headquarters',
      division: 'IT Division',
      createdAt: '2026-07-10'
    },
    {
      id: 4,
      projectCode: 'PRJ-2026-004',
      projectImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
      onsiteImages: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400'
      ],
      category: 'Ongoing',
      projectHeading: 'Customer Experience Enhancement',
      description: 'Improving customer experience through AI-powered solutions and personalized service delivery.',
      status: 'Work in Progress',
      startDate: '2026-02-01',
      endDate: '2026-08-31',
      type: 'Customer Service & AI',
      location: 'Customer Service Centers',
      division: 'Customer Experience Division',
      createdAt: '2026-07-15'
    },
    {
      id: 5,
      projectCode: 'PRJ-2026-005',
      projectImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
      onsiteImages: [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400'
      ],
      category: 'Upcoming',
      projectHeading: 'Global Expansion Project',
      description: 'Expanding operations to new international markets with strategic partnerships and local presence.',
      status: 'Upcoming',
      startDate: '2026-09-01',
      endDate: '2027-03-31',
      type: 'Business Development',
      location: 'International Markets',
      division: 'Business Development Division',
      createdAt: '2026-07-18'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [projectCode, setProjectCode] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');
  const [onsiteImages, setOnsiteImages] = useState([]);
  const [onsitePreviews, setOnsitePreviews] = useState([]);
  const [category, setCategory] = useState('');
  const [projectHeading, setProjectHeading] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [division, setDivision] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fileInputRef = useRef(null);
  const onsiteFileInputRef = useRef(null);

  // Dropdown options
  const categoryOptions = ['Ongoing', 'Upcoming', 'Completed'];
  const statusOptions = ['Work in Progress', 'Upcoming', 'Completed'];

  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectHeading.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (projectImagePreview && projectImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(projectImagePreview);
      }
      onsitePreviews.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [projectImagePreview, onsitePreviews]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleProjectImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size must be less than 5MB.');
      return;
    }

    setFormError('');

    if (projectImagePreview && projectImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(projectImagePreview);
    }

    setProjectImage(file);
    setProjectImagePreview(URL.createObjectURL(file));
  };

  const handleOnsiteImagesChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    if (files.length === 0) return;

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setFormError('Please upload valid image files.');
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setFormError('Each image must be less than 5MB.');
      return;
    }

    setFormError('');

    onsitePreviews.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setOnsiteImages(files);
    setOnsitePreviews(newPreviews);
  };

  const removeOnsiteImage = (index) => {
    if (onsitePreviews[index] && onsitePreviews[index].startsWith('blob:')) {
      URL.revokeObjectURL(onsitePreviews[index]);
    }
    const newImages = onsiteImages.filter((_, i) => i !== index);
    const newPreviews = onsitePreviews.filter((_, i) => i !== index);
    setOnsiteImages(newImages);
    setOnsitePreviews(newPreviews);
  };

  const validateForm = () => {
    if (!projectImagePreview) {
      setFormError('Please upload a project image.');
      return false;
    }
    if (!projectCode.trim()) {
      setFormError('Please enter the project code.');
      return false;
    }
    if (!category) {
      setFormError('Please select a category.');
      return false;
    }
    if (!projectHeading.trim()) {
      setFormError('Please enter the project heading.');
      return false;
    }
    if (!description.trim()) {
      setFormError('Please enter the project description.');
      return false;
    }
    if (!status) {
      setFormError('Please select a status.');
      return false;
    }
    if (!startDate) {
      setFormError('Please select the start date.');
      return false;
    }
    if (!endDate) {
      setFormError('Please select the end date.');
      return false;
    }
    if (endDate < startDate) {
      setFormError('End date must be after start date.');
      return false;
    }
    if (!type.trim()) {
      setFormError('Please enter the project type.');
      return false;
    }
    if (!location.trim()) {
      setFormError('Please enter the project location.');
      return false;
    }
    if (!division.trim()) {
      setFormError('Please enter the division.');
      return false;
    }
    return true;
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newProject = {
      id: Date.now(),
      projectCode: projectCode.trim(),
      projectImage: projectImagePreview,
      onsiteImages: onsitePreviews,
      category: category,
      projectHeading: projectHeading.trim(),
      description: description.trim(),
      status: status,
      startDate: startDate,
      endDate: endDate,
      type: type.trim(),
      location: location.trim(),
      division: division.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects([newProject, ...projects]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setProjectCode(project.projectCode);
    setProjectImagePreview(project.projectImage);
    setOnsitePreviews(project.onsiteImages || []);
    setCategory(project.category);
    setProjectHeading(project.projectHeading);
    setDescription(project.description);
    setStatus(project.status);
    setStartDate(project.startDate);
    setEndDate(project.endDate);
    setType(project.type);
    setLocation(project.location);
    setDivision(project.division);
    setProjectImage(null);
    setOnsiteImages([]);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedProjects = projects.map(project =>
      project.id === editingId
        ? {
            ...project,
            projectCode: projectCode.trim(),
            projectImage: projectImagePreview,
            onsiteImages: onsitePreviews,
            category: category,
            projectHeading: projectHeading.trim(),
            description: description.trim(),
            status: status,
            startDate: startDate,
            endDate: endDate,
            type: type.trim(),
            location: location.trim(),
            division: division.trim()
          }
        : project
    );

    setProjects(updatedProjects);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
        const newTotalPages = Math.ceil(updatedProjects.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (project) => {
    setViewingProject(project);
    setCurrentImageIndex(0);
    setIsViewModalOpen(true);
  };

  const nextImage = () => {
    if (viewingProject && viewingProject.onsiteImages && currentImageIndex < viewingProject.onsiteImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (viewingProject && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const resetForm = () => {
    if (projectImagePreview && projectImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(projectImagePreview);
    }
    onsitePreviews.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setProjectImage(null);
    setProjectImagePreview('');
    setOnsiteImages([]);
    setOnsitePreviews([]);
    setProjectCode('');
    setCategory('');
    setProjectHeading('');
    setDescription('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    setType('');
    setLocation('');
    setDivision('');
    setEditingId(null);
    setFormError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onsiteFileInputRef.current) {
      onsiteFileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Work in Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Ongoing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Upcoming':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-3 md:p-6">
      <div className="w-full max-w-7xl bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex justify-between items-center p-4 border-b border-red-200/50">
            <div className="flex items-center gap-3">
              <FolderGit2 className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Projects</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredProjects.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-48 md:w-64 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[100px]">Image</th>
                  <th className="px-6 py-4 min-w-[100px]">Project Code</th>
                  <th className="px-6 py-4 min-w-[150px]">Heading</th>
                  <th className="px-6 py-4 w-[120px] text-center">Category</th>
                  <th className="px-6 py-4 w-[120px] text-center">Status</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentProjects.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <FolderGit2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No projects found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new project</p>
                    </td>
                  </tr>
                ) : (
                  currentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                          <img 
                            src={project.projectImage} 
                            alt={project.projectHeading} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-800">{project.projectCode}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800 block text-sm">{project.projectHeading}</span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(project)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(project)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(project.id)}
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
          {filteredProjects.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredProjects.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredProjects.length}</span> projects
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-white border border-red-200/50 text-gray-700 hover:bg-red-50 hover:border-red-300'
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
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-4xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Project
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add New Project
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateProject : handleCreateProject} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Project Code */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Project Code *
                    </label>
                    <input 
                      type="text" 
                      value={projectCode}
                      onChange={(e) => setProjectCode(e.target.value)}
                      placeholder="e.g. PRJ-2026-001"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={50}
                    />
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
                    >
                      <option value="">Select category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Heading */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Project Heading *
                    </label>
                    <input 
                      type="text" 
                      value={projectHeading}
                      onChange={(e) => setProjectHeading(e.target.value)}
                      placeholder="e.g. Digital Transformation Initiative"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={200}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Description *
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the project..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      rows="3"
                      maxLength={1000}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {description.length}/1000
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Status *
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
                    >
                      <option value="">Select status</option>
                      {statusOptions.map((stat) => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Project Image */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Project Image *
                    </label>
                    {projectImagePreview ? (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm group">
                        <img 
                          key={projectImagePreview}
                          src={projectImagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (projectImagePreview && projectImagePreview.startsWith('blob:')) {
                              URL.revokeObjectURL(projectImagePreview);
                            }
                            setProjectImagePreview('');
                            setProjectImage(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                          aria-label="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                        <Upload className="w-10 h-10 text-red-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Upload project image</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleProjectImageChange}
                          aria-label="Upload project image"
                        />
                      </label>
                    )}
                  </div>

                  {/* Onsite Images */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Onsite Images (Multiple)
                    </label>
                    {onsitePreviews.length > 0 ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          {onsitePreviews.map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="w-full h-20 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                                <img 
                                  src={url} 
                                  alt={`Onsite ${index + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeOnsiteImage(index)}
                                className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                                aria-label="Remove image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <label className="w-full h-20 rounded-lg border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 flex items-center justify-center">
                            <Plus className="w-6 h-6 text-red-400" />
                            <input 
                              ref={onsiteFileInputRef}
                              type="file" 
                              accept="image/*" 
                              multiple
                              className="hidden" 
                              onChange={handleOnsiteImagesChange}
                              aria-label="Upload more onsite images"
                            />
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (onsiteFileInputRef.current) {
                              onsiteFileInputRef.current.click();
                            }
                          }}
                          className="w-full py-2 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
                        >
                          + Add More Images
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                        <Upload className="w-8 h-8 text-red-400 mb-1" />
                        <span className="text-sm font-medium text-gray-700">Upload onsite images</span>
                        <span className="text-xs text-gray-400 mt-1">Select multiple images</span>
                        <input 
                          ref={onsiteFileInputRef}
                          type="file" 
                          accept="image/*" 
                          multiple
                          className="hidden" 
                          onChange={handleOnsiteImagesChange}
                          aria-label="Upload onsite images"
                        />
                      </label>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {onsitePreviews.length} image{onsitePreviews.length !== 1 ? 's' : ''} uploaded
                    </p>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Start Date *
                    </label>
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      End Date *
                    </label>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Type *
                  </label>
                  <input 
                    type="text" 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="e.g. Technology & Infrastructure"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    maxLength={200}
                  />
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
                    placeholder="e.g. San Francisco, CA - Main Office"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    maxLength={200}
                  />
                </div>
              </div>

              {/* Division */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Division *
                </label>
                <input 
                  type="text" 
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  placeholder="e.g. Technology Division"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={200}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingProject(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-red-600" />
                Project Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingProject(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Project Image */}
              <div className="w-full h-64 rounded-lg overflow-hidden border border-red-200 shadow-md">
                <img 
                  src={viewingProject.projectImage} 
                  alt={viewingProject.projectHeading} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=No+Image';
                  }}
                />
              </div>

              {/* Project Header */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{viewingProject.projectHeading}</h4>
                    <p className="text-gray-600 text-sm mt-1">Code: {viewingProject.projectCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor(viewingProject.category)}`}>
                      {viewingProject.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(viewingProject.status)}`}>
                      {viewingProject.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Start Date</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2 rounded-lg border border-red-200/50">
                    {new Date(viewingProject.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">End Date</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2 rounded-lg border border-red-200/50">
                    {new Date(viewingProject.endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Type</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2 rounded-lg border border-red-200/50">
                    {viewingProject.type}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Location</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2 rounded-lg border border-red-200/50">
                    {viewingProject.location}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Division</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 bg-red-50/50 px-4 py-2 rounded-lg border border-red-200/50">
                    {viewingProject.division}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  </div>
                  <p className="text-sm text-gray-700 bg-red-50/50 px-4 py-2 rounded-lg border border-red-200/50 max-h-32 overflow-y-auto">
                    {viewingProject.description}
                  </p>
                </div>
              </div>

              {/* Onsite Images */}
              {viewingProject.onsiteImages && viewingProject.onsiteImages.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Onsite Images</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {viewingProject.onsiteImages.map((image, index) => (
                      <div key={index} className="w-full h-32 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                        <img 
                          src={image} 
                          alt={`Onsite ${index + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=No+Image';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingProject(null);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
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