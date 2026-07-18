'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
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
  Star,
  Crown
} from 'lucide-react';

export default function LegacySection() {
  const [legacies, setLegacies] = useState([
    {
      id: 1,
      title: 'Pioneering Innovation',
      description: 'Founded with a vision to revolutionize the industry through cutting-edge technology and innovative solutions that have shaped the future of digital transformation.',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      title: 'Community Leadership',
      description: 'Building strong communities and fostering collaboration through initiatives that empower individuals and organizations to achieve their full potential.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      title: 'Sustainable Excellence',
      description: 'Committed to sustainable practices and environmental responsibility, setting new standards for eco-friendly operations and green technology adoption.',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
      createdAt: '2026-07-10'
    },
    {
      id: 4,
      title: 'Global Impact',
      description: 'Expanding reach across continents, creating lasting impact through partnerships, cultural exchange, and shared vision for a better tomorrow.',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
      createdAt: '2026-07-15'
    },
    {
      id: 5,
      title: 'Digital Transformation',
      description: 'Leading the digital revolution with breakthrough technologies that have transformed businesses and created new opportunities in the digital economy.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      createdAt: '2026-07-18'
    },
    {
      id: 6,
      title: 'Excellence in Education',
      description: 'Empowering the next generation through educational initiatives, scholarships, and knowledge-sharing platforms that bridge the gap between academia and industry.',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
      createdAt: '2026-07-20'
    },
    {
      id: 7,
      title: 'Healthcare Innovation',
      description: 'Revolutionizing healthcare through technology-driven solutions that improve patient outcomes and make quality healthcare accessible to all.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
      createdAt: '2026-07-22'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingLegacy, setViewingLegacy] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter legacies based on search
  const filteredLegacies = legacies.filter(legacy =>
    legacy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    legacy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLegacies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLegacies = filteredLegacies.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size must be less than 5MB.');
      return;
    }

    setFormError('');

    // Clean up previous object URL
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select an image.');
      return false;
    }
    if (!title.trim()) {
      setFormError('Please enter the title.');
      return false;
    }
    if (!description.trim()) {
      setFormError('Please enter the description.');
      return false;
    }
    if (description.length > 500) {
      setFormError('Description must be less than 500 characters.');
      return false;
    }
    return true;
  };

  const handleCreateLegacy = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newLegacy = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: previewUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLegacies([newLegacy, ...legacies]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (legacy) => {
    setEditingId(legacy.id);
    setTitle(legacy.title);
    setDescription(legacy.description);
    setPreviewUrl(legacy.imageUrl);
    setImageFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateLegacy = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedLegacies = legacies.map(legacy =>
      legacy.id === editingId
        ? {
            ...legacy,
            title: title.trim(),
            description: description.trim(),
            imageUrl: previewUrl
          }
        : legacy
    );

    setLegacies(updatedLegacies);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this legacy item? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedLegacies = legacies.filter(legacy => legacy.id !== id);
        setLegacies(updatedLegacies);
        const newTotalPages = Math.ceil(updatedLegacies.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (legacy) => {
    setViewingLegacy(legacy);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setTitle('');
    setDescription('');
    setEditingId(null);
    setFormError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-start justify-center p-3 md:p-6">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex justify-between items-center p-4 border-b border-red-200/50">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Our Legacy</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredLegacies.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search legacy..."
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
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Legacy
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600/10 to-red-500/10 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[100px]">Image</th>
                  <th className="px-6 py-4 min-w-[150px]">Title</th>
                  <th className="px-6 py-4 min-w-[200px]">Description</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentLegacies.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-16">
                      <Award className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No legacy items found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new legacy item</p>
                    </td>
                  </tr>
                ) : (
                  currentLegacies.map((legacy) => (
                    <tr key={legacy.id} className="hover:bg-red-50/50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-red-100 to-red-50 overflow-hidden border-2 border-red-200/50 shadow-md flex-shrink-0">
                          {legacy.imageUrl ? (
                            <img 
                              src={legacy.imageUrl} 
                              alt={legacy.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 block text-base">{legacy.title}</span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 max-w-xs" title={legacy.description}>
                          {truncateDescription(legacy.description, 40)}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(legacy)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(legacy)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(legacy.id)}
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
          {filteredLegacies.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-red-50/50 to-transparent">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredLegacies.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredLegacies.length}</span> legacy items
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
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Legacy
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add Legacy
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

            <form onSubmit={editingId ? handleUpdateLegacy : handleCreateLegacy} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column - Image */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Legacy Image *
                  </label>
                  {previewUrl ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-4 border-red-200 shadow-lg group">
                      <img 
                        key={previewUrl}
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          console.log('Image preview error');
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (previewUrl && previewUrl.startsWith('blob:')) {
                            URL.revokeObjectURL(previewUrl);
                          }
                          setPreviewUrl('');
                          setImageFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-lg hover:shadow-red-500/30 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-red-300 rounded-xl cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 group">
                      <Upload className="w-12 h-12 text-red-400 group-hover:text-red-600 mb-2 transition-colors" />
                      <span className="text-sm font-medium text-gray-700">Upload legacy image</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                        aria-label="Upload legacy image"
                      />
                    </label>
                  )}
                </div>

                {/* Right Column - Title and Description */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Title *
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Pioneering Innovation"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {title.length}/100
                    </div>
                  </div>

                  {/* Description with 500 character limit */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Description * <span className="font-normal text-gray-400">(Max 500 characters)</span>
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the legacy, its significance, and impact..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      rows="5"
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {description.length}/500 characters
                    </div>
                    {description.length >= 450 && (
                      <div className={`text-xs mt-1 text-right ${description.length >= 500 ? 'text-red-600 font-semibold' : 'text-orange-500'}`}>
                        {description.length >= 500 ? '⚠️ Maximum limit reached!' : `${500 - description.length} characters remaining`}
                    </div>
                    )}
                  </div>
                </div>
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
                  {editingId ? 'Update Legacy' : 'Save Legacy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingLegacy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={() => {
          setIsViewModalOpen(false);
          setViewingLegacy(null);
        }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-red-600" />
                Legacy Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingLegacy(null);
                }}
                className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image */}
              <div className="w-full h-64 rounded-xl overflow-hidden border-4 border-red-200 shadow-xl">
                {viewingLegacy.imageUrl ? (
                  <img 
                    src={viewingLegacy.imageUrl} 
                    alt={viewingLegacy.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-100">
                    <ImageIcon className="w-16 h-16 text-red-300" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Star className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</p>
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                    {viewingLegacy.title}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  </div>
                  <p className="text-sm text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50 max-h-40 overflow-y-auto">
                    {viewingLegacy.description}
                  </p>
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {viewingLegacy.description.length} characters
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingLegacy(null);
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