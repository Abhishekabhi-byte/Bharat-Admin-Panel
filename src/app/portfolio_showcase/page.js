'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderOpen, 
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
  Camera,
  Grid,
  List,
  CheckCircle,
  ImagePlus
} from 'lucide-react';

export default function PortfolioShowcasePage() {
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform Development',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.',
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400'
      ],
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Award-winning mobile application design with intuitive user interface, seamless navigation, and engaging user experience.',
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
      ],
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      title: 'Corporate Brand Identity',
      description: 'Complete brand identity package including logo design, brand guidelines, stationery, and marketing collateral.',
      images: [
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400'
      ],
      createdAt: '2026-07-10'
    },
    {
      id: 4,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time analytics dashboard with AI-driven insights, predictive modeling, and interactive data visualization.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
      ],
      createdAt: '2026-07-15'
    },
    {
      id: 5,
      title: 'Social Media Campaign',
      description: 'Comprehensive social media marketing campaign with engaging content strategy, influencer partnerships, and measurable results.',
      images: [
        'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400'
      ],
      createdAt: '2026-07-18'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingPortfolio, setViewingPortfolio] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fileInputRef = useRef(null);

  // Filter portfolios based on search
  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portfolio.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPortfolios = filteredPortfolios.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleMultipleImageChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    if (files.length === 0) return;

    // Validate each file
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setFormError('Please upload valid image files (JPEG, PNG, GIF, WEBP).');
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setFormError('Each image must be less than 5MB.');
      return;
    }

    setFormError('');

    // Clean up previous object URLs
    previewUrls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImages(files);
    setPreviewUrls(newPreviewUrls);
  };

  const removeImage = (index) => {
    if (previewUrls[index] && previewUrls[index].startsWith('blob:')) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const validateForm = () => {
    if (previewUrls.length === 0) {
      setFormError('Please upload at least one image.');
      return false;
    }
    if (!title.trim()) {
      setFormError('Please enter the project title.');
      return false;
    }
    if (!description.trim()) {
      setFormError('Please enter the project description.');
      return false;
    }
    return true;
  };

  const handleCreatePortfolio = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newPortfolio = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      images: previewUrls,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPortfolios([newPortfolio, ...portfolios]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (portfolio) => {
    setEditingId(portfolio.id);
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    setPreviewUrls(portfolio.images);
    setImages([]);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdatePortfolio = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedPortfolios = portfolios.map(portfolio =>
      portfolio.id === editingId
        ? {
            ...portfolio,
            title: title.trim(),
            description: description.trim(),
            images: previewUrls
          }
        : portfolio
    );

    setPortfolios(updatedPortfolios);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio item? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedPortfolios = portfolios.filter(portfolio => portfolio.id !== id);
        setPortfolios(updatedPortfolios);
        const newTotalPages = Math.ceil(updatedPortfolios.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (portfolio) => {
    setViewingPortfolio(portfolio);
    setCurrentImageIndex(0);
    setIsViewModalOpen(true);
  };

  const nextImage = () => {
    if (viewingPortfolio && currentImageIndex < viewingPortfolio.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (viewingPortfolio && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const resetForm = () => {
    previewUrls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setImages([]);
    setPreviewUrls([]);
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
              <FolderOpen className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Portfolio Showcase</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredPortfolios.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search portfolio..."
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
                Add Portfolio
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600/10 to-red-500/10 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[120px]">Images</th>
                  <th className="px-6 py-4 min-w-[150px]">Title</th>
                  <th className="px-6 py-4 min-w-[200px]">Description</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentPortfolios.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-16">
                      <FolderOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No portfolio items found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new portfolio item</p>
                    </td>
                  </tr>
                ) : (
                  currentPortfolios.map((portfolio) => (
                    <tr key={portfolio.id} className="hover:bg-red-50/50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {portfolio.images && portfolio.images.length > 0 ? (
                            <>
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-100 to-red-50 overflow-hidden border-2 border-red-200/50 shadow-md flex-shrink-0">
                                <img 
                                  src={portfolio.images[0]} 
                                  alt={portfolio.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                                  }}
                                />
                              </div>
                              {portfolio.images.length > 1 && (
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                  +{portfolio.images.length - 1}
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-red-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 block text-base">{portfolio.title}</span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 max-w-xs" title={portfolio.description}>
                          {truncateDescription(portfolio.description, 40)}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(portfolio)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(portfolio)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(portfolio.id)}
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
          {filteredPortfolios.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-red-50/50 to-transparent">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredPortfolios.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredPortfolios.length}</span> items
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
                    Edit Portfolio
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add Portfolio
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

            <form onSubmit={editingId ? handleUpdatePortfolio : handleCreatePortfolio} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column - Images */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Project Images * <span className="font-normal text-gray-400">(Upload multiple)</span>
                  </label>
                  
                  {/* Image Upload Area */}
                  {previewUrls.length > 0 ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <div className="w-full h-24 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm">
                              <img 
                                src={url} 
                                alt={`Upload ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 p-1 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-lg hover:shadow-red-500/30 transition-all opacity-0 group-hover:opacity-100"
                              aria-label="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <label className="w-full h-24 rounded-lg border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 flex items-center justify-center">
                          <ImagePlus className="w-6 h-6 text-red-400" />
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            multiple
                            className="hidden" 
                            onChange={handleMultipleImageChange}
                            aria-label="Upload more images"
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                        className="w-full py-2 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
                      >
                        + Add More Images
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-red-300 rounded-xl cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 group">
                      <Upload className="w-12 h-12 text-red-400 group-hover:text-red-600 mb-2 transition-colors" />
                      <span className="text-sm font-medium text-gray-700">Upload project images</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB each</span>
                      <span className="text-xs text-gray-400">Select multiple images</span>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        multiple
                        className="hidden" 
                        onChange={handleMultipleImageChange}
                        aria-label="Upload project images"
                      />
                    </label>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {previewUrls.length} image{previewUrls.length !== 1 ? 's' : ''} selected
                  </p>
                </div>

                {/* Right Column - Title and Description */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Project Title *
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. E-Commerce Platform Development"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {title.length}/100
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Project Description *
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the project, its objectives, and outcomes..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      rows="4"
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {description.length}/500
                    </div>
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
                  {editingId ? 'Update Portfolio' : 'Save Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingPortfolio && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={() => {
          setIsViewModalOpen(false);
          setViewingPortfolio(null);
        }}>
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-2xl border border-red-200/50 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-red-600" />
                Portfolio Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingPortfolio(null);
                }}
                className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image Carousel */}
              <div className="relative">
                <div className="w-full h-80 rounded-xl overflow-hidden border-4 border-red-200 shadow-xl">
                  {viewingPortfolio.images && viewingPortfolio.images.length > 0 ? (
                    <img 
                      src={viewingPortfolio.images[currentImageIndex]} 
                      alt={viewingPortfolio.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-100">
                      <Camera className="w-16 h-16 text-red-300" />
                    </div>
                  )}
                </div>
                
                {/* Navigation Arrows */}
                {viewingPortfolio.images && viewingPortfolio.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      disabled={currentImageIndex === viewingPortfolio.images.length - 1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {viewingPortfolio.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Image Counter */}
              {viewingPortfolio.images && viewingPortfolio.images.length > 1 && (
                <p className="text-center text-sm text-gray-500">
                  {currentImageIndex + 1} / {viewingPortfolio.images.length} images
                </p>
              )}

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FolderOpen className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</p>
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50">
                    {viewingPortfolio.title}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</p>
                  </div>
                  <p className="text-sm text-gray-700 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-200/50 max-h-40 overflow-y-auto">
                    {viewingPortfolio.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Images</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {viewingPortfolio.images && viewingPortfolio.images.map((image, index) => (
                      <div 
                        key={index} 
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          index === currentImageIndex 
                            ? 'border-red-500 shadow-lg scale-105' 
                            : 'border-red-200 hover:border-red-300'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${viewingPortfolio.title} ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingPortfolio(null);
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