'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Diamond, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  AlertCircle,
  Building2,
  LayoutGrid
} from 'lucide-react';

export default function BrandLogoSection() {
  const [logos, setLogos] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=200&h=200&fit=crop',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&h=200&fit=crop',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&h=200&fit=crop',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop',
      createdAt: '2026-07-09'
    },
    {
      id: 7,
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop',
      createdAt: '2026-07-10'
    },
    {
      id: 8,
      imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop',
      createdAt: '2026-07-11'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  // Form state
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingLogo, setViewingLogo] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter logos based on search
  const filteredLogos = logos.filter(logo =>
    logo.id.toString().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogos = filteredLogos.slice(indexOfFirstItem, indexOfLastItem);

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
      setFormError('Please upload a valid image file (JPEG, PNG, GIF, WEBP, SVG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size must be less than 5MB.');
      return;
    }

    setFormError('');

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select an image.');
      return false;
    }
    return true;
  };

  const handleCreateLogo = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newLogo = {
      id: Date.now(),
      imageUrl: previewUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLogos([newLogo, ...logos]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (logo) => {
    setEditingId(logo.id);
    setPreviewUrl(logo.imageUrl);
    setImageFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateLogo = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedLogos = logos.map(logo =>
      logo.id === editingId
        ? {
            ...logo,
            imageUrl: previewUrl
          }
        : logo
    );

    setLogos(updatedLogos);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this logo? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedLogos = logos.filter(logo => logo.id !== id);
        setLogos(updatedLogos);
        const newTotalPages = Math.ceil(updatedLogos.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (logo) => {
    setViewingLogo(logo);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-4 md:p-8 relative overflow-hidden">
 
      <div className="w-full max-w-7xl bg-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10 min-h-[85vh] flex flex-col">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col flex-1">
          {/* Table Header with Search */}
          <div className="flex flex-wrap justify-between items-center p-5 border-b border-red-200/50 gap-3 bg-white/50">
            <div className="flex items-center gap-3">
              <Diamond className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800 text-base">Brand Logos</span>
              <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
                {filteredLogos.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logos..."
                  className="w-56 md:w-64 pl-9 pr-4 py-2.5 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Logo
              </button>
            </div>
          </div>

          {/* Logo Grid View - Corporate Style */}
          <div className="p-6 flex-1 bg-white/30">
            {currentLogos.length === 0 ? (
              <div className="text-center py-20">
                <Diamond className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <p className="font-medium text-gray-500 text-lg">No logos found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new logo</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5">
                {currentLogos.map((logo) => (
                  <div key={logo.id} className="group relative">
                    {/* Logo Card */}
                    <div className="bg-white rounded-xl overflow-hidden border border-red-200/30 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      {/* Logo Image Container - No fixed aspect ratio */}
                      <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100/30 flex items-center justify-center h-48">
                        <img 
                          src={logo.imageUrl} 
                          alt={`Logo ${logo.id}`} 
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=No+Image';
                          }}
                        />
                        
                        {/* ID Badge */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
                          #{logo.id}
                        </div>
                        
                        {/* Action Buttons - Appear on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            onClick={() => handleView(logo)}
                            title="View" 
                            className="p-2.5 bg-white hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(logo)}
                            title="Edit" 
                            className="p-2.5 bg-white hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(logo.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2.5 bg-white hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Card Footer */}
                      <div className="px-4 py-3 bg-white border-t border-red-200/30 flex justify-between items-center">
                        <span className="text-[11px] text-gray-500 font-medium">
                          Logo #{logo.id}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {formatDate(logo.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredLogos.length > 0 && (
            <div className="px-5 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredLogos.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredLogos.length}</span> logos
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
                          : 'bg-white border border-red-200/50 text-gray-600 hover:bg-red-50 hover:border-red-300'
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
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Logo
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Upload Logo
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateLogo : handleCreateLogo} className="space-y-4 text-sm">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Logo Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-sm bg-gray-50 flex items-center justify-center p-4 h-56">
                    <img 
                      key={previewUrl}
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-contain" 
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
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-red-300 cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 h-56 p-4">
                    <Upload className="w-12 h-12 text-red-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Click to upload logo</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, SVG up to 5MB</span>
                    <span className="text-xs text-red-400 mt-2">Use transparent background for best results</span>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange} 
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-600 text-sm hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  {editingId ? 'Update Logo' : 'Save Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingLogo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingLogo(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Diamond className="w-5 h-5 text-red-600" />
                Logo Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingLogo(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Logo Image - No fixed aspect ratio */}
              <div className="w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-md bg-gray-50 flex items-center justify-center p-8 h-80">
                <img 
                  src={viewingLogo.imageUrl} 
                  alt={`Logo ${viewingLogo.id}`} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=No+Image';
                  }}
                />
              </div>

              {/* Details */}
              <div className="space-y-3 bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Logo ID</p>
                  <p className="text-base font-semibold text-gray-800 mt-1">#{viewingLogo.id}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{formatDate(viewingLogo.createdAt)}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Format</p>
                  <p className="text-sm font-medium text-gray-700 mt-1 flex items-center gap-2">
                    <Diamond className="w-4 h-4 text-gray-400" />
                    Transparent Background Recommended
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingLogo(null);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
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